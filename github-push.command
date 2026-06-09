#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd ~/Documents/machfolio

echo "=== MachFolio — Create GitHub Repo & Push ==="
echo ""

# Stage all files and make initial commit
git add .
git commit -m "initial commit" 2>/dev/null || echo "(nothing new to commit)"

# Create repo and push
echo "Creating GitHub repo and pushing..."
gh repo create machfolio --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
  echo ""
  echo "=== Done! ==="
  gh repo view --web 2>/dev/null
else
  echo ""
  echo "ERROR — see message above."
fi

echo ""
read -p "Press Enter to close..."
