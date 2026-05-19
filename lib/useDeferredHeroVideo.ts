'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Defers video loading and playback until the browser is idle so it doesn't
 * compete with LCP. The poster shows immediately; the video upgrades to
 * preload="auto" + autoplay once the page is past first paint.
 */
export function useDeferredHeroVideo(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let io: IntersectionObserver | null = null;
    const onCanPlay = () => {
      v.play().catch(() => {});
    };

    const start = () => {
      v.preload = 'auto';
      v.addEventListener('canplay', onCanPlay);
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) v.play().catch(() => {});
            else v.pause();
          });
        },
        { threshold: 0.05 }
      );
      io.observe(v);
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const useIdle = typeof win.requestIdleCallback === 'function';
    const handle = useIdle
      ? win.requestIdleCallback!(start, { timeout: 2500 })
      : window.setTimeout(start, 1500);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      io?.disconnect();
      if (useIdle && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, [ref]);
}
