import {createClient} from 'next-sanity';
import {apiVersion, dataset, projectId} from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // false so on-demand revalidation (cache tags) pulls fresh content; the Next
  // data cache (see lib/fetch.ts) does the caching, not the Sanity CDN.
  useCdn: false
});
