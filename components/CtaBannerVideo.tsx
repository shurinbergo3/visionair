'use client';

import { useEffect, useRef } from 'react';

export default function CtaBannerVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let loaded = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!loaded) {
              loaded = true;
              v.preload = 'auto';
              v.load();
            }
            if (!reduce) v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: '400px 0px', threshold: 0.01 }
    );
    io.observe(v);

    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="cta-bg"
      muted
      loop
      playsInline
      preload="none"
      poster="/video/toronto-poster.jpg"
      aria-hidden="true"
    >
      <source src="/video/toronto-vertical-720.mp4" type="video/mp4" media="(max-width: 900px)" />
      <source src="/video/toronto-1080.mp4" type="video/mp4" />
    </video>
  );
}
