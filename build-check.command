#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Comparison Build Check (no push) ==="
echo ""
hugo --ignoreCache
BUILD_STATUS=$?
echo ""
if [ $BUILD_STATUS -eq 0 ]; then
  echo "BUILD PASSED — 0 errors."
  echo ""
  echo "--- Comparison pages generated ---"
  find public/compare -name "index.html" 2>/dev/null | sed 's#public/##; s#/index.html##'
  echo ""
  echo "comparison page count: $(find public/compare -name index.html 2>/dev/null | wc -l | tr -d ' ')"
  echo ""
  echo "--- Reverse-duplicate check (should be empty) ---"
  for p in $(find public/compare -name index.html 2>/dev/null | sed 's#.*/compare/[^/]*/##; s#/index.html##'); do
    a=$(echo "$p" | sed 's/-vs-.*//'); b=$(echo "$p" | sed 's/.*-vs-//')
    if find public/compare -path "*${b}-vs-${a}/index.html" 2>/dev/null | grep -q .; then
      echo "DUPLICATE: $b-vs-$a exists alongside $p"
    fi
  done
  echo "(no DUPLICATE lines above = dedup OK)"
  echo ""
  echo "--- Regular entry page still builds? ---"
  if [ -f public/band-saws/rikon-10-305/index.html ]; then
    echo "rikon-10-305 entry: OK ($(grep -c 'entry-layout' public/band-saws/rikon-10-305/index.html) entry-layout block)"
  else
    echo "WARNING: rikon-10-305 entry page missing."
  fi
else
  echo "BUILD FAILED — exit code $BUILD_STATUS. See errors above."
fi
echo ""
read -p "Press Enter to close..."
