#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Homepage Build + Deploy ==="
echo ""
echo "[1/3] Running clean Hugo build..."
hugo --ignoreCache
BUILD_STATUS=$?
echo ""

if [ $BUILD_STATUS -ne 0 ]; then
  echo "BUILD FAILED — exit code $BUILD_STATUS. Not pushing. See errors above."
  echo ""
  read -p "Press Enter to close..."
  exit 1
fi

echo "BUILD PASSED — 0 errors."
echo ""
echo "[2/3] Committing changes..."
git add .
git commit -m "update Impact site verification meta tag value (3)"
echo ""
echo "[3/3] Pushing to GitHub..."
git push
PUSH_STATUS=$?
echo ""

if [ $PUSH_STATUS -eq 0 ]; then
  echo "=== DONE — pushed. Cloudflare Pages will build at machfolio.pages.dev ==="
else
  echo "PUSH FAILED — exit code $PUSH_STATUS. See message above."
fi
echo ""
read -p "Press Enter to close..."
