"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { registers } from "@/data/site";
import { ProjectCard } from "./ProjectCard";

/**
 * The index, in two registers.
 *
 * It used to be one undifferentiated field of nine tiles, ordered by how
 * interesting each one was and nothing else. A reader could not tell which of
 * them someone had paid for. Now it is two labelled bands — office hours, then
 * after hours — split on the `category` already carried by every project, so
 * the four pieces of client and company work are a complete first row and the
 * five self-initiated builds are a complete second one. Neither band ever
 * leaves a hole, because each is exactly as wide as it has projects.
 *
 * SCALE CARRIES THE HIERARCHY. Office hours runs four across and after hours
 * five, which makes the paid work physically larger on the page without
 * needing a badge, a border or a word to say so. The height each band gets is
 * proportional to its own column width, so both come out at the same aspect
 * ratio: two sizes of one thing, not two different things.
 *
 * FITS THE VIEWPORT ON A WIDE POINTER DEVICE. Both bands together are never
 * taller than the space between the masthead and the footer, so no project is
 * below the fold. When they cannot both fit at a readable size — a short
 * window, a tablet, a phone — the grid stops fitting and starts scrolling:
 * each band falls back to a column count taken from the width alone, and cells
 * take a square well instead of a solved height. Solving for a 375px viewport
 * produced nine 124x130px thumbnails with the titles clipped, which is the
 * whole index above the fold and none of it legible.
 *
 * Border technique (no doubled lines): each band draws its own top + left
 * frame; each cell draws only its right + bottom line, so the hairlines run
 * continuously across the band.
 *
 */

/*
 * Order within each band. Office hours leads with the internal operations
 * product, then the ai systems, then the service-design study, then the
 * financial products. Vision is first because it is the densest piece of
 * product work here and the one a platform team recognises as their own
 * problem: roles, permissions, views, state, and a migration run on live
 * money. Kochi1app sits ahead of wells fargo because it is the one that
 * shows the research: sixteen people tested, and a finding that disagreed
 * with the design. After hours is ordered by how much product thinking each
 * one carries, not by how pretty the tile is. Anything not listed still
 * renders, appended in data order, so adding a project to projects.ts is
 * enough to publish it.
 */
const LAYOUT: string[] = [
  "vision",
  "airtribe-ai-skills",
  "kochi1app",
  "wells-fargo",
  "lipi",
  "kochi-water-metro",
  "a-century-of-villains",
  "soundmap",
  "deep-cuts",
];

// `unlisted` projects keep their route and drop off the index.
const VISIBLE = projects.filter((p) => !p.unlisted);
const rank = (slug: string) => {
  const i = LAYOUT.indexOf(slug);
  return i === -1 ? LAYOUT.length : i;
};

const BANDS = registers
  .map((r) => ({
    ...r,
    items: VISIBLE.filter((p) => p.category === r.key).sort(
      (a, b) => rank(a.slug) - rank(b.slug),
    ),
  }))
  .filter((b) => b.items.length > 0);

/** Caption plate height (h-20) — fixed when fitted, so it is subtracted first. */
const CAPTION = 80;
/** The band's label row. Fixed when fitted, so the solve tells the truth. */
const LABEL = 30;
/** Below this the artwork is too small to be worth showing. */
const MIN_ART = 96;
/**
 * And below this the CAPTION is too small to be worth showing. Five columns in
 * a 768px tablet gave 153px cells, in which "a century of villains" took two
 * lines and pushed its own tag list out of the plate. A cell has to be wide
 * enough to say what it is.
 */
const MIN_CELL = 200;

/** The widest band decides whether the fitted layout is possible at all. */
const WIDEST = Math.max(...BANDS.map((b) => b.items.length));

