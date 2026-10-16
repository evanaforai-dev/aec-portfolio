/**
 * The single shared data shape for every project on the site.
 *
 * Adding a new project — Work or Playground — is only ever a matter of adding
 * one more `Project` entry to `src/data/projects.ts`. No layout, routing, or
 * component code needs to change.
 */

export type Category = "work" | "playground";

/**
 * Reusable case-study content blocks. The case-study template renders whatever
 * sequence of blocks a project provides, so writing a new case study is just
 * data — never new layout code.
 */
export type CaseStudyBlock =
  | TextBlock
  | ImageBlock
  | ImagePairBlock
  | FullWidthImageBlock
  | QuoteBlock;

export interface TextBlock {
  type: "text";
  /** Optional small section label shown above the paragraph. */
  heading?: string;
  /** Body copy. Newlines split into separate paragraphs. */
  body: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface ImagePairBlock {
  type: "imagePair";
  images: [ProjectImage, ProjectImage];
}

export interface FullWidthImageBlock {
  type: "fullWidthImage";
  src: string;
  alt: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  quote: string;
  attribution?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  /** Stable identifier. */
  slug: string;
  /** Lowercase, per the site's typography rules. */
  title: string;
  /** Lowercase tags shown on hover, e.g. ["web app", "python", "2024"]. */
  tags: string[];
  /**
   * Kept for the data schema — the site no longer separates categories
   * visually, but entries can still be tagged "work" or "playground".
   */
  category: Category;
  /** Cover image used as the square grid cell. */
  cover: string;
  year: string;
  /** One-sentence, lowercase summary. */
  summary: string;

  /**
   * Keep the project's data and its /work/<slug>/ route, but leave it off the
   * home grid. For work that is covered by another tile and would otherwise
   * give one product two front doors.
   */
  unlisted?: boolean;

  /**
   * Where the grid cell links to — a live deployment or repo URL. If omitted,
   * the cell is non-clickable and only reveals its label on hover.
   */
  link?: string;

  /**
   * How the thumbnail sits inside its grid cell. Lets each project be treated
   * like a photographed object rather than a uniform screenshot:
   *  - fit "cover" (default): full-bleed, fills the cell (crop with `position`)
   *  - fit "contain": the asset floats as an object; `pad` adds negative space
   *    around it and the grid stays visible behind transparent assets.
   */
  display?: {
    fit?: "cover" | "contain";
    /** object-position for cover crops, e.g. "top", "center". */
    position?: string;
    /** Tailwind padding for contain objects, e.g. "p-8 md:p-14". */
    pad?: string;
    /**
     * The cover is an animated asset (e.g. a GIF). When true the grid shows a
     * quiet static `poster` frame and only lets the animation play on hover.
     */
    animated?: boolean;
    /** Static first-frame shown while an `animated` cover is idle. */
    poster?: string;
  };

  // Optional metadata (retained from the case-study schema).
  role?: string;
  client?: string;
  duration?: string;

  /**
   * Optional case-study content. Retained in the schema for future use; the
   * current two-page site does not render a case-study route.
   */
  caseStudyBlocks?: CaseStudyBlock[];
}
