# Quick Setup Instructions

Since npm is not available in the current environment, please run these commands manually:

```bash
cd /Users/wangzi/code/zi-w.github.io/human-ai
npm install
npm run build
```

Then commit and push:

```bash
cd /Users/wangzi/code/zi-w.github.io
git add human-ai/dist human-ai/.nojekyll human-ai/vite.config.ts .github/workflows
git commit -m "Deploy human-ai to /human-ai subdirectory"
git push origin master
```

Finally, update GitHub Pages settings:
1. Go to https://github.com/zi-w/zi-w.github.io/settings/pages
2. Change "Source" to "Deploy from a branch" → "master"
3. Wait 1-2 minutes for Jekyll to build
4. Visit https://ziw.mit.edu/ (main site) and https://ziw.mit.edu/human-ai/ (new app)
