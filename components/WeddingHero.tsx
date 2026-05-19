'use client';

import { useRef } from 'react';
import { useDeferredHeroVideo } from '@/lib/useDeferredHeroVideo';

export default function WeddingHero() {
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
      poster="/video/wedding-hero-poster.webp"
      aria-hidden="true"
    >
      <source
        src="/video/wedding-hero-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/video/wedding-hero-1080.mp4" type="video/mp4" />
    </video>
  );
}
