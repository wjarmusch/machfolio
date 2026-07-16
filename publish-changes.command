#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Publish changes (commit + push) ==="
echo ""

# Clear a stale git lock left by any crashed process.
if [ -f .git/index.lock ]; then
  echo "Removing stale .git/index.lock ..."
  rm -f .git/index.lock
fi

# Show what will be included.
echo "Pending changes:"
git status --short -- . ':(exclude)archetypes/default.md' ':(exclude)deploy-homepage.command'
echo ""

read -p "Commit message: " MSG
if [ -z "$MSG" ]; then
  MSG="update site content"
fi

# Stage everything EXCEPT the two files that error with 'resource deadlock'.
# (Exclude them so a repo-wide add never chokes on them.)
git add -A -- . ':(exclude)archetypes/default.md' ':(exclude)deploy-homepage.command'

git commit -m "$MSG"
if [ $? -ne 0 ]; then
  echo ""
  echo "Commit did not complete — see message above. Nothing pushed."
  echo ""
  read -p "Press Enter to close..."
  exit 1
fi

echo ""
echo "Commit created:"
git log --oneline -1
echo ""
echo "Pushing..."
git push
echo ""
if [ $? -eq 0 ]; then
  echo "Pushed. Watch Cloudflare Pages for the new build."
else
  echo "Push failed — see message above."
fi
echo ""
read -p "Press Enter to close..."
