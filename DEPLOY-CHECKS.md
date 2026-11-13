# Deployment verification notes

## CI checks

GitHub Pages runs the following checks before publishing:

- `pnpm typecheck`
- `pnpm lint` (warnings are reported but do not fail the build)
- `pnpm audit:content` — verifies bilingual slugs, frontmatter, MDX image paths and CNAME
- `pnpm build`
- `pnpm audit:export` — verifies sitemap URLs, key bilingual pages and CNAME in `out/`

The deployment target is the apex custom domain `https://321.market`. The repository does not guarantee project-site deployment under `/<repo>/`; public asset URLs are rooted at `/assets/`.
