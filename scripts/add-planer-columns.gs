/**
 * MachFolio — add the 8 planer columns to the category_specs tab.
 *
 * Appends them after the last existing column (they land at T through AA on the
 * current sheet). Skips any that already exist, so it's safe to re-run.
 * Run once from Extensions > Apps Script: pick addPlanerColumns, Run.
 */
function addPlanerColumns() {
  var NEW = [
    'planer_type',
    'max_stock_width',
    'max_stock_thickness',
    'planer_cutterhead_type',
    'planer_cutterhead_speed',
    'planer_knife_count',
    'max_depth_per_pass',
    'feed_rate'
  ];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = null;
  // category_specs = the tab with saw_class + machine_slug but NOT machine_name.
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getLastColumn() < 1) continue;
    var hdr = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn()).getValues()[0];
    if (hdr.indexOf('saw_class') !== -1 && hdr.indexOf('machine_slug') !== -1 && hdr.indexOf('machine_name') === -1) {
      sheet = sheets[i];
      break;
    }
  }
  if (!sheet) throw new Error('category_specs tab not found (needs saw_class + machine_slug, no machine_name).');

  var lastCol = sheet.getLastColumn();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var col = lastCol;
  var added = [];
  for (var n = 0; n < NEW.length; n++) {
    if (header.indexOf(NEW[n]) !== -1) continue; // already present
    col++;
    sheet.getRange(1, col).setValue(NEW[n]);
    added.push(NEW[n] + ' -> ' + _colLetter_(col));
  }

  Logger.log(added.length ? added.join('\n') : 'All planer columns already present.');
  SpreadsheetApp.getActiveSpreadsheet().toast('Added ' + added.length + ' planer columns (see Executions log for letters).', 'MachFolio', 6);
}

function _colLetter_(n) {
  var s = '';
  while (n > 0) {
    var m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = (n - m - 1) / 26;
  }
  return s;
}
