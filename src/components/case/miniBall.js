/*
 * THE SMALL BALL. On a case study the red ball from the home grid drops into
 * the strip on the right, small, and rests at the bottom of the screen. It
 * has the same weight as at home: it falls, bounces and settles, scrolling
 * throws it about, and its one wound line turns as it moves. Under the pointer
 * (or a tap) the contact links bud off it as liquid drops, up and to the left.
 *
 * mountMiniBall(wheel) adds it to the page and returns a function that
 * removes it again.
 */

const R = 18;                 // ball radius
const BLOB = 15, RING = 98;   // drop radius, distance of drops from the ball
const GRAVITY = 0.45, BOUNCE = 0.38;
const PERIOD = 0.45;
const elastic = t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - PERIOD / 4) * (2 * Math.PI) / PERIOD) + 1;
const inOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ext = h => /^https?:/.test(h) || /\.pdf$/.test(h);

function wrapPath(cx, cy, r, ta) {
  const ux = Math.cos(ta), uy = Math.sin(ta), vx = -uy, vy = ux, tilt = .32;
  let d = "";
  for (let s = 0; s <= 16; s++) {
    const a = Math.PI * s / 16, cu = Math.cos(a) * (r - .5), sv = Math.sin(a) * r * tilt;
    d += `${s ? "L" : "M"} ${(cx + ux * cu + vx * sv).toFixed(2)} ${(cy + uy * cu + vy * sv).toFixed(2)} `;
  }
  return d;
}

