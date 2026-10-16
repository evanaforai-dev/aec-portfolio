"use client";

import { useEffect, useRef } from "react";
import { mountHome } from "./engine";
import type { home } from "@/data/home";
import "./home.css";
import "../case/case-shell.css";

type HomeConfig = typeof home;

/**
 * The home page: one empty element that the grid engine fills and drives.
 * See engine.js for why this is plain DOM rather than React.
 *
 * The noscript list keeps every project reachable (and readable by crawlers)
 * when the engine never runs.
 */
export function HomeGrid({ config }: { config: HomeConfig }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return mountHome(root, config);
  }, [config]);

  return (
    <>
      <h1 className="sr-only">{config.me[0]}, {config.me[1]}</h1>
      <div ref={ref} className="home" />
      <noscript>
        <ul>
          {[...config.work, ...config.serious, ...config.side]
            .filter((d) => d && d.href)
            .map((d) => (
              <li key={d.t}>
                <a href={d.href}>{d.t}</a>
              </li>
            ))}
        </ul>
      </noscript>
    </>
  );
}
