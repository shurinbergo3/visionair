import { Fragment } from 'react';
import type { Section } from '@/lib/blog';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏЀ-ӿ\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Pick H2 indices where we'll insert injected images.
// Skips the article's first H2 (keeps the opening clean), then
// distributes inserts roughly evenly across the remaining H2s.
function pickInsertionPoints(sections: Section[], count: number): Set<number> {
  if (count <= 0) return new Set();
  const h2Indices = sections.reduce<number[]>((acc, s, i) => {
    if (s.type === 'h2') acc.push(i);
    return acc;
  }, []);
  if (h2Indices.length === 0) return new Set();

  const candidates = h2Indices.slice(1); // skip the first H2
  if (candidates.length === 0) return new Set();

  const out = new Set<number>();
  const step = Math.max(1, Math.floor(candidates.length / (count + 1)));
  for (let i = 1; i <= count; i++) {
    const pickIdx = Math.min(candidates.length - 1, i * step - 1);
    out.add(candidates[pickIdx]);
    if (out.size >= count) break;
  }
  return out;
}

export default function BlogArticle({
  sections,
  injectImages = [],
}: {
  sections: Section[];
  injectImages?: string[];
}) {
  const insertAt = pickInsertionPoints(sections, injectImages.length);
  let injected = 0;
  return (
    <div className="blog-prose">
      {sections.map((s, idx) => {
        const key = `${s.type}-${idx}`;

        // Inject a portfolio frame right before this H2 if marked.
        let injectedNode: React.ReactNode = null;
        if (insertAt.has(idx) && injected < injectImages.length) {
          const src = injectImages[injected];
          injected += 1;
          injectedNode = (
            <figure key={`inject-${idx}`} className="blog-figure blog-figure--inject">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" decoding="async" />
            </figure>
          );
        }

        let node: React.ReactNode;
        switch (s.type) {
          case 'p':
            node = <p key={key}>{s.text}</p>;
            break;
          case 'h2':
            node = (
              <h2 key={key} id={s.id ?? slugify(s.text)} className="blog-h2">
                {s.text}
              </h2>
            );
            break;
          case 'h3':
            node = (
              <h3 key={key} id={s.id ?? slugify(s.text)} className="blog-h3">
                {s.text}
              </h3>
            );
            break;
          case 'ul':
            node = (
              <ul key={key} className="blog-ul">
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
            break;
          case 'ol':
            node = (
              <ol key={key} className="blog-ol">
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ol>
            );
            break;
          case 'quote':
            node = (
              <blockquote key={key} className="blog-quote">
                <p className="blog-quote-text">{s.text}</p>
                {s.attribution && (
                  <footer className="blog-quote-attr">{s.attribution}</footer>
                )}
              </blockquote>
            );
            break;
          case 'callout':
            node = (
              <aside key={key} className={`blog-callout blog-callout--${s.kind}`}>
                <div className="blog-callout-label">
                  {s.kind === 'tip' && 'Tip'}
                  {s.kind === 'warn' && 'Warning'}
                  {s.kind === 'note' && 'Note'}
                </div>
                <div className="blog-callout-title">{s.title}</div>
                <p className="blog-callout-text">{s.text}</p>
              </aside>
            );
            break;
          case 'image':
            node = (
              <figure key={key} className="blog-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} loading="lazy" />
                {s.caption && <figcaption>{s.caption}</figcaption>}
              </figure>
            );
            break;
          case 'table':
            node = (
              <div key={key} className="blog-table-wrap">
                <table className="blog-table">
                  <thead>
                    <tr>
                      {s.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            break;
          default:
            node = null;
        }

        return (
          <Fragment key={`wrap-${idx}`}>
            {injectedNode}
            {node}
          </Fragment>
        );
      })}
    </div>
  );
}
