'use client';

import { useRef } from 'react';
import { useDeferredHeroVideo } from '@/lib/useDeferredHeroVideo';

export default function PromoHero() {
  const ref = useRef<HTMLVideoElement>(null);
  useDeferredHeroVideo(ref);

  return (
    <video
      ref={ref}
      className="re-hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/video/promo-hero-poster.webp"
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
