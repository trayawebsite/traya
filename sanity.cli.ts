import {defineCliConfig} from 'sanity/cli';
import {dataset, projectId} from './sanity/env';

// Used by the Sanity CLI (e.g. `sanity dataset import`).
export default defineCliConfig({
  api: {projectId, dataset}
});
