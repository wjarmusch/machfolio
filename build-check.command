#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Schema Migration QA Build (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- Priced entry: wen-ba3962 (expect from \$382.24 + button price) ---"
  grep -o 'from \$[0-9.]*' public/band-saws/wen-ba3962/index.html | head -1
  grep -o 'affiliate-btn-price">\$[0-9.]*' public/band-saws/wen-ba3962/index.html | head -1
  grep -o 'affiliate-btn-retailer">Buy at [A-Za-z]*' public/band-saws/wen-ba3962/index.html | head -1
  echo ""
  echo "--- Unpriced/flagged entry: shop-fox-w1706 (expect NO price) ---"
  echo "from \$ count: $(grep -c 'from \$' public/band-saws/shop-fox-w1706/index.html)  (expect 0)"
  echo "bare button \$ count: $(grep -c 'affiliate-btn-price' public/band-saws/shop-fox-w1706/index.html)  (expect 0)"
  echo ""
  echo "--- Category page card prices (sample) ---"
  grep -o 'from \$[0-9.]*' public/band-saws/index.html | head -8
  echo ""
  echo "--- Homepage card prices (sample) ---"
  grep -o 'from \$[0-9.]*' public/index.html | head -6
  echo ""
  echo "--- Comparison page From row (sample) ---"
  grep -o 'compare-label">From</td>' public/compare/band-saws/jet-jwbs-14sfx-vs-laguna-14bx/index.html 2>/dev/null | head -1
  echo "no stray current_price: $(grep -rl current_price public/ | wc -l | tr -d ' ')"
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
