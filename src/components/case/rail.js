import { PORTRAIT } from "../home/portraits";

/*
 * THE RAIL. The three portraits stacked down the left edge of an open case
 * study: office hours (the paid work), about, after hours (the side work).
 * The project's own section is drawn in full ink; the others are dimmed.
 * Same markup on the home grid's split panel and on the case page, so the
 * hand-off between them is invisible.
 */
export const RAIL = [
  ["pro", "office hours", "work for companies and clients"],
  ["about", "about", "off the clock"],
  ["itch", "after hours", "self-initiated, designed and built"],
];

// Each tile is a home-grid tile at full size: the portrait, then its title
// and line underneath, so the rail reads as the grid's first column.
export const railHTML = active =>
  RAIL.map(([p, label, line]) =>
    `<button type="button" class="rail-tile${p === active ? " on" : ""}" data-to="${p}" aria-label="${label}, ${line}">${PORTRAIT[p]}<span class="rt">${label}</span><span class="rl">${line}</span></button>`,
  ).join("");
