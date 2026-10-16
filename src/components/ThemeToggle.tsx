"use client";

import { useTheme } from "./ThemeProvider";

/**
 * Dot-only mode toggle: a single filled circle, no text or icon.
 * It's painted with the current foreground color (black in light mode,
 * off-white in dark), so it always matches the site's text.
 */
export function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="toggle color theme"
      className="grid h-6 w-6 place-items-center text-fg"
    >
      {/* SVG circle: the global sharp-corner rule would square off a CSS dot. */}
      <svg width="11" height="11" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="5" fill="currentColor" />
      </svg>
    </button>
  );
}
