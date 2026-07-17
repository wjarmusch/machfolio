/**
 * MachFolio — backfill missing sheet data.
 *
 * Run from Extensions > Apps Script. Two independent functions:
 *   - fillTableSawDatePublished(): stamps empty table-saw date_published cells.
 *   - fillJointerReleaseYears():   fills release_year for jointers with a
 *                                  reasonably-sourced year (see notes below).
 *
 * Both only touch EMPTY cells, so they never overwrite anything you've entered.
 * Both are safe to re-run.
 */

function _entriesSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getLastColumn() < 1) continue;
    var hdr = sheets[i].getRange(1, 1, 1, sheets[i].getLastColumn()).getValues()[0];
    if (hdr.indexOf('machine_slug') !== -1 && hdr.indexOf('category') !== -1) return sheets[i];
  }
  throw new Error('Entries tab not found (needs headers machine_slug and category).');
}

/** Set date_published = 7/7/2026 for every Table Saw whose cell is blank. */
function fillTableSawDatePublished() {
  var LAUNCH = '7/7/2026'; // matches the M/D/YYYY format used by your other entries
  var sheet = _entriesSheet_();
  var lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var catIdx = header.indexOf('category');
  var dateIdx = header.indexOf('date_published');
  if (dateIdx === -1) throw new Error('date_published column not found.');
  if (lastRow < 2) return;

  var numRows = lastRow - 1;
  var cats = sheet.getRange(2, catIdx + 1, numRows, 1).getValues();
  var range = sheet.getRange(2, dateIdx + 1, numRows, 1);
  range.setNumberFormat('@'); // plain text so it exports exactly as 7/7/2026
  var vals = range.getValues();
  var n = 0;
  for (var r = 0; r < numRows; r++) {
    if (String(cats[r][0]).trim() === 'Table Saw' && String(vals[r][0]).trim() === '') {
      vals[r][0] = LAUNCH;
      n++;
    }
  }
  range.setValues(vals);
  SpreadsheetApp.getActiveSpreadsheet().toast('date_published set on ' + n + ' table saws.', 'MachFolio', 5);
}

/**
 * Fill release_year for jointers where a year is reasonably supported
 * (Grizzly owner's-manual copyright dates, dated reviews, or recent listings).
 * The five pre-2015 models are intentionally omitted — their years are only
 * low-confidence ballparks. Add them here if you decide to include them.
 */
function fillJointerReleaseYears() {
  var YEARS = {
    'grizzly-g0858': '2020',     // manual (c) Nov 2020
    'grizzly-g0945': '2021',     // shared 45/46/47 manual (c) Jul 2021
    'grizzly-g0946': '2021',     // shared 45/46/47 manual (c) Jul 2021
    'grizzly-g0947': '2021',     // shared 45/46/47 manual (c) Jul 2021
    'grizzly-g0958': '2022',     // 58/59 manual (c) May 2022
    'grizzly-g0959': '2022',     // 58/59 manual (c) May 2022
    'grizzly-g0490x': '2012',    // WWGOA review Oct 2012
    'grizzly-g0834': '2018',     // manual (c) Feb 2018
    'grizzly-g0814': '2018',     // listing late 2018
    'grizzly-g0856': '2016',     // listing/manual spec sheet ~2016
    'cutech-40160hb': '2023',    // listing early 2023
    'wen-jt3062': '2022',        // manual dated Oct 2022
    'wen-jt833h': '2020',        // listing late 2020
    'south-bend-sb1091': '2021'  // listing early 2021
    // --- Low-confidence, omitted (verify via Amazon "Date First Available"): ---
    // 'grizzly-g0452z': '2008',
    // 'jet-jj-6csdx': '2006',
    // 'powermatic-54hh': '2008',
    // 'powermatic-pj-882hh': '2009',
    // 'grizzly-g9860zx': '2004'
  };

  var sheet = _entriesSheet_();
  var lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var slugIdx = header.indexOf('machine_slug');
  var yrIdx = header.indexOf('release_year');
  if (yrIdx === -1) throw new Error('release_year column not found.');
  if (lastRow < 2) return;

  var numRows = lastRow - 1;
  var slugs = sheet.getRange(2, slugIdx + 1, numRows, 1).getValues();
  var range = sheet.getRange(2, yrIdx + 1, numRows, 1);
  range.setNumberFormat('@');
  var vals = range.getValues();
  var n = 0;
  for (var r = 0; r < numRows; r++) {
    var s = String(slugs[r][0]).trim();
    if (YEARS.hasOwnProperty(s) && String(vals[r][0]).trim() === '') {
      vals[r][0] = YEARS[s];
      n++;
    }
  }
  range.setValues(vals);
  SpreadsheetApp.getActiveSpreadsheet().toast('release_year set on ' + n + ' jointers.', 'MachFolio', 5);
}

