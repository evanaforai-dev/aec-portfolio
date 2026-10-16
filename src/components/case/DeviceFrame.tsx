"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A handset prototype inside a phone shell.
 *
 * Two things this exists to get right.
 *
 * FIRST, an iframe is its own viewport. A page that asks for `width=393`
 * (deep cuts) or `width=device-width` (soundmap, kochi) gets the IFRAME's css
 * width, not the phone's, and the shell's screen is about 362px across at its
 * widest and narrower on a small display. So every build was being laid out
 * into a box narrower than the one it was drawn for: the fixed-width one
 * overflowed by thirty-odd pixels and could be dragged around inside the
 * bezel, and the fluid ones reflowed to a width no phone has.
 *
 * The answer is to stop resizing the page and start resizing the picture of
 * it. The iframe is given the device viewport it was designed for and then
 * scaled to whatever the shell is actually drawn at. The page inside always
 * believes it is on a 393x852 phone, which is true, so nothing reflows and
 * nothing pans.
 *
 * SECOND, the shell is built OUT from that screen rather than the screen
 * fitted into the shell. It used to be the other way round: the shell carried
 * the aspect (430/932, an iPhone's full device size) and the screen was
 * whatever was left inside the padding, which came to 393x875. Deep cuts is a
 * hard 393x852 canvas, so it ended twenty-three pixels short of the bezel and
 * sat in a black band. Now the SCREEN carries 393/852 and the shell is that
 * plus its bezel, so a build that fills its viewport fills the glass.
 */

/*
 * The viewport every embedded handset build is composed for: an iPhone 14 Pro
 * through 16 in logical points. It is also exactly the canvas deep cuts hard
 * codes, so that build lands on the glass to the pixel.
 */
const DEVICE_W = 393;
const DEVICE_H = 852;

export function DeviceFrame({
  src,
  title,
  allow,
}: {
  src: string;
  title: string;
  allow?: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    /*
     * Width only. The screen's aspect is declared (393/852), so the height
     * follows from it exactly and DEVICE_H is already the right answer --
     * reading clientHeight back would only round it to an integer and leave
     * the build a pixel short of its own canvas, which is a scrollbar.
     */
    const measure = () => {
      const w = el.clientWidth;
      if (w) setScale(w / DEVICE_W);
    };
    measure();
    // Not just the window: the shell also changes width when a sibling
    // reflows, and resize events say nothing about that.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[380px]">
      {/*
        No height of its own: the shell is the screen plus its bezel, so it
        takes whatever the screen's aspect gives it. Percentage padding
        resolves against WIDTH on all four sides, which is what keeps the
        bezel an even band at any size.
      */}
      <div
        data-device="shell"
        className="relative w-full bg-fg p-[2.4%] ring-1 ring-hairline"
      >
        <div
          ref={screenRef}
          data-device="screen"
          className="relative aspect-[393/852] w-full overflow-hidden bg-bg"
        >
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow={allow}
            /*
             * Pinned to the top-left corner and scaled from it, so the scaled
             * box lands exactly on the screen cut-out. Width is the device's,
             * in css pixels, and never changes.
             */
            style={{
              width: DEVICE_W,
              height: DEVICE_H,
              transform: `scale(${scale || 1})`,
              transformOrigin: "top left",
              // Nothing to show until the screen has been measured; without
              // this the build paints once at full size and visibly snaps.
              visibility: scale ? undefined : "hidden",
            }}
            className="absolute left-0 top-0 block border-0"
          />
          {/*
            No island is drawn. These builds were made for a browser and do
            not reserve the safe-area inset, so a pill at the top of the
            screen sat on top of their own headers: on kochi it covered the
            product's name. The shell reads as a handset from its proportions
            and its corners without one.
          */}
        </div>
      </div>
    </div>
  );
}
