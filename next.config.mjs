/**
 * Static export for GitHub Pages.
 *
 * Pages serves the site from /<repo>/, so every asset and route needs that
 * prefix. NEXT_PUBLIC_BASE_PATH is set by the deploy workflow; locally it is
 * empty, so `npm run dev` still serves from the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  // Emit every route as a directory with an index.html, which is what a plain
  // static host can resolve without rewrite rules.
  trailingSlash: true,
  // No image optimizer exists on a static host.
  images: { unoptimized: true },
};

export default nextConfig;
