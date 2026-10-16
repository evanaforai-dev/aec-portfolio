import type { GlyphName } from "@/components/case/Glyph";

/**
 * Case-study content model.
 *
 * A case study is a HERO plus an ordered list of art-directed SECTIONS. The
 * section set is intentionally varied (not text/image/text/image) so each
 * project can be composed with its own rhythm. Every project uses a different
 * subset and order — the narrative emerges from the project, not a template.
 *
 * All copy is authored lowercase and em-dash-free, matching the site.
 */

export interface MediaAsset {
  /** "image" (default; includes GIF) or "video" (autoplay, muted, looped). */
  type?: "image" | "video";
  src: string;
  alt?: string;
  /** Poster frame for video. */
  poster?: string;
  /**
   * Intrinsic pixel size. Optional, and only needed where the image is laid
   * out at its own aspect rather than inside a box of a fixed one: without
   * it such an image is zero-high until it loads, which both shifts the page
   * under the reader and can stop a lazy image loading at all, because a
   * zero-high element never comes into view.
   */
  width?: number;
  height?: number;
}

export interface CaseMeta {
  label: string;
  value: string;
}

export interface CaseLink {
  label: string;
  href: string;
}

export interface CaseHero {
  /** quiet eyebrow, e.g. "figma plugin · developer tooling". */
  kicker?: string;
  title: string;
  /** one line: what is this. */
  subtitle: string;
  /**
   * Optional. A case study may open straight on its title: the launch crop is
   * a landscape box, and a portrait phone recording forced through it is shown
   * at about a third of itself, hugely magnified. Where no still reads at that
   * size, the page opens on type and lets the prototype below carry the first
   * look at the product.
   */
  media?: MediaAsset;
  mediaFit?: "cover" | "contain";
  /**
   * Contained heroes sit in a hairline frame by default, which is right for a
   * captured document. Set false for artwork drawn on a transparent ground:
   * there is no edge to draw a box around, and a box around it reads as a
   * specimen case rather than a product.
   */
  mediaFrame?: boolean;
  /** optional object-position for cover crops. */
  mediaPosition?: string;
  /**
   * "document" (default) opens with the media in a hairline frame, which is
   * right for work that is an argument. "launch" gives the object the whole
   * viewport on its own ground, with no frame around it, for work that is an
   * object: the page presents the thing rather than filing a report on it.
   */
  mode?: "document" | "launch";
  meta: CaseMeta[];
  links?: CaseLink[];
}

export interface DecisionItem {
  /** index like "01". */
  n?: string;
  title: string;
  why?: string;
  tradeoff?: string;
  result?: string;
  media?: MediaAsset;
  fit?: "cover" | "contain";
}

