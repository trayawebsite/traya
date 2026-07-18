// Lightweight rate limiter for the lead routes (anti-spam / abuse).
//
// SERVERLESS NOTE: this store lives in module memory, which on Vercel is
// per-instance and cleared on cold start   a solid first layer, but not a hard
// global guarantee across many concurrent instances. For a strict global limit,
// swap the Map for a durable store (Vercel KV / Upstash Redis) behind this same
// `rateLimit()` signature   no caller changes needed.

const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// Parse the env limit defensively   a non-numeric value must NOT silently
// disable the limiter (Number('foo') is NaN, and `>= NaN` is always false).
function parseMax(raw: string | undefined, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}
// 15/day/IP: high enough that several buyers behind one corporate NAT / shared
// egress IP aren't collectively locked out (4 was too tight for B2B), low enough
// to blunt abuse   the honeypot is the primary spam gate. Tune via env.
const DEFAULT_MAX = parseMax(process.env.LEAD_MAX_PER_DAY, 15); // submissions / window

// key → submission timestamps within the window
const store = new Map<string, number[]>();

export type RateResult = {ok: boolean; remaining: number; retryAfterSec: number};

export function rateLimit(key: string, max = DEFAULT_MAX, windowMs = WINDOW_MS): RateResult {
  // Guard: a max <= 0 would make `hits.length >= max` true on an empty window,
  // then read hits[0] (undefined) → NaN Retry-After. Floor to at least 1.
  max = Math.max(1, Math.floor(max));
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

// Best-effort client IP. Prefer x-real-ip (set by the platform, not client-
// settable) over x-forwarded-for, whose left-most value a client can spoof to
// rotate past the limit or lock out a victim. Both may be absent locally (falls
// back to a shared 'unknown' bucket, which is fine in dev).
export function getClientIp(req: Request): string {
  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return 'unknown';
}
