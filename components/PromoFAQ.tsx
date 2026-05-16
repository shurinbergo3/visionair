'use client';

import { useTranslations } from 'next-intl';
import FAQAccordion, { type FAQItem } from './FAQAccordion';

export default function PromoFAQ() {
  const t = useTranslations('promo.faq');
  const items = t.raw('items') as FAQItem[];
  return <FAQAccordion items={items} idPrefix="promo-faq" />;
}
