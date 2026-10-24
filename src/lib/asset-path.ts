/**
 * Prefix a `/public` asset path with the deployment base path.
 *
 * Next.js rewrites its own `_next/*` URLs when `basePath` is set, but plain
 * string literals like `/assets/keyboard/keycaps.glb` are not touched. Routing
 * every public asset through this helper keeps the site working both at a
 * domain root (`https://example.com`) and under a GitHub Pages *project* site
 * (`https://example.github.io/<repo>/`).
 *
 * The env var is inlined at build time, so this stays a pure constant in the
 * client bundle.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;

export const basePath = BASE_PATH;
