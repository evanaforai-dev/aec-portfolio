/**
 * Prefixes a public-folder path with the deploy base path.
 *
 * next/link and next/font handle basePath themselves, but raw <img> and
 * <video> tags do not, and all of our media paths live as plain strings in
 * src/data. Every one of those render sites goes through here.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string;
export function asset(path: string | undefined): string | undefined;
export function asset(path?: string) {
  if (!path) return path;
  // Leave absolute URLs and data URIs alone.
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
