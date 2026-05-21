/* =========================================================
   Decorative SVG ornaments — aerial cinema / drone HUD family.
   A small library of distinct motifs so every section gets its
   own personality while staying inside one visual vocabulary:
   thin gold lines, telemetry typography, tactical markers.

   All pieces are aria-hidden, pointer-events:none, color comes
   from currentColor so they inherit gold/cream from the parent.
   ========================================================= */

import type { CSSProperties } from 'react';

type DecorProps = {
  className?: string;
  style?: CSSProperties;
};

/* -----------------------------------------------------------
   1. RADAR — concentric rings + crosshair + sweeping needle.
   Section background ornament. Best as a single anchor.
   ----------------------------------------------------------- */
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
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.9">
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="160" strokeDasharray="2 5" />
        <circle cx="200" cy="200" r="198" opacity="0.7" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        <line x1="6" y1="200" x2="394" y2="200" />
        <line x1="200" y1="6" x2="200" y2="394" />
      </g>

      <g stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 200 + Math.cos(a) * 188;
          const y1 = 200 + Math.sin(a) * 188;
          const x2 = 200 + Math.cos(a) * 198;
          const y2 = 200 + Math.sin(a) * 198;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <g
        fill="currentColor"
        opacity="0.6"
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

/* -----------------------------------------------------------
   2. CONTOURS — topographic flowing lines with altitude marks.
   Wide horizontal backdrop, evokes aerial maps.
   ----------------------------------------------------------- */
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
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.9" fill="none">
        <path d="M0 80 C 120 40, 240 120, 380 80 S 640 30, 800 90" />
        <path d="M0 130 C 140 90, 260 170, 400 130 S 660 80, 800 140" opacity="0.85" />
        <path d="M0 180 C 160 140, 280 220, 420 180 S 680 130, 800 190" opacity="0.7" />
        <path
          d="M0 230 C 180 190, 300 270, 440 230 S 700 180, 800 240"
          opacity="0.55"
          strokeDasharray="3 6"
        />
      </g>

      <g
        fill="currentColor"
        opacity="0.5"
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

/* -----------------------------------------------------------
   3. FLIGHT PATH — bezier mission line with waypoint markers
   and altitude labels along the route. Evokes drone planning.
   ----------------------------------------------------------- */
