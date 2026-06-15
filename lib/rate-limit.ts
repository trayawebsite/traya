// Lightweight rate limiter for the lead routes (anti-spam / abuse).
//
// SERVERLESS NOTE: this store lives in module memory, which on Vercel is
// per-instance and cleared on cold start — a solid first layer, but not a hard
// global guarantee across many concurrent instances. For a strict global limit,
// swap the Map for a durable store (Vercel KV / Upstash Redis) behind this same
// `rateLimit()` signature — no caller changes needed.

const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const DEFAULT_MAX = Number(process.env.LEAD_MAX_PER_DAY ?? '4'); // submissions / window

// key → submission timestamps within the window
const store = new Map<string, number[]>();

export type RateResult = {ok: boolean; remaining: number; retryAfterSec: number};

export function rateLimit(key: string, max = DEFAULT_MAX, windowMs = WINDOW_MS): RateResult {
  const now = Date.now();
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= max) {
    store.set(key, hits);
    const oldest = hits[0];
    return {ok: false, remaining: 0, retryAfterSec: Math.ceil((windowMs - (now - oldest)) / 1000)};
  }

  hits.push(now);
  store.set(key, hits);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      const live = v.filter((t) => now - t < windowMs);
      if (live.length === 0) store.delete(k);
      else store.set(k, live);
    }
  }

  return {ok: true, remaining: max - hits.length, retryAfterSec: 0};
}

// Best-effort client IP. Vercel always sets x-forwarded-for; locally it may be
// absent (falls back to a shared 'unknown' bucket, which is fine in dev).
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}
