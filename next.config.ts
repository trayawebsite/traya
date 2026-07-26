import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (smaller) then WebP for the on-the-fly optimizer.
    formats: ['image/avif', 'image/webp'],
    // Next 16 only generates the quality levels listed here (default [75]); our
    // images request 82 (hero) and 90 (tiles), so declare them or Next warns.
    qualities: [75, 82, 90],
    remotePatterns: [
      // Sanity-hosted images
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      // Client WordPress media (e.g. founder portrait)   interim until Sanity
      {protocol: 'https', hostname: 'www.trayaexim.com'}
    ]
  },

  async headers() {
    return [
      // Applies to every route. The Studio needs a looser CSP than the site
      // (see the /studio entry below), so keep the two in sync when editing.
      {
        source: '/:path*',
        headers: [...BASE_SECURITY_HEADERS, {key: 'Content-Security-Policy', value: SITE_CSP}]
      },
      {
        source: '/studio/:path*',
        headers: [...BASE_SECURITY_HEADERS, {key: 'Content-Security-Policy', value: STUDIO_CSP}]
      }
    ];
  }
};

// ── Security headers ──────────────────────────────────────────────────────
// Non-CSP headers are safe everywhere. HSTS is only honoured over HTTPS, so it
// is inert in local dev.
const BASE_SECURITY_HEADERS = [
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
  {key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload'},
  // Deny hardware/identity APIs the site never uses.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()'
  }
];

// `unsafe-inline` on script-src is required: the App Router streams the RSC
// payload through inline <script> tags, and Next 16 has no nonce mechanism that
// survives static prerendering. Everything else is locked to same-origin.
//   img blob:/data:  → next/image placeholders + Sanity CDN
//   connect *.sanity.io → live content + on-demand revalidation
const SITE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://www.trayaexim.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests'
].join('; ');

// Sanity Studio bundles/evaluates code at runtime and talks to more Sanity
// hosts, so it needs 'unsafe-eval' and a wider connect-src. Scoped to /studio
// only   the public site never gets these relaxations.
const STUDIO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.api.sanity.io",
  "worker-src 'self' blob:",
  "frame-src 'self' https://*.sanity.io",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'"
].join('; ');

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
