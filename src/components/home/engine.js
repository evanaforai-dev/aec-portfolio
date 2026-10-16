/*
 * HOME GRID ENGINE.
 *
 * Plain DOM, deliberately. Every line of the grid is its own SVG path driven
 * per frame, the red ball runs a small physics loop, and opening a tile
 * animates dozens of strings at once. Routing that through React state would
 * re-render the grid sixty times a second for nothing, so React mounts one
 * empty element and this module owns everything inside it.
 *
 * mountHome(root, cfg) builds the page and returns a function that tears it
 * all down again (listeners, timers, animation loops).
 *
 * Behaviour, in order of importance:
 *  - ELASTIC STRINGS. One svg per cell edge. Crossing a line with the pointer
 *    grabs it; it bends with the pointer until you move far enough off it,
 *    then lets go and wobbles back on an elastic ease.
 *  - HOVER. The hovered project lifts and its title and tags come up; every
 *    other tile blurs. Portraits and blank cells clear the blur.
 *  - THE MARK. A red ball in its own cell, a little smaller than the cell, so
 *    it can fall, roll and rest against a grid line, bending it. Scrolling
 *    throws it about, a nearby pointer tugs it, and now and then it fidgets.
 *    One grey line wraps it, and a loose end runs off along the floor into
 *    the grid. On hover it shrinks to the right and the links bud off its
 *    left side as liquid drops.
 *  - INTRO. First visit only: the ball arrives alone, rolls to its cell
 *    trailing a thread, and the grid lines draw themselves out from it.
 *  - OPENING. Portraits open in place as a rubber band stretched to the
 *    screen. Projects split the grid like a curtain, then go to the case
 *    study page.
 *  - PHONES. Two columns, no hover: titles, tags and context show at rest,
 *    a top bar carries the name and links, and the ball is left out.
 */

import { PORTRAIT } from "./portraits";
import { railHTML } from "../case/rail";

const SVGNS = "http://www.w3.org/2000/svg";

// ---- elastic strings (measured from the reference) ----
const HALF = 40, PULL = 16 / 7, RELEASE_MS = 760, PERIOD = 0.45;
const elastic = t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - PERIOD / 4) * (2 * Math.PI) / PERIOD) + 1;
const outExpo = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
const inOutQuart = t => t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
const outCubic = t => 1 - Math.pow(1 - t, 3);
const inOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;
const inOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/*
 * The one line wound round the ball: a great circle seen at a tilt, front
 * half only, starting at angle `ta` on the rim (where the loose end leaves).
 */
function wrapPath(cx, cy, r, ta) {
  const ux = Math.cos(ta), uy = Math.sin(ta), vx = -uy, vy = ux, tilt = .32;
  let d = "";
  for (let s = 0; s <= 24; s++) {
    const a = Math.PI * s / 24, cu = Math.cos(a) * (r - .5), sv = Math.sin(a) * r * tilt;
    d += `${s ? "L" : "M"} ${(cx + ux * cu + vx * sv).toFixed(2)} ${(cy + uy * cu + vy * sv).toFixed(2)} `;
  }
  return d;
}

// ---- the mark ----
const BLOB = 22, NECK = 24;   // drop radius, ball-to-drop gap
const SQUIRM = 10;            // room between the ball and its grid lines
const SHRINK = 0.5;           // ball radius on hover, as a share of rest
const GRAVITY = 0.16;         // px per frame squared

// An open case keeps the portrait rail on the left and a strip of grid
// (the small ball's channel) on the right. Same sizes as the case page.
const STRIP_R = 56; // the rail on the left is one grid column wide
const CLOSE_SVG = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 8l24 24M32 8L8 32"/></svg>`;


const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ext = h => /^https?:/.test(h) || /\.pdf$/.test(h);
const linkAttrs = h => ext(h) ? ' target="_blank" rel="noopener noreferrer"' : "";

/**
 * @param {HTMLElement} root
 * @param {{
 *   work: object[], serious: object[], side: object[],
 *   portraits: Record<string, object>, sheets: Record<string, string>,
 *   links: [string, string][], wheel: [string, string, string][],
 *   line: string, hi: string, me: [string, string],
 * }} cfg
 */
