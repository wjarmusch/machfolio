#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Commit & push code-review changes ==="
echo ""

# Remove a stale git lock left behind by a crashed process, if present.
if [ -f .git/index.lock ]; then
  echo "Removing stale .git/index.lock ..."
  rm -f .git/index.lock
fi

# Stage only the files from the code-review pass (leaves anything else untouched,
# including the locked archetypes/default.md and deploy-homepage.command).
git add \
  .gitignore hugo.toml content/_content.gotmpl \
  layouts/_default/baseof.html layouts/_default/section.html layouts/_default/single.html \
  layouts/guides/list.html layouts/guides/single.html layouts/index.html \
  layouts/partials/comparison-page.html layouts/partials/get-category-specs.html layouts/partials/get-entries.html \
  layouts/sitemap.xml static/robots.txt data/categories.yaml CODE-REVIEW.md

# Stop tracking OS/build cruft (idempotent)
git rm --cached -q --ignore-unmatch .DS_Store content/.DS_Store content/guides/.DS_Store hugo_stats.json

git commit -m "SEO + robustness pass from code review

- Add Open Graph/Twitter Card tags; centralize title+description in baseof
- Custom sitemap.xml with real priorities + lastmod (was priority 0 for all)
- Add robots.txt and RSS auto-discovery link
- Harden Google Sheet fetches with try/errorf; set getresource maxAge 10m
- Consolidate category->slug map into data/categories.yaml (was duplicated 6x)
- Remove dead current_price block; add rel=noopener to affiliate links
- Fix hardcoded 'saws' count label on non-saw category pages
- Untrack .DS_Store/hugo_stats.json; add CODE-REVIEW.md"

COMMIT_STATUS=$?
echo ""
if [ $COMMIT_STATUS -ne 0 ]; then
  echo "Commit did not complete — see message above. Nothing pushed."
  echo ""
  read -p "Press Enter to close..."
  exit 1
fi

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
git status --short
echo ""
read -p "Press Enter to close..."
