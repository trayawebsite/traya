import {NextResponse} from 'next/server';
import {rateLimit, getClientIp} from '@/lib/rate-limit';
import {buildKnowledgeBase, buildSystemPrompt} from '@/lib/chatbot/knowledge';
import {getProductBySlug, getCategoryBySlug} from '@/lib/catalogue';

// Node runtime   the knowledge base reads the catalogue/site-settings (fs + Sanity).
export const runtime = 'nodejs';

const MODEL_PRIMARY = 'gemini-2.5-flash'; // best quality; smaller free-tier quota
const MODEL_FALLBACK = 'gemini-flash-lite-latest'; // separate, larger free-tier quota
const MAX_INPUT = 500; // chars per message (token-bomb guard)
const MAX_HISTORY = 8; // messages sent to the model (cost guard)
const MAX_USER_MESSAGES = 15; // per conversation (abuse guard)
const DAILY_PER_IP = 30; // messages/day/IP (quota guard)

type ChatMessage = {role: 'user' | 'assistant'; content: string};

// Turn the current path into a short "the buyer is viewing X" line so answers
// are page-aware. Uses the data layer to resolve product/category slugs to names.
async function pageContextFrom(path?: string): Promise<string | undefined> {
  if (!path) return undefined;
  const clean = path.replace(/^\/(ar|fr)(?=\/|$)/, '') || '/';

  const product = clean.match(/^\/products\/([^/]+)$/);
  if (product) {
    const found = await getProductBySlug(product[1]);
    if (found) {
      return `The buyer is viewing the product page for "${found.product.name}" (category: ${found.category.title}).`;
    }
  }

  const category = clean.match(/^\/categories\/([^/]+)$/);
  if (category) {
    const cat = await getCategoryBySlug(category[1]);
    if (cat) return `The buyer is viewing the "${cat.title}" category page.`;
  }

  const map: Record<string, string> = {
    '/': 'the home page',
    '/about': 'the About page',
    '/capabilities': 'the Capabilities page',
    '/products': 'the Products catalogue',
    '/certifications': 'the Certifications page',
    '/contact': 'the Contact page',
    '/enquiry': 'the Enquiry List page'
  };
  return map[clean] ? `The buyer is on ${map[clean]}.` : undefined;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  // No key configured → graceful "offline" so the UI shows the WhatsApp fallback.
  if (!apiKey) return NextResponse.json({error: 'offline'}, {status: 503});

  let body: {messages?: ChatMessage[]; locale?: string; path?: string};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({error: 'bad_request'}, {status: 400});
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const locale = body.locale === 'ar' || body.locale === 'fr' ? body.locale : 'en';
  const last = messages[messages.length - 1];

  if (!last || last.role !== 'user' || typeof last.content !== 'string' || !last.content.trim()) {
    return NextResponse.json({error: 'bad_request'}, {status: 400});
  }
  if (last.content.length > MAX_INPUT) {
    return NextResponse.json({error: 'too_long'}, {status: 400});
  }
  if (messages.filter((m) => m.role === 'user').length > MAX_USER_MESSAGES) {
    return NextResponse.json({error: 'limit'}, {status: 429});
  }

  // Per-IP daily budget (reuses the shared in-memory limiter).
  const ip = getClientIp(req);
  if (!rateLimit(`chat:${ip}`, DAILY_PER_IP).ok) {
    return NextResponse.json({error: 'rate'}, {status: 429});
  }

  const knowledge = await buildKnowledgeBase();
  const pageContext = await pageContextFrom(body.path);
  const system = buildSystemPrompt(knowledge, {locale, pageContext});

  // Trim history + map roles to Gemini's schema.
  const contents = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{text: String(m.content).slice(0, MAX_INPUT * 4)}]
  }));

  const payload = JSON.stringify({
    systemInstruction: {parts: [{text: system}]},
    contents,
    generationConfig: {temperature: 0.3, maxOutputTokens: 800}
  });

  // Tiered fallback: try the primary model; if its free quota is exhausted (429)
  // or it errors, try the lighter model (separate, larger free quota). Only if
  // BOTH are unavailable do we give up → the client shows the WhatsApp fallback.
  async function callModel(model: string): Promise<Response | null> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload
      });
      return r.ok && r.body ? r : null;
    } catch {
      return null;
    }
  }

  const geminiRes = (await callModel(MODEL_PRIMARY)) ?? (await callModel(MODEL_FALLBACK));
  if (!geminiRes || !geminiRes.body) {
    return NextResponse.json({error: 'offline'}, {status: 503});
  }

  // Re-stream Gemini's SSE as plain text deltas for the client to append.
  const reader = geminiRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = '';
      try {
        for (;;) {
          const {done, value} = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, {stream: true});
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            const l = line.trim();
            if (!l.startsWith('data:')) continue;
            const data = l.slice(5).trim();
            if (!data) continue;
            try {
              const json = JSON.parse(data);
              const text: string =
                json?.candidates?.[0]?.content?.parts
                  ?.map((p: {text?: string}) => p.text ?? '')
                  .join('') ?? '';
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // ignore keep-alives / partial JSON
            }
          }
        }
      } catch {
        // stream interrupted   end gracefully
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    }
  });

  return new Response(stream, {
    headers: {'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store'}
  });
}
