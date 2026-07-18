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
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
