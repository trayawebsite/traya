// One-off cleanup: the live dataset has two ID schemes for the same 5
// certifications (fssai/apeda/fieo/spice-board/msme vs cert-fssai/cert-apeda/
// cert-fieo/cert-spice-board/cert-msme) with identical content. The site
// already dedupes by title at render time, so this is CMS hygiene only —
// delete the redundant `cert-*` prefixed set, keep the plain-ID set (matches
// generate-seed.mjs going forward).
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createClient} from 'next-sanity';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envRaw = readFileSync(join(root, '.env.local'), 'utf8');
const env = {};
for (const line of envRaw.split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-10';
const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
const client = createClient({projectId, dataset, apiVersion, token, useCdn: false});

const DUPES = ['cert-fssai', 'cert-apeda', 'cert-fieo', 'cert-spice-board', 'cert-msme'];

const tx = client.transaction();
for (const id of DUPES) tx.delete(id);
await tx.commit();
console.log('✓ Deleted', DUPES.length, 'duplicate certification docs:', DUPES.join(', '));

const remaining = await client.fetch('*[_type == "certification"]{_id, title}');
console.log('Remaining certifications:', remaining.length);
remaining.forEach((c) => console.log(' ', c._id, '|', c.title));
