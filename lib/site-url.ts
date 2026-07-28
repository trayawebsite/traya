// ─────────────────────────────────────────────────────────────────────────
// The site's canonical absolute origin   used for metadataBase, canonical
// links, hreflang alternates, JSON-LD, robots.txt, the sitemap and the OG /
// Twitter image URLs. Every one of those has to be an absolute URL, so a bad
// value here silently poisons the whole site's SEO rather than throwing.
//
// This was not hypothetical: a deploy once ran with
// `NEXT_PUBLIC_SITE_URL=https://www.example.com` (a copied placeholder), which
// pointed every canonical, every sitemap entry and the og:image at a domain
// the company doesn't own   share previews lost their image and Google was
// told the real content lived elsewhere. Hence the guard: an obviously-wrong
// value is ignored in favour of the real domain, loudly, instead of shipping.
// ─────────────────────────────────────────────────────────────────────────

/** The real production origin. The fallback when the env var is unusable. */
const CANONICAL_ORIGIN = "https://www.trayaexim.com";

/** Placeholder hosts that must never end up in canonical URLs. */
const PLACEHOLDER_HOSTS = ["example.com", "example.org", "example.net", "yourdomain.com"];

function resolveSiteUrl(): string {
  // Referenced directly (not via a variable) so Next can inline the value at
  // build time for client bundles.
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return CANONICAL_ORIGIN;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    warn(`NEXT_PUBLIC_SITE_URL is not a valid URL (${raw})`);
    return CANONICAL_ORIGIN;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    warn(`NEXT_PUBLIC_SITE_URL must be http(s) (${raw})`);
    return CANONICAL_ORIGIN;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (PLACEHOLDER_HOSTS.includes(host)) {
    warn(`NEXT_PUBLIC_SITE_URL is still a placeholder (${raw})`);
    return CANONICAL_ORIGIN;
  }

  // Trailing slash stripped: callers build paths as `${siteUrl}/products/x`.
  return url.origin;
}

function warn(message: string) {
  console.warn(`[site-url] ${message}   falling back to ${CANONICAL_ORIGIN}.`);
}

/** Absolute origin, no trailing slash, safe to interpolate paths onto. */
export const siteUrl = resolveSiteUrl();
