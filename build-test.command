#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== Hugo Build Test ==="
echo ""
hugo 2>&1
if [ $? -eq 0 ]; then
  echo ""
  echo "BUILD PASSED — no errors."
  echo "Starting hugo server on http://localhost:1313 ..."
  echo "(Press Ctrl+C to stop)"
  echo ""
  hugo server
else
  echo ""
  echo "BUILD FAILED — see errors above."
fi
