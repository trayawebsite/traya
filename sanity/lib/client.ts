import {createClient} from 'next-sanity';
import {apiVersion, dataset, projectId} from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true // set false if you need fresh data on every request
});
