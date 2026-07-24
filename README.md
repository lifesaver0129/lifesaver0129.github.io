# lifesaver0129.github.io

Personal site for Yuxing Hu built with React + TypeScript and Vite.

## Develop

Use Node 18+ (Vite requirement).

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

Static assets live in `public/`, React code in `src/`. The published site keeps the existing `CNAME` for the custom domain.

The interactive New Zealand itinerary is a Vite entry at `/newzealand/`, sourced from `newzealand/index.html`.

## Deploy to GitHub Pages (`gh-pages` branch)

This workflow keeps build artifacts out of `master` while serving from `gh-pages`:

```bash
npm run deploy:gh
```

The script builds, checks out a `gh-pages` worktree, copies `dist/` (including `CNAME`), commits, and pushes `gh-pages`. In the repo settings, set GitHub Pages to serve from the `gh-pages` branch (root).
