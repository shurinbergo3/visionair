'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import BlogCard from '@/components/BlogCard';
import type { Article } from '@/lib/blog-shared';

type Props = {
  articles: Article[];
  locale: string;
  mode: 'related' | 'latest';
};

export default function BlogTeaserCarousel({ articles, locale, mode }: Props) {
  const t = useTranslations('blogTeaser');

  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(3);

  // Drag/swipe state — refs (not state) so we don't re-render every move.
  // Pointer Events unify mouse + touch + pen.
  const dragRef = useRef({
    startX: 0,
    currentX: 0,
    startY: 0,
    dragging: false,
    locked: false,
    pointerId: -1,
    pointerType: '',
  });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 980) setVisible(2);
      else setVisible(3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const count = articles.length;
  const max = Math.max(0, count - visible);
  const clamped = Math.min(idx, max);
  // Wrap a step that may overshoot either end back into [0, max].
  const wrap = useCallback(
    (n: number) => {
      if (max <= 0) return 0;
      const span = max + 1;
      return ((n % span) + span) % span;
    },
    [max]
  );

  const computeBaseOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cardWidth = count > 0 ? track.scrollWidth / count : 0;
    return clamped * cardWidth;
  }, [clamped, count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = count > 0 ? track.scrollWidth / count : 0;
    track.style.transform = `translateX(-${clamped * cardWidth}px)`;
  }, [clamped, visible, count]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to primary mouse button; let touch + pen through.
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    dragRef.current = {
      startX: e.clientX,
      currentX: e.clientX,
      startY: e.clientY,
      dragging: true,
      // Axis is unknown until movement starts — capture lazily once a real
      // horizontal drag is detected so taps still open the card link.
      locked: false,
      pointerId: e.pointerId,
      pointerType: e.pointerType,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.dragging || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (!d.locked) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      d.locked = true;
      if (Math.abs(dy) > Math.abs(dx)) {
        d.dragging = false;
        if (trackRef.current) trackRef.current.style.transition = '';
        return;
      }
      // Real horizontal drag started — capture the pointer so the gesture keeps
      // tracking even if it leaves the wrap, and kill the transition for a
      // direct 1:1 follow.
      if (trackRef.current) trackRef.current.style.transition = 'none';
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* not supported — ignore */
      }
    }

    d.currentX = e.clientX;
    const base = computeBaseOffset();
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-base + dx}px)`;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.dragging || e.pointerId !== d.pointerId) return;
    const delta = d.currentX - d.startX;
    const threshold = 50;
    d.dragging = false;
    if (trackRef.current) trackRef.current.style.transition = '';
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    if (delta < -threshold) {
      setIdx((i) => wrap(i + 1));
    } else if (delta > threshold) {
      setIdx((i) => wrap(i - 1));
    } else if (Math.abs(delta) > 8) {
      // Small drag — snap back to current
      const base = computeBaseOffset();
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${base}px)`;
    }
  };

  if (articles.length === 0) return null;

  return (
    <section className="blog-teaser-section section-pad" id="blog-teaser">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>
              {t(`${mode}.sectionLabel`)}
            </div>
            <h2 className="display-2">
              {t(`${mode}.title`)}
              <br />
              <span className="serif-it">{t(`${mode}.titleItalic`)}</span>
            </h2>
          </div>
          <div>
            <p className="lead">{t(`${mode}.lead`)}</p>
            <div className="sec-meta">
              <Link href="/blog" locale={locale} className="btn-link">
                {t('ctaAll')}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="blog-teaser-carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="blog-teaser-track" ref={trackRef}>
            {articles.map((a) => (
              <BlogCard key={a.slug} article={a} locale={locale} />
            ))}
          </div>
        </div>

        {max > 0 && (
          <div className="blog-teaser-dots" role="tablist" aria-label={t('ctaAll')}>
            {Array.from({ length: max + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === clamped}
                aria-label={`${i + 1}`}
                className={`blog-teaser-dot ${i === clamped ? 'is-active' : ''}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
