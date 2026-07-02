'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {usePathname} from '@/i18n/navigation';
import {siteConfig} from '@/lib/site-config';

type Msg = {role: 'user' | 'assistant'; content: string};
type Status = 'idle' | 'streaming' | 'offline' | 'rate' | 'limit';

const MAX_USER = 15;
const MAX_INPUT = 500;

// Floating AI assistant panel. Opens from the bot button (state lives in
// FloatingActions). Streams from /api/chat, falls back to WhatsApp on any error
// or quota limit. Resets each time it's opened (parent remounts on open).
export function ChatPanel({open, onClose}: {open: boolean; onClose: () => void}) {
  const t = useTranslations('Chatbot');
  const th = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const wa = siteConfig.whatsapp.number;
  const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(th('whatsappMessage'))}` : null;

  const userCount = messages.filter((m) => m.role === 'user').length;
  const atLimit = userCount >= MAX_USER;
  const busy = status === 'streaming';

  useEffect(() => {
    scrollRef.current?.scrollTo({top: scrollRef.current.scrollHeight, behavior: 'smooth'});
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    if (atLimit) {
      setStatus('limit');
      return;
    }
    const history: Msg[] = [...messages, {role: 'user', content: value}];
    setMessages([...history, {role: 'assistant', content: ''}]);
    setInput('');
    setStatus('streaming');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messages: history, locale, path: pathname})
      });

      if (!res.ok || !res.body) {
        setMessages((m) => m.slice(0, -1)); // drop the empty placeholder
        setStatus(res.status === 429 ? 'rate' : 'offline');
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      for (;;) {
        const {done, value: chunk} = await reader.read();
        if (done) break;
        acc += dec.decode(chunk, {stream: true});
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {role: 'assistant', content: acc};
          return copy;
        });
      }
      // Empty stream → treat as offline so the buyer still gets a route out.
      if (!acc.trim()) {
        setMessages((m) => m.slice(0, -1));
        setStatus('offline');
        return;
      }
      setStatus('idle');
    } catch {
      setMessages((m) => m.slice(0, -1));
      setStatus('offline');
    }
  }

  if (!open) return null;

  const showChips = messages.length === 0 && status === 'idle';
  const notice =
    status === 'limit' ? t('limitReached') : status === 'rate' ? t('rateLimited') : status === 'offline' ? t('offline') : null;

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed bottom-24 end-6 z-50 flex h-[32rem] max-h-[calc(100dvh-8rem)] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-traya-border bg-card shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-traya-border bg-traya-surface px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-traya-clay text-traya-clay">
            <BotGlyph />
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm leading-tight text-foreground">{t('title')}</p>
            <p className="truncate text-[11px] leading-tight text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-traya-border/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <CloseGlyph />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <Bubble role="assistant">{t('greeting')}</Bubble>

        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.content || (busy && i === messages.length - 1 ? <Dots /> : '')}
          </Bubble>
        ))}

        {showChips && (
          <div className="flex flex-wrap gap-2 pt-1">
            {(['chip1', 'chip2', 'chip3'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => send(t(k))}
                className="rounded-full border border-traya-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-traya-red/40 hover:bg-traya-red-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(k)}
              </button>
            ))}
          </div>
        )}

        {notice && (
          <div className="rounded-xl border border-traya-border bg-traya-surface p-3 text-sm leading-relaxed text-foreground/80">
            <p>{notice}</p>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-traya-red-deep hover:underline"
              >
                {t('whatsappAction')} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Quick actions + input */}
      <div className="border-t border-traya-border px-3 pb-3 pt-2.5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-traya-border px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-whatsapp"
            >
              {t('whatsappAction')}
            </a>
          )}
          <a
            href="#enquiry"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-traya-border px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:border-traya-red/40"
          >
            {t('enquiryAction')}
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_INPUT}
            disabled={busy || atLimit}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            className="min-w-0 flex-1 rounded-full border border-traya-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-traya-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-traya-red/25 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || busy || atLimit}
            aria-label={t('send')}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-traya-red text-white transition-colors hover:bg-traya-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <SendGlyph />
          </button>
        </form>

        <p className="mt-2 text-center text-[10px] leading-tight text-muted-foreground">{t('disclaimer')}</p>
      </div>
    </div>
  );
}

function Bubble({role, children}: {role: 'user' | 'assistant'; children: ReactNode}) {
  const isUser = role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser ? 'bg-traya-red text-white' : 'bg-traya-surface text-foreground'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-hidden>
      <span className="size-1.5 animate-bounce rounded-full bg-traya-clay [animation-delay:-0.3s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-traya-clay [animation-delay:-0.15s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-traya-clay" />
    </span>
  );
}

function BotGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
