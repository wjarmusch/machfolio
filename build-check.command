#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Footer Fix Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- Footer text (should be short 'Independent reference' line) ---"
  echo "homepage:    $(grep -o 'Independent reference[^<]*' public/index.html | head -1)"
  echo "entry page:  $(grep -o 'Independent reference[^<]*' public/band-saws/wen-ba3962/index.html | head -1)"
  echo ""
  echo "--- Old footer sentence should NOT appear in footer (count of full sentence on entry page) ---"
  echo "entry page full-sourcing occurrences: $(grep -c 'Specs sourced from manufacturer documentation' public/band-saws/wen-ba3962/index.html)  (expect 1 = the entry note only)"
  echo "homepage full-sourcing occurrences:   $(grep -c 'Specs sourced from manufacturer documentation' public/index.html)  (expect 0)"
  echo ""
  echo "--- Entry sourcing note still present? ---"
  echo "sourcing-note class on entry page: $(grep -c 'class=\"sourcing-note\"' public/band-saws/wen-ba3962/index.html)"
  echo "sourcing-note on a comparison page: $(grep -c 'class=\"sourcing-note\"' public/compare/band-saws/jet-jwbs-14dxpro-vs-laguna-1412/index.html)"
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
