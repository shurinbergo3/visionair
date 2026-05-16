'use client';

import { useTranslations } from 'next-intl';
import FAQAccordion, { type FAQItem } from './FAQAccordion';

export default function RealEstateFAQ() {
  const t = useTranslations('realEstate.faq');
  const items = t.raw('items') as FAQItem[];
  return <FAQAccordion items={items} idPrefix="re-faq" />;
}
