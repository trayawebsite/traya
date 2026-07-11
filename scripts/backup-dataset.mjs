// Non-interactive full-dataset backup (all documents, any type) to a local NDJSON
// file, using the same client + token as migrate-catalogue.mjs. Run before any
// destructive Sanity operation.
import {writeFileSync, readFileSync} from 'node:fs';
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

if (!token) {
  console.error('✗ No token available for backup.');
  process.exit(1);
}

const client = createClient({projectId, dataset, apiVersion, token, useCdn: false});

const docs = await client.fetch('*[!(_id in path("_.**"))]');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outPath = join(root, `content/sanity-backup-${stamp}.ndjson`);
writeFileSync(outPath, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');

console.log(`✓ Backed up ${docs.length} documents to ${outPath}`);
const byType = {};
for (const d of docs) byType[d._type] = (byType[d._type] || 0) + 1;
console.log('  By type:', byType);
