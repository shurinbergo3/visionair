'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Localized lead-in label, e.g. "Realizacja" / "Built by". */
  label: string;
  /** Current site locale — used to deep-link the matching BuildByAlex locale. */
  locale: string;
  className?: string;
};

// BuildByAlex serves its own localized site. Map our locales to theirs
// (their Ukrainian path is /ua, not /uk) and fall back to English.
const BBA_LOCALE: Record<string, string> = { ru: 'ru', pl: 'pl', en: 'en', uk: 'ua' };

const VERT = `#version 300 es
in vec2 pos;
void main() { gl_Position = vec4(pos, 0.0, 1.0); }`;

/* Фон плашки: домен-искажённый fbm даёт остывающий графит, в прожилках
   тлеет оранж. Жар идёт по диагонали и слабеет к левому краю, где стоит
   кикер; за курсором тянется отдельное пятно (uPointer + uHover). */
const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform float uTime;
uniform float uHover;
uniform vec2 uPointer;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  p *= 0.55;

  float t = uTime * 0.05;

  vec2 q = vec2(fbm(p * 2.4 + t), fbm(p * 2.4 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p * 2.4 + 1.9 * q + vec2(1.7, 9.2) + t * 1.3),
    fbm(p * 2.4 + 1.9 * q + vec2(8.3, 2.8) - t * 1.1)
  );
  float f = fbm(p * 2.4 + 2.2 * r);

  // вытянутый по горизонтали шум — читается как шлифованный металл
  float streak = fbm(vec2(p.x * 1.5 + t * 0.7, p.y * 13.0));

  float band = abs(fract(f * 4.0) - 0.5);
  float vein = smoothstep(0.048, 0.0, band);
  float halo = smoothstep(0.50, 0.0, band);
  float band2 = abs(fract(f * 9.0 + 0.31) - 0.5);
  vein += smoothstep(0.026, 0.0, band2) * 0.4;

  vec3 base = mix(vec3(0.026, 0.028, 0.034), vec3(0.068, 0.072, 0.084), f);
  base += vec3(0.05, 0.052, 0.062) * streak * 0.55;

  float sheen = pow(clamp(1.0 - length(r - 0.5) * 1.5, 0.0, 1.0), 4.0);
  base += vec3(0.06, 0.064, 0.078) * sheen;

  // жар нарастает вправо-вверх: слева спокойнее, там подпись
  float sweep = 0.30 + 0.70 * smoothstep(-0.85, 0.85, p.x + p.y * 0.55);
  float heat = smoothstep(0.12, 0.62, f) * sweep;

  vec2 pc = (uPointer * uRes - 0.5 * uRes) / uRes.y * 0.55;
  float d = length(p - pc);
  float bloom = exp(-d * d * 26.0) * uHover;

  // по вертикальной середине идёт текст — туда жар не пускаем
  heat *= 1.0 - 0.45 * smoothstep(0.15, 0.02, abs(p.y));
  heat += bloom * 0.85;
  heat *= 0.62 + 0.55 * uHover;

  vec3 accent = vec3(0.949, 0.408, 0.180);
  vec3 hot = vec3(1.0, 0.66, 0.40);

  vec3 col = base + accent * (vein * 1.15 + halo * 0.50 + smoothstep(0.34, 0.80, f) * 0.28) * heat;
  col += hot * pow(vein, 3.0) * heat * 0.22;
  col += accent * bloom * 0.22;
  col += accent * 0.05 * sheen;

  col *= 0.60 + 0.32 * uHover;

  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  outColor = vec4(col + dither, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/**
 * Живой фон шильдика. Контекст поднимается лениво — только когда подвал
 * реально попал в кадр, и рисует 30 кадров в секунду на канвасе размером с
 * саму плашку: подвал есть на каждой странице, платить за него полным rAF
 * нельзя. Нет WebGL2 или включён prefers-reduced-motion — остаётся
 * градиентная подложка из CSS, плашка просто перестаёт двигаться.
 */
function EmberField({ hostRef }: { hostRef: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let gl: WebGL2RenderingContext | null = null;
    let prog: WebGLProgram | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let buf: WebGLBuffer | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uHover: WebGLUniformLocation | null = null;
    let uPointer: WebGLUniformLocation | null = null;
    let raf = 0;
    let last = 0;
    let hover = 0;
    let hoverTarget = 0;
    const ptr = { x: 0.5, y: 0.5 };
    const ptrTarget = { x: 0.5, y: 0.5 };
    let dead = false;
    const start = performance.now();
    const FRAME_MS = 1000 / 30;

    const init = () => {
      gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false });
      if (!gl) return false;
      vs = compile(gl, gl.VERTEX_SHADER, VERT);
      fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return false;
      prog = gl.createProgram();
      if (!prog) return false;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
      gl.useProgram(prog);

      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'pos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(prog, 'uRes');
      uTime = gl.getUniformLocation(prog, 'uTime');
      uHover = gl.getUniformLocation(prog, 'uHover');
      uPointer = gl.getUniformLocation(prog, 'uPointer');
      canvas.style.opacity = '1';
      return true;
    };

    const resize = () => {
      if (!gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (t: number) => {
      if (!gl) return;
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uHover, hover);
      gl.uniform2f(uPointer, ptr.x, ptr.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME_MS) return;
      last = now;
      hover += (hoverTarget - hover) * 0.09;
      ptr.x += (ptrTarget.x - ptr.x) * 0.16;
      ptr.y += (ptrTarget.y - ptr.y) * 0.16;
      draw((now - start) / 1000);
    };

    // курсор двигает и пятно в шейдере, и CSS-подсветку поверх стекла
    const onMove = (e: PointerEvent) => {
      const box = host.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
      const y = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height));
      ptrTarget.x = x;
      ptrTarget.y = 1 - y;
      host.style.setProperty('--bba-mx', `${(x * 100).toFixed(2)}%`);
      host.style.setProperty('--bba-my', `${(y * 100).toFixed(2)}%`);
    };
    const onEnter = () => {
      hoverTarget = 1;
    };
    const onLeave = () => {
      hoverTarget = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (dead) return;
        if (entry.isIntersecting) {
          if (!gl && !init()) {
            dead = true;
            io.disconnect();
            return;
          }
          if (reduced) {
            draw(11);
            dead = true;
            io.disconnect();
            return;
          }
          if (!raf) raf = requestAnimationFrame(frame);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointermove', onMove);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointermove', onMove);
      if (gl) {
        if (prog) gl.deleteProgram(prog);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (buf) gl.deleteBuffer(buf);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [hostRef]);

  return <canvas ref={ref} className="bba-credit__canvas" aria-hidden="true" />;
}

/**
 * Подпись разработчика в подвале. Держит собственную тёмную айдентику
 * BuildByAlex, поэтому одинаково читается на любом фоне. Ссылка ведёт на ту
 * же языковую версию, на которой сейчас смотрят сайт.
 */
export default function SiteCredit({ label, locale, className }: Props) {
  const hostRef = useRef<HTMLAnchorElement>(null);
  const href = `https://buildbyalex.com/${BBA_LOCALE[locale] ?? 'en'}`;

  return (
    <a
      ref={hostRef}
      className={['bba-credit', className].filter(Boolean).join(' ')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: buildbyalex`}
    >
      <span aria-hidden className="bba-credit__field">
        <EmberField hostRef={hostRef} />
        <span className="bba-credit__scrim" />
      </span>
      <span aria-hidden className="bba-credit__gloss" />

      <span className="bba-credit__label">{label}</span>
      <span aria-hidden className="bba-credit__rule" />
      <span aria-hidden className="bba-credit__mark">
        <span className="bba-credit__build">build</span>
        <span className="bba-credit__by">by</span>
        <span className="bba-credit__alex">alex.</span>
      </span>
      <svg
        className="bba-credit__arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}
