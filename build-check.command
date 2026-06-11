#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Homepage Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- Homepage output check ---"
  if [ -f public/index.html ]; then
    echo "category cards:  $(grep -c 'category-card\"' public/index.html)"
    echo "entry cards:     $(grep -c 'entry-card\"' public/index.html)"
    echo "home-title:      $(grep -c 'home-title' public/index.html)"
    grep -o '<title>[^<]*</title>' public/index.html | head -1
  else
    echo "WARNING: public/index.html not found."
  fi
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
