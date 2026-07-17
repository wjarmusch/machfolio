#!/bin/bash
#
# MachFolio — refresh the committed local data snapshot from the Google Sheet.
#
# This is the "publish step 1". Run it whenever you have edited the sheet and
# want those changes to go live:
#
#   1. ./sync-data.command      (this script — pulls the sheet into assets/data/)
#   2. git diff --stat          (review what content changed)
#   3. git add assets/data && git commit -m "content: ..." && git push
#
# Builds read ONLY these local files, so nothing goes live until you commit.
# Double-click in Finder, or run from Terminal.

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")" || exit 1

SHEET="1rP3yuVYIA0NjGi7QDYF-it4TxI6BWr4El8GeyTS-FM4"

echo "=== MachFolio — sync sheet -> assets/data ==="
echo ""

mkdir -p assets/data

# fetch <gid> <output-path> <label>
fetch() {
  local gid="$1" out="$2" label="$3" tmp url
  url="https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${gid}"
  tmp="$(mktemp)"

  echo "Fetching ${label} ..."
  if ! curl -fsSL "$url" -o "$tmp"; then
    echo "  ERROR: download failed for ${label}. Nothing changed."
    rm -f "$tmp"
    exit 1
  fi

  # Guard: a login redirect or error returns HTML, not CSV. The real export
  # always starts with the machine_slug header. Refuse to overwrite otherwise.
  if ! head -1 "$tmp" | grep -q "machine_slug"; then
    echo "  ERROR: ${label} did not look like the expected CSV."
    echo "         (Is the sheet still shared 'anyone with the link can view'?)"
    echo "         First line received:"
    head -1 "$tmp" | sed 's/^/           /'
    rm -f "$tmp"
    exit 1
  fi

  mv "$tmp" "$out"
  local rows
  rows=$(( $(wc -l < "$out") - 1 ))
  echo "  wrote ${out}  (${rows} data rows)"
}

fetch 0          assets/data/entries.csv        "entries"
fetch 1247799387 assets/data/category_specs.csv "category_specs"

echo ""
echo "Done. Review with:  git diff --stat"
echo "Then commit assets/data and push to deploy."
echo ""
read -p "Press Enter to close..."
