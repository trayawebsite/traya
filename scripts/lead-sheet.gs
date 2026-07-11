/**
 * Traya   Lead capture Apps Script (bound to a Google Sheet).
 * Receives JSON POSTs from lib/sheets.ts: { type, ...formFields, submittedAt }
 * and appends one row per submission. Headers are managed dynamically, so any
 * form (contact / inquiry / quote) with any fields just works   new fields get
 * a new column automatically.
 *
 * Deploy: Extensions ▸ Apps Script ▸ paste this ▸ Deploy ▸ New deployment ▸
 *         Web app ▸ Execute as: Me ▸ Who has access: Anyone ▸ Deploy.
 * Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL.
 */

const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const lock = LockService.getScriptLock();
    lock.waitLock(20000); // serialize writes so concurrent leads don't clash
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

      // Read existing header row (row 1).
      const lastCol = sheet.getLastColumn();
      let headers =
        lastCol > 0
          ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].filter(String)
          : [];

      // Add any new keys from this payload as new columns.
      const incomingKeys = Object.keys(body);
      let headersChanged = false;
      incomingKeys.forEach(function (k) {
        if (headers.indexOf(k) === -1) {
          headers.push(k);
          headersChanged = true;
        }
      });
      if (headers.length === 0) headers = incomingKeys; // first ever write

      if (headersChanged || lastCol === 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
        sheet.setFrozenRows(1);
      }

      // Build the row in header order; stringify objects/arrays.
      const row = headers.map(function (h) {
        const v = body[h];
        if (v === undefined || v === null) return "";
        return typeof v === "object" ? JSON.stringify(v) : v;
      });

      // Write as PLAIN TEXT. Otherwise Sheets parses values that start with
      // + = - @ as formulas   e.g. a "+49 151..." phone number becomes #ERROR!.
      // Formatting the row as text BEFORE setting values prevents that.
      const targetRow = sheet.getLastRow() + 1;
      const range = sheet.getRange(targetRow, 1, 1, row.length);
      range.setNumberFormat("@");
      range.setValues([row]);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the /exec URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "Traya lead webhook" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
