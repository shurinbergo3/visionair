import { escapeHtml, sendMessage } from './telegram';
import { listAdmins } from './store';

// A visitor-submitted review headed for manual moderation. Unlike leads we
// don't persist these — an admin reads the Telegram message and, if it's
// genuine, adds it to messages/*.json by hand. Keeping it stateless avoids a
// public write path into anything the site renders.
export type ReviewSubmission = {
  name: string;
  role: string;
  rating: number; // 1–5
  text: string;
  email: string;
  locale: string;
};

const LOCALE_FLAGS: Record<string, string> = {
  ru: '🇷🇺',
  pl: '🇵🇱',
  en: '🇬🇧',
  uk: '🇺🇦',
};

function nowWarsaw(): string {
  return new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatReviewHtml(r: ReviewSubmission): string {
  const flag = LOCALE_FLAGS[r.locale] || '🌐';
  const filled = Math.max(0, Math.min(5, Math.round(r.rating)));
  const stars = '★'.repeat(filled) + '☆'.repeat(5 - filled);
  const lines: string[] = [];
  lines.push('📝 <b>Новый отзыв — на модерацию</b>');
  lines.push('');
  lines.push(`⭐ <b>Оценка:</b> ${stars}  (${r.rating}/5)`);
  if (r.name.trim()) lines.push(`👤 <b>Имя:</b> ${escapeHtml(r.name)}`);
  if (r.role.trim()) lines.push(`🏢 <b>Подпись:</b> ${escapeHtml(r.role)}`);
  if (r.email.trim()) lines.push(`✉️ <b>Email:</b> ${escapeHtml(r.email)}`);
  lines.push('');
  lines.push('💬 <b>Отзыв:</b>');
  lines.push(escapeHtml(r.text));
  lines.push('');
  lines.push(`${flag} <b>Язык:</b> ${escapeHtml(r.locale)}   🕒 ${escapeHtml(nowWarsaw())}`);
  return lines.join('\n');
}

export async function broadcastReviewToAdmins(
  review: ReviewSubmission
): Promise<{ delivered: number; failed: number }> {
  const admins = await listAdmins();
  const text = formatReviewHtml(review);
  let delivered = 0;
  let failed = 0;
  await Promise.all(
    admins.map(async (id) => {
      try {
        await sendMessage(id, text, { parse_mode: 'HTML' });
        delivered++;
      } catch (err) {
        failed++;
        console.error('[reviews] failed to deliver to admin', id, err);
      }
    })
  );
  return { delivered, failed };
}
