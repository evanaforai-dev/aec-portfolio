"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/types/project";
import { asset } from "@/lib/asset";

/**
 * A project rendered as an object placed inside its grid cell (the cell and its
 * hairline borders belong to ProjectGrid). No card, border, shadow, or rounded
 * corners.
 *
 * Structure: the image well takes whatever height the grid gives the cell,
 * then a caption plate beneath it carrying the name and the full tag list,
 * both always readable.
 *
 * Two variants, one component. `fitted` is the pointer-device grid, where the
 * cell's height is solved for and the caption plate is a fixed 80px the solver
 * has already subtracted. Unfitted is the phone, where the page scrolls: the
 * well takes a square of its own and the caption plate grows to whatever the
 * title needs. The title is never clipped in either — a project whose name
 * reads "airtribe ai s..." is a project nobody clicks.
 *
 * The hover zoom lives on the <img> rather than on the same wrapper, because
 * two transforms on one element would overwrite each other.
 *
 * CORNER MARKS — four small solid squares set inside the image well's corners,
 * invisible at rest and appearing under the pointer. Registration marks rather
 * than a frame: they note where the cell is without drawing one.
 */
/*
 * A scrolling cell's well is a square per column it occupies, so a cell that
 * spans the remainder of a row is the same HEIGHT as its neighbours and simply
 * wider. Literal class names, for Tailwind's content scan.
 */
const WELL: Record<number, string> = {
  1: "aspect-square",
  2: "aspect-[2/1]",
  3: "aspect-[3/1]",
  4: "aspect-[4/1]",
  5: "aspect-[5/1]",
};

export function ProjectCard({
  project,
  fitted = true,
  span = 1,
}: {
  project: Project;
  /** True when the grid has solved a height for this cell (pointer devices). */
  fitted?: boolean;
  /** Columns this cell occupies, when it absorbs a row's remainder. */
  span?: number;
}) {
  const reduceMotion = useReducedMotion();
  const fit = project.display?.fit ?? "cover";
  const pad = project.display?.pad ?? "";
  const objectClass = fit === "contain" ? "object-contain" : "object-cover";
  const label = `${project.title}, ${project.tags.join(", ")}`;
  const position = project.display?.position;

  const animated = project.display?.animated ?? false;
  const poster = project.display?.poster ?? project.cover;
  const [live, setLive] = useState(false);
  const baseSrc = animated ? poster : project.cover;

  const rootRef = useRef<HTMLAnchorElement>(null);


  // Invisible until the pointer arrives, then a small solid square. Size is
  // constant so only opacity animates and the square stays crisp instead of
  // easing through fractional pixels.
  const corner =
    "pointer-events-none absolute z-10 h-1.5 w-1.5 bg-white mix-blend-difference opacity-0 transition-opacity duration-300 ease-editorial group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <Link
      ref={rootRef}
      href={`/work/${project.slug}`}
      aria-label={label}
      onPointerEnter={() => animated && !reduceMotion && setLive(true)}
      onPointerLeave={() => setLive(false)}
      className="group relative flex h-full w-full flex-col"
    >
      {/* image well — the artwork leans toward the pointer inside it */}
      <div
        className={`relative overflow-hidden ${
          fitted ? "min-h-0 flex-1" : `w-full ${WELL[span] ?? "aspect-square"}`
        }`}
      >
        {/* corner marks — set inside the well, noted under the pointer */}
        <span aria-hidden className={`${corner} left-2.5 top-2.5`} />
        <span aria-hidden className={`${corner} right-2.5 top-2.5`} />
        <span aria-hidden className={`${corner} bottom-2.5 left-2.5`} />
        <span aria-hidden className={`${corner} bottom-2.5 right-2.5`} />

        <div className={`h-full w-full ${pad}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(baseSrc)}
            alt={project.title}
            loading="lazy"
            style={{ objectPosition: position }}
            className={`h-full w-full transition-transform duration-500 ease-editorial motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 ${objectClass}`}
          />

          {animated && live && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset(project.cover)}
              alt=""
              aria-hidden
              style={{ objectPosition: position }}
              className={`absolute inset-0 h-full w-full ${objectClass}`}
            />
          )}
        </div>
      </div>

      {/* caption plate — name then the full tag list, always visible. */}
      <div
        className={`flex shrink-0 flex-col justify-center gap-1 border-t border-hairline ${
          fitted ? "h-20 px-4 md:px-5" : "px-4 py-4"
        }`}
      >
        <span className="t-note font-medium leading-snug text-accent">
          {project.title}
        </span>
        {/* Two lines is all the fitted plate has room for. The scrolling
            plate is not height-constrained, so the tag list finishes rather
            than trailing off mid-word. */}
        <span
          className={`label leading-4 text-fg t-dim ${
            fitted ? "line-clamp-2" : ""
          }`}
        >
          {project.tags.join(" / ")}
        </span>
      </div>
    </Link>
  );
}
