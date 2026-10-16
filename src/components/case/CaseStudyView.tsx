import Link from "next/link";
import type { CaseStudy } from "@/types/caseStudy";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { Reveal } from "@/components/Reveal";
import { Media, Container } from "./Media";
import { renderSection } from "./Sections";
import { ProjectNavPreview } from "./ProjectNavPreview";

/*
 * The palette lives in globals.css and nowhere else. This file used to
 * carry a luminance/contrast pair and an accent picker, because a case
 * study could declare a ground of its own and the wordmark had to be
 * re-measured against it. No page does now: the site has one light
 * ground and one dark one, and `CaseTheme` has been removed from the
 * model so a bespoke ground cannot be reintroduced by data alone.
 */

/**
 * Full case-study page: a powerful opening visual, a title/metadata band, the
 * art-directed section sequence, then quiet prev/next navigation.
 */
export function CaseStudyView({ study }: { study: CaseStudy }) {
  /*
   * Walk the listed projects only. An `unlisted` project keeps its route and
   * drops off the index (ProjectGrid already filters it out), but this bar
   * used to walk the raw array, so a page that existed only as a link from
   * another case study still turned up at the foot of its neighbour as "next
   * project". That is how kai, which is a chapter of the airtribe ai skills
   * page, appeared underneath it as the thing to read next.
   */
  // Only projects with a case-study route can be stepped to.
  const ordered = projects.filter((p) => !p.unlisted && p.slug in caseStudies);
  // An unlisted study is not in `ordered`; anchor it at the top of the list
  // rather than letting findIndex's -1 wrap into an arbitrary pair.
  const idx = Math.max(
    0,
    ordered.findIndex((p) => p.slug === study.slug),
  );
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];
  const { hero } = study;
  const launch = hero.mode === "launch";

  // Literal class names, so Tailwind's content scan can see them.
  const metaCols =
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
    }[Math.min(hero.meta.length, 5)] ?? "lg:grid-cols-4";

  return (
    <article>
      {/* Back to the index. Says "work" because that is what the nav and the
          footer call it; "index" was a third word for one place. */}
      <Container className="pt-4 md:pt-6">
        <Link
          href="/"
          className="inline-flex min-h-[24px] items-center label text-accent underline-offset-4 transition-colors hover:underline"
        >
          ← all work
        </Link>
      </Container>

      {/* Opening visual. Absent on the pages that open on their title. */}
      <div className={!hero.media ? "" : launch ? "mt-2 md:mt-4" : "mt-6 md:mt-8"}>
        {!hero.media ? null : launch ? (
          // No frame, no container, no gutter: the object gets the viewport
          // and stands on its own ground. A hairline box around a product is
          // a specimen case, and a specimen is not a launch.
          <div className="h-[70vh] w-full overflow-hidden md:h-screen">
            <Media
              asset={hero.media}
              fit="cover"
              position={hero.mediaPosition}
              className="h-full w-full"
            />
          </div>
        ) : hero.mediaFit === "contain" ? (
          <Container>
            <div
              className={`flex items-center justify-center ${
                hero.mediaFrame === false
                  ? "py-2 md:py-4"
                  : "border border-hairline py-12 md:py-20"
              }`}
            >
              <Media
                asset={hero.media}
                fit="contain"
                className="max-h-[74vh] w-auto max-w-full"
              />
            </div>
          </Container>
        ) : (
          <div className="h-[62vh] w-full overflow-hidden md:h-[82vh]">
            <Media
              asset={hero.media}
              fit="cover"
              position={hero.mediaPosition}
              className="h-full w-full"
            />
          </div>
        )}
      </div>

      {/* Title + metadata band */}
      <Container className="py-12 md:py-20">
        {hero.kicker && <p className="label mb-6">{hero.kicker}</p>}
        <h1 className="max-w-[18ch] t-display text-fg">{hero.title}</h1>
        <p className="mt-6 measure t-lead text-fg">{hero.subtitle}</p>

        {/*
          One row, always. Fixed at four columns, a five-item band wrapped its
          last entry onto a row of its own under a rule that stopped a quarter
          of the way across: it read as unfinished rather than composed. The
          wide column count is now the item count, so the band divides exactly
          however many facts a project has. (Also a <dl>: dt/dd inside a plain
          div is not a description list to anything reading the page.)
        */}
        <dl
          className={`mt-12 grid grid-cols-2 gap-px border-t border-hairline sm:grid-cols-3 md:mt-16 ${metaCols}`}
        >
          {hero.meta.map((m) => (
            <div key={m.label} className="border-b border-hairline py-5 pr-6">
              <dt className="label">{m.label}</dt>
              <dd className="mt-2 t-note font-medium text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>

        {hero.links && hero.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-6">
            {hero.links.map((l) => {
              // An internal href is a route on this site: send it through Link
              // so it picks up the basePath. A raw <a> would resolve against
              // the domain root and 404 on a project-path host.
              const external = l.href.startsWith("http");
              const className =
                "inline-flex min-h-[24px] items-center t-note text-accent underline-offset-4 hover:underline";
              return external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {l.label} ↗
                </a>
              ) : (
                <Link key={l.href} href={l.href} className={className}>
                  {l.label} →
                </Link>
              );
            })}
          </div>
        )}
      </Container>

      {/* Sections */}
      {study.sections.map((s, i) => renderSection(s, i))}

      {/* Prev / next — archive-style, with a static neighbour preview on hover */}
      <Reveal>
        <ProjectNavPreview prev={prev} next={next} />
      </Reveal>
    </article>
  );
}
