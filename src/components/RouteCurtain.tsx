"use client";

import { useEffect, useRef } from "react";

const PANELS = 6;
/*
 * Timings. Every click pays the cover sweep before the browser is even told to
 * load, so this is latency the visitor experiences as the site being slow.
 * 280ms + 5x25ms stagger put 405ms in front of each navigation, which on a
 * nine-project index is most of a minute of curtain for someone clicking
 * through the work. Trimmed to 305ms total: the sweep still reads as one
 * movement across the columns, and the page arrives before it feels owed.
 */
const STAGGER = 17;
const COVER = 220;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Page transition — the grid performs it.
 *
 * Six columns sweep down over the view, and the navigation happens underneath
 * them. The panels are the page's own background carrying a hairline on their
 * trailing edge, so what you watch is the grid's column rule travelling across
 * the content: the view is erased column by column and redrawn the same way.
 * No colour is introduced and the motion never reverses.
 *
 * It spans a document boundary. This site cannot route client-side — Next asks
 * for the RSC payload at the route URL behind an `RSC` header, a static host
 * cannot vary on a header, so it returns HTML and Next hard-navigates. Rather
 * than fight that, the transition is built for it: this component covers the
 * screen and *then* sets location, and the incoming document reveals itself
 * from a CSS animation (see globals.css) that needs no script to finish.
 *
 * Degradations are all in the safe direction. If this component never mounts,
 * the CSS still reveals the page and links navigate normally — just without
 * the cover half. Under reduced motion the panels start off-screen and no
 * click is ever intercepted.
 */
export function RouteCurtain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = Array.from(
      root.querySelectorAll<HTMLElement>(".route-curtain__panel"),
    );

    // Park the panels above the fold once the reveal has played, ready to come
    // back down. They are off-screen either way, so the jump is never seen.
    const park = () => {
      panels.forEach((p) => {
        p.style.animation = "none";
        p.style.transform = "translateY(-100%)";
      });
    };
    const last = panels[panels.length - 1];
    last?.addEventListener("animationend", park, { once: true });
    // A restored bfcache page has already finished its animation.
    const armed = window.setTimeout(park, 900);

    let leaving = false;

    // CAPTURE PHASE, deliberately. next/link calls preventDefault in its own
    // handler and starts a route change; a listener on the bubble phase arrives
    // afterwards, sees defaultPrevented and backs off, which is why the first
    // version of this measured 2ms between click and new document. Running
    // first, and stopping the event here, means Link never sees it.
    const onClick = (e: MouseEvent) => {
      if (leaving || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return; // external
      if (url.pathname === window.location.pathname) return; // same page / hash

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      leaving = true;

      const anims = panels.map((p, i) =>
        p.animate(
          [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
          {
            duration: COVER,
            delay: i * STAGGER,
            easing: EASE,
            fill: "forwards",
          },
        ),
      );
      const done = Promise.all(
        anims.map((a2) => a2.finished.catch(() => undefined)),
      );
      // Never strand the click if an animation is interrupted.
      const guard = new Promise((r) =>
        setTimeout(r, COVER + STAGGER * PANELS + 120),
      );
      Promise.race([done, guard]).then(() => {
        window.location.href = url.href;
      });
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(armed);
      last?.removeEventListener("animationend", park);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="route-curtain">
      {Array.from({ length: PANELS }).map((_, i) => (
        <div
          key={i}
          className="route-curtain__panel"
          style={{ animationDelay: `${i * STAGGER}ms` }}
        />
      ))}
    </div>
  );
}
