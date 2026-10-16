# Design Portfolio

An editorial, museum-catalog portfolio. Sharp corners, hairline borders, no
shadows or gradients. Built to scale: **adding a project is one data entry.**

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** — palette driven by CSS variables so light/dark is a straight inversion
- **Lenis** — site-wide smooth scroll
- **Framer Motion** — page transitions, the expanding menu, subtle reveals
- **Inter** + **JetBrains Mono** via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    page.tsx              Home — intro + Work grid
    playground/page.tsx   Playground grid
    about/page.tsx        Bio, background, tools, résumé, contact
    work/[slug]/page.tsx  One case-study template, reused for every project
    layout.tsx            Fonts, theme, smooth scroll, nav, footer
    template.tsx          Page-transition fade
  components/
    Nav.tsx               Persistent bar + full-screen expanding menu
    ProjectCard.tsx       The ONE card, used by both grids
    ProjectGrid.tsx       Uniform 3/2/1 column gallery grid
    ThemeProvider.tsx     Light/dark, system-aware, persisted
    SmoothScroll.tsx      Lenis
    blocks/               Case-study content blocks + renderer
  data/
    projects.ts           ← ALL projects live here
    site.ts               Identity, nav, About copy
  types/project.ts        The single shared data shape
public/
  covers/  case/          Placeholder SVGs — swap for real assets
```

## Adding a project

Append one entry to `src/data/projects.ts`. Set `category` to `"work"` or
`"playground"` — that alone decides which grid it appears in. The case study is
assembled from `caseStudyBlocks`:

```ts
{
  slug: "my-project",
  title: "My Project",
  tags: ["Mobile App", "UX Research", "2025"],
  category: "work",
  cover: "/covers/mine.svg",
  year: "2025",
  summary: "One-sentence summary.",
  role: "Lead Designer",      // optional meta
  client: "Acme",             // optional meta
  duration: "6 months",       // optional meta
  caseStudyBlocks: [
    { type: "text", heading: "Overview", body: "First para.\nSecond para." },
    { type: "image", src: "/case/a.svg", alt: "…", caption: "…" },
    { type: "imagePair", images: [{ src: "…", alt: "…" }, { src: "…", alt: "…" }] },
    { type: "fullWidthImage", src: "/case/b.svg", alt: "…" },
    { type: "quote", quote: "…", attribution: "…" },
  ],
}
```

No layout, routing, or component code needs to change. To add a new *kind* of
content block, extend the `CaseStudyBlock` union in `src/types/project.ts` and
add a case to `src/components/blocks/BlockRenderer.tsx`.

## Theme

Light `#FAFAFA / #111111`, dark `#0A0A0A / off-white`, gray hairline borders in
both. Respects system preference on first load; manual toggle in the nav is
persisted to `localStorage`.
