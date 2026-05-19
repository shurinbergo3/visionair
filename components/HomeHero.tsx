'use client';

import { useRef } from 'react';
import { useDeferredHeroVideo } from '@/lib/useDeferredHeroVideo';

export default function HomeHero() {
  const ref = useRef<HTMLVideoElement>(null);
  useDeferredHeroVideo(ref);

  return (
    <video
      ref={ref}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/video/home-hero-poster.webp"
      aria-hidden="true"
    >
      <source
        src="/video/home-hero-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/video/home-hero-1080.mp4" type="video/mp4" />
    </video>
  );
}
