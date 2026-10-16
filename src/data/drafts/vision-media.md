# vision · media brief

> **Status, 21 sep 2026.** The two "before" sheets are done and live:
> `/case/vision/sheet-sales.jpg` and `/case/vision/sheet-onboarding.png`, both
> redacted from the real screenshots. The method is in `scrub` notes in
> caseStudies.ts: squeeze along X and stretch back, which destroys every glyph
> while leaving row edges and fill colours intact. Not a blur — a blur is
> reversible enough to be a bad idea on this data, and the originals are
> readable at 4x upscale. The onboarding sheet keeps its header row at full
> resolution on purpose; column names are not personal data and they are the
> argument.
>
> Still missing, and still the reason this case has no product imagery: a
> scrubbed capture of vision itself. The hero, table, templates and filters
> slots below are unfilled, and the sections that pointed at them have been
> rewritten to stand without a picture rather than to hold a placeholder.

The NDA allows the interface and forbids the data. That decision only holds if
the scrub is complete and consistent, so this file is the method, not a
suggestion.

## The one rule that makes synthetic data work

**The same cast appears in every screenshot.** Faked data reads as faked when
row 3 is "Priya Nair" in the table shot and "Test User 4" in the filter shot,
or when a total does not match the rows above it. Seed the cast once, capture
everything in one sitting, and let the numbers add up. Use the CSV next to this
file (`vision-synthetic-cast.csv`) — paste it into a staging record, a sheet, or
the Figma table, whichever is cheapest.

Disclose it **once**, in the outcome section (already drafted). A caption on
every image saying "data is synthetic" makes the whole case read defensively.

## Scrub checklist

Cell values are the obvious part. These are the ones that survive a careless
pass:

- **Browser chrome** — URL bar, tab titles, bookmarks, extension icons, the
  profile avatar. Capture the viewport only, or use a clean window.
- **Your own account** — the logged-in user's name, avatar and initials in the
  top bar, and any "assigned to you" badge.
- **Counts and totals** — "showing 1–50 of 3,428", revenue sums, pipeline
  totals. Row counts leak business volume even when every row is fake. Pick a
  count that matches the rows you are showing.
- **Phone numbers** — do not invent these. A plausible number belongs to
  somebody. Mask the middle: `+91 98••• ••42`.
- **Emails** — fictional domains under the reserved `.example` TLD, which can
  never be registered by anyone: `priya.nair@brightfold.example`. Invented
  `.com` domains are often real.
- **Transaction identifiers** — UTR numbers, gateway references, invoice
  sequences. Invented but consistently formatted; never a real one.
- **Real company names and logos** in an employer or client column.
- **Environment banners, feature flags, internal tooling links**, Slack handles,
  ticket IDs, and anything in a tooltip or a hover card that you did not think
  to close.
- **Dates that pin a real deal.** Shift the whole cast by a fixed offset so the
  relative spacing survives.

## Capture settings

Consistency across shots matters more than resolution. Same window width, same
zoom (100%), same theme, one sitting.

- 2× / retina, viewport only, no browser chrome
- One fixed width for every screen so crops line up in the case-study layout
- Full-bleed screens go in as `.jpg`; anything with transparency or line art as
  `.png` or `.svg`

## Slots this case study needs

Paths are already wired into the draft — drop files at these names and they
appear.

| slot | path | what it has to show |
|---|---|---|
| hero | `/public/case/vision/hero.jpg` | the product at its densest, in one frame. this is the shot that says "internal saas" before a word is read |
| the table | `/public/case/vision/table.jpg` | the payments record, wide. the four callouts in the `annotated` section point at this, so it needs enough columns visible to make the density argument |
| templates | `/public/case/vision/templates.jpg` | the template system, ideally in a state that shows the role difference (a manager's view of something an agent cannot change) |
| filters | `/public/case/vision/filters.jpg` | the filter panel **with filters applied** and the result set visibly narrowed. an empty filter panel shows nothing |
| tile cover | `/public/covers/vision.jpg` | square-ish crop, and it must read at ~272px. a full dense table will look like grey noise at tile size — crop to a corner where one row and its status are legible |

**On the cover specifically:** the grid is currently eight tiles that each get
about 272px, and dashboards are the hardest thing to make read at that size.
Crop tight. Look at how the deep cuts receipt survives being small — one object,
high contrast, lots of air.

## The before artifact

The single most valuable image in this case study is not a screen. It is **the
spreadsheet** — the real one, scrubbed: colour-coded cells, the manual
conventions people invented, a column called something like `DONE?`. Put it
beside the schema it became. That pairing is the argument; the screens are the
evidence.

If the sheet itself cannot leave, rebuild it with the same synthetic cast in a
blank Google Sheet, including the informal conventions. That is a reconstruction
and should say so in the caption.