export function ProjectGrid() {
  const frameRef = useRef<HTMLDivElement>(null);
  /** One column count per band. */
  const [cols, setCols] = useState<number[]>(() =>
    BANDS.map((b) => b.items.length),
  );
  /** One artwork height per band, or null when the page scrolls instead. */
  const [art, setArt] = useState<number[] | null>(null);

  const solve = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const w = rect.width;
    if (!w) return;

    /**
     * Narrow, or too short to fit both bands: scroll instead. Two columns is
     * the floor, not one — a 375px phone divided by a 220px ideal gives one,
     * and nine full-bleed tiles stacked is a page nobody reaches the end of.
     * Two keeps the index legible as an index, which is the thing it is.
     */
    const scroll = () => {
      const c = Math.max(2, Math.min(WIDEST, Math.floor(w / 220)));
      setCols(BANDS.map((b) => Math.min(c, b.items.length)));
      setArt(null);
    };

    if (w / WIDEST < MIN_CELL) return scroll();

    const footer = document.querySelector("footer");
    const footerH = footer?.getBoundingClientRect().height ?? 0;
    // Space from the top of the first band to the top of the footer.
    const avail = window.innerHeight - rect.top - footerH;

    // Each band is one row, as wide as it has projects.
    const widths = BANDS.map((b) => w / b.items.length);
    const total = widths.reduce((a, b) => a + b, 0);
    const forArt = avail - BANDS.length * (LABEL + CAPTION);
    if (forArt <= 0) return scroll();

    // Proportional to column width, so every band lands on the same aspect
    // ratio and the two sizes read as one system.
    const heights = widths.map((cw) => (forArt * cw) / total);
    if (heights.some((h) => h < MIN_ART)) return scroll();

    setCols(BANDS.map((b) => b.items.length));
    setArt(heights);
  }, []);

  useLayoutEffect(() => {
    solve();
    window.addEventListener("resize", solve);
    return () => window.removeEventListener("resize", solve);
  }, [solve]);

  const fitted = art !== null;

  return (
    <div ref={frameRef}>
      {BANDS.map((band, b) => {
        const c = cols[b] ?? band.items.length;
        const n = band.items.length;
        const rows = Math.ceil(n / c);
        /*
         * A band is always a complete rectangle. When the column count does
         * not divide the band — four office-hours projects in the three
         * columns a tablet allows — the last cell takes the remainder rather
         * than leaving a notch out of the bottom-right corner. Its well is a
         * square per column it occupies, so the row stays exactly as tall as
         * every other row and the piece simply gets a wider crop. The fitted
         * layout never reaches this: there, a band is one row as wide as it
         * has projects.
         */
        const span = c * rows - n + 1;
        const template = {
          gridTemplateColumns: `repeat(${c}, minmax(0,1fr))`,
          ...(fitted
            ? { gridTemplateRows: `repeat(${rows}, minmax(0,1fr))` }
            : null),
        } as const;
        const height = fitted ? (art[b] + CAPTION) * rows : undefined;

        return (
          <section key={band.key} aria-labelledby={`register-${band.key}`}>
            {/* The label row. Kept to LABEL px when fitted so the solve above
                is telling the truth about how much height is left. */}
            <div
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 pb-3 pt-5 md:px-8"
              style={
                fitted
                  ? { height: LABEL, paddingTop: 4, paddingBottom: 6 }
                  : undefined
              }
            >
              <h2 id={`register-${band.key}`} className="label text-accent">
                {band.label}
              </h2>
              <p className="label t-dim">{band.note}</p>
            </div>

            <div className="relative" style={height ? { height } : undefined}>
              <div
                className={`grid border-l border-t border-hairline ${fitted ? "h-full" : ""}`}
                style={template}
              >
                {band.items.map((project, j) => {
                  const last = j === n - 1;
                  return (
                    <div
                      key={project.slug}
                      className="relative min-h-0 border-b border-r border-hairline"
                      style={
                        last && span > 1
                          ? { gridColumn: `span ${span}` }
                          : undefined
                      }
                    >
                      <ProjectCard
                        project={project}
                        fitted={fitted}
                        span={last ? span : 1}
                      />
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}
