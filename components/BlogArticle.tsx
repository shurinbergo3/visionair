import type { Section } from '@/lib/blog';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏЀ-ӿ\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function BlogArticle({ sections }: { sections: Section[] }) {
  return (
    <div className="blog-prose">
      {sections.map((s, idx) => {
        const key = `${s.type}-${idx}`;
        switch (s.type) {
          case 'p':
            return <p key={key}>{s.text}</p>;
          case 'h2':
            return (
              <h2 key={key} id={s.id ?? slugify(s.text)} className="blog-h2">
                {s.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={key} id={s.id ?? slugify(s.text)} className="blog-h3">
                {s.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={key} className="blog-ul">
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="blog-ol">
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={key} className="blog-quote">
                <p className="blog-quote-text">{s.text}</p>
                {s.attribution && (
                  <footer className="blog-quote-attr">{s.attribution}</footer>
                )}
              </blockquote>
            );
          case 'callout':
            return (
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
          case 'image':
            return (
              <figure key={key} className="blog-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} loading="lazy" />
                {s.caption && <figcaption>{s.caption}</figcaption>}
              </figure>
            );
          case 'table':
            return (
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
          default:
            return null;
        }
      })}
    </div>
  );
}
