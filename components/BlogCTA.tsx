import ContactForm from '@/components/ContactForm';

type CTA = {
  title: string;
  titleItalic?: string;
  lead: string;
  primary: string;
  whatsapp: string;
};

export default function BlogCTA({ cta }: { cta: CTA }) {
  return (
    <section className="blog-cta" id="contact">
      <div className="blog-cta-inner">
        <div className="blog-cta-copy">
          <span className="blog-cta-eyebrow">[ Готовы обсудить проект? ]</span>
          <h2 className="blog-cta-title">
            {cta.title}
            {cta.titleItalic && (
              <>
                {' '}
                <span className="serif-it">{cta.titleItalic}</span>
              </>
            )}
          </h2>
          <p className="blog-cta-lead">{cta.lead}</p>
        </div>
        <div className="blog-cta-form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
