import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16 renamed the `middleware` convention to `proxy`. next-intl's
// createMiddleware returns a compatible request handler.
export default createMiddleware(routing);

export const config = {
  // Run on all paths except API routes, the Sanity Studio, Next internals,
  // and anything with a file extension (static assets).
  matcher: ['/((?!api|studio|design-directions|lead-demo|i18n-demo|_next|_vercel|.*\\..*).*)']
};
