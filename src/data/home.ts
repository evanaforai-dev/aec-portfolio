import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import type { Project } from "@/types/project";
import { hookOf, contextOf, keywordsOf } from "@/data/hooks";

/**
 * HOME GRID CONTENT. Everything the grid engine shows, resolved to plain
 * strings and urls so it can be handed to the client as-is.
 *
 * Order is fixed by slot (see engine.js `sequence`): the pro portrait, four
 * pieces of company work, two serious self-initiated projects, the about
 * portrait, a third serious one, the red ball, the itch portrait, then every
 * other side project. Anything in projects.ts that is not named here still
 * shows, at the end of the side projects, so adding a project stays a
 * one-file change.
 */

export interface HomeTile {
  slug?: string;
  sec?: "pro" | "itch";
  kw?: string;
  t: string;
  tags: string;
  ctx?: string;
  href?: string;
  cover?: string;
  fit?: "cover" | "contain";
  position?: string;
  anim?: boolean;
  poster?: string;
}

const WORK = ["counterweight", "airtribe-ai-skills", "vision", "lipi"];
/*
 * The three architecture projects that lead the buildings section. Everything
 * else in projects.ts follows them, in data order.
 */
const SERIOUS = ["gateway-to-kerala", "madipur-hospital", "vytilla-junction"];
const UPCOMING: Record<string, HomeTile> = {};

function tile(p: Project): HomeTile {
  const href = p.slug in caseStudies ? asset(`/work/${p.slug}/`) : p.link?.startsWith("/") ? asset(p.link) : p.link;
  return {
    slug: p.slug,
    sec: p.category === "work" ? "pro" : "itch",
    kw: keywordsOf(p),
    t: p.title,
    tags: hookOf(p),
    ctx: contextOf(p),
    href,
    cover: asset(p.cover),
    fit: p.display?.fit ?? "cover",
    position: p.display?.position,
    anim: p.display?.animated,
    poster: p.display?.poster ? asset(p.display.poster) : undefined,
  };
}

const listed = projects.filter((p) => !p.unlisted);
const bySlug = (slug: string) => {
  const p = listed.find((x) => x.slug === slug);
  return p ? tile(p) : UPCOMING[slug];
};
const named = new Set([...WORK, ...SERIOUS]);

// GitHub mark: Octicons "mark-github" (MIT licensed), drawn at 16x16.
const GH = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;

const social = (label: string) => site.social.find((s) => s.label === label)?.href ?? "#";
const resume = asset(site.resumeUrl);
const mail = `mailto:${site.email}`;

export const home = {
  work: WORK.map(bySlug).filter(Boolean) as HomeTile[],
  serious: SERIOUS.map(bySlug),
  side: listed.filter((p) => !named.has(p.slug)).map(tile),

  portraits: {
    pro: { p: "pro", t: site.name, tags: "architect · product designer · builds tools", mt: "tools", mtags: "software for the people who design buildings" },
    about: { p: "about", t: "about", tags: "off the clock", mt: "about me", mtags: "off the clock" },
    itch: { p: "itch", t: "buildings", tags: "architecture, spa new delhi", mt: "buildings", mtags: "where the questions came from" },
  },

  /** What each portrait opens into. The link row is appended by the engine. */
  sheets: {
    pro: `<p class="s-kicker">${site.name}</p>
      <p class="s-lede">an architect who builds the tools.</p>
      <p class="s-text">trained as an architect at spa delhi and in b.v. doshi's office, then in interaction design at idc iit bombay. now i design and build ai tools, and the ones i care most about are for the people i trained alongside: architects, engineers and builders.</p>
      <dl class="s-facts"><div><dt>trained at</dt><dd>b.arch, spa new delhi · m.des, idc iit bombay</dd></div>
        <div><dt>practice</dt><dd>vastu shilpa consultants, under b.v. doshi</dd></div>
        <div><dt>worked at</dt><dd>airtribe · wells fargo · kochi metro</dd></div>
        <div><dt>looking for</dt><dd>product design, design engineering and ai evaluation roles at aec technology companies</dd></div></dl>`,
    about: `<p class="s-kicker">off the clock</p>
      <p class="s-lede">usually pulling a print.</p>
      <p class="s-text">anything that offers a new way to express an idea gets my attention. some interests stay for years, others just long enough to understand them.</p>
      <dl class="s-facts"><div><dt>making</dt><dd>printmaking, painting, film, animation, writing</dd></div>
        <div><dt>watching</dt><dd>formula 1</dd></div><div><dt>doing</dt><dd>kickboxing</dd></div></dl>`,
    itch: `<p class="s-kicker">buildings</p>
      <p class="s-lede">the buildings came first.</p>
      <p class="s-text">five years of architecture at spa new delhi: a transit hub, a 600-bed hospital, a junction, an urban precinct and an installation. every check a tool could make for me now, i once made by hand on these. everything after this tile on the grid is one of them.</p>`,
  },

  /** Text links: phone top bar and the row under each portrait sheet. */
  links: [
    ["résumé", resume],
    ["email", mail],
    ["behance", social("behance")],
    ["github", social("github")],
  ] as [string, string][],

  /** The drops that bud off the red ball: glyph, name, url. */
  wheel: [
    ["cv", "cv", resume],
    ["@", "email", mail],
    ["in", "linkedin", social("linkedin")],
    ["Bē", "behance", social("behance")],
    [GH, "github", social("github")],
  ] as [string, string, string][],

  /** The line on the ball, and what it says under the pointer. */
  line: "trying to think outside the box.",
  hi: "say hi.",

  /** Phone top bar: name, then one line. */
  me: [site.name, "architect who builds tools for architects."] as [string, string],
};
