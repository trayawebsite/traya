// Read once, here. Empty fallbacks keep the build green before the project is
// connected — set these in .env.local for the Studio/client to actually work.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-10';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
