// Logs a lead to a Google Sheet via a Google Apps Script web app.
// Set up: create an Apps Script bound to the sheet, publish as a web app
// (Execute as: Me, Access: Anyone), then put its URL in GOOGLE_SHEETS_WEBHOOK_URL.
// This is best-effort — a Sheets failure must never block the email/response,
// so this never throws. The returned status is informational (used by the demo
// and useful for debugging); production callers can ignore it.
export type SheetLogResult = {
  ok: boolean;
  configured: boolean;
  status?: number;
  error?: string;
};

export async function logLeadToSheet(
  type: 'contact' | 'inquiry' | 'quote',
  data: Record<string, unknown>
): Promise<SheetLogResult> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return {ok: false, configured: false};

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({type, ...data, submittedAt: new Date().toISOString()})
    });

    // A 200 only means Apps Script replied — the script can still report failure
    // in its JSON body (e.g. it threw while writing the row). Trust the body's
    // `ok` when we can parse it, and fall back to the HTTP status otherwise.
    let ok = res.ok;
    let error: string | undefined;
    try {
      const json = JSON.parse(await res.text());
      if (typeof json?.ok === 'boolean') ok = json.ok;
      if (json?.error) error = String(json.error);
    } catch {
      // Non-JSON response — keep the HTTP-status verdict.
    }

    return {ok, configured: true, status: res.status, error};
  } catch (err) {
    console.error('[sheets] failed to log lead', err);
    return {ok: false, configured: true, error: String(err)};
  }
}