export function DecorFlightPath({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor-flightpath ${className}`}
      style={style}
      viewBox="0 0 600 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* dashed mission path */}
      <path
        d="M 30 240 Q 140 80, 300 150 T 570 70"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="5 7"
        fill="none"
        opacity="0.85"
      />

      {/* waypoint 1 — start */}
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.9">
        <circle cx="30" cy="240" r="9" fill="none" />
        <circle cx="30" cy="240" r="3" fill="currentColor" stroke="none" />
      </g>
      <text
        x="48"
        y="244"
        fill="currentColor"
        opacity="0.7"
        fontFamily="var(--f-mono)"
        fontSize="10"
        letterSpacing="0.16em"
      >
        WP·01 · 120M
      </text>

      {/* waypoint 2 — middle */}
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        <circle cx="300" cy="150" r="7" fill="none" />
        <line x1="300" y1="139" x2="300" y2="161" />
        <line x1="289" y1="150" x2="311" y2="150" />
      </g>
      <text
        x="316"
        y="154"
        fill="currentColor"
        opacity="0.7"
        fontFamily="var(--f-mono)"
        fontSize="10"
        letterSpacing="0.16em"
      >
        WP·02 · 80M
      </text>

      {/* waypoint 3 — destination (diamond) */}
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.95">
        <path d="M 570 60 L 580 70 L 570 80 L 560 70 Z" />
        <path d="M 570 64 L 576 70 L 570 76 L 564 70 Z" fill="currentColor" />
      </g>
      <text
        x="510"
        y="56"
        fill="currentColor"
        opacity="0.7"
        fontFamily="var(--f-mono)"
        fontSize="10"
        letterSpacing="0.16em"
        textAnchor="end"
      >
        WP·03 · TARGET
      </text>

      {/* heading bearing readout */}
      <g
        fill="currentColor"
        opacity="0.55"
        fontFamily="var(--f-mono)"
        fontSize="9"
        letterSpacing="0.2em"
      >
        <text x="160" y="180">HDG 047°</text>
        <text x="420" y="120">HDG 022°</text>
      </g>
    </svg>
  );
}

/* -----------------------------------------------------------
   4. ALTIMETER — vertical HUD altitude scale with ticks.
   Slim, sits flush against the section edge.
   ----------------------------------------------------------- */
export function DecorAltimeter({ className = '', style }: DecorProps) {
  const ticks = Array.from({ length: 21 }, (_, i) => i * 20); // every 20px, 0–400
  return (
    <svg
      className={`decor decor-altimeter ${className}`}
      style={style}
      viewBox="0 0 100 420"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* main rail */}
      <line
        x1="50"
        y1="10"
        x2="50"
        y2="410"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.85"
      />

      {/* tick marks — long every 100, short every 20 */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.75">
        {ticks.map((y) => {
          const isMajor = y % 100 === 0;
          const x1 = isMajor ? 38 : 44;
          return <line key={y} x1={x1} y1={10 + y} x2="50" y2={10 + y} />;
        })}
      </g>

      {/* altitude labels */}
      <g
        fill="currentColor"
        opacity="0.65"
        fontFamily="var(--f-mono)"
        fontSize="10"
        letterSpacing="0.14em"
        textAnchor="end"
      >
        <text x="32" y="14">200</text>
        <text x="32" y="114">150</text>
        <text x="32" y="214">100</text>
        <text x="32" y="314">050</text>
        <text x="32" y="414">000</text>
      </g>

      {/* current altitude pointer (filled triangle) */}
      <g opacity="0.9">
        <path d="M 56 210 L 70 204 L 70 216 Z" fill="currentColor" />
        <text
          x="74"
          y="214"
          fill="currentColor"
          fontFamily="var(--f-mono)"
          fontSize="10"
          letterSpacing="0.18em"
        >
          ALT
        </text>
      </g>

      {/* unit label at top */}
      <text
        x="50"
        y="6"
        fill="currentColor"
        opacity="0.55"
        fontFamily="var(--f-mono)"
        fontSize="8"
        letterSpacing="0.24em"
        textAnchor="middle"
      >
        METERS · AGL
      </text>
    </svg>
  );
}

/* -----------------------------------------------------------
   5. CROSSHAIR — viewfinder reticle with corner brackets.
   Small focal anchor; great as a corner accent.
   ----------------------------------------------------------- */
export function DecorCrosshair({ className = '', style }: DecorProps) {
  return (
    <svg
      className={`decor decor-crosshair ${className}`}
      style={style}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* corner brackets */}
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        <path d="M 0 24 L 0 0 L 24 0" />
        <path d="M 136 0 L 160 0 L 160 24" />
        <path d="M 0 136 L 0 160 L 24 160" />
        <path d="M 136 160 L 160 160 L 160 136" />
      </g>

      {/* central reticle ring */}
      <circle
        cx="80"
        cy="80"
        r="22"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <circle
        cx="80"
        cy="80"
        r="38"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
        strokeDasharray="2 4"
      />

      {/* crosshair lines (broken at center) */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.75">
        <line x1="20" y1="80" x2="58" y2="80" />
        <line x1="102" y1="80" x2="140" y2="80" />
        <line x1="80" y1="20" x2="80" y2="58" />
        <line x1="80" y1="102" x2="80" y2="140" />
      </g>

      {/* center dot */}
      <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.9" />

      {/* focus label */}
      <text
        x="80"
        y="14"
        fill="currentColor"
        opacity="0.55"
        fontFamily="var(--f-mono)"
        fontSize="9"
        letterSpacing="0.22em"
        textAnchor="middle"
      >
        FOCUS · ƒ2.8
      </text>
    </svg>
  );
}

/* -----------------------------------------------------------
   6. WAVEFORM — telemetry signal bars with min/max envelope.
   Wide and short; reads as transmission / data trace.
   ----------------------------------------------------------- */
export function DecorWaveform({ className = '', style }: DecorProps) {
  // deterministic pseudo-random heights so SSR/CSR match
  const seed = [
    14, 22, 9, 28, 18, 34, 12, 26, 20, 16, 30, 24, 11, 32, 19, 27,
    14, 22, 9, 28, 18, 34, 12, 26, 20, 16, 30, 24, 11, 32, 19, 27,
    14, 22, 9, 28, 18, 34, 12, 26, 20, 16, 30, 24, 11, 32, 19, 27,
  ];
  return (
    <svg
      className={`decor decor-waveform ${className}`}
      style={style}
      viewBox="0 0 800 90"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {/* baseline */}
      <line
        x1="0"
        y1="45"
        x2="800"
        y2="45"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="4 6"
      />

      {/* vertical bars */}
      <g stroke="currentColor" strokeWidth="2" opacity="0.85" strokeLinecap="round">
        {seed.map((h, i) => {
          const x = 10 + i * 16;
          return <line key={i} x1={x} y1={45 - h} x2={x} y2={45 + h * 0.6} />;
        })}
      </g>

      {/* envelope tags */}
      <g
        fill="currentColor"
        opacity="0.6"
        fontFamily="var(--f-mono)"
        fontSize="9"
        letterSpacing="0.18em"
      >
        <text x="6" y="10">SIG · 24 BIT</text>
        <text x="794" y="86" textAnchor="end">−18 dB</text>
      </g>
    </svg>
  );
}

/* -----------------------------------------------------------
   7. COMPASS — corner cardinal marker. Standalone accent.
   ----------------------------------------------------------- */
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
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.7">
        <circle cx="60" cy="60" r="42" />
        <circle cx="60" cy="60" r="28" opacity="0.5" strokeDasharray="2 4" />
      </g>

      <g stroke="currentColor" strokeWidth="1.2" opacity="0.75">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const x1 = 60 + Math.cos(a) * 36;
          const y1 = 60 + Math.sin(a) * 36;
          const x2 = 60 + Math.cos(a) * 42;
          const y2 = 60 + Math.sin(a) * 42;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <g fill="currentColor" opacity="0.9">
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
