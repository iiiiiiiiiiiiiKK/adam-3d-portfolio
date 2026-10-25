import localFont from "next/font/local";

/* Body/base font — Space Grotesk, bound to --font-sans (applied as `font-sans`
 * on <html>). Everything that isn't a heading inherits this.
 * Self-hosted from /public/fonts so the build never needs network access. */
export const spaceGroteskSans = localFont({
  src: [
    {
      path: "../../public/fonts/space-grotesk-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-latin-ext.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* Heading font — Unbounded, bound to --font-display and applied to h1–h6. */
export const unbounded = localFont({
  src: [
    {
      path: "../../public/fonts/unbounded-latin.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/unbounded-latin-ext.woff2",
      weight: "200 900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const fontClassNames = [spaceGroteskSans.variable, unbounded.variable, "font-sans"].join(" ");
