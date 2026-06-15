#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Impact UTT Script Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- Impact UTT script in homepage head ---"
  echo "impactcdn script occurrences (homepage): $(grep -c 'utt.impactcdn.com' public/index.html)  (expect 1)"
  echo "impactStat calls present (homepage):      $(grep -c 'impactStat' public/index.html)"
  echo ""
  echo "--- Snippet as rendered ---"
  grep -o "<script type=\"text/javascript\">(function(i,m,p,a,c,t).\{0,80\}" public/index.html | head -1
  echo ""
  echo "verification meta tag still present (homepage): $(grep -c 'impact-site-verification' public/index.html)"
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
