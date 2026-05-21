/* =========================================================
   Decorative SVG ornaments — aerial radar / HUD language.
   Extends the existing drone-rings + viewfinder vocabulary.
   All pieces are aria-hidden, pointer-events:none, and use
   only stroke colour from currentColor so they inherit
   contextual gold/cream tones from the parent.
   ========================================================= */

import type { CSSProperties } from 'react';

type DecorProps = {
  className?: string;
  style?: CSSProperties;
};

/** Concentric radar rings with crosshair + degree ticks.
 *  Sits behind content; the wrapper class controls position. */
export function DecorRadar({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor-radar ${className}`}
      style={style}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="160" strokeDasharray="2 5" />
        <circle cx="200" cy="200" r="198" opacity="0.5" />
      </g>

      {/* Crosshair */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.35">
        <line x1="6" y1="200" x2="394" y2="200" />
        <line x1="200" y1="6" x2="200" y2="394" />
      </g>

      {/* Degree ticks every 30° on outer ring */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 200 + Math.cos(a) * 188;
          const y1 = 200 + Math.sin(a) * 188;
          const x2 = 200 + Math.cos(a) * 198;
          const y2 = 200 + Math.sin(a) * 198;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Cardinal labels */}
      <g
        fill="currentColor"
        opacity="0.55"
        fontFamily="var(--f-mono)"
        fontSize="10"
        letterSpacing="0.16em"
        textAnchor="middle"
      >
        <text x="200" y="22">N</text>
        <text x="200" y="388">S</text>
        <text x="22" y="204">W</text>
        <text x="378" y="204">E</text>
      </g>

      {/* Sweeping needle (animated via CSS) */}
      <g className="decor-radar-sweep">
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.85"
        />
        <circle cx="200" cy="200" r="3" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Topographic contour lines — suggests aerial maps / altitude.
 *  Designed to span a wide horizontal area as a subtle backdrop. */
export function DecorContours({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor-contours ${className}`}
      style={style}
      viewBox="0 0 800 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.55" fill="none">
        <path d="M0 80 C 120 40, 240 120, 380 80 S 640 30, 800 90" />
        <path d="M0 130 C 140 90, 260 170, 400 130 S 660 80, 800 140" opacity="0.85" />
        <path d="M0 180 C 160 140, 280 220, 420 180 S 680 130, 800 190" opacity="0.7" />
        <path
          d="M0 230 C 180 190, 300 270, 440 230 S 700 180, 800 240"
          opacity="0.5"
          strokeDasharray="3 6"
        />
      </g>

      {/* Elevation markers */}
      <g
        fill="currentColor"
        opacity="0.45"
        fontFamily="var(--f-mono)"
        fontSize="9"
        letterSpacing="0.16em"
      >
        <text x="60" y="74">120m</text>
        <text x="320" y="124">90m</text>
        <text x="580" y="174">60m</text>
      </g>
    </svg>
  );
}

/** Corner compass / coordinate marker. `corner` decides anchor. */
export function DecorCompass({
  corner = 'tr',
  className = '',
  style,
}: DecorProps & { corner?: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <svg
      className={`decor decor-compass decor-compass--${corner} ${className}`}
      style={style}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.6">
        <circle cx="60" cy="60" r="42" />
        <circle cx="60" cy="60" r="28" opacity="0.5" strokeDasharray="2 4" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.7">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const x1 = 60 + Math.cos(a) * 36;
          const y1 = 60 + Math.sin(a) * 36;
          const x2 = 60 + Math.cos(a) * 42;
          const y2 = 60 + Math.sin(a) * 42;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <g fill="currentColor" opacity="0.85">
        <polygon points="60,22 56,58 64,58" />
        <polygon points="60,98 56,62 64,62" opacity="0.45" />
      </g>

      <text
        x="60"
        y="14"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.7"
        fontFamily="var(--f-mono)"
        fontSize="9"
        letterSpacing="0.18em"
      >
        N
      </text>
    </svg>
  );
}
