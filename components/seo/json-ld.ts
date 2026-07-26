// Safe JSON-LD serialization for `dangerouslySetInnerHTML`.
//
// Inside a <script> block the browser HTML parser scans for the literal
// characters "</script" before any JSON parsing happens. Content here is
// client-editable via Sanity, so a product name or FAQ answer containing
// "</script>" would close the tag early and let the rest render as markup.
//
// Escaping `<` to its unicode form is inert inside a JSON string (it parses
// back to "<") but is invisible to the HTML tokenizer. U+2028/U+2029 are
// valid in JSON yet illegal raw in JavaScript, so they are escaped too.
//
// The U+2028/U+2029 patterns MUST be written as \u escape sequences
// here, never as the raw characters: raw, they are line terminators to a JS
// parser, so the regex literal breaks across lines and the file no longer
// parses (ESLint: "Unterminated regular expression literal").
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