export function mountHome(root, cfg) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MOBILE = () => innerWidth < 650;
  const colsFor = w => w < 650 ? 2 : w < 850 ? 3 : w < 1200 ? 4 : 5;
  const P = cfg.portraits, MARK = { mark: true }, BLANK = { blank: true };

  // ---- teardown bookkeeping ----
  let dead = false;
  const offs = [];
  const on = (t, type, fn, o) => { t.addEventListener(type, fn, o); offs.push(() => t.removeEventListener(type, fn, o)); };
  const timers = new Set();
  const later = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); if (!dead) fn(); }, ms); timers.add(id); return id; };
  const raf = fn => requestAnimationFrame(t => { if (!dead) fn(t); });

  const linkRow = () => `<nav class="s-links" aria-label="links">${cfg.links.map(([t, h]) =>
    `<a href="${esc(h)}"${linkAttrs(h)}>${esc(t)}</a>`).join("")}</nav>`;

  root.innerHTML = `
    <header class="nav">
      <p class="me"><b>${esc(cfg.me[0])}</b><i>${esc(cfg.me[1])}</i></p>
      <nav class="ln" aria-label="links">${cfg.links.map(([t, h]) => `<a href="${esc(h)}"${linkAttrs(h)}>${esc(t)}</a>`).join("")}</nav>
    </header>
    <div class="grid" aria-label="work"></div>
    <svg class="fx" aria-hidden="true"></svg>
    <div class="sheet-body" role="dialog" aria-modal="true" aria-label="about" data-lenis-prevent>
      <button class="close" aria-label="close">${CLOSE_SVG}</button>
      <div class="sheet-inner"><div class="sheet-art"></div><div class="sheet-text"></div></div>
    </div>
    <nav class="case-rail home-rail" aria-hidden="true"></nav>
    <section class="case" aria-label="case study" data-lenis-prevent>
      <div class="case-scroll"><header class="case-head"></header></div>
    </section>`;
  const grid = root.querySelector(".grid");
  const fx = root.querySelector(".fx");
  const sheet = root.querySelector(".sheet-body");
  const casePanel = root.querySelector(".case");
  const navEl = root.querySelector(".nav");
  const rail = root.querySelector(".home-rail");
  const navH = () => navEl.getBoundingClientRect().height;
  const syncNav = () => root.style.setProperty("--nav-h", navH() + "px");
  const lock = v => document.documentElement.classList.toggle("home-locked", v);

  const state = { open: null };
  let TILES = [], cells = [], COLS = 0, ROWS = 0, S = 0, strings = [], mark = null;

  /*
   * Slots follow the reference's tile order: pro where "J" is, about where
   * "E" is, itch where "N" is. The ball sits at the end of the second row.
   */
  function sequence(cols) {
    const [s0, s1, s2] = cfg.serious;
    const seq = MOBILE()
      ? [P.pro, ...cfg.work, P.itch, s0, s1, s2, P.about, ...cfg.side] // phone: no empty cells
      : [P.pro, ...cfg.work, P.itch, s0, s1, s2, P.about, MARK, BLANK, ...cfg.side];
    const out = seq.filter(Boolean);
    while (out.length % cols) out.push(BLANK);
    return out;
  }

  function thumb(d) {
    if (d.p) return PORTRAIT[d.p];
    if (!d.cover) return `<div class="ph"></div>`;
    const src = d.poster || d.cover;
    return `<div class="thumb ${d.fit === "cover" ? "cover" : "contain"}"><img src="${esc(src)}" alt="" decoding="async"${d.position ? ` style="object-position:${esc(d.position)}"` : ""}/></div>`;
  }

  function build(first) {
    if (mark) { clearTimeout(mark.timer); mark = null; }
    COLS = colsFor(innerWidth);
    TILES = sequence(COLS);
    ROWS = TILES.length / COLS;
    S = grid.clientWidth / COLS;
    document.documentElement.style.setProperty("--cell", S + "px"); // the rail's tile size
    grid.innerHTML = "";
    grid.style.height = S * ROWS + "px";
    syncNav();
    const mob = MOBILE();
    cells = TILES.map((d, i) => {
      const interactive = !d.blank && !d.mark && (d.p || d.href);
      const el = document.createElement(interactive ? "a" : "div");
      el.className = "cell" + (d.p ? ` portrait ${d.p}` : "") + (d.mark ? " mark" : "") + (d.blank ? " blank" : "") + (first ? "" : " in");
      Object.assign(el.style, { left: (i % COLS) * S + "px", top: Math.floor(i / COLS) * S + "px", width: S + "px", height: S + "px" });
      if (d.mark) { buildMark(el, i); }
      else if (d.blank) { el.innerHTML = `<div class="blur"></div>`; on(el, "pointerenter", clearHover); }
      else {
        const t = mob && d.mt ? d.mt : d.t, tags = mob && d.mtags ? d.mtags : d.tags;
        if (interactive) {
          el.href = d.p ? `#${d.p}` : d.href;
          el.setAttribute("aria-label", `${t}, ${tags}`);
          on(el, "click", e => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
            if (d.p) { e.preventDefault(); openPortrait(i); }
            else if (!MOBILE() && !reduce) { e.preventDefault(); openCase(i); }
          });
        }
        el.innerHTML = `<div class="blur"><div class="obj">${thumb(d)}</div></div>
          ${d.ctx ? `<span class="ctx">${esc(d.ctx)}</span>` : ""}
          <div class="label"><div class="t">${esc(t)}</div><div class="tags">${esc(tags)}</div>${d.kw ? `<div class="kw">${esc(d.kw)}</div>` : ""}</div>`;
        if (d.anim) {
          const img = el.querySelector("img");
          on(el, "pointerenter", () => { if (img) img.src = d.cover; });
          on(el, "pointerleave", () => { if (img) img.src = d.poster; });
        }
        on(el, "pointerenter", () => enter(i));
        on(el, "focus", () => enter(i));
        on(el, "pointerleave", () => leave(i));
        on(el, "blur", () => leave(i));
      }
      grid.appendChild(el);
      return el;
    });
    buildStrings();
    if (first) { if (!returnTo()) load(); }
  }

  /*
   * BACK FROM A CASE STUDY. The case page leaves a note saying which project
   * it was. The grid then opens already split on that tile, exactly as it
   * looked when the project opened, and closes: the way out mirrors the way in.
   */
  function returnTo() {
    const ret = readReturn();
    if (!ret) return false;
    try { sessionStorage.setItem("introSeen", "1"); } catch { /* none */ }
    // about: the about sheet opens from the #about hash; the grid just shows
    if (ret.to === "about") { cells.forEach(c => c.classList.add("in")); return true; }
    state.after = ret.to;
    const i = TILES.findIndex(d => d.slug === ret.slug);
    if (i < 0 || MOBILE() || reduce) {
      cells.forEach(c => c.classList.add("in"));
      if (state.after) { const to = state.after; state.after = null; later(() => toSection(to), 60); }
      else if (i >= 0) later(() => cells[i].scrollIntoView({ block: "center" }), 0);
      return true;
    }
    cells.forEach(c => { c.style.transition = "none"; c.classList.add("in"); });
    // bring the tile's row into view, then put the grid in its split state
    const row = Math.floor(i / COLS), g0 = grid.getBoundingClientRect();
    const want = g0.top + scrollY + row * S - Math.max(0, (innerHeight - S) / 2);
    window.scrollTo(0, Math.max(0, want));
    const g = grid.getBoundingClientRect();
    const { c, x, tl, tr } = splitGeometry(i);
    state.open = { kind: "case", i };
    lock(true);
    fillHead(TILES[i]);
    shiftColumns(c, tl, tr);
    casePanel.style.left = g.left + x + tl + "px";
    casePanel.style.width = tr - tl + "px";
    casePanel.classList.add("show", "in");
    rail.classList.add("show", "in");
    raf(() => { cells.forEach(el => el.style.transition = ""); later(closeCase, 120); });
    return true;
  }

  /*
   * LOAD. Like the reference: a small dot holds the centre while the
   * thumbnails on screen arrive, then every tile comes in at once, slightly
   * staggered, out of a blur and up from a smaller size. On a first visit the
   * ball rolls in before that (see intro).
   */
  function load() {
    root.classList.add("loading");
    const dot = document.createElement("div"); dot.className = "loader";
    root.appendChild(dot);
    const imgs = [...grid.querySelectorAll("img")].filter(im => im.getBoundingClientRect().top < innerHeight);
    const ready = Promise.all(imgs.map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; })));
    const minWait = new Promise(r => later(r, 450));
    let go = false;
    const start = () => {
      if (go || dead) return; go = true;
      dot.classList.add("out"); later(() => dot.remove(), 300);
      let seen = false;
      try { seen = sessionStorage.getItem("introSeen") === "1"; sessionStorage.setItem("introSeen", "1"); } catch { /* no storage: play it */ }
      if (mark && !seen && !reduce && intro(reveal)) return;
      reveal(false);
    };
    Promise.all([ready, minWait]).then(start);
    later(start, 2500); // never hold the page for a slow image
  }
  function reveal(afterIntro) {
    if (afterIntro && mark) {
      // The rail is already lying on the page: show the lines layer at once
      // (no fade) so it carries straight on from the intro's thread.
      const layer = grid.querySelector(".strings");
      layer.style.transition = "none";
      root.classList.remove("loading");
      const mc = cells[mark.i]; // the ball is already here: no fade
      mc.style.transition = "none"; mc.classList.add("in"); void mc.offsetWidth; mc.style.transition = "";
      unspool();
      raf(() => raf(() => { layer.style.transition = ""; }));
      return;
    }
    root.classList.remove("loading");
    [...cells.keys()].sort(() => Math.random() - .5).forEach((i, n) => later(() => cells[i].classList.add("in"), n * 22));
  }

  // ================= INTRO =================
  /*
   * First visit only. The ball is there from the start, already wound with
   * its one line, sitting on the grid line under its own cell at the left
   * edge of the page. It rolls along that line into the far corner of its
   * cell, paying out a straight thread that lies exactly on the grid line.
   * Then the rest of the grid draws itself out of it.
   */
  function intro(done) {
    const m = mark, row = Math.floor(m.i / COLS), col = m.i % COLS;
    const g = grid.getBoundingClientRect(), r = m.r;
    const fy = g.top + (row + 1) * S;                 // the grid line it rolls on
    if (fy > innerHeight || fy - 2 * r < 0) return false;
    const x0 = g.left + r + SQUIRM, x1 = g.left + (col + .5) * S + SQUIRM;
    const cy = fy - r;
    // finish with the line wound exactly where the resting ball will have it
    const endTa = (135 + (SQUIRM / r) * 57.3 * 1.6) * Math.PI / 180;
    root.classList.add("intro-on");
    const wrap = document.createElement("div"); wrap.className = "intro";
    wrap.innerHTML = `<svg aria-hidden="true"><path class="rail"/><circle class="iball" r="${r}"/><path class="iwrap"/></svg>`;
    root.appendChild(wrap);
    const rail = wrap.querySelector(".rail"), ball = wrap.querySelector(".iball"), iw = wrap.querySelector(".iwrap");
    const place = x => {
      ball.setAttribute("cx", x); ball.setAttribute("cy", cy);
      iw.setAttribute("d", wrapPath(x, cy, r, endTa - (x1 - x) / r));
      rail.setAttribute("d", `M ${g.left} ${fy} L ${x} ${fy}`);
    };
    place(x0);
    let finished = false;
    const finish = () => {
      if (finished) return; finished = true;
      removeEventListener("pointerdown", finish); removeEventListener("keydown", finish);
      m.px = SQUIRM; m.py = SQUIRM; m.vx = m.vy = 0; markKick();
      done(true); // primes the grid lines before the grid is shown
      root.classList.remove("intro-on");
      wrap.remove();
    };
    on(window, "pointerdown", finish); on(window, "keydown", finish);
    // 0-500ms: it sits there. Then it rolls, pushing off and slowing to a stop.
    const HOLD = 500, ROLL = Math.min(1900, 900 + (x1 - x0) * .9);
    const t0 = performance.now();
    raf(function f(now) {
      if (finished) return;
      const t = now - t0;
      if (t > HOLD) {
        const u = Math.min(1, (t - HOLD) / ROLL);
        place(x0 + (x1 - x0) * inOutCubic(u));
        if (u >= 1) return finish();
      }
      raf(f);
    });
    return true;
  }

  /*
   * UNSPOOL. After the intro the whole grid is pulled out of the rail the
   * ball laid, like threads drawn off a taut line:
   *  - every vertical line sprouts where it crosses the rail and runs up and
   *    down from there at one steady speed;
   *  - the rest of the rail, past the ball, carries on along the floor and
   *    sprouts its verticals as it reaches them;
   *  - each horizontal line is pulled sideways out of the verticals at its
   *    two ends, meeting in the middle (only one end at the page edge);
   *  - a line that has just been pulled through gives a small twang;
   *  - a tile comes up once the lines around it have reached it.
   * The rail itself is already on the page, so those segments stay as they are.
   */
  function unspool() {
    if (reduce || !mark) return;
    const col = mark.i % COLS, floor = (Math.floor(mark.i / COLS) + 1) * S;
    const xc = (col + .5) * S + SQUIRM;                  // where the ball touches the floor
    const Wd = COLS * S, Hd = ROWS * S;
    const far = Math.max(floor, Hd - floor) + Math.max(0, Wd - xc);
    const v = Math.max(S / 260, far / 1500);             // px per ms: a thread pulled at one speed
    const along = x => Math.max(0, x - xc) / v;          // when the floor thread reaches x
    const at = (x, y) => along(x) + Math.abs(y - floor) / v; // when a vertical through x reaches y
    const plans = [];
    for (const st of strings) {
      let tA = Infinity, tB = Infinity, pre = 0;        // A grows from the path start, B from its end
      if (st.vertical) {
        if (st.from >= floor) tA = at(st.at, st.from);   // below the rail: grows downward
        else tB = at(st.at, st.from + S);                // above it: grows upward
      } else if (st.at === floor) {
        if (st.from + S <= xc) continue;                 // laid by the ball already
        if (st.from < xc) { pre = (xc - st.from) / S; tA = 0; } else tA = along(st.from);
      } else {
        if (st.from > 0) tA = at(st.from, st.at);        // pulled from the vertical on its left
        if (st.from + S < Wd) tB = at(st.from + S, st.at); // and from the one on its right
      }
      st.path.setAttribute("pathLength", "1");
      st.path.style.strokeDasharray = pre ? `${pre} 1` : "0 1";
      plans.push({ st, tA, tB, pre });
    }
    // tiles come up as the lines reach them
    cells.forEach((el, i) => {
      if (el.classList.contains("in")) return;
      const cx = (i % COLS + .5) * S, cy = (Math.floor(i / COLS) + .5) * S;
      later(() => el.classList.add("in"), at(cx, cy) + S * .25 / v);
    });
    const t0 = performance.now();
    raf(function f(now) {
      const t = now - t0;
      let left = 0;
      for (const p of plans) {
        if (p.done) continue;
        const a = Math.min(1, p.pre + Math.max(0, t - p.tA) * v / S);
        const b = Math.min(1, Math.max(0, t - p.tB) * v / S);
        if (a + b >= 1) {
          p.done = true;
          p.st.path.style.strokeDasharray = "";
          if (!p.st.held) pluck(p.st, (Math.random() < .5 ? -1 : 1) * (2 + Math.random() * 2)); // taut: a small twang
          continue;
        }
        left++;
        p.st.path.style.strokeDasharray = `${a} ${1 - a - b} ${b}`;
      }
      if (left) raf(f);
    });
  }

  // ================= HOVER =================
  function enter(i) {
    if (MOBILE() || state.open) return;
    cells.forEach((c, j) => c.classList.toggle("on", j === i));
    grid.classList.toggle("hovering", !TILES[i].p); // only projects soften the page
  }
  function leave(i) {
    cells[i].classList.remove("on");
    if (!cells.some(c => c.classList.contains("on"))) grid.classList.remove("hovering");
  }
  function clearHover() { grid.classList.remove("hovering"); cells.forEach(c => c.classList.remove("on")); }
  on(grid, "pointerleave", clearHover);
  let keyboard = false;
  on(window, "keydown", e => { if (e.key === "Tab" || e.key === "Escape" || e.key === "Enter") keyboard = true; }, true);
  on(window, "pointerdown", () => { keyboard = false; }, true);

  // ================= THE MARK =================
  function buildMark(el, i) {
    const r = S / 2 - SQUIRM, C = S; // svg is 2S x 2S, ball centred at (S, S)
    // drops share the whole left half: top (cv) round to bottom (github)
    const W = cfg.wheel, step = Math.PI / (W.length - 1);
    const opts = W.map((w, k) => ({ w, ang: Math.PI + ((W.length - 1) / 2 - k) * step, t0: 0, from: 0, to: 0, p: 0, s: 1, sTo: 1 }));
    el.tabIndex = 0;
    el.setAttribute("aria-label", "links");
    el.innerHTML = `<svg class="goo" viewBox="0 0 ${2 * S} ${2 * S}" aria-hidden="true">
        <defs><filter id="home-goo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/>
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"/>
        </filter></defs>
        <path class="thread"/>
        <g filter="url(#home-goo)"><circle class="b ball" cx="${C}" cy="${C}" r="${r}"/>${opts.map(() => `<line class="stem" x1="${C}" y1="${C}" x2="${C}" y2="${C}"/><circle class="b drop" cx="${C}" cy="${C}" r="${BLOB}"/>`).join("")}</g>
        <path class="wrap"/>
      </svg>
      <div class="face"><span class="line">${esc(cfg.line)}</span><span class="hi">${esc(cfg.hi)}</span></div>
      <div class="reach"></div>
      ${opts.map(({ w: [g, t, h] }) => `<a class="opt" href="${esc(h)}"${linkAttrs(h)} aria-label="${esc(t)}">${g}<span class="tip">${esc(t)}</span></a>`).join("")}`;
    const blobs = [...el.querySelectorAll(".goo .drop")], stems = [...el.querySelectorAll(".goo .stem")], links = [...el.querySelectorAll(".opt")];
    opts.forEach((o, k) => {
      o.blob = blobs[k]; o.stem = stems[k]; o.link = links[k];
      const grow = v => () => { o.sTo = v; markKick(); };
      on(o.link, "pointerenter", grow(1.16)); on(o.link, "pointerleave", grow(1));
      on(o.link, "focus", grow(1.16)); on(o.link, "blur", grow(1));
    });
    mark = { el, i, r, rr: r, k: 0, C, opts, px: (Math.random() - .5) * SQUIRM, py: -SQUIRM, vx: 0, vy: 0, last: performance.now(), contact: {},
      ball: el.querySelector(".ball"), face: el.querySelector(".face"), thread: el.querySelector(".thread"), wrap: el.querySelector(".wrap"),
      open: false, bx: 0, by: 0, timer: null, running: false, tug: null };
    const m = mark;
    const setOpen = v => {
      if (m.open === v) return;
      m.open = v; el.classList.toggle("open", v);
      if (v) clearHover();
      const now = performance.now(), n = opts.length;
      opts.forEach((o, k) => { o.from = o.p; o.to = v ? 1 : 0; o.t0 = now + (v ? k : n - 1 - k) * (v ? 55 : 30); o.dur = v ? 720 : 260; });
      markKick();
    };
    on(el, "pointerenter", () => setOpen(true));
    on(el, "pointerleave", () => setOpen(false));
    on(el, "focusin", () => setOpen(true));
    on(el, "focusout", e => { if (!el.contains(e.relatedTarget)) setOpen(false); });
    scheduleFidget();
    markKick();
  }
  function markKick() { if (mark && !mark.running) { mark.running = true; raf(markFrame); } }
  /*
   * BALL IN A BOX, WITH GRAVITY. It falls, lands on the grid line below it
   * and rests there, its weight sagging that line a hair. Nothing pulls it
   * back to the middle: it rolls along the floor until friction stops it, so
   * it can come to rest anywhere, often tucked against a side line. Any line
   * it presses into bends and pushes back; when it leaves, the line wobbles.
   */
  function markFrame(now) {
    const m = mark; if (!m) return;
    let active = false;
    const dt = Math.min(2.5, (now - m.last) / 16.67); m.last = now;
    if (!m.open) {
      let fx = 0, fy = GRAVITY;
      if (m.tug) fx += m.tug.x * .012;
      const lim = SQUIRM, sides = cellSides(m.i);
      let onFloor = false;
      for (const [axis, sgn, st] of [["x", -1, sides.left], ["x", 1, sides.right], ["y", -1, sides.top], ["y", 1, sides.bottom]]) {
        const pos = axis === "x" ? m.px : m.py, over = sgn * pos - lim, key = axis + sgn;
        if (over > 0 && st) {
          // pressing into the line: it bends, and pushes back like a stiff spring;
          // side lines soak up more, so the ball settles against them
          const vel = axis === "x" ? m.vx : m.vy;
          const f = -sgn * over * 0.4 - (sgn * vel > 0 ? vel * (axis === "x" ? .45 : .25) : 0);
          if (axis === "x") fx += f; else fy += f;
          // the floor also carries the ball's weight, so it sags a little more at rest
          st.tween = null; st.off = sgn * (Math.min(over, 8) * 2.2 + (axis === "y" && sgn === 1 ? 2.4 : 0)); st.along = S / 2 + (axis === "x" ? m.py : m.px); draw(st);
          m.contact[key] = st;
          if (axis === "y" && sgn === 1) onFloor = true;
        } else if (over > 0) {
          // the page edge: no string, a dead stop
          if (axis === "x") { m.px = sgn * lim; m.vx *= -.3; } else { m.py = sgn * lim; m.vy *= -.3; if (sgn === 1) onFloor = true; }
        } else if (m.contact[key]) { release(m.contact[key]); delete m.contact[key]; }
      }
      m.vx = (m.vx + fx * dt) * Math.pow(onFloor ? .965 : .995, dt); // rolling friction only on the floor
      m.vy = (m.vy + fy * dt) * Math.pow(.995, dt);
      m.px += m.vx * dt; m.py += m.vy * dt;
      if (Math.abs(m.vx) > .01 || Math.abs(m.vy) > .01 || m.tug) active = true;
      else { m.vx = m.vy = 0; }
    } else {
      for (const k in m.contact) { release(m.contact[k]); delete m.contact[k]; }
      m.px *= .8; m.py *= .8; m.vx = m.vy = 0;
    }
    const kTo = m.open ? 1 : 0;
    m.k += (kTo - m.k) * .16; if (Math.abs(kTo - m.k) > .002) active = true; else m.k = kTo;
    const kk = m.k < .5 ? 2 * m.k * m.k : 1 - Math.pow(-2 * m.k + 2, 2) / 2;
    m.rr = m.r * (1 - (1 - SHRINK) * kk);
    const ring = m.rr + NECK + BLOB;
    const hx = kk * (S / 2 - 8 - m.rr); // pushed to the right edge while open
    m.bx = m.px + hx; m.by = m.py;
    const cx = m.C + m.bx, cy = m.C + m.by, rot = (m.px / m.r) * 57.3;
    m.ball.setAttribute("cx", cx); m.ball.setAttribute("cy", cy); m.ball.setAttribute("r", m.rr);
    m.face.style.transform = `translate(${m.bx}px, ${m.by}px) rotate(${rot}deg) scale(${m.rr / m.r})`;
    /*
     * One line around the ball: a great circle seen at a tilt, front half
     * only, so it reads as a single strand wound round it. It starts where the
     * loose end leaves the surface, so rolling winds both together.
     */
    const ta = (135 + rot * 1.6) * Math.PI / 180;
    const ux = Math.cos(ta), uy = Math.sin(ta);
    m.wrap.setAttribute("d", wrapPath(cx, cy, m.rr, ta));
    // the loose end drops to the floor and runs along it to the cell's
    // bottom-left corner, where it carries on as the grid line
    const sx = cx + ux * (m.rr - 1), sy = cy + uy * (m.rr - 1);
    const ex = m.C - S / 2, ey = m.C + S / 2;
    m.thread.setAttribute("d", `M ${sx} ${sy} C ${sx - 6} ${ey} ${sx - 18} ${ey} ${ex} ${ey}`);

    // drops
    for (const o of m.opts) {
      if (o.t0 && now >= o.t0) {
        const u = Math.min(1, (now - o.t0) / o.dur);
        o.p = o.from + (o.to - o.from) * (o.to ? elastic(u) : inOutSine(u));
        if (u < 1) active = true; else o.t0 = 0;
      } else if (o.t0) active = true;
      o.s += (o.sTo - o.s) * .25; if (Math.abs(o.sTo - o.s) > .002) active = true;
      const x = cx + Math.cos(o.ang) * ring * o.p, y = cy + Math.sin(o.ang) * ring * o.p;
      o.blob.setAttribute("cx", x); o.blob.setAttribute("cy", y); o.blob.setAttribute("r", BLOB * o.s * Math.min(1, .35 + o.p));
      // stem from the ball's rim to the drop; thins as the drop travels out
      const rx = cx + Math.cos(o.ang) * (m.rr - 4), ry = cy + Math.sin(o.ang) * (m.rr - 4);
      o.stem.setAttribute("x1", rx); o.stem.setAttribute("y1", ry); o.stem.setAttribute("x2", x); o.stem.setAttribute("y2", y);
      o.stem.setAttribute("stroke-width", o.p > .02 ? 7 + 5 * (1 - Math.min(1, o.p)) : 0);
      o.link.style.left = x - S / 2 + "px"; o.link.style.top = y - S / 2 + "px";
      o.link.classList.toggle("shown", m.open && o.p > .6);
    }
    if (active) raf(markFrame); else m.running = false;
  }
  function cellSides(i) {
    const c = i % COLS, rr = Math.floor(i / COLS);
    return {
      left: strings.find(s => s.vertical && s.at === c * S && s.from === rr * S),
      right: strings.find(s => s.vertical && s.at === (c + 1) * S && s.from === rr * S),
      top: strings.find(s => !s.vertical && s.at === rr * S && s.from === c * S),
      bottom: strings.find(s => !s.vertical && s.at === (rr + 1) * S && s.from === c * S),
    };
  }
  // the thread pulls taut as the ball rolls off: the grid line it becomes
  // (the floor of the cell to the left) twitches
  function tugThread(m) {
    const c = m.i % COLS, rr = Math.floor(m.i / COLS);
    const st = strings.find(s => !s.vertical && s.at === (rr + 1) * S && s.from === (c - 1) * S);
    if (st && !st.held) pluck(st, -7, S * .85);
  }
  // fidget: a small random nudge every couple of seconds
  function scheduleFidget() {
    if (!mark || reduce) return;
    const m = mark;
    clearTimeout(m.timer);
    m.timer = later(() => {
      if (mark !== m) return;
      if (!m.open && !state.open && !document.hidden) {
        if (Math.random() < .25) m.vy -= 1.6 + Math.random(); // a small hop
        else {
          const dir = Math.random() < .5 ? -1 : 1;
          m.vx += dir * (.5 + Math.random() * .9); // a roll
          if (dir > 0) later(() => tugThread(m), 180);
        }
        markKick();
      }
      scheduleFidget();
    }, 2200 + Math.random() * 2600);
  }
  // scroll: the ball lags the page, so it gets thrown the opposite way
  let lastScroll = scrollY;
  on(window, "scroll", () => {
    const dy = scrollY - lastScroll; lastScroll = scrollY;
    if (!mark || mark.open || reduce) return;
    mark.vy += Math.max(-4, Math.min(4, dy * .09)); markKick();
  }, { passive: true });
  // pointer nearby: the ball leans toward it, curious
  on(window, "pointermove", e => {
    if (!mark || mark.open || reduce) return;
    const b = mark.el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy), reach = S * 1.6;
    if (d < reach && d > 1) { const f = (1 - d / reach) * SQUIRM * .9; mark.tug = { x: dx / d * f, y: dy / d * f }; markKick(); }
    else if (mark.tug) { mark.tug = null; markKick(); }
  }, { passive: true });

  // ================= ELASTIC STRINGS =================
  function buildStrings() {
    const layer = document.createElement("div");
    layer.className = "strings";
    strings = [];
    const add = (vertical, at, from, col) => {
      const svg = document.createElementNS(SVGNS, "svg");
      const path = document.createElementNS(SVGNS, "path");
      svg.setAttribute("aria-hidden", "true");
      if (vertical) {
        svg.setAttribute("viewBox", `0 0 ${HALF * 2} ${S}`);
        Object.assign(svg.style, { left: at - HALF + "px", top: from + "px", width: HALF * 2 + "px", height: S + "px" });
      } else {
        svg.setAttribute("viewBox", `0 0 ${S} ${HALF * 2}`);
        Object.assign(svg.style, { left: from + "px", top: at - HALF + "px", width: S + "px", height: HALF * 2 + "px" });
      }
      svg.appendChild(path);
      layer.appendChild(svg);
      const st = { vertical, at, from, col, svg, path, off: 0, along: S / 2, held: false, tween: null };
      draw(st);
      strings.push(st);
    };
    // `col` is the column a string travels with when the grid splits: a
    // vertical line belongs to the column on its right, a horizontal segment
    // to its own.
    for (let c = 1; c < COLS; c++) for (let r = 0; r < ROWS; r++) add(true, c * S, r * S, c);
    for (let r = 1; r <= ROWS; r++) for (let c = 0; c < COLS; c++) add(false, r * S, c * S, c);
    grid.appendChild(layer);
  }
  function draw(st) {
    const a = st.along, o = HALF + st.off;
    st.path.setAttribute("d", st.vertical
      ? `M ${HALF} 0 C ${HALF} ${a} ${o} ${a} ${HALF} ${S}`
      : `M 0 ${HALF} C ${a} ${HALF} ${a} ${o} ${S} ${HALF}`);
  }
  function release(st) { st.held = false; st.tween = { t0: performance.now(), off: st.off, along: st.along }; tick(); }
  function pluck(st, off, along) { st.off = off; st.along = along ?? S / 2; draw(st); release(st); }

  let last = null, ticking = false;
  on(window, "pointermove", e => {
    if (state.open) { last = null; return; }
    const r = grid.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (last) for (const st of strings) {
      const d = (st.vertical ? x : y) - st.at, u = (st.vertical ? y : x) - st.from;
      const pd = (st.vertical ? last.x : last.y) - st.at;
      const inside = u >= 0 && u <= S;
      if (st.held) {
        if (!inside || Math.abs(d) > HALF) { release(st); continue; }
        st.off = d * PULL; st.along = u; draw(st);
      } else if (inside && Math.sign(d) !== Math.sign(pd) && Math.abs(d) <= HALF) {
        st.held = true; st.tween = null; st.off = d * PULL; st.along = u; draw(st);
      }
    }
    last = { x, y };
  }, { passive: true });
  on(document, "pointerleave", () => { last = null; strings.forEach(st => st.held && release(st)); });
  function tick() {
    if (ticking) return;
    ticking = true;
    raf(function frame(now) {
      let active = false;
      for (const st of strings) {
        if (!st.tween) continue;
        const t = Math.min(1, (now - st.tween.t0) / RELEASE_MS), k = elastic(t);
        st.off = st.tween.off * (1 - k);
        st.along = st.tween.along + (S / 2 - st.tween.along) * k;
        draw(st);
        if (t < 1) active = true; else st.tween = null;
      }
      if (active) raf(frame); else ticking = false;
    });
  }

  // Run fn(t) for t in 0..1 over ms, then done().
  function animate(ms, fn, done) {
    if (reduce) { fn(1); if (done) done(); return; }
    const t0 = performance.now();
    raf(function f(now) {
      const t = Math.min(1, (now - t0) / ms);
      fn(t);
      if (t < 1) raf(f); else if (done) done();
    });
  }

  /* ================= PORTRAITS: RUBBER-BAND TILE =================
   * The tile's four edges are grabbed and stretched outward: the rectangle
   * grows to fill the screen while each side bows like a pulled band, then
   * snaps straight with the strings' elastic ease. Lines around the tile get
   * shoved outward as it grows. Closing runs it in reverse and plucks the
   * tile's own edges as it lands.
   */
  function bandPath(x, y, w, h, b) {
    return `M ${x} ${y} Q ${x + w / 2} ${y - b} ${x + w} ${y} Q ${x + w + b} ${y + h / 2} ${x + w} ${y + h}
            Q ${x + w / 2} ${y + h + b} ${x} ${y + h} Q ${x - b} ${y + h / 2} ${x} ${y} Z`;
  }
  // Bow: rises while the band is pulled, then lets go elastically (overshooting inward).
  const bow = (t, A) => t < .3 ? A * Math.sin(t / .3 * Math.PI / 2) : A * (1 - elastic((t - .3) / .7));

  function shove(i, amount) {
    const cx = (i % COLS + .5) * S, cy = (Math.floor(i / COLS) + .5) * S;
    for (const st of strings) {
      const mid = st.from + S / 2, d = st.at - (st.vertical ? cx : cy), dist = Math.hypot(d, mid - (st.vertical ? cy : cx));
      const fall = Math.max(0, 1 - dist / (S * 2.6));
      if (fall > 0) pluck(st, Math.sign(d || 1) * amount * fall, Math.max(0, Math.min(S, (st.vertical ? cy : cx) - st.from)));
    }
  }

  function openPortrait(i, quiet) {
    if (state.open) return;
    const d = TILES[i], r = cells[i].getBoundingClientRect();
    state.open = { kind: "portrait", i, quiet };
    clearHover();
    lock(true);
    sheet.querySelector(".sheet-art").innerHTML = PORTRAIT[d.p];
    sheet.querySelector(".sheet-text").innerHTML = cfg.sheets[d.p] + linkRow();
    if (!quiet) history.pushState({ homeOpen: d.p }, "", `#${d.p}`);
    const path = document.createElementNS(SVGNS, "path");
    path.classList.add("sheet");
    fx.innerHTML = ""; fx.appendChild(path);
    shove(i, 34);
    const A = Math.min(70, innerWidth * .06);
    animate(820, t => {
      const p = outExpo(t);
      const top = navH(), H = innerHeight - top;
      const x = r.left * (1 - p), y = r.top + (top - r.top) * p;
      const w = r.width + (innerWidth - r.width) * p, h = r.height + (H - r.height) * p;
      path.setAttribute("d", bandPath(x, y, w, h, bow(t, A)));
      if (t > .55 && !sheet.classList.contains("show")) { sheet.classList.add("show"); raf(() => sheet.classList.add("in")); }
    }, () => sheet.querySelector(".close").focus());
  }
  function closePortrait() {
    const { i } = state.open, r = cells[i].getBoundingClientRect();
    const path = fx.querySelector("path");
    sheet.classList.remove("in");
    later(() => sheet.classList.remove("show"), 250);
    const A = Math.min(50, innerWidth * .045);
    animate(700, t => {
      const p = inOutQuart(t);
      const top = navH(), H = innerHeight - top;
      const x = r.left * p, y = top + (r.top - top) * p;
      const w = innerWidth + (r.width - innerWidth) * p, h = H + (r.height - H) * p;
      if (path) path.setAttribute("d", bandPath(x, y, w, h, -bow(t, A))); // pushed in as it shrinks
    }, () => {
      fx.innerHTML = "";
      landEdges(i, 22);
      finishClose(i);
    });
  }
  // Pluck the four edges of tile i, as if it had just snapped back into place.
  function landEdges(i, amount) {
    const c = i % COLS, rr = Math.floor(i / COLS);
    for (const st of strings) {
      const left = st.vertical && st.at === c * S && st.from === rr * S, right = st.vertical && st.at === (c + 1) * S && st.from === rr * S;
      const top = !st.vertical && st.at === rr * S && st.from === c * S, bottom = !st.vertical && st.at === (rr + 1) * S && st.from === c * S;
      if (left || top) pluck(st, -amount); else if (right || bottom) pluck(st, amount);
    }
  }

  /* ================= CASE STUDIES: CURTAIN SPLIT =================
   * The grid parts at the clicked tile's left edge: columns to the left slide
   * left, the tile's column and everything right of it slide right, and the
   * project opens in the gap, growing out of the tile. The horizontal lines
   * that crossed the gap stretch like rubber bands and snap one by one. Once
   * the gap is open the browser goes to the case study page. Coming back
   * (bfcache) closes the curtain again and the seam wobbles on impact.
   */
  // The gap always leaves one strip of grid each side, the same frame the
  // case study page draws, so the hand-off lines up.
  function splitGeometry(i) {
    const c = i % COLS, x = c * S, Wd = grid.clientWidth;
    return { c, x, Wd, tl: S - x, tr: (Wd - STRIP_R) - x };
  }
  const fillHead = d => {
    root.querySelector(".case-head").innerHTML = `${d.ctx ? `<span class="c-ctx">${esc(d.ctx)}</span>` : ""}<h1 class="c-title">${esc(d.t)}</h1><p class="c-tags">${esc(d.tags)}</p>${d.kw ? `<p class="c-kw">${esc(d.kw)}</p>` : ""}`;
    rail.innerHTML = railHTML(d.sec || "pro");
  };
  function shiftColumns(c, tl, tr) {
    cells.forEach((el, j) => el.style.transform = `translateX(${(j % COLS) < c ? tl : tr}px)`);
    strings.forEach(st => st.svg.style.transform = `translateX(${st.col < c ? tl : tr}px)`);
  }

  function openCase(i) {
    if (state.open) return;
    const d = TILES[i];
    state.open = { kind: "case", i };
    clearHover();
    lock(true);
    fillHead(d);
    const g = grid.getBoundingClientRect();
    const { c, x, tl, tr } = splitGeometry(i);
    fx.innerHTML = "";
    const bands = [];
    for (let r = 1; r <= ROWS; r++) {
      const y = g.top + r * S;
      if (y < navH() || y > innerHeight) continue;
      const mk = () => { const p = document.createElementNS(SVGNS, "path"); fx.appendChild(p); return p; };
      bands.push({ y, whole: mk(), left: mk(), right: mk(), snapAt: .22 + Math.random() * .3, snapped: null });
    }
    casePanel.classList.add("show");
    rail.classList.add("show");
    let gone = false;
    const go = () => { if (!gone) { gone = true; location.href = d.href; } };
    animate(950, t => {
      const p = inOutQuart(t);
      const xl = g.left + x + tl * p, xr = g.left + x + tr * p;
      shiftColumns(c, tl * p, tr * p);
      // The panel starts as the tile and widens into the gap.
      casePanel.style.left = xl + "px";
      casePanel.style.width = xr + S * (1 - p) - xl + "px";
      for (const b of bands) {
        if (!b.snapped && t >= b.snapAt) b.snapped = { t, gap: xr - xl };
        if (!b.snapped) {
          b.whole.setAttribute("d", `M ${xl} ${b.y} L ${xr} ${b.y}`);
        } else {
          b.whole.setAttribute("d", "");
          const u = Math.min(1, (t - b.snapped.t) / .45), half = b.snapped.gap / 2;
          const len = half * (1 - outCubic(u)), sag = 9 * Math.sin(u * 18) * (1 - u);
          b.left.setAttribute("d", len > .5 ? `M ${xl} ${b.y} Q ${xl + len / 2} ${b.y + sag} ${xl + len} ${b.y - sag / 2}` : "");
          b.right.setAttribute("d", len > .5 ? `M ${xr} ${b.y} Q ${xr - len / 2} ${b.y - sag} ${xr - len} ${b.y + sag / 2}` : "");
        }
      }
      if (t > .6 && !casePanel.classList.contains("in")) casePanel.classList.add("in");
      if (t > .45 && !rail.classList.contains("in")) rail.classList.add("in");
      if (t > .82) go(); // the next page is already loading as the curtain settles
    }, () => { fx.innerHTML = ""; go(); });
  }
  function closeCase() {
    const { i } = state.open;
    const g = grid.getBoundingClientRect();
    const { c, x, tl, tr } = splitGeometry(i);
    casePanel.classList.remove("in");
    rail.classList.remove("in");
    animate(700, t => {
      const p = 1 - inOutQuart(t);
      const xl = g.left + x + tl * p, xr = g.left + x + tr * p;
      shiftColumns(c, tl * p, tr * p);
      casePanel.style.left = xl + "px";
      casePanel.style.width = Math.max(0, xr - xl) + "px";
    }, () => {
      casePanel.classList.remove("show");
      rail.classList.remove("show");
      cells.forEach(el => el.style.transform = ""); strings.forEach(st => st.svg.style.transform = "");
      for (const st of strings) if (st.vertical && st.at === c * S) pluck(st, (st.from / S) % 2 ? 26 : -26);
      landEdges(i, 10);
      finishClose(i);
    });
  }

  function finishClose(i) {
    state.open = null;
    lock(false);
    // Hand focus back to the tile only for keyboard users; for a pointer it
    // would just draw the focus ring (and blur the page) over the grid.
    if (keyboard) cells[i]?.focus({ preventScroll: true });
    else clearHover();
    if (state.after) { const to = state.after; state.after = null; later(() => toSection(to), 120); }
  }
  // Scroll the grid so a section's portrait tile sits on the top row.
  function toSection(p) {
    const i = TILES.findIndex(d => d.p === p);
    if (i < 0) return;
    const top = grid.getBoundingClientRect().top + scrollY + Math.floor(i / COLS) * S - navH();
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }
  const readReturn = () => {
    let r = null;
    try {
      const raw = sessionStorage.getItem("homeReturn");
      sessionStorage.removeItem("homeReturn");
      if (raw) r = raw[0] === "{" ? JSON.parse(raw) : { slug: raw, to: null };
    } catch { /* none */ }
    return r;
  };
  function closeAny(fromHistory) {
    if (!state.open) return;
    if (state.open.kind === "case") return closeCase();
    if (!fromHistory && state.open.quiet) { history.replaceState(null, "", location.pathname); closePortrait(); }
    else if (!fromHistory) history.back(); // popstate does the closing
    else closePortrait();
  }
  sheet.querySelector(".close").addEventListener("click", () => closeAny(false));
  on(window, "popstate", () => closeAny(true));
  on(window, "keydown", e => { if (e.key === "Escape") closeAny(false); });
  // Clicking the strip of grid left beside an open case closes it.
  on(grid, "click", e => { if (state.open && state.open.kind === "case") { e.preventDefault(); e.stopPropagation(); closeAny(false); } }, true);
  // Back from a case study: a page restored from the back/forward cache is
  // still split open, so close the curtain.
  on(window, "pageshow", e => {
    if (!e.persisted) return;
    const ret = readReturn();
    if (state.open && state.open.kind === "case") { state.after = ret && ret.to !== "about" ? ret.to : null; closeCase(); }
  });

  let resizeT = 0;
  on(window, "resize", () => { clearTimeout(resizeT); resizeT = setTimeout(() => { if (!state.open && !dead) build(); }, 120); });

  build(true);
  // A shared link to a portrait (#pro, #about, #itch) opens it.
  const h = location.hash.slice(1), hi = TILES.findIndex(d => d.p === h);
  if (hi >= 0) { history.replaceState({ homeOpen: h }, ""); later(() => openPortrait(hi, true), 300); }

  return () => {
    dead = true;
    offs.forEach(f => f());
    timers.forEach(id => clearTimeout(id));
    clearTimeout(resizeT);
    if (mark) clearTimeout(mark.timer);
    lock(false);
    root.classList.remove("intro-on");
    root.innerHTML = "";
  };
}
