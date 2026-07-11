// Re-seed the LIVE Sanity catalogue from content/seed.ndjson.
//
// This REPLACES the catalogue in Sanity: it deletes every existing `category`
// and `product` document, then creates the 30 categories / 502 products from
// the seed. Singletons (siteSettings, homePage, aboutPage, certifications) in
// the seed are createOrReplace'd, so their edits are refreshed too.
//
// ⚠️  DESTRUCTIVE on live data. Take a backup first:
//     pnpm dlx sanity@latest dataset export production backup.tar.gz
//
// Requires a WRITE token (Sanity Manage ▸ API ▸ Tokens ▸ Editor):
//     SANITY_API_WRITE_TOKEN=sk... node scripts/migrate-catalogue.mjs
//
// Dry run (no writes, just prints the plan):
//     SANITY_API_WRITE_TOKEN=sk... node scripts/migrate-catalogue.mjs --dry-run

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "next-sanity";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load env from .env.local (project id / dataset / api version) without a dep.
const envRaw = readFileSync(join(root, ".env.local"), "utf8");
const env = {};
for (const line of envRaw.split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-10";
const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!token) {
  console.error(
    "✗ No write token. Set SANITY_API_WRITE_TOKEN (Sanity Manage ▸ API ▸ Tokens ▸ Editor).",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const docs = readFileSync(join(root, "content/seed.ndjson"), "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => JSON.parse(l));

const run = async () => {
  console.log(
    `Project ${projectId} · dataset ${dataset}${dryRun ? " · DRY RUN" : ""}`,
  );

  // 1. Existing catalogue docs to remove (anything not in the new seed).
  const seedIds = new Set(docs.map((d) => d._id));
  const existing = await client.fetch('*[_type in ["category","product"]]._id');
  const stale = existing.filter((id) => !seedIds.has(id));
  console.log(
    `Existing catalogue docs: ${existing.length} · stale to delete: ${stale.length} · seed docs: ${docs.length}`,
  );

  if (dryRun) {
    console.log("DRY RUN   no writes. Sample stale ids:", stale.slice(0, 8));
    return;
  }

  // 2. Delete stale catalogue docs (batched transactions).
  for (let i = 0; i < stale.length; i += 50) {
    const tx = client.transaction();
    for (const id of stale.slice(i, i + 50)) tx.delete(id);
    await tx.commit();
    console.log(`  deleted ${Math.min(i + 50, stale.length)}/${stale.length}`);
  }

  // 3. createOrReplace all seed docs (categories first so refs resolve).
  const ordered = [...docs].sort((a) => (a._type === "category" ? -1 : 1));
  for (let i = 0; i < ordered.length; i += 50) {
    const tx = client.transaction();
    for (const d of ordered.slice(i, i + 50)) tx.createOrReplace(d);
    await tx.commit();
    console.log(
      `  upserted ${Math.min(i + 50, ordered.length)}/${ordered.length}`,
    );
  }

  console.log(
    "✓ Done. Trigger a redeploy / revalidate so the site picks it up.",
  );
};

run().catch((e) => {
  console.error("✗ Migration failed:", e.message);
  process.exit(1);
});