export type Section =
  /*
   * LAUNCH REGISTER
   * Four sections for a page that presents an object rather than filing a
   * report on it. They set their own typography (mono, uppercase, small) and
   * their own ground, so they read as product copy, not case-study prose.
   */
  | {
      kind: "credits";
      label?: string;
      paragraphs: string[];
      creditsLabel?: string;
      credits: { role: string; name: string }[];
    }
  /** Edge to edge, no container, no gutter, no frame. */
  | {
      kind: "bleed";
      media: MediaAsset;
      /** Copy laid over the image, anchored top-left. */
      overlay?: {
        label?: string;
        paragraphs?: string[];
        lines?: string[];
        /** A row of labelled steps anchored to the foot of the image. */
        columns?: { label: string; text?: string; note?: string }[];
        /** Anchor the overlay block to the bottom instead of the top. */
        anchor?: "top" | "bottom";
        /**
         * "over" lays the copy on the image, which only works where the image
         * has room for it. "below" sets it under the image on the page ground,
         * which is the honest choice when the artwork already fills its frame.
         */
        placement?: "over" | "below";
      };
      caption?: string;
    }
  /** Two media filling the width, no gap between them. */
  | {
      kind: "duo";
      media: [MediaAsset, MediaAsset];
      captions?: [{ label?: string; text?: string }, { label?: string; text?: string }];
    }
  /** A full-width panel that inverts the ground: centred heading, body left. */
  | {
      kind: "panel";
      label: string;
      paragraphs: string[];
      /** Emphasise these paragraph indices (0-based). */
      emphasise?: number[];
      /**
       * A panel inverts the page ground by default, which is what makes it
       * read as a chapter break. It inverts into the site's OWN two colours
       * and cannot be given a ground of its own: a bespoke panel colour is
       * how five side projects each ended up wearing a different near-black.
       */
      invert?: boolean;
    }
  /**
   * PROTOTYPE — the thing itself, running, inside the page. On a side project
   * the build is the argument, so the reader gets to use it before the page
   * spends a paragraph describing it. `src` is site-relative for a prototype
   * bundled into /public/play, and absolute for one that lives on its own
   * deployment. `frame: "phone"` is for apps that were drawn for a handset:
   * a wide well would letterbox them into a stripe.
   */
  | {
      kind: "prototype";
      label?: string;
      src: string;
      /** accessible name for the frame. */
      title: string;
      frame?: "wide" | "phone";
      /** permissions policy, e.g. "microphone" for a recorder. */
      allow?: string;
      /** one line telling the reader what to do first. */
      hint?: string;
      caption?: string;
    }
  | { kind: "thesis"; eyebrow?: string; text: string }
  | { kind: "context"; label?: string; paragraphs: string[] }
  | { kind: "question"; text: string }
  | { kind: "constraints"; label?: string; items: { label: string; text: string }[] }
  | { kind: "decisions"; label?: string; items: DecisionItem[] }
  | {
      kind: "full";
      media: MediaAsset;
      fit?: "cover" | "contain";
      position?: string;
      /** cell height treatment for the media. */
      height?: "auto" | "tall" | "screen";
      caption?: string;
      /** hairline frame around the media (for contained objects). */
      frame?: boolean;
    }
  | {
      kind: "figures";
      label?: string;
      media: MediaAsset[];
      columns?: 2 | 3;
      fit?: "cover" | "contain";
      /** Frame shape. "phone" for portrait captures that a 4:3 box would crush. */
      aspect?: "figure" | "phone";
      /**
       * Each figure sits in a hairline box of a fixed aspect by default. Set
       * false for artwork cut out on a transparent ground: it then flows at
       * its own aspect with no box, because there is no edge to draw one on.
       */
      frame?: boolean;
      caption?: string;
    }
  | {
      kind: "detail";
      media: MediaAsset;
      fit?: "cover" | "contain";
      position?: string;
      title?: string;
      text?: string;
      /** which side the media sits on (desktop). */
      side?: "left" | "right";
    }
  | { kind: "flow"; label?: string; steps: { label: string; note?: string }[]; caption?: string }
  | { kind: "statement"; text: string }
  | { kind: "outcome"; label?: string; paragraphs: string[] }
  | { kind: "reflection"; text: string }
  /**
   * DEEPER — the closing invitation. A public case study is the high-signal
   * version, not the whole file: the research, the explorations, the rejected
   * directions and the material that sits behind an nda all live in the
   * conversation this section is asking for. Every professional case study
   * ends with one, so no reader reaches the bottom of a page with nothing to
   * do but hit back.
   */
  | {
      kind: "deeper";
      label?: string;
      paragraphs: string[];
      links?: CaseLink[];
    }
  /**
   * TURN — the direction that was tried first and abandoned. Every case study
   * gets one: it is the section a reader cannot get from a screenshot, and the
   * thing that separates a record of work from a presentation of it.
   */
  | {
      kind: "turn";
      label?: string;
      /** what was built or assumed first. */
      tried: string;
      /** what actually happened when it met reality. */
      result: string;
      /** what replaced it, and the rule that came out of it. */
      change: string;
    }
  /**
   * PIPELINE — the system end to end, as line-art stages with their rules.
   * `note` carries the awkward detail (a fallback, a cap, a safeguard) that
   * usually gets left out of a case study.
   */
  | {
      kind: "pipeline";
      label?: string;
      steps: {
        glyph: GlyphName;
        label: string;
        text: string;
        note?: string;
      }[];
      caption?: string;
    }
  /** ANNOTATED — one artifact with its decisions called out beside it. */
  | {
      kind: "annotated";
      label?: string;
      media: MediaAsset;
      fit?: "cover" | "contain";
      position?: string;
      frame?: boolean;
      items: { title: string; text?: string }[];
    }
  /**
   * SYSTEM — the spec board: the interaction grammar, the real tokens, the
   * real measurements. Data rather than a flattened image, so it stays
   * legible, themeable and correctable.
   */
  | {
      kind: "system";
      label?: string;
      paragraphs?: string[];
      /** interaction grammar, e.g. wheel → navigate. */
      mapping?: { from: string; to: string }[];
      colors?: { hex: string; name: string }[];
      type?: { name: string; value: string }[];
      metrics?: { label: string; value: string }[];
      note?: string;
    };

export interface CaseStudy {
  slug: string;
  hero: CaseHero;
  sections: Section[];
}
