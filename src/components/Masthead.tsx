import { masthead, site } from "@/data/site";
import { asset } from "@/lib/asset";

/**
 * HOME MASTHEAD — the first ten seconds.
 *
 * The index below this is nine designed objects, and on its own it says
 * nothing about who made them or what they are for. Someone arriving from a
 * cold link had to infer "product designer" from nine thumbnails, or read it
 * off the browser tab. This band says it, once, and then gets out of the way.
 *
 * It is set as a masthead, not a hero: no full screen, no centred block, no
 * scroll cue, no portrait. One rule of type across the page and a rail of
 * facts against it, which is the same move the case studies make with their
 * title and metadata band.
 *
 * HEIGHT IS THE CONSTRAINT, NOT SPACE. The index measures itself against
 * whatever is left under this, and the index is the point of the page — every
 * pixel here is a pixel off a project's artwork. The rail is therefore set
 * with its labels INLINE rather than stacked above their values: three tight
 * rows instead of two blocks and a list. That is about forty pixels, which is
 * the difference between both bands fitting a laptop viewport and not.
 */

/** label / value on one line, right-aligned on wide screens. */
function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 lg:justify-end">
      <dt className="label shrink-0 t-dim">{label}</dt>
      <dd className="t-note text-fg">{children}</dd>
    </div>
  );
}

export function Masthead() {
  const elsewhere = [
    { label: "résumé", href: asset(site.resumeUrl) },
    ...site.social,
  ];

  return (
    <header className="border-b border-hairline px-6 pb-5 pt-1 md:px-8 md:pb-6 md:pt-2">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          {/*
           * The visible name is the wordmark in the nav, one line above this.
           * Repeating it at display size would be a second signature on the
           * same page, so it is carried here for the document outline and for
           * anything reading the page rather than looking at it.
           *
           * text-balance so the statement splits evenly instead of leaving
           * "a" alone at the end of a line.
           */}
          <h1 className="text-balance t-lead text-fg">
            <span className="sr-only">{site.name}. </span>
            <span className="text-accent">{masthead.lede}</span>{" "}
            <span>{masthead.statement}</span>
          </h1>
        </div>

        {/*
         * Contact sits in this rail rather than in the grid. It briefly had a
         * tenth cell of its own, which existed only to stop nine projects
         * leaving a hole in a rectangle; splitting the index into two complete
         * bands removed the hole and with it the reason for the cell. The
         * footer still carries the same links for anyone who reads to the end.
         */}
        <dl className="flex flex-col gap-1.5 lg:col-span-5 lg:col-start-8 lg:gap-1 lg:text-right">
          <Fact label="worked at">{masthead.places.join(" · ")}</Fact>
          <Fact label="trained at">{masthead.credential}</Fact>
          <Fact label="elsewhere">
            <ul className="flex flex-wrap gap-x-4 gap-y-0.5 lg:justify-end">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex min-h-[24px] items-center text-accent underline-offset-4 hover:underline"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Fact>
        </dl>
      </div>
    </header>
  );
}
