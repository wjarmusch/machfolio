/**
 * MachFolio — add a `last_updated` column and backfill it from `price_last_updated`.
 *
 * One-time setup. It:
 *   1. Finds the entries tab (the one with headers `machine_slug` + `price_last_updated`).
 *   2. Adds a `last_updated` column at the far right if it doesn't already exist.
 *   3. Copies each row's price_last_updated date into last_updated as ISO text (yyyy-MM-dd),
 *      so the CSV export stays in a format Hugo can parse.
 *
 * HOW TO RUN:
 *   - In the Google Sheet: Extensions > Apps Script.
 *   - Paste this whole file in, save, pick `addLastUpdatedColumn` in the function dropdown, Run.
 *   - Approve the permission prompt the first time (it only touches this spreadsheet).
 *
 * Safe to re-run: it refills the column rather than duplicating it.
 */
function addLastUpdatedColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tz = ss.getSpreadsheetTimeZone() || 'America/New_York';

  // --- Locate the entries tab by its headers (position/gid independent) ---
  var sheet = null;
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getLastColumn() < 1) continue;
    var hdr = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn()).getValues()[0];
    if (hdr.indexOf('price_last_updated') !== -1 && hdr.indexOf('machine_slug') !== -1) {
      sheet = sheets[i];
      break;
    }
  }
  if (!sheet) {
    throw new Error('Entries tab not found (needs headers "machine_slug" and "price_last_updated").');
  }

  var lastCol = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  var srcIdx = header.indexOf('price_last_updated'); // 0-based
  var dstIdx = header.indexOf('last_updated');       // 0-based, -1 if missing

  // --- Create last_updated as a new right-most column if needed ---
  if (dstIdx === -1) {
    dstIdx = lastCol;                       // 0-based index of the new column
    sheet.getRange(1, lastCol + 1).setValue('last_updated');
    lastCol = lastCol + 1;
  }

  if (lastRow < 2) {
    SpreadsheetApp.getActiveSpreadsheet().toast('No data rows to fill.', 'MachFolio', 5);
    return;
  }

  var numRows = lastRow - 1;

  // Force the destination column (data rows) to plain text so ISO strings
  // survive as text and export to CSV as yyyy-MM-dd, not the locale date format.
  sheet.getRange(2, dstIdx + 1, numRows, 1).setNumberFormat('@');

  var srcVals = sheet.getRange(2, srcIdx + 1, numRows, 1).getValues();
  var out = [];
  for (var r = 0; r < numRows; r++) {
    var v = srcVals[r][0];
    var iso = '';
    if (v instanceof Date && !isNaN(v.getTime())) {
      iso = Utilities.formatDate(v, tz, 'yyyy-MM-dd');
    } else if (v !== '' && v != null) {
      var d = new Date(v);                  // handles strings like 7/6/2026
      iso = isNaN(d.getTime()) ? String(v) : Utilities.formatDate(d, tz, 'yyyy-MM-dd');
    }
    out.push([iso]);
  }

  sheet.getRange(2, dstIdx + 1, numRows, 1).setValues(out);

  SpreadsheetApp.getActiveSpreadsheet()
    .toast('last_updated filled for ' + numRows + ' rows (ISO text).', 'MachFolio', 5);
}
