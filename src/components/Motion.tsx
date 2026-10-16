"use client";

import { MotionConfig } from "framer-motion";

/**
 * One reduced-motion setting for every framer animation on the site.
 *
 * globals.css flattens CSS transitions under
 * `@media (prefers-reduced-motion: reduce)`, and each hand-written effect (the
 * route curtain, the magnetic pull, the cursor-reactive grid, smooth scroll)
 * checks the query itself. framer is the exception: it animates from
 * JavaScript and ignores the preference unless told, so every scroll reveal
 * kept sliding — thirty of them down a case study — for a visitor who had
 * asked the system for less movement.
 *
 * `reducedMotion="user"` is framer's own answer: transform and layout
 * animations are skipped for those visitors and opacity is left alone, so the
 * page still resolves rather than snapping, and nothing travels. Set once here
 * rather than guarded per component, because a component that forgets is a
 * component that fails silently.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
