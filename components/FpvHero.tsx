'use client';

import { useRef } from 'react';
import { useDeferredHeroVideo } from '@/lib/useDeferredHeroVideo';

export default function FpvHero() {
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
      poster="/video/fpv-hero-poster.webp"
      aria-hidden="true"
    >
      <source
        src="/video/fpv-hero-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/video/fpv-hero-1080.mp4" type="video/mp4" />
    </video>
  );
}
