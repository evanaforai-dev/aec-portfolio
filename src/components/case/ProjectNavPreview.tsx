"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/project";
import { Container } from "./Media";
import { asset } from "@/lib/asset";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A static thumbnail for a neighbour — never the animated frame. */
function previewSrc(p: Project) {
  return p.display?.animated ? (p.display.poster ?? p.cover) : p.cover;
}

function Thumb({ project }: { project: Project }) {
  const contain = project.display?.fit === "contain";
  return (
    <div className="h-20 w-20 overflow-hidden border border-hairline bg-bg md:h-24 md:w-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(previewSrc(project))}
        alt=""
        aria-hidden
        style={{ objectPosition: project.display?.position }}
        className={`h-full w-full ${contain ? "object-contain p-2" : "object-cover"}`}
      />
    </div>
  );
}

/**
 * Archive-style previous / next navigation. Keeps the existing structure and
 * links; on hover (or keyboard focus) a small static thumbnail of the
 * neighbouring project slides out from the direction of travel, like pulling
 * the next index card slightly out of a drawer. The preview is absolutely
 * positioned above the bar, so it never shifts the layout or covers the case
 * study content. Disabled under reduced motion; on touch there is simply no
 * hover and the plain links remain.
 */
export function ProjectNavPreview({
  prev,
  next,
}: {
  prev: Project;
  next: Project;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<null | "prev" | "next">(null);

  const show = (which: "prev" | "next") => !reduceMotion && setActive(which);
  const clear = () => setActive(null);

  return (
    <nav className="mt-24 border-t border-hairline">
      <Container>
        <div className="relative grid grid-cols-2">
          {/* Floating previews, anchored just above the bar. */}
          <AnimatePresence>
            {active === "prev" && (
              <motion.div
                key="prev-preview"
                aria-hidden
                className="pointer-events-none absolute bottom-full left-0 mb-6"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Thumb project={prev} />
              </motion.div>
            )}
            {active === "next" && (
              <motion.div
                key="next-preview"
                aria-hidden
                className="pointer-events-none absolute bottom-full right-0 mb-6"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Thumb project={next} />
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href={`/work/${prev.slug}`}
            onMouseEnter={() => show("prev")}
            onMouseLeave={clear}
            onFocus={() => show("prev")}
            onBlur={clear}
            className="group flex flex-col gap-2 border-r border-hairline py-10 pr-6 md:py-16"
          >
            <span className="label">← previous</span>
            <span className="t-head text-fg transition-colors group-hover:text-muted">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            onMouseEnter={() => show("next")}
            onMouseLeave={clear}
            onFocus={() => show("next")}
            onBlur={clear}
            className="group flex flex-col items-end gap-2 py-10 pl-6 text-right md:py-16"
          >
            <span className="label">next →</span>
            <span className="t-head text-fg transition-colors group-hover:text-muted">
              {next.title}
            </span>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
