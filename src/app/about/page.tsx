import type { Metadata } from "next";
import { about, site } from "@/data/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "about",
  description: about.headline,
};

/** Section heading + hairline, repeated down the page. */
function Rule({ label }: { label: string }) {
  return (
    <h2 className="label mb-6 border-t border-hairline pt-4 md:mb-8">
      {label}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-shell px-6 md:px-10">
      <section className="border-b border-hairline pb-16 pt-4 md:pb-28 md:pt-6">
        <p className="label mb-6">about</p>
        <h1 className="max-w-4xl t-display text-fg">{about.headline}</h1>
        {/* The discipline, said once, under the line that does not say it. */}
        <p className="mt-6 measure t-body text-fg md:mt-8">
          {about.positioning}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-16 py-16 md:grid-cols-12 md:gap-10 md:py-28">
        <div className="md:col-span-7 md:col-start-1">
          <div className="measure space-y-5">
            {about.bio.map((para, i) => (
              <p key={i} className="t-body text-fg">
                {para}
              </p>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-12 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="label mb-4">elsewhere</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={asset(site.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[24px] items-center t-note text-accent underline-offset-4 hover:underline"
                >
                  résumé (pdf) ↗
                </a>
              </li>
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex min-h-[24px] items-center t-note text-accent underline-offset-4 hover:underline"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label mb-4">contact</h2>
            <p className="max-w-xs t-note text-muted">{about.contact}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex min-h-[24px] items-center t-note text-accent underline underline-offset-4"
            >
              hit me up
            </a>
          </div>
        </aside>
      </div>

      {/* The two registers the work runs in. */}
      <section className="pb-16 md:pb-28">
        <Rule label="office hours / after hours" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
          {about.hours.map((h) => (
            <div key={h.key}>
              <p className="label">{h.key}</p>
              <p className="mt-3 max-w-sm t-note text-fg">{h.note}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {h.axes.map((a) => (
                  <li key={a} className="t-note text-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-16 pb-16 md:grid-cols-12 md:gap-10 md:pb-20">
        <section className="md:col-span-4 md:col-start-1">
          <Rule label="service" />
          <ul className="flex flex-col gap-2">
            {about.service.map((s) => (
              <li key={s} className="t-note text-fg">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="md:col-span-7 md:col-start-6">
          <Rule label="experience" />
          <ul className="flex flex-col">
            {about.background.map((item) => (
              <li
                key={item.period}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-t border-hairline py-4 md:grid-cols-[8rem_1fr_auto]"
              >
                <span className="t-note text-fg md:order-1">{item.sector}</span>
                <span className="col-span-2 max-w-sm t-note text-muted md:order-2 md:col-span-1">
                  <span className="text-fg">{item.place}</span> &middot;{" "}
                  {item.role}
                </span>
                {/* mono only for the year column, where it is tabular data
                    that has to align down the list. */}
                <span className="label font-mono tabular-nums md:order-3">
                  {item.period}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Rule label="education" />
            <ul className="flex flex-col">
              {about.education.map((e) => (
                <li
                  key={e.place}
                  className="flex flex-col gap-1 border-t border-hairline py-4 md:flex-row md:justify-between"
                >
                  <span className="t-note text-fg">{e.place}</span>
                  <span className="t-note text-muted">{e.award}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="pb-16 md:pb-28">
        <Rule label="up my sleeve" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
          <ul className="flex flex-col gap-2">
            {about.skills.map((s) => (
              <li key={s} className="t-note text-fg">
                {s}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2">
            {about.tools.map((t) => (
              <li key={t} className="t-note text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 md:pb-28">
        <Rule label="where do i see myself" />
        <div className="flex flex-col gap-10 md:flex-row md:gap-20">
          {about.future.map((f) => (
            <div key={f.horizon}>
              <p className="t-lead text-fg">{f.horizon}</p>
              <p className="mt-2 max-w-sm t-note text-muted">{f.line}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
