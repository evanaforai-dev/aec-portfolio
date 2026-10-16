import Link from "next/link";
import type { Section } from "@/types/caseStudy";
import { Reveal } from "@/components/Reveal";
import { Media, Container } from "./Media";
import { asset as assetUrl } from "@/lib/asset";
import { Glyph } from "./Glyph";
import { DeviceFrame } from "./DeviceFrame";

/** Vertical rhythm wrapper for in-flow (contained) sections. */
function Band({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <section className={`py-16 md:py-28 ${className}`}>{children}</section>
    </Reveal>
  );
}

function heightClass(h?: "auto" | "tall" | "screen") {
  if (h === "screen") return "h-[86vh]";
  if (h === "tall") return "h-[70vh] md:h-[86vh]";
  return "";
}

export function renderSection(section: Section, i: number) {
  switch (section.kind) {
    /* TURN — first direction, what happened, what replaced it. */
    case "turn": {
      const rows: [string, string][] = [
        ["first direction", section.tried],
        ["what happened", section.result],
        ["what changed", section.change],
      ];
      return (
        <Band key={i}>
          <Container>
            <h2 className="label mb-10">{section.label ?? "the turn"}</h2>
            <div className="border-t border-hairline">
              {rows.map(([label, text]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-3 border-b border-hairline py-7 md:grid-cols-12 md:gap-10"
                >
                  <p className="label md:col-span-3">{label}</p>
                  <p className="measure t-body text-fg md:col-span-9">{text}</p>
                </div>
              ))}
            </div>
          </Container>
        </Band>
      );
    }

    /*
     * PROTOTYPE — the running build, embedded. Deliberately the loudest thing
     * on a side-project page: the frame is the tallest element the layout can
     * hold, and the copy around it is kept to one line in and one line out.
     * "open full screen" is always offered, because an iframe is a compromise
     * and some of these were drawn for a whole screen.
     */
    case "prototype": {
      const phone = section.frame === "phone";
      const url = assetUrl(section.src);
      return (
        <Band key={i}>
          <Container>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <h2 className="label">{section.label ?? "try it"}</h2>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[24px] items-center label text-accent underline underline-offset-4 transition-colors"
              >
                open full screen
              </a>
            </div>
            {section.hint && (
              <p className="mb-8 measure t-body text-fg">{section.hint}</p>
            )}
            {phone ? (
              /*
               * Handset builds run inside a device shell rather than a bare
               * rectangle: a phone ui in an unframed box reads as a broken
               * desktop page, and the bezel tells a reader what they are
               * looking at before they touch it. DeviceFrame also gives the
               * build the viewport it was drawn for and scales it to the
               * shell, which is what stops it overflowing and panning.
               */
              <DeviceFrame src={url} title={section.title} allow={section.allow} />
            ) : (
              <div className="w-full">
                <div
                  /*
                   * The wide frame used to be 72vh tall at every width, so on
                   * a 375px screen a desktop tool was rendered into a 327x648
                   * box: a landscape ui in a phone-shaped hole. It now keeps a
                   * landscape aspect until there is room for the tall frame,
                   * and "open full screen" above carries the rest.
                   */
                  className="aspect-[16/10] w-full overflow-hidden border border-hairline md:aspect-auto md:h-[84vh]"
                >
                  <iframe
                    src={url}
                    title={section.title}
                    loading="lazy"
                    allow={section.allow}
                    className="block h-full w-full border-0"
                  />
                </div>
              </div>
            )}
            {section.caption && (
              <figcaption className="label mt-4">{section.caption}</figcaption>
            )}
          </Container>
        </Band>
      );
    }

    /* PIPELINE — the system end to end, with the rules that govern each stage. */
    case "pipeline":
      return (
        <Band key={i}>
          <Container>
            <h2 className="label mb-12">{section.label ?? "how it works"}</h2>
            {/* Scrolls sideways on a phone rather than stacking: the point of
                this section is that it reads as one connected run. */}
            <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
              <ol
                className="grid auto-cols-fr grid-flow-col border-t border-hairline"
                style={{
                  gridTemplateColumns: `repeat(${section.steps.length}, minmax(0,1fr))`,
                  /* sized to the diagram, so a four-step run fits where a
                     seven-step one still scrolls. */
                  minWidth: `${section.steps.length * 7.5}rem`,
                }}
              >
                {section.steps.map((st, j) => (
                  <li
                    key={j}
                    className="relative border-b border-hairline px-4 pb-6 pt-8 first:pl-0 last:pr-0 md:px-5"
                  >
                    {/* the connector: a hairline run behind the glyphs */}
                    {j < section.steps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-[3.15rem] hidden h-px w-full bg-hairline md:block"
                      />
                    )}
                    <Glyph
                      name={st.glyph}
                      className="relative mb-7 h-10 w-10 text-fg"
                    />
                    <p className="label">{st.label}</p>
                    <p className="mt-2 t-note text-fg">{st.text}</p>
                    {st.note && (
                      <p className="mt-4 border-l border-hairline pl-3 font-mono text-xs leading-relaxed text-fg t-dim">
                        {st.note}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            {/* The run scrolls sideways on a phone by design, but a strip that
                ends flush at the viewport edge looks like a crop, not a rail.
                One line says which it is. */}
            <p className="label mt-3 t-dim md:hidden">scroll the run →</p>
            {section.caption && (
              <p className="label mt-6 measure">{section.caption}</p>
            )}
          </Container>
        </Band>
      );

    /* ANNOTATED — one artifact, with its decisions called out beside it. */
    case "annotated":
      return (
        <Band key={i}>
          <Container>
            <h2 className="label mb-10">{section.label ?? "in detail"}</h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-7">
                <div
                  className={
                    section.frame
                      ? "flex items-center justify-center border border-hairline p-6 md:p-10"
                      : "flex items-center justify-center"
                  }
                >
                  <Media
                    asset={section.media}
                    fit={section.fit ?? "contain"}
                    position={section.position}
                    /* a tall artifact (a phone render) would otherwise run far
                       past the callouts and strand them in white space. */
                    className="max-h-[78vh] w-auto max-w-full"
                  />
                </div>
              </div>
              {/* the callouts track the artifact rather than scrolling away from it */}
              <ol className="border-t border-hairline md:col-span-5 md:sticky md:top-28 md:self-start">
                {section.items.map((it, j) => (
                  <li key={j} className="border-b border-hairline py-5">
                    <div className="flex gap-4">
                      <span className="label shrink-0 tabular-nums t-dim">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="t-note font-medium text-fg">{it.title}</p>
                        {it.text && (
                          <p className="mt-2 t-note text-fg t-dim">{it.text}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Band>
      );

    /* SYSTEM — the spec board, kept as data rather than a flattened image. */
    case "system":
      return (
        <Band key={i}>
          <Container>
            <h2 className="label mb-10">{section.label ?? "system"}</h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
              <div className="space-y-5 md:col-span-5">
                {section.paragraphs?.map((t, j) => (
                  <p key={j} className="measure-narrow t-body text-fg">
                    {t}
                  </p>
                ))}
                {section.mapping && (
                  <dl className="border-t border-hairline pt-4 font-mono text-xs">
                    {section.mapping.map((m) => (
                      <div key={m.from} className="flex gap-3 py-1.5">
                        <dt className="w-24 shrink-0 text-fg t-dim">
                          {m.from}
                        </dt>
                        <dd className="text-fg">→ {m.to}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {section.note && (
                  <p className="font-mono text-xs leading-relaxed text-fg t-dim">
                    {section.note}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-7">
                {section.colors && (
                  <div>
                    <p className="label border-b border-hairline pb-3">
                      colour
                    </p>
                    <ul>
                      {section.colors.map((c) => (
                        <li
                          key={c.hex}
                          className="flex items-center gap-3 border-b border-hairline py-2.5"
                        >
                          <span
                            aria-hidden
                            className="h-6 w-6 shrink-0 border border-hairline"
                            style={{ background: `#${c.hex.replace("#", "")}` }}
                          />
                          <span className="font-mono text-xs tabular-nums text-fg t-dim">
                            {c.hex.replace("#", "").toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-fg">
                            {c.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="space-y-8">
                  {section.type && (
                    <div>
                      <p className="label border-b border-hairline pb-3">
                        type
                      </p>
                      <ul>
                        {section.type.map((t) => (
                          <li
                            key={t.name}
                            className="flex justify-between gap-4 border-b border-hairline py-2.5 font-mono text-xs"
                          >
                            <span className="text-fg t-dim">{t.name}</span>
                            <span className="text-right text-fg">
                              {t.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {section.metrics && (
                    <div>
                      <p className="label border-b border-hairline pb-3">
                        measure
                      </p>
                      <ul>
                        {section.metrics.map((m) => (
                          <li
                            key={m.label}
                            className="flex justify-between gap-4 border-b border-hairline py-2.5 font-mono text-xs"
                          >
                            <span className="text-fg t-dim">{m.label}</span>
                            <span className="tabular-nums text-fg">
                              {m.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Band>
      );

    /* THESIS — large editorial statement. */
    case "thesis":
      return (
        <Band key={i}>
          <Container>
            {section.eyebrow && (
              <h2 className="label mb-6">{section.eyebrow}</h2>
            )}
            <p className="measure t-lead text-fg">{section.text}</p>
          </Container>
        </Band>
      );

    /* CONTEXT — quiet label rail + reading column. */
    case "context":
      return (
        <Band key={i}>
          <Container>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
              <p className="label md:col-span-3">
                {section.label ?? "context"}
              </p>
              <div className="measure space-y-5 md:col-span-9">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="t-body text-fg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Band>
      );

    /* QUESTION — the central design question, made prominent. */
    case "question":
      return (
        <Band key={i}>
          <Container>
            <div className="border-t border-hairline pt-8">
              <h2 className="label mb-8">the question</h2>
              <p className="measure t-lead text-fg">{section.text}</p>
            </div>
          </Container>
        </Band>
      );

    /*
     * CONSTRAINTS — honest grid of limits.
     *
     * The rules ARE the layout here, so both ways a rule can misbehave are
     * handled rather than left to chance.
     *
     * Gutter: a cell in column two or three sits against its own left rule,
     * so it is padded off it. Column one is not, because its text has to stay
     * flush with every other left edge on the page. The column index is
     * computed per breakpoint from the item's position rather than written as
     * an nth-child variant, so the two column counts cannot disagree.
     *
     * Closing rule: a ragged final row used to leave the bottom rule stopping
     * under the last item, and a column rule hanging in empty space. Empty
     * cells now complete the row. They are per-breakpoint because the column
     * count is; `display:none` removes the inapplicable set from the grid
     * entirely, so only one set ever occupies a cell.
     */
    case "constraints": {
      const n = section.items.length;
      const smFill = (2 - (n % 2)) % 2;
      const lgFill = (3 - (n % 3)) % 3;
      return (
        <Band key={i}>
          <Container>
            <h2 className="label mb-10">{section.label ?? "constraints"}</h2>
            <div className="grid grid-cols-1 border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((it, j) => (
                <div
                  key={j}
                  className={[
                    "border-b border-hairline py-7 pr-8",
                    j % 2 === 1 ? "sm:pl-8" : "sm:pl-0",
                    j % 3 === 0 ? "lg:pl-0" : "lg:pl-8",
                    j % 3 === 2 ? "lg:border-r-0" : "lg:border-r",
                  ].join(" ")}
                >
                  <p className="mb-2 t-note font-medium text-fg">{it.label}</p>
                  <p className="t-note text-muted">{it.text}</p>
                </div>
              ))}
              {Array.from({ length: smFill }, (_, j) => (
                <div
                  key={`sm-${j}`}
                  aria-hidden
                  className="hidden border-b border-hairline sm:block lg:hidden"
                />
              ))}
              {Array.from({ length: lgFill }, (_, j) => (
                <div
                  key={`lg-${j}`}
                  aria-hidden
                  className={`hidden border-b border-hairline lg:block ${
                    (n % 3) + j === 2 ? "" : "lg:border-r"
                  }`}
                />
              ))}
            </div>
          </Container>
        </Band>
      );
    }

    /* DECISIONS — the core: decision / why / tradeoff / result, with media. */
    case "decisions":
      return (
        <Reveal key={i}>
          <section className="py-16 md:py-28">
            <Container>
              <h2 className="label mb-12 md:mb-16">
                {section.label ?? "key decisions"}
              </h2>
              <div className="flex flex-col gap-20 md:gap-32">
                {section.items.map((d, j) => (
                  <div key={j}>
                    {d.media && (
                      <div className="mb-8 aspect-[16/10] w-full overflow-hidden border border-hairline md:mb-10">
                        <Media
                          asset={d.media}
                          fit={d.fit ?? "cover"}
                          className="h-full w-full"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-5">
                        {d.n && (
                          <span className="label font-mono tabular-nums">
                            {d.n}
                          </span>
                        )}
                        <h3 className="mt-2 t-head text-fg">{d.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:col-span-7">
                        {d.why && <MicroField label="why" text={d.why} />}
                        {d.tradeoff && (
                          <MicroField label="tradeoff" text={d.tradeoff} />
                        )}
                        {d.result && (
                          <MicroField label="result" text={d.result} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </Reveal>
      );

    /* FULL — full-bleed media moment. */
    case "full":
      return (
        <Reveal key={i}>
          <figure className="my-4 md:my-8">
            {section.fit === "contain" ? (
              <Container>
                <div
                  className={`flex items-center justify-center ${
                    section.frame ? "border border-hairline" : ""
                  } ${heightClass(section.height) || "py-10 md:py-16"}`}
                >
                  <Media
                    asset={section.media}
                    fit="contain"
                    position={section.position}
                    className="max-h-[80vh] w-auto max-w-full"
                  />
                </div>
              </Container>
            ) : heightClass(section.height) ? (
              <div
                className={`w-full overflow-hidden ${heightClass(section.height)}`}
              >
                <Media
                  asset={section.media}
                  fit="cover"
                  position={section.position}
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                {/* auto height: media keeps its natural aspect at full width */}
                <Media
                  asset={section.media}
                  fit="cover"
                  position={section.position}
                  className="block w-full"
                />
              </div>
            )}
            {section.caption && (
              <Container>
                <figcaption className="label mt-4">
                  {section.caption}
                </figcaption>
              </Container>
            )}
          </figure>
        </Reveal>
      );

    /* FIGURES — 2/3 up related objects. */
    case "figures":
      return (
        <Reveal key={i}>
          <figure className="my-4 md:my-8">
            <Container>
              {section.label && <h2 className="label mb-6">{section.label}</h2>}
              <div
                className={`grid grid-cols-1 items-start gap-4 md:gap-6 ${
                  section.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}
              >
                {section.media.map((m, j) =>
                  section.frame === false ? (
                    // Cut-out artwork: no box, no forced aspect. The image
                    // keeps its own proportions and stands on the page.
                    <Media
                      key={j}
                      asset={m}
                      fit="contain"
                      className="h-auto w-full"
                    />
                  ) : (
                    <div
                      key={j}
                      className={`w-full overflow-hidden border border-hairline ${
                        section.aspect === "phone"
                          ? "aspect-[9/16]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <Media
                        asset={m}
                        fit={section.fit ?? "cover"}
                        className="h-full w-full"
                      />
                    </div>
                  ),
                )}
              </div>
              {section.caption && (
                <figcaption className="label mt-4">
                  {section.caption}
                </figcaption>
              )}
            </Container>
          </figure>
        </Reveal>
      );

    /* DETAIL — asymmetric media + annotation. */
    case "detail":
      return (
        <Band key={i}>
          <Container>
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
              <div
                className={`md:col-span-7 ${
                  section.side === "right" ? "md:order-2" : ""
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden border border-hairline">
                  <Media
                    asset={section.media}
                    fit={section.fit ?? "cover"}
                    position={section.position}
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div
                className={`md:col-span-5 ${
                  section.side === "right" ? "md:order-1" : ""
                }`}
              >
                {section.title && (
                  <h2 className="t-head text-fg">{section.title}</h2>
                )}
                {section.text && (
                  <p className="mt-4 measure-narrow t-body text-muted">
                    {section.text}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </Band>
      );

    /* FLOW — the real process/system as connected steps. */
    case "flow":
      return (
        <Band key={i}>
          <Container>
            {section.label && <h2 className="label mb-10">{section.label}</h2>}
            <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-stretch">
              {section.steps.map((s, j) => (
                <div key={j} className="flex flex-1 flex-col md:flex-row">
                  <div className="flex-1 border border-hairline p-5 md:p-6">
                    <span className="label font-mono tabular-nums">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 t-note font-medium text-fg">{s.label}</p>
                    {s.note && (
                      <p className="mt-2 t-note text-muted">{s.note}</p>
                    )}
                  </div>
                  {j < section.steps.length - 1 && (
                    <div
                      className="flex items-center justify-center text-muted"
                      aria-hidden
                    >
                      <span className="px-3 py-2 md:py-0">
                        <span className="hidden md:inline">→</span>
                        <span className="md:hidden">↓</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {section.caption && <p className="label mt-6">{section.caption}</p>}
          </Container>
        </Band>
      );

    /* STATEMENT — a quiet full-width editorial line. */
    case "statement":
      return (
        <Band key={i}>
          <Container>
            <p className="measure t-lead text-fg">{section.text}</p>
          </Container>
        </Band>
      );

    /* OUTCOME — honest status + learning. */
    case "outcome":
      return (
        <Band key={i}>
          <Container>
            <div className="grid grid-cols-1 gap-8 border-t border-hairline pt-8 md:grid-cols-12 md:gap-10">
              <h2 className="label md:col-span-3">
                {section.label ?? "outcome"}
              </h2>
              <div className="measure space-y-5 md:col-span-9">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="t-body text-fg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Band>
      );

    /*
     * DEEPER — the closing invitation, set as the quietest band on the page.
     * It borrows outcome's label rail so it reads as the last row of the
     * record rather than a call to action bolted onto the end, and its links
     * are the same understated underline the hero band uses. An internal href
     * goes through next/link so it picks up the basePath; a raw anchor would
     * resolve against the domain root and 404 on a project-path host.
     */
    case "deeper":
      return (
        <Band key={i}>
          <Container>
            <div className="grid grid-cols-1 gap-8 border-t border-hairline pt-8 md:grid-cols-12 md:gap-10">
              <p className="label md:col-span-3">
                {section.label ?? "want the full story?"}
              </p>
              <div className="measure md:col-span-9">
                <div className="space-y-5">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="t-body text-fg">
                      {p}
                    </p>
                  ))}
                </div>
                {section.links && section.links.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-6">
                    {section.links.map((l) => {
                      /*
                       * Anything carrying a scheme leaves the site, mailto
                       * included: routing a mailto through next/link would
                       * hand the router a url it cannot navigate to, and the
                       * arrow would promise a page that does not exist. Only
                       * a mail client gets a new tab, because a compose
                       * window replacing the portfolio is a dead end.
                       */
                      const mail = l.href.startsWith("mailto:");
                      const external = mail || /^https?:/.test(l.href);
                      const cls =
                        "inline-flex min-h-[24px] items-center t-note text-accent underline-offset-4 hover:underline";
                      return external ? (
                        <a
                          key={l.href}
                          href={l.href}
                          target={mail ? undefined : "_blank"}
                          rel="noreferrer"
                          className={cls}
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link key={l.href} href={l.href} className={cls}>
                          {l.label} →
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Band>
      );

    /* REFLECTION — a genuine, short changed-thinking insight. */
    case "reflection":
      return (
        <Band key={i}>
          <Container>
            <div className="measure">
              <h2 className="label mb-6">reflection</h2>
              <p className="t-lead text-fg">{section.text}</p>
            </div>
          </Container>
        </Band>
      );

    /* ── launch register ─────────────────────────────────────────────── */

    case "credits":
      return (
        <Reveal key={i}>
          <Container className="py-16 md:py-28">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <h2 className="label mb-6">{section.label ?? "about"}</h2>
                <div className="space-y-5">
                  {section.paragraphs.map((t, j) => (
                    <p key={j} className="t-body measure">
                      {t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <p className="label mb-6">
                  {section.creditsLabel ?? "credits"}
                </p>
                <dl className="space-y-4">
                  {section.credits.map((c, j) => (
                    <div key={j} className="grid grid-cols-2 gap-4">
                      <dt className="t-body t-dim">{c.role}</dt>
                      <dd className="t-body">{c.name}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Container>
        </Reveal>
      );

    case "bleed":
      return (
        <Reveal key={i}>
          <figure className="relative w-full">
            <Media
              asset={section.media}
              fit="cover"
              className="h-auto w-full"
            />
            {section.overlay && (
              <div
                className={
                  section.overlay.placement === "below"
                    ? "px-6 pb-10 pt-8 md:px-10 md:pb-16 md:pt-10"
                    : `pointer-events-none absolute inset-x-0 px-6 py-10 md:px-10 md:py-16 ${
                        section.overlay.anchor === "bottom"
                          ? "bottom-0"
                          : "top-0"
                      }`
                }
              >
                <div
                  className={
                    section.overlay.placement === "below"
                      ? "measure"
                      : "max-w-md"
                  }
                >
                  {section.overlay.label && (
                    <p className="t-head mb-4">{section.overlay.label}</p>
                  )}
                  {section.overlay.paragraphs?.map((t, j) => (
                    <p key={j} className="t-body mb-3">
                      {t}
                    </p>
                  ))}
                  {section.overlay.lines && (
                    <div className="mt-6 space-y-1">
                      {section.overlay.lines.map((l, j) => (
                        <p key={j} className="t-body">
                          {l}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {section.overlay.columns && (
                  <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
                    {section.overlay.columns.map((c, j) => (
                      <div key={j}>
                        <p className="label">{c.label}</p>
                        {c.text && <p className="label mt-1 t-dim">{c.text}</p>}
                        {c.note && (
                          /* was opacity-40: 11px mono at ~2.6:1 on the
                             launch ground, the only outright AA failure on
                             the site. 60% clears it and still recedes. */
                          <p className="label mt-3 t-dim">{c.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {section.caption && (
              <figcaption className="label px-6 py-4 md:px-10">
                {section.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      );

    case "duo":
      return (
        <Reveal key={i}>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {section.media.map((m, j) => (
                <Media
                  key={j}
                  asset={m}
                  fit="cover"
                  className="h-auto w-full"
                />
              ))}
            </div>
            {section.captions && (
              <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2 md:gap-10 md:px-10">
                {section.captions.map((c, j) => (
                  <div key={j}>
                    {c.label && <p className="label mb-2">{c.label}</p>}
                    {c.text && <p className="t-body max-w-sm">{c.text}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      );

    case "panel": {
      /*
       * Inverts the page ground for the length of the panel, so a chapter
       * break reads as a breath rather than another section.
       *
       * The inversion is the site's own two colours, read off the live
       * tokens, so it follows light and dark mode. It used to be a literal
       * #f4f4f4 on #0a0a0a, which was written when every launch page carried
       * its own dark theme: with those gone, a #f4f4f4 panel on the #fafafa
       * page was a grey block a reader could barely see, and in dark mode it
       * was a hardcoded pair that ignored the theme entirely.
       */
      const inv = section.invert !== false;
      return (
        <Reveal key={i}>
          <section
            className="w-full py-16 md:py-28"
            style={
              inv
                ? { backgroundColor: "var(--fg)", color: "var(--bg)" }
                : undefined
            }
          >
            <Container>
              <h2 className="measure mb-8 t-lead md:mb-10">{section.label}</h2>
              <div className="measure space-y-5">
                {section.paragraphs.map((t, j) => (
                  <p
                    key={j}
                    className={
                      section.emphasise?.includes(j)
                        ? "t-body font-medium"
                        : "t-body"
                    }
                  >
                    {t}
                  </p>
                ))}
              </div>
            </Container>
          </section>
        </Reveal>
      );
    }

    default:
      return null;
  }
}

function MicroField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="label mb-2">{label}</p>
      <p className="t-note text-fg">{text}</p>
    </div>
  );
}
