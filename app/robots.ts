import type {MetadataRoute} from 'next';
import {siteUrl as baseUrl} from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api']
      },
      // Explicitly allow AI crawlers for AEO
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'],
        allow: '/'
      },
      {
        userAgent: ['PerplexityBot', 'Perplexity-User'],
        allow: '/'
      },
      {
        userAgent: ['ClaudeBot', 'Claude-SearchBot', 'Claude-User'],
        allow: '/'
      },
      {
        userAgent: 'Google-Extended',
        allow: '/'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
