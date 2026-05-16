import type { Lead } from './store';
import { escapeHtml, sendMessage } from './telegram';
import { listAdmins } from './store';

const LOCALE_FLAGS: Record<string, string> = {
  ru: '🇷🇺',
  pl: '🇵🇱',
  en: '🇬🇧',
  uk: '🇺🇦',
};

function formatWarsaw(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatLeadShort(lead: Lead): string {
  const flag = LOCALE_FLAGS[lead.locale] || '🌐';
  const head = lead.name?.trim() ? `<b>${escapeHtml(lead.name)}</b> — ${escapeHtml(lead.phone)}` : `<b>${escapeHtml(lead.phone)}</b>`;
  const tail = lead.type?.trim() ? ` · <i>${escapeHtml(lead.type)}</i>` : '';
  return `${flag} ${head}${tail}\n   🕒 ${formatWarsaw(lead.createdAt)}`;
}

export function formatLeadHtml(lead: Lead): string {
  const flag = LOCALE_FLAGS[lead.locale] || '🌐';
  const created = formatWarsaw(lead.createdAt);
  const lines: string[] = [];
  lines.push('🔔 <b>Новая заявка с сайта</b>');
  lines.push('');
  if (lead.name && lead.name.trim()) {
    lines.push(`👤 <b>Имя:</b> ${escapeHtml(lead.name)}`);
  }
  lines.push(`📞 <b>Телефон:</b> ${escapeHtml(lead.phone)}`);
  if (lead.email && lead.email.trim()) {
    lines.push(`✉️ <b>Email:</b> ${escapeHtml(lead.email)}`);
  }
  if (lead.type && lead.type.trim()) {
    lines.push(`🎯 <b>Услуга:</b> ${escapeHtml(lead.type)}`);
  }
  if (lead.msg && lead.msg.trim()) {
    lines.push(`💬 <b>Сообщение:</b> ${escapeHtml(lead.msg)}`);
  }
  lines.push('');
  lines.push(`${flag} <b>Язык:</b> ${escapeHtml(lead.locale)}   🕒 ${escapeHtml(created)}`);
  lines.push(`🆔 <code>${escapeHtml(lead.id)}</code>`);
  return lines.join('\n');
}

export async function broadcastLeadToAdmins(lead: Lead): Promise<{ delivered: number; failed: number }> {
  const admins = await listAdmins();
  const text = formatLeadHtml(lead);
  let delivered = 0;
  let failed = 0;
  await Promise.all(
    admins.map(async (id) => {
      try {
        await sendMessage(id, text, { parse_mode: 'HTML' });
        delivered++;
      } catch (err) {
        failed++;
        console.error('[leads] failed to deliver to admin', id, err);
      }
    })
  );
  return { delivered, failed };
}
