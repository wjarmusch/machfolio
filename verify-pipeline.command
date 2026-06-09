#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Verify Pipeline ==="
echo ""
git add .
git commit -m "verify pipeline"
git push
echo ""
echo "Pushed. Watch Cloudflare Pages for the new build."
echo ""
read -p "Press Enter to close..."