/**
 * Fill empty jointer compare notes. Matched by [machine_slug][competitor_slug],
 * so it writes the right note regardless of which compare slot (1/2/3) holds it.
 * Only fills blank note cells; safe to re-run.
 */
function fillJointerCompareNotes() {
  var NOTES = {
    'grizzly-g0858': {
      'grizzly-g0490x': "The G0490X is Grizzly's other 8-inch parallelogram jointer, also 3 HP but with a spiral-type cutterhead and a heavier build, a close alternative if you want the longer beds of the X-series.",
      'grizzly-g0856': "The G0856 is an 8-inch helical jointer at the same 3 HP with a mobile base included, trading the G0858's parallelogram bed adjustment for a simpler dovetail-way design at a lower price.",
      'south-bend-sb1091': "The South Bend SB1091 is a heavier-duty 8-inch parallelogram with the same helical cutterhead, stepping up to a professional-grade build and warranty for a meaningful price premium."
    },
    'grizzly-g0945': {
      'grizzly-g0946': "The G0946 is the same 6-inch benchtop with a spiral-type cutterhead instead of straight knives, so you get quieter cuts and cleaner results in figured grain for a small step up in price.",
      'wen-jt3062': "The WEN JT3062 is a comparable 6-inch two-blade benchtop at a lower entry price, similar capacity with fewer refinements, a budget-first alternative.",
      'cutech-40160hb': "The Cutech 40160HB is a lighter 6-inch benchtop that ships with a spiral cutterhead as standard, trading Grizzly's slightly heavier build for better out-of-box cut quality."
    },
    'grizzly-g0946': {
      'grizzly-g0945': "The G0945 is the same benchtop with conventional straight knives instead of the spiral head, a cheaper option if you don't mind a bit more noise and tear-out.",
      'cutech-40160hb': "The Cutech 40160HB is another spiral-head 6-inch benchtop, lighter and often priced close, a reasonable cross-shop if you prefer Cutech's cutterhead.",
      'grizzly-g0947': "The G0947 steps up to an 8-inch spiral benchtop, giving you two more inches of width for wider stock at a higher price and heavier footprint."
    },
    'cutech-40160hb': {
      'grizzly-g0946': "The Grizzly G0946 is a similar 6-inch spiral-head benchtop with a slightly heavier build and Grizzly's parts support, a close alternative at a comparable price.",
      'wen-jt3062': "The WEN JT3062 is a lower-cost 6-inch benchtop with straight blades rather than a spiral head, cheaper up front but noisier with more tear-out in figured wood.",
      'grizzly-g0945': "The Grizzly G0945 is a straight-knife 6-inch benchtop at a budget price, an option if you want to save money and don't need the Cutech's spiral cutterhead."
    },
    'wen-jt3062': {
      'grizzly-g0945': "The Grizzly G0945 is a comparable straight-knife 6-inch benchtop with a slightly sturdier build and Grizzly support, a close alternative at a similar price.",
      'cutech-40160hb': "The Cutech 40160HB upgrades to a spiral cutterhead for quieter, cleaner cuts in figured stock, worth the premium if cut quality matters more than lowest price.",
      'grizzly-g0946': "The Grizzly G0946 is a 6-inch benchtop with a spiral-type cutterhead, a step up from the WEN's straight blades for better results in difficult grain."
    },
    'grizzly-g0947': {
      'wen-jt833h': "The WEN JT833H is another 8-inch spiral benchtop with an extendable table, a close competitor that adds infeed and outfeed length, often at a lower price.",
      'grizzly-g0986': "The G0986 steps up to a 10-inch spiral benchtop with a bit more power, giving you wider capacity if you routinely joint boards over 8 inches.",
      'grizzly-g0946': "The G0946 is the smaller 6-inch spiral benchtop in the same family, a cheaper, lighter choice if 8-inch capacity is more than you need."
    },
    'wen-jt833h': {
      'grizzly-g0947': "The Grizzly G0947 is a comparable 8-inch spiral benchtop with Grizzly's build and support, a close alternative that trades the WEN's extendable table for a slightly heavier casting.",
      'grizzly-g0986': "The Grizzly G0986 moves up to a 10-inch spiral benchtop with more power, the pick if you want maximum benchtop width.",
      'wen-jt3062': "The WEN JT3062 is the brand's smaller 6-inch straight-knife benchtop, a much cheaper entry point if you don't need 8-inch capacity or a spiral head."
    },
    'grizzly-g0986': {
      'grizzly-g0947': "The G0947 is the 8-inch spiral benchtop below it, lighter and cheaper if you don't need the G0986's extra width.",
      'wen-jt833h': "The WEN JT833H is an 8-inch spiral benchtop with an extendable table, a lower-cost alternative that gives up two inches of width.",
      'grizzly-g0958': "The G0958 is an 8-inch combo planer/jointer with a helical head, worth a look if you'd rather have both jointing and thickness planing in one machine than the widest benchtop jointer."
    },
    'grizzly-g0958': {
      'grizzly-g0959': "The G0959 is the larger 12-inch combo planer/jointer with the same helical cutterhead, the upgrade if you need to flatten and thickness wider stock.",
      'grizzly-g0986': "The G0986 is a dedicated 10-inch jointer rather than a combo, a better fit if you already own a planer and want maximum jointer width instead of a two-in-one.",
      'grizzly-g0947': "The G0947 is an 8-inch benchtop jointer only, cheaper and lighter but without the G0958's built-in thickness planer."
    },
    'grizzly-g0452z': {
      'grizzly-g0814': "The G0814 is Grizzly's 6-inch floor jointer with a slightly longer 48-inch bed and cabinet stand, but with straight knives rather than the G0452Z's spiral cutterhead.",
      'jet-jj-6csdx': "The JET JJ-6CSDX is a 6-inch closed-stand floor jointer with straight knives, a comparable full-size option that trades the spiral head for JET's fit and finish.",
      'grizzly-g0959': "The G0959 is a 12-inch combo planer/jointer, a different approach that adds thickness planing and more width if you can use a two-in-one machine."
    },
    'grizzly-g0814': {
      'grizzly-g0452z': "The G0452Z is a similar 6-inch floor jointer that comes with a spiral cutterhead, worth the premium over the G0814's straight knives for quieter, cleaner cuts.",
      'jet-jj-6csdx': "The JET JJ-6CSDX is a comparable 6-inch closed-stand jointer with straight knives and JET's finish, a close cross-shop at a somewhat higher price.",
      'powermatic-54hh': "The Powermatic 54HH is a 6-inch floor jointer with a helical cutterhead and premium build, a significant step up in cut quality and price."
    },
    'grizzly-g0959': {
      'grizzly-g0958': "The G0958 is the smaller 8-inch version of this combo planer/jointer, lighter and cheaper if 8-inch width covers your work.",
      'grizzly-g0452z': "The G0452Z is a dedicated 6-inch floor jointer, a better choice if you already have a planer and want a stand-alone jointer rather than a combo.",
      'grizzly-g0986': "The G0986 is a 10-inch benchtop jointer only, a smaller-footprint option if you don't need the G0959's built-in planer or 12-inch width."
    },
    'jet-jj-6csdx': {
      'grizzly-g0814': "The Grizzly G0814 is a comparable 6-inch floor jointer with a 48-inch bed and cabinet stand at a lower price, a value alternative with similar straight-knife performance.",
      'grizzly-g0452z': "The Grizzly G0452Z is a 6-inch floor jointer that includes a spiral cutterhead, the pick if you want quieter, cleaner cuts than the JET's straight knives.",
      'powermatic-54hh': "The Powermatic 54HH steps up to a helical cutterhead and premium build in the same 6-inch class, a higher-end option for better cut quality."
    },
    'grizzly-g0490x': {
      'grizzly-g0858': "The G0858 is Grizzly's other 8-inch parallelogram jointer at the same 3 HP but with a helical head and lighter build, a close, slightly cheaper sibling.",
      'grizzly-g0856': "The G0856 is an 8-inch helical jointer with a mobile base and dovetail ways, trading the G0490X's parallelogram beds for a simpler design at a lower price.",
      'grizzly-g0452z': "The G0452Z is a 6-inch spiral floor jointer, a smaller and much cheaper option if 8-inch capacity and parallelogram beds are more than you need."
    },
    'powermatic-54hh': {
      'jet-jj-6csdx': "The JET JJ-6CSDX is a 6-inch closed-stand jointer with straight knives, a lower-cost alternative that gives up the 54HH's helical cutterhead.",
      'grizzly-g0814': "The Grizzly G0814 is a 6-inch floor jointer with straight knives at a much lower price, a budget alternative if you don't need the Powermatic's helical head or finish.",
      'grizzly-g0858': "The Grizzly G0858 is an 8-inch parallelogram jointer with a helical head, stepping up to more width and a heavier build for a modest price increase."
    },
    'grizzly-g0856': {
      'grizzly-g0858': "The G0858 is an 8-inch parallelogram jointer with the same helical head and 3 HP, adding parallelogram bed adjustment over the G0856's dovetail ways.",
      'grizzly-g0490x': "The G0490X is an 8-inch parallelogram jointer with a spiral cutterhead and heavier build, a step up in adjustability and mass at a higher price.",
      'south-bend-sb1091': "The South Bend SB1091 is a professional-grade 8-inch parallelogram with a helical head, a substantially heavier, higher-end machine for demanding use."
    },
    'south-bend-sb1091': {
      'grizzly-g0858': "The Grizzly G0858 is a lighter-duty 8-inch parallelogram with the same helical cutterhead at a notably lower price, similar cut quality with less mass and a shorter warranty.",
      'powermatic-pj-882hh': "The Powermatic PJ-882HH is a comparable professional 8-inch parallelogram jointer with a helical head, a close cross-shop with Powermatic's fit, finish, and support.",
      'grizzly-g0834': "The Grizzly G0834 is a 12-inch helical jointer with far more power and width, the move if you routinely joint boards wider than 8 inches."
    },
    'powermatic-pj-882hh': {
      'south-bend-sb1091': "The South Bend SB1091 is a comparable professional 8-inch parallelogram jointer with a helical head at similar weight, a close alternative often priced below the Powermatic.",
      'grizzly-g0858': "The Grizzly G0858 is a lighter 8-inch parallelogram with the same helical cutterhead at a much lower price, a value option that gives up some mass and warranty.",
      'grizzly-g0834': "The Grizzly G0834 is a 12-inch helical jointer with 5 HP, a significant step up in width and power if 8 inches isn't enough."
    },
    'grizzly-g0834': {
      'grizzly-g9860zx': "The G9860ZX is Grizzly's other 12-inch jointer, using a spiral cutterhead and an even heavier build, a close in-house alternative at a similar tier.",
      'south-bend-sb1091': "The South Bend SB1091 is an 8-inch parallelogram jointer, a narrower but still professional-grade option if 12-inch capacity is more than you need.",
      'powermatic-pj-882hh': "The Powermatic PJ-882HH is an 8-inch parallelogram jointer with a helical head, a smaller-capacity premium alternative from Powermatic."
    },
    'grizzly-g9860zx': {
      'grizzly-g0834': "The G0834 is Grizzly's 12-inch helical jointer with more power at 5 HP, a close sibling that trades the G9860ZX's spiral head for a true helical cutterhead.",
      'south-bend-sb1091': "The South Bend SB1091 is an 8-inch parallelogram jointer, a narrower professional machine if you don't need full 12-inch width.",
      'powermatic-pj-882hh': "The Powermatic PJ-882HH is an 8-inch parallelogram helical jointer, a smaller-capacity premium alternative if 12 inches is more than your work requires."
    }
  };

  var sheet = _entriesSheet_();
  var lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var slugIdx = header.indexOf('machine_slug');
  if (slugIdx === -1) throw new Error('machine_slug column not found.');
  if (lastRow < 2) return;

  var numRows = lastRow - 1;
  var slugCol = sheet.getRange(2, slugIdx + 1, numRows, 1).getValues();
  var pairs = [['compare_1_slug', 'compare_1_note'], ['compare_2_slug', 'compare_2_note'], ['compare_3_slug', 'compare_3_note']];
  var count = 0;

  for (var p = 0; p < pairs.length; p++) {
    var sIdx = header.indexOf(pairs[p][0]);
    var nIdx = header.indexOf(pairs[p][1]);
    if (sIdx === -1 || nIdx === -1) throw new Error('Missing ' + pairs[p][0] + ' / ' + pairs[p][1]);
    var compCol = sheet.getRange(2, sIdx + 1, numRows, 1).getValues();
    var noteRange = sheet.getRange(2, nIdx + 1, numRows, 1);
    var noteVals = noteRange.getValues();
    var changed = false;
    for (var r = 0; r < numRows; r++) {
      var slug = String(slugCol[r][0]).trim();
      var comp = String(compCol[r][0]).trim();
      if (NOTES[slug] && comp && String(noteVals[r][0]).trim() === '' && NOTES[slug][comp]) {
        noteVals[r][0] = NOTES[slug][comp];
        changed = true;
        count++;
      }
    }
    if (changed) noteRange.setValues(noteVals);
  }

  SpreadsheetApp.getActiveSpreadsheet().toast('Wrote ' + count + ' compare notes.', 'MachFolio', 5);
}
