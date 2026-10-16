import type { Project } from "@/types/project";

/**
 * ── ADD A PROJECT HERE ────────────────────────────────────────────────────
 * Every project lives in this one array and uses the one `Project` shape. To
 * publish a new project, append an entry below. The home grid reads from here;
 * `category` is retained in the schema but no longer changes the layout.
 *
 * All visible copy is lowercase and contains no em dashes, per the site's
 * typography rules. `link` is where the grid cell points; `cover` is the
 * square thumbnail in /public/covers.
 */

export const projects: Project[] = [
  {
    slug: "counterweight",
    title: "counterweight",
    tags: ["aec tooling", "product design", "design engineering"],
    category: "work",
    cover: "/covers/counterweight.jpg",
    year: "2026",
    summary:
      "a second pair of eyes for design reviews. it compares early options on the everyday things that fail after handover, and only says what each drawing can support.",
    link: "/counterweight/case-study/",
    display: { fit: "cover", position: "center" },
  },
  {
    slug: "airtribe-ai-skills",
    title: "airtribe ai skills",
    tags: ["ai product design", "design systems", "learning design"],
    category: "work",
    /*
     * Kai's landing surface, composed on a transparent ground. Contained
     * rather than filled: the art is drawn to its own edges and cropping it
     * cuts the knot or the prompt field, and a transparent ground means the
     * letterboxing is the page rather than a band of another colour.
     */
    cover: "/covers/airtribe-ai-skills.webp",
    year: "2026",
    summary:
      "two ai skills at airtribe: a design language the lxd team authors inside so a growing catalogue stays on-brand, and a tutor that writes one cited lesson for one reader.",
    link: "https://willowy-blancmange-6a230b.netlify.app/",
    display: { fit: "contain" },
  },
  {
    slug: "vision",
    title: "vision",
    tags: ["product design", "payments", "internal tooling"],
    category: "work",
    // The sheet the product replaced, redacted. No capture of vision itself can
    // leave, and this is the more honest tile anyway: the case study is about
    // killing this thing, and nothing else on the index looks remotely like it.
    cover: "/covers/vision.jpg",
    year: "2026",
    summary:
      "the company's payments moved out of a google sheet and into airtribe's internal sales and operations product, in three phases, without the sheet ever going dark.",
    display: { fit: "cover" },
  },
  {
    slug: "lipi",
    title: "lipi",
    tags: ["developer tooling", "design systems", "interaction design", "prototyping"],
    category: "work",
    cover: "/covers/lipi-tile.gif",
    year: "2026",
    summary:
      "a figma plugin that pressure-tests ui against localized indic copy, fixing where translation breaks layout.",
    link: "https://github.com/evanaforai-dev/lipi",
    // animated cover: static poster idle, plays on hover. The tile copies have
    // the dark ground lifted out, so the two panels float on the grid like the
    // other object tiles; the case study still uses the originals on their
    // ground.
    display: {
      fit: "contain",
      animated: true,
      poster: "/covers/lipi-tile-poster.png",
    },
  },
  {
    slug: "kochi1app",
    title: "kochi1app",
    tags: ["service design", "ux research", "mobility"],
    category: "work",
    cover: "/covers/kochi1app.jpg",
    year: "2024",
    summary:
      "a service-design redesign of kochi's official transit app: plan a trip by intention, nudge greener journeys, and design the first and last mile.",
    link: "https://www.behance.net/gallery/212543637/Public-Transport-Systems-Service-Design",
    // wide editorial hero (hands, phone, metro tunnel), filled full-bleed.
    display: { fit: "cover" },
  },
  {
    slug: "gateway-to-kerala",
    title: "gateway to kerala",
    tags: ["architecture", "transit-oriented development", "mixed use"],
    category: "playground",
    cover: "/case/gateway-to-kerala/01.jpg",
    year: "2023",
    summary:
      "b.arch thesis: phase ii mixed-use development at the vytilla mobility hub in kochi, india's first multimodal transit hub.",
    display: { fit: "cover", position: "center" },
  },
  {
    slug: "madipur-hospital",
    title: "madipur general hospital",
    tags: ["architecture", "healthcare", "building services"],
    category: "playground",
    cover: "/case/madipur-hospital/20.jpg",
    year: "2021",
    summary:
      "a 600-bed general hospital in west delhi, planned against bylaws, fire, water and sun, in a group of three.",
    display: { fit: "cover", position: "center" },
  },
  {
    slug: "vytilla-junction",
    title: "vytilla junction",
    tags: ["urban mobility", "traffic", "urban design"],
    category: "playground",
    cover: "/case/vytilla-junction/01.jpg",
    year: "2024",
    summary:
      "a concept for kochi's busiest junction, from peak-hour traffic counts to a loop that folds the mobility hub into the junction.",
    display: { fit: "cover", position: "center" },
  },
  {
    slug: "basant-lok",
    title: "reimagining community centres",
    tags: ["urban design", "public realm", "delhi"],
    category: "playground",
    cover: "/case/basant-lok/19.jpg",
    year: "2023",
    summary:
      "an urban design proposal for the basant lok community centre in vasant vihar, delhi, in a group of four.",
    display: { fit: "cover", position: "center" },
  },
  {
    slug: "into-the-tall-grass",
    title: "into the tall grass",
    tags: ["installation", "kinetic", "interaction"],
    category: "playground",
    cover: "/case/into-the-tall-grass/04.jpg",
    year: "2021",
    summary:
      "a kinetic canopy of grass-like strands that rises to make room for whoever walks under it, designed in a group.",
    display: { fit: "cover", position: "center" },
  },
];

// ── Derived helpers ─────────────────────────────────────────────────────────

export const workProjects = projects.filter((p) => p.category === "work");
export const playgroundProjects = projects.filter(
  (p) => p.category === "playground",
);
