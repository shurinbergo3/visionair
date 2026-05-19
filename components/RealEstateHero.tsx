'use client';

import { useRef } from 'react';
import { useDeferredHeroVideo } from '@/lib/useDeferredHeroVideo';

export default function RealEstateHero() {
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
      poster="/video/real-estate-hero-poster.webp"
      aria-hidden="true"
    >
      <source
        src="/video/real-estate-hero-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/video/real-estate-hero-1080.mp4" type="video/mp4" />
    </video>
  );
}
