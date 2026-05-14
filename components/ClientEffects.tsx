'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const drone = document.getElementById('droneImg');
    const onAnim = (e: AnimationEvent) => {
      if (e.animationName === 'droneFlyIn' && drone) drone.classList.add('idle');
    };
    drone?.addEventListener('animationend', onAnim);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      drone?.removeEventListener('animationend', onAnim);
      io.disconnect();
    };
  }, []);

  return null;
}
