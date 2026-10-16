"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { railHTML } from "./rail";
import { mountMiniBall } from "./miniBall";
import "./case-shell.css";

const colsFor = (w: number) => (w < 650 ? 2 : w < 850 ? 3 : w < 1200 ? 4 : 5);

/**
 * The frame every case study sits in.
 *  - Left: the rail of three portraits. The project's own section closes the
 *    case back onto its tile; the other section goes back to the grid at that
 *    section; about opens the about sheet.
 *  - Right: a strip of grid with the small red ball, which carries the
 *    contact links.
 * Every way out leaves a note for the home grid (which tile, which section),
 * so the grid can open split on the tile and close, mirroring the way in.
 */
export function CaseShell({
  slug,
  section,
  links,
  wheel,
  children,
}: {
  slug: string;
  section: "pro" | "itch";
  links: [string, string][];
  wheel: [string, string, string][];
  children: React.ReactNode;
}) {
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    const home = asset("/");
    let to: string | null = null;
    const note = () => {
      try {
        sessionStorage.setItem("homeReturn", JSON.stringify({ slug, to }));
      } catch {
        /* storage unavailable */
      }
    };
    const back = (dest: string | null = null) => {
      to = dest;
      if (dest === "about") {
        note();
        location.href = `${home}#about`;
        return;
      }
      let fromHome = false;
      try {
        const r = new URL(document.referrer);
        fromHome = r.origin === location.origin && r.pathname.replace(/\/?$/, "/") === home.replace(/\/?$/, "/");
      } catch {
        /* no referrer */
      }
      note();
      if (fromHome && history.length > 1) history.back();
      else location.href = home;
    };

    const onRail = (e: Event) => {
      const b = (e.target as Element).closest<HTMLElement>(".rail-tile");
      if (!b) return back(null); // the grid below the portraits
      const dest = b.dataset.to ?? null;
      back(dest === section ? null : dest);
    };
    const onStrip = () => back(null);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") back(null);
    };
    // Strips carry the home grid's row lines at the home grid's row height.
    const size = () =>
      document.documentElement.style.setProperty("--cell", `${window.innerWidth / colsFor(window.innerWidth)}px`);
    size();
    const r = rail.current;
    const strip = document.querySelector(".case-strip.r");
    const end = document.querySelector("[data-back]");
    end?.addEventListener("click", onStrip);
    r?.addEventListener("click", onRail);
    strip?.addEventListener("click", onStrip);
    window.addEventListener("pagehide", note);
    window.addEventListener("keydown", key);
    window.addEventListener("resize", size);
    const unball = mountMiniBall(wheel);
    return () => {
      r?.removeEventListener("click", onRail);
      strip?.removeEventListener("click", onStrip);
      end?.removeEventListener("click", onStrip);
      window.removeEventListener("pagehide", note);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", size);
      unball();
    };
  }, [slug, section, wheel]);

  return (
    <div className="case-shell">
      <nav
        ref={rail}
        className="case-rail"
        aria-label="sections"
        dangerouslySetInnerHTML={{ __html: railHTML(section) }}
      />
      <div className="case-strip r" aria-hidden="true" />
      {children}
      <nav className="case-end" aria-label="more">
        <button type="button" data-back>
          back to all work
        </button>
        {links.map(([t, h]) => (
          <a key={t} href={h} {...(/^https?:|\.pdf$/.test(h) ? { target: "_blank", rel: "noreferrer" } : {})}>
            {t}
          </a>
        ))}
      </nav>
    </div>
  );
}