export function mountMiniBall(wheel) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = document.createElement("div");
  el.className = "mini-ball";
  // drops from straight up (first link) round to straight left (last)
  const n = wheel.length;
  const opts = wheel.map((w, k) => ({ w, ang: -Math.PI / 2 - (k / (n - 1)) * (Math.PI / 2), p: 0, from: 0, to: 0, t0: 0, dur: 1 }));
  el.innerHTML = `
    <svg class="mb-goo" aria-hidden="true">
      <defs><filter id="mb-goo" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
        <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/>
      </filter></defs>
      <g filter="url(#mb-goo)"><circle class="mb-b mb-ball" cx="-99" cy="-99" r="${R}"/>${opts.map(() => `<line class="mb-stem"/><circle class="mb-b mb-drop" r="0"/>`).join("")}</g>
      <path class="mb-wrap"/>
    </svg>
    <div class="mb-zone"></div>
    <button type="button" class="mb-hit" aria-label="contact" aria-expanded="false"></button>
    ${opts.map(({ w: [g, t, h] }) => `<a class="mb-opt" href="${esc(h)}"${ext(h) ? ' target="_blank" rel="noreferrer"' : ""} aria-label="${esc(t)}" tabindex="-1">${g}<span class="mb-tip">${esc(t)}</span></a>`).join("")}`;
  document.body.appendChild(el);
  const svg = el.querySelector(".mb-goo"), ball = el.querySelector(".mb-ball"), wrap = el.querySelector(".mb-wrap");
  const hit = el.querySelector(".mb-hit"), zone = el.querySelector(".mb-zone");
  const blobs = [...el.querySelectorAll(".mb-drop")], stems = [...el.querySelectorAll(".mb-stem")], links = [...el.querySelectorAll(".mb-opt")];
  opts.forEach((o, k) => { o.blob = blobs[k]; o.stem = stems[k]; o.link = links[k]; });

  // column the ball lives in: the right strip on wide screens, the corner on phones
  const colX = () => innerWidth >= 650 ? innerWidth - 28 : innerWidth - 16 - R;
  const floorY = () => innerHeight - R - (innerWidth >= 650 ? 10 : 16);
  const m = { y: reduce ? floorY() : -R * 2, vy: 0, open: false, k: 0, last: performance.now(), running: false, roll: 0 };
  let dead = false;

  const setOpen = v => {
    if (m.open === v) return;
    m.open = v;
    el.classList.toggle("open", v);
    hit.setAttribute("aria-expanded", String(v));
    links.forEach(a => a.tabIndex = v ? 0 : -1);
    const now = performance.now();
    opts.forEach((o, k) => { o.from = o.p; o.to = v ? 1 : 0; o.t0 = now + (v ? k : n - 1 - k) * (v ? 50 : 25); o.dur = v ? 680 : 240; });
    kick();
  };
  const kick = () => { if (!m.running && !dead) { m.running = true; requestAnimationFrame(frame); } };

  function frame(now) {
    if (dead) return;
    let active = false;
    const dt = Math.min(2.5, (now - m.last) / 16.67); m.last = now;
    const fy = floorY();
    if (!m.open) {
      m.vy += GRAVITY * dt;
      m.y += m.vy * dt;
      if (m.y > fy) { m.y = fy; m.vy = Math.abs(m.vy) > 1.2 ? -m.vy * BOUNCE : 0; }
      if (m.y < R) { m.y = R; m.vy = Math.abs(m.vy) * .3; }
      if (m.vy !== 0 || m.y < fy) active = true;
    }
    m.k += ((m.open ? 1 : 0) - m.k) * .2; if (Math.abs((m.open ? 1 : 0) - m.k) > .002) active = true;
    const cx = colX(), cy = m.y;
    ball.setAttribute("cx", cx); ball.setAttribute("cy", cy);
    wrap.setAttribute("d", wrapPath(cx, cy, R, 2.3 + cy / R * .35));
    hit.style.transform = `translate(${cx - R}px, ${cy - R}px)`;
    zone.style.transform = `translate(${cx - RING - BLOB - 14}px, ${cy - RING - BLOB - 14}px)`;
    for (const o of opts) {
      if (o.t0 && now >= o.t0) {
        const u = Math.min(1, (now - o.t0) / o.dur);
        o.p = o.from + (o.to - o.from) * (o.to ? elastic(u) : inOutSine(u));
        if (u < 1) active = true; else o.t0 = 0;
      } else if (o.t0) active = true;
      const x = cx + Math.cos(o.ang) * RING * o.p, y = cy + Math.sin(o.ang) * RING * o.p;
      o.blob.setAttribute("cx", x); o.blob.setAttribute("cy", y); o.blob.setAttribute("r", o.p > .02 ? BLOB * Math.min(1, .35 + o.p) : 0);
      const rx = cx + Math.cos(o.ang) * (R - 3), ry = cy + Math.sin(o.ang) * (R - 3);
      o.stem.setAttribute("x1", rx); o.stem.setAttribute("y1", ry); o.stem.setAttribute("x2", x); o.stem.setAttribute("y2", y);
      o.stem.setAttribute("stroke-width", o.p > .02 ? 5 + 4 * (1 - Math.min(1, o.p)) : 0);
      o.link.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
      o.link.classList.toggle("shown", m.open && o.p > .6);
    }
    if (active) requestAnimationFrame(frame); else m.running = false;
  }

  const offs = [];
  const on = (t, type, fn, o) => { t.addEventListener(type, fn, o); offs.push(() => t.removeEventListener(type, fn, o)); };
  const fine = matchMedia("(hover: hover)").matches;
  if (fine) {
    on(hit, "pointerenter", () => setOpen(true));
    on(el, "pointerleave", () => setOpen(false));
  }
  on(hit, "click", () => setOpen(!m.open));
  on(el, "focusout", e => { if (!el.contains(e.relatedTarget)) setOpen(false); });
  on(document, "keydown", e => { if (e.key === "Escape" && m.open) { e.stopImmediatePropagation(); setOpen(false); hit.focus(); } }, true);
  on(document, "pointerdown", e => { if (m.open && !el.contains(e.target)) setOpen(false); });
  // scrolling throws it about: the page moves, the ball lags behind
  let lastScroll = scrollY;
  on(window, "scroll", () => {
    const dy = scrollY - lastScroll; lastScroll = scrollY;
    if (m.open || reduce) return;
    m.vy -= Math.max(-9, Math.min(9, dy * .12)); kick();
  }, { passive: true });
  on(window, "resize", kick);
  svg.setAttribute("width", "100%"); svg.setAttribute("height", "100%");
  kick(); // it drops in as the page lands

  return () => { dead = true; offs.forEach(f => f()); el.remove(); };
}
