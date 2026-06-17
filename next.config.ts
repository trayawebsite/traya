import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity-hosted images
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      // Client WordPress media (e.g. founder portrait) — interim until Sanity
      {protocol: 'https', hostname: 'www.trayaexim.com'}
    ]
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
