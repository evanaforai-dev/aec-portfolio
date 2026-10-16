import type { Project } from "@/types/project";

/**
 * THE ONE LINE A HIRING MANAGER READS.
 *
 * Shown under the title on each home tile and again at the head of the case
 * study, so the promise on the tile is the first thing the page repeats.
 * Each one leads with the outcome or the hard part, in the words a hiring
 * manager would search for, and every claim is one the case study backs.
 * `tags` in projects.ts stay as the taxonomy; these are the pitch.
 */
export const hooks: Record<string, string> = {
  counterweight: "design-review tool that measures the model and refuses to guess",
  "airtribe-ai-skills": "two ai tools in daily use: one for authors, one for learners",
  vision: "replaced the spreadsheet that ran company payments",
  lipi: "figma plugin that catches where translation breaks your ui",
  "gateway-to-kerala": "award-winning b.arch thesis over india's first multimodal transit hub",
  "madipur-hospital": "600-bed hospital, checked by hand against bylaws, fire and water",
  "vytilla-junction": "junction concept from peak-hour counts, every arm over capacity",
  kochi1app: "transit app redesign, tested with 16 people, sus 80",
  "basant-lok": "urban design for a delhi community centre, neighbourhood to floor plan",
  "into-the-tall-grass": "kinetic canopy that opens around each visitor",
};

/**
 * THE WORDS A RECRUITER SEARCHES FOR. Business model, domain and the kind of
 * product, so a scan (by a person or a screening tool) finds the match. Only
 * words the case study supports.
 */
export const keywords: Record<string, string> = {
  counterweight: "aec · bim / ifc · ai trust · react + three.js",
  "airtribe-ai-skills": "b2b2c · ai product · edtech",
  vision: "b2b · internal tools · workflows · payments",
  lipi: "developer tools · figma plugin · localisation",
  "gateway-to-kerala": "architecture · transit-oriented development · kochi",
  "madipur-hospital": "healthcare architecture · bylaws · building services",
  "vytilla-junction": "urban mobility · traffic data · kochi",
  kochi1app: "b2c · mobility · public sector",
  "basant-lok": "urban design · public realm · delhi",
  "into-the-tall-grass": "installation · sensors · kinetic",
};

export const keywordsOf = (p: Project) => keywords[p.slug] ?? "";

/** Who the work was for, as the chip on the tile and the case header. */
export const contextOf = (p: Project) =>
  p.context ?? (p.category === "playground" ? "self-initiated" : undefined);

export const hookOf = (p: Project) => hooks[p.slug] ?? p.tags.slice(0, 2).join(" · ");
