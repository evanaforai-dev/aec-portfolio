"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";

/**
 * Minimal footer. It carried a single "about" link, which meant that the
 * bottom of a case study — the place a reader actually finishes — offered no
 * way to reach the work, the résumé or an inbox without scrolling back up.
 * It now carries the four, still as plain type on one line, still lowercase,
 * still without a border or a button anywhere near it.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const onAbout = pathname === "/about";
  const onIndex = pathname === "/";

  const linkClass =
    "inline-flex min-h-[24px] items-center label text-accent transition-colors duration-300 ease-editorial hover:underline hover:underline-offset-4";

  return (
    <footer className="border-t border-hairline">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span className="label">
          © {year} {site.name}
        </span>

        <nav aria-label="footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/"
                className={linkClass}
                aria-current={onIndex ? "page" : undefined}
              >
                work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={linkClass}
                aria-current={onAbout ? "page" : undefined}
              >
                about
              </Link>
            </li>
            <li>
              <a
                href={asset(site.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                résumé
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
