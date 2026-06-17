# Certification logos

Self-hosted logo files. The footer cert strip (`components/layout/cert-mark.tsx`)
renders each automatically; if a file is missing, that cert shows its name as a
text fallback (no broken image). Wired in `lib/site-settings.ts`.

| File (in this folder)  | Certification        | Status     |
| ---------------------- | -------------------- | ---------- |
| `fssai.png`            | FSSAI                | in use     |
| `apeda.png`            | APEDA                | in use     |
| `fieo.jpg`             | FIEO                 | in use     |
| `spice-board.jpg`      | Spice Board India    | in use     |
| `msme.png`             | MSME / Udyam         | in use     |
| —                      | DGFT                 | dropped: issues the IEC code (shown in the legal bar), not a credential |

Guidelines:
- **SVG preferred** (crisp at any size); PNG with transparent background also fine
  (if PNG, update the extension in `lib/site-settings.ts`).
- Logos sit on **white chips**, so colour logos are fine; trim generous whitespace.
- Keep height ~28px equivalent; the chip caps display height.

⚠️ Honesty rule: only keep certs Traya **actually holds**. Add/remove rows in
`lib/site-settings.ts` (`certifications`). Later these move to Sanity-managed
`certification` docs (logo + title) so the client controls them without code.
