'use client';

import { useEffect, useRef } from 'react';

export default function PromoHero() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onCanPlay = () => {
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onCanPlay);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.05 }
    );
    io.observe(v);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="re-hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/video/promo-hero-poster.jpg"
      aria-hidden="true"
    >
      <source
        src="/video/promo-hero-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/video/promo-hero-1080.mp4" type="video/mp4" />
    </video>
  );
}
