"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Minimal persistent nav: wordmark (links home) on the left; "about" and the
 * dot mode-toggle on the right.
 *
 * There is no "work" link. The index IS the work, and the wordmark already
 * goes there, so the slot spent a permanent line of the chrome offering a
 * second door to a room the signature next to it already opens. The wordmark
 * carries aria-current on the index so the state is still announced.
 */
export function Nav() {
  const pathname = usePathname();
  const onAbout = pathname === "/about";
  const onIndex = pathname === "/";

  const items: { label: string; href: string; current: boolean }[] = [
    { label: "about", href: "/about", current: onAbout },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-8">
        <Link
          href="/"
          aria-current={onIndex ? "page" : undefined}
          className="inline-flex min-h-[24px] items-center t-note font-medium tracking-tight text-fg"
          aria-label={`${site.name}, home`}
        >
          {/* Leading Latin "e" replaced by the Malayalam letter ഇ, in electric
              magenta. Optically balanced against the Latin lowercase (size,
              weight, baseline, spacing) via .wordmark-initial so the two scripts
              read as one typographic signature. */}
          <span className="wordmark-initial">ഇ</span>
          {site.wordmark.replace(/^e/, "")}
        </Link>

        <nav aria-label="primary" className="flex items-center gap-5 md:gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={`inline-flex min-h-[24px] items-center t-note text-accent transition-colors duration-300 ease-editorial hover:underline hover:underline-offset-4 ${
                item.current ? "t-dim" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
