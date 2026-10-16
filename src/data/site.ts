/**
 * Site-wide content. All copy is lowercase by rule, and contains no em dashes.
 */

export const site = {
  name: "evana sajan pallivathukkal",
  /** Wordmark shown in the minimal nav (links home). */
  wordmark: "evana sajan pallivathukkal",
  role: "architect and product designer",
  /*
   * The address that actually receives mail. hello@evana.design was live on
   * every page and on 23 mailto links, and the domain has no MX record, so
   * anyone who wrote to it got a bounce and no one knew they had tried.
   */
  email: "evana.s.pallivathukkal@gmail.com",
  resumeUrl: "/resume.pdf",

  /*
   * The link lists the chrome carries. Email used to lead here and in the
   * masthead; behance takes its place, because a portfolio link is the thing
   * a visitor can act on immediately and the inbox is one click away on the
   * about page and at the foot of every case study.
   */
  social: [
    { label: "behance", href: "https://www.behance.net/evanapallivathukkal" },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/evana-sajan-pallivathukkal/",
    },
    { label: "github", href: "https://github.com/evanaforai-dev" },
  ],
};

/**
 * HOME MASTHEAD — the first ten seconds.
 *
 * The index is a grid of objects and says nothing about who made them. This
 * band, set above it, answers the three questions a cold visitor has before
 * they will spend a click: what is this person, what do they work on, and who
 * have they worked for. Every line here is already true elsewhere in the data
 * (see `about.background` and `about.service`); nothing is claimed that a case
 * study does not support.
 *
 * It stays deliberately short. Hierarchy is doing the work, not volume.
 */
export const masthead = {
  /** The role, stated flatly, because that is the thing being missed. */
  lede: "architect and product designer.",
  /** What the work is about, in the voice of the rest of the site. */
  statement:
    "tools for the people who design buildings, built by someone trained to be one.",
  /** Where the work was done. Names only: no tense, no claim of tenure. */
  places: ["vastu shilpa consultants", "airtribe", "wells fargo", "kochi metro"],
  /** The one credential worth a recruiter's half-second. */
  credential: "b.arch spa new delhi · m.des interaction design, idc iit bombay",
};

/**
 * THE TWO REGISTERS THE INDEX RUNS IN.
 *
 * The about page has said "office hours / after hours" since it was written;
 * the index had no such distinction, so paid product work and unfinished
 * personal builds sat in one undifferentiated field of nine tiles and a reader
 * had to infer which was which from the tags. Same vocabulary, applied to the
 * work: it costs one line each and it is the difference between "nine projects"
 * and "four things she was hired to do, and five she does anyway".
 *
 * `key` matches the `category` already on every project in projects.ts, so the
 * split is data that existed rather than a new field to keep in sync.
 *
 * The `note` on after hours says "still being built" on purpose. These are
 * live and genuinely hers, but they are in progress, and a reader who finds
 * that out by clicking trusts the rest of the page less.
 */
export const registers = [
  {
    key: "work" as const,
    label: "tools",
    note: "software for the people who design buildings, and the ai products behind it",
  },
  {
    key: "playground" as const,
    label: "buildings",
    note: "architecture at spa new delhi, where the questions came from",
  },
];

export const about = {
  headline: "the practice predates the profession.",

  /*
   * The headline is the voice; this is the fact under it. The bio opens
   * "creative technologist, not always digital", which is honest and is also
   * the first thing a hiring reader sees — so the discipline is stated once,
   * plainly, before the page earns the right to be interesting. Nothing here
   * is new: it is `background` and `service` said in a sentence.
   */
  positioning:
    "architect and product designer. trained at spa new delhi and in b.v. doshi's office, then in interaction design at idc iit bombay. i design and build ai tools, and the ones i care most about are for architecture, engineering and construction.",

  bio: [
    "creative technologist, not always digital. i like to practice “let the work speak for itself” a little too seriously, since my time at spa delhi.",
    "anything that offers a new way to express an idea, and the mechanics of it, usually gets my attention. some interests stay for years, others just long enough to understand them: painting and film, printmaking, animation, writing, architecture, furniture, data viz, music, and maybe even apps.",
    "being at idc, iit bombay shifted my attention from what we make to why we make it. that curiosity has since wandered through philosophy, mythology, history, business, kickboxing, even formula 1.",
    "i don’t think of technology as an end in itself. it’s simply another medium. i’m usually more interested in what it causes than what it enables.",
  ],

  /** The two registers the work runs in. Shown as a pair, not a toggle. */
  hours: [
    {
      key: "office hours",
      note: "finds leverage in systems, strategy, and emerging technology. more interested in defining the right problem than debating a 16px margin.",
      axes: [
        "ai native",
        "user empathy",
        "visual refinement",
        "collaborative execution",
        "systems thinking",
      ],
    },
    {
      key: "after hours",
      note: "usually investigating the same thing from different angles: how people make meaning.",
      axes: ["f1 / kickboxing", "side quests", "films", "drawing", "literature"],
    },
  ],

  service: [
    "product design",
    "ai workflows",
    "design research",
    "design systems",
    "visual data design",
    "0 → 1 strategy",
    "prototyping & development",
    "architecture",
  ],

  background: [
    {
      period: "2026",
      sector: "education",
      place: "airtribe",
      role: "ai tools for learners / for business",
    },
    {
      period: "2025",
      sector: "finance",
      place: "wells fargo",
      role: "migration in design systems for lob products",
    },
    {
      period: "2024",
      sector: "civic tech",
      place: "kochi metro",
      role: "academic collaboration",
    },
    {
      period: "2022",
      sector: "architecture",
      place: "sangath collective",
      role: "bv doshi",
    },
  ],

  education: [
    { place: "idc, iit bombay", award: "m.des interaction design" },
    { place: "spa, new delhi", award: "b.arch" },
  ],

  /** up my sleeve: what i do, and what i do it with. */
  skills: [
    "systems thinking",
    "product strategy",
    "interaction design",
    "design engineering",
    "research synthesis",
    "information design",
    "ai experiences",
    "prototyping",
  ],

  tools: [
    "figma",
    "cursor",
    "claude",
    "framer",
    "adobe suite",
    "v0",
    "notion",
    "jira",
  ],

  contact: "let’s create something solid. open to experimentation worldwide.",

  future: [
    { horizon: "immediate future", line: "contributing to social tech" },
    {
      horizon: "plausible future",
      line: "curate design, discussions, and open my independent gallery",
    },
  ],
};
