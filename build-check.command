#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — GA4 Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  F=public/index.html
  echo "--- Homepage source checks ($F) ---"
  echo "GA4 gtag.js script:        $(grep -c 'googletagmanager.com/gtag/js?id=G-5S07MMMD2R' $F)  (expect 1)"
  echo "GA4 config call:           $(grep -c \"gtag('config', 'G-5S07MMMD2R')\" $F)  (expect 1)"
  echo "Outbound click tracking:   $(grep -c 'outbound_click' $F)  (expect 1)"
  echo "Impact UTT script intact:  $(grep -c 'utt.impactcdn.com' $F)  (expect 1)"
  echo "Verification meta tag:     $(grep -c 'impact-site-verification' $F)  (expect 1)"
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
