#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Impact Verification Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- impact-site-verification meta tag in homepage head ---"
  grep -o "<meta name=\"impact-site-verification\"[^>]*>" public/index.html
  echo ""
  echo "homepage occurrences: $(grep -c 'impact-site-verification' public/index.html)  (expect 1)"
  echo "entry page occurrences: $(grep -c 'impact-site-verification' public/band-saws/wen-ba3962/index.html)  (site-wide, expect 1)"
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
