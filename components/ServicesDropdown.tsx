import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getServicePath } from '@/lib/serviceRoutes';

type ServiceItem = { num: string; tag: string; title: string };

type Props = {
  /** When true, the trigger links to the on-page "#services" anchor (home page).
   *  Otherwise the trigger navigates to home's services section. */
  homeAnchor?: boolean;
};

const Caret = () => (
  <svg
    className="caret"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default async function ServicesDropdown({ homeAnchor = false }: Props) {
  const t = await getTranslations();
  const services = t.raw('services.items') as ServiceItem[];
  const label = t('nav.links.services');

  return (
    <li className="has-dropdown">
      {homeAnchor ? (
        <a href="#services" aria-haspopup="true">
          {label}
          <Caret />
        </a>
      ) : (
        <Link href="/" aria-haspopup="true">
          {label}
          <Caret />
        </Link>
      )}
      <div className="nav-dropdown" role="menu">
        <ul>
          {services.map((s) => {
            const href = getServicePath(s.num);
            const body = (
              <>
                <span className="dd-num">{s.num}</span>
                <span className="dd-title">{s.title}</span>
                <span className="dd-sub">{s.tag}</span>
              </>
            );
            return (
              <li key={s.num} role="none">
                {href ? (
                  <Link href={href} role="menuitem">{body}</Link>
                ) : (
                  <Link href="/" role="menuitem">{body}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
