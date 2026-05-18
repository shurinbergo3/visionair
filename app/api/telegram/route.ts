import { NextResponse } from 'next/server';
import {
  answerCallbackQuery,
  editMessageText,
  escapeHtml,
  mainAdminId,
  sendDocument,
  sendMessage,
  webhookSecret,
  type InlineKeyboard,
} from '@/lib/telegram';
import {
  addAdmin,
  isAdmin,
  isMainAdmin,
  leadsToCsv,
  listAdmins,
  listLeads,
  removeAdmin,
} from '@/lib/store';
import { formatLeadShort } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type TgUser = { id: number; first_name?: string; username?: string };
type TgMessage = {
  message_id: number;
  from?: TgUser;
  chat: { id: number; type: string };
  text?: string;
  reply_to_message?: { message_id: number; text?: string; from?: TgUser };
};
type TgCallback = {
  id: string;
  from: TgUser;
  message?: TgMessage;
  data?: string;
};
type TgUpdate = { update_id: number; message?: TgMessage; callback_query?: TgCallback };

const PROMPT_ADD = '🆕 Отправьте Telegram ID нового админа (число). Узнать ID — попроси человека написать боту /myid.';
const PROMPT_REMOVE = '🗑 Отправьте Telegram ID админа для удаления.';

export async function POST(req: Request) {
  const secret = webhookSecret();
  if (secret && req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    if (update.callback_query) await handleCallback(update.callback_query);
    else if (update.message) await handleMessage(update.message);
  } catch (err) {
    console.error('[telegram] handler error:', err);
  }
  return NextResponse.json({ ok: true });
}

// ─── message handler ────────────────────────────────────────────────

async function handleMessage(msg: TgMessage) {
  if (!msg.from || msg.chat.type !== 'private') return;
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();
  const admin = await isAdmin(userId);
  const main = await isMainAdmin(userId);

  // ForceReply flows — adding/removing admin by replying to a prompt.
  if (msg.reply_to_message?.from && main) {
    const replyTo = msg.reply_to_message.text || '';
    if (replyTo.startsWith('🆕')) return void (await handleAddAdminReply(chatId, text));
    if (replyTo.startsWith('🗑')) return void (await handleRemoveAdminReply(chatId, text));
  }

  const cmd = text.split(/\s+/)[0].toLowerCase();
  const arg = text.split(/\s+/).slice(1).join(' ');

  if (cmd === '/myid') {
    await sendMessage(chatId, `🆔 Ваш Telegram ID: <code>${userId}</code>`, { parse_mode: 'HTML' });
    return;
  }

  if (cmd === '/start' || cmd === '/menu' || cmd === '/help') {
    if (admin) await sendPanel(chatId);
    else await sendUserGreeting(chatId);
    return;
  }

  if (!admin) {
    await sendUserGreeting(chatId);
    return;
  }

  // Power-user text commands (parallel to the panel).
  if (cmd === '/export') return void (await doExport(chatId));
  if (cmd === '/admins') return void (await doAdmins(chatId, main));
  if (cmd === '/leads') return void (await doLastLeads(chatId));
  if (cmd === '/stats') return void (await doStats(chatId));
  if (cmd === '/addadmin' && main) return void (await handleAddAdminReply(chatId, arg));
  if (cmd === '/removeadmin' && main) return void (await handleRemoveAdminReply(chatId, arg));

  // Unknown — show panel.
  await sendPanel(chatId);
}

// ─── callback handler ───────────────────────────────────────────────

async function handleCallback(cb: TgCallback) {
  const userId = cb.from.id;
  const chatId = cb.message?.chat.id;
  const messageId = cb.message?.message_id;
  const data = cb.data || '';

  if (!chatId || !messageId) {
    await answerCallbackQuery(cb.id);
    return;
  }

  const admin = await isAdmin(userId);
  const main = await isMainAdmin(userId);

  if (!admin) {
    await answerCallbackQuery(cb.id, 'Доступ только для админов.', true);
    return;
  }

  switch (data) {
    case 'panel':
      await editPanel(chatId, messageId);
      await answerCallbackQuery(cb.id);
      return;
    case 'stats':
      await editStats(chatId, messageId);
      await answerCallbackQuery(cb.id);
      return;
    case 'leads':
      await editLastLeads(chatId, messageId);
      await answerCallbackQuery(cb.id);
      return;
    case 'admins':
      await editAdmins(chatId, messageId, main);
      await answerCallbackQuery(cb.id);
      return;
    case 'export':
      await answerCallbackQuery(cb.id, 'Готовлю файл…');
      await doExport(chatId);
      return;
    case 'add_admin':
      if (!main) return void (await answerCallbackQuery(cb.id, 'Только главный админ.', true));
      await sendMessage(chatId, PROMPT_ADD, { reply_markup: { force_reply: true, input_field_placeholder: 'Telegram ID' } });
      await answerCallbackQuery(cb.id);
      return;
    case 'remove_admin':
      if (!main) return void (await answerCallbackQuery(cb.id, 'Только главный админ.', true));
      await sendMessage(chatId, PROMPT_REMOVE, { reply_markup: { force_reply: true, input_field_placeholder: 'Telegram ID' } });
      await answerCallbackQuery(cb.id);
      return;
    case 'myid':
      await answerCallbackQuery(cb.id, `Ваш ID: ${userId}`, true);
      return;
    default:
      if (data.startsWith('remove:') && main) {
        const id = Number(data.slice(7));
        await doRemoveAdmin(chatId, id);
        await editAdmins(chatId, messageId, main);
        await answerCallbackQuery(cb.id, 'Удалён.');
        return;
      }
      await answerCallbackQuery(cb.id);
  }
}

// ─── views ──────────────────────────────────────────────────────────

async function sendUserGreeting(chatId: number) {
  await sendMessage(
    chatId,
    [
      '👋 Это служебный бот <b>VisionAir</b>.',
      '',
      'Заявки получают только админы. Чтобы оставить заявку — заполните форму на <a href="https://visionair.biz.pl">visionair.biz.pl</a>.',
      '',
      'Команда: /myid — узнать свой Telegram ID.',
    ].join('\n'),
    { parse_mode: 'HTML' }
  );
}

function panelMarkup(): InlineKeyboard {
  const rows = [
    [{ text: '📊 Статистика', callback_data: 'stats' }, { text: '📋 Последние заявки', callback_data: 'leads' }],
    [{ text: '📥 Выгрузить CSV', callback_data: 'export' }],
    [{ text: '👥 Админы', callback_data: 'admins' }, { text: '🆔 Мой ID', callback_data: 'myid' }],
  ];
  return { inline_keyboard: rows };
}

function panelText(): string {
  return ['🛠 <b>Админ-панель VisionAir</b>', '', 'Выберите действие ниже.'].join('\n');
}

async function sendPanel(chatId: number) {
  await sendMessage(chatId, panelText(), { parse_mode: 'HTML', reply_markup: panelMarkup() });
}
async function editPanel(chatId: number, messageId: number) {
  await editMessageText(chatId, messageId, panelText(), { parse_mode: 'HTML', reply_markup: panelMarkup() });
}

function backMarkup(): InlineKeyboard {
  return { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'panel' }]] };
}

async function statsText(): Promise<string> {
  const leads = await listLeads();
  const now = Date.now();
  const day = leads.filter((l) => now - new Date(l.createdAt).getTime() <= 86_400_000).length;
  const week = leads.filter((l) => now - new Date(l.createdAt).getTime() <= 7 * 86_400_000).length;
  const lines = [
    '📊 <b>Статистика заявок</b>',
    '',
    `Всего: <b>${leads.length}</b>`,
    `За 24 часа: <b>${day}</b>`,
    `За 7 дней: <b>${week}</b>`,
  ];
  if (leads.length > 0) {
    const byType = new Map<string, number>();
    for (const l of leads) byType.set(l.type, (byType.get(l.type) || 0) + 1);
    const sorted = [...byType.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    lines.push('', '<b>Топ услуг:</b>');
    for (const [t, n] of sorted) lines.push(`• ${escapeHtml(t)} — ${n}`);
  }
  return lines.join('\n');
}
async function editStats(chatId: number, messageId: number) {
  await editMessageText(chatId, messageId, await statsText(), { parse_mode: 'HTML', reply_markup: backMarkup() });
}
async function doStats(chatId: number) {
  await sendMessage(chatId, await statsText(), { parse_mode: 'HTML' });
}

async function lastLeadsText(): Promise<string> {
  const leads = (await listLeads()).slice(-10).reverse();
  if (leads.length === 0) return '📋 Пока ни одной заявки.';
  const lines = [`📋 <b>Последние ${leads.length} заявок</b>`, ''];
  for (const l of leads) lines.push(formatLeadShort(l), '');
  return lines.join('\n').trim();
}
async function editLastLeads(chatId: number, messageId: number) {
  await editMessageText(chatId, messageId, await lastLeadsText(), { parse_mode: 'HTML', reply_markup: backMarkup() });
}
async function doLastLeads(chatId: number) {
  await sendMessage(chatId, await lastLeadsText(), { parse_mode: 'HTML' });
}

async function adminsText(): Promise<string> {
  const list = await listAdmins();
  const mid = mainAdminId();
  const lines = [`👥 <b>Админы (${list.length})</b>`, ''];
  for (const id of list) {
    lines.push(id === mid ? `• <code>${id}</code> — главный` : `• <code>${id}</code>`);
  }
  return lines.join('\n');
}
function adminsMarkup(main: boolean, removable: number[]): InlineKeyboard {
  const rows: { text: string; callback_data: string }[][] = [];
  if (main) {
    rows.push([{ text: '➕ Добавить', callback_data: 'add_admin' }]);
    for (const id of removable) {
      rows.push([{ text: `➖ Удалить ${id}`, callback_data: `remove:${id}` }]);
    }
  }
  rows.push([{ text: '⬅️ В меню', callback_data: 'panel' }]);
  return { inline_keyboard: rows };
}
async function editAdmins(chatId: number, messageId: number, main: boolean) {
  const list = await listAdmins();
  const mid = mainAdminId();
  const removable = list.filter((id) => id !== mid);
  await editMessageText(chatId, messageId, await adminsText(), {
    parse_mode: 'HTML',
    reply_markup: adminsMarkup(main, removable),
  });
}
async function doAdmins(chatId: number, main: boolean) {
  const list = await listAdmins();
  const mid = mainAdminId();
  const removable = list.filter((id) => id !== mid);
  await sendMessage(chatId, await adminsText(), { parse_mode: 'HTML', reply_markup: adminsMarkup(main, removable) });
}

async function doExport(chatId: number) {
  const leads = await listLeads();
  if (leads.length === 0) {
    await sendMessage(chatId, 'Пока нет ни одной заявки.');
    return;
  }
  const csv = leadsToCsv(leads);
  const stamp = new Date().toISOString().slice(0, 10);
  await sendDocument(chatId, `visionair-leads-${stamp}.csv`, csv, `Всего заявок: ${leads.length}`);
}

async function handleAddAdminReply(chatId: number, raw: string) {
  const id = Number(raw.trim());
  if (!Number.isFinite(id) || id <= 0) {
    await sendMessage(chatId, '⚠️ ID должен быть положительным числом.');
    return;
  }
  const { added } = await addAdmin(id);
  await sendMessage(
    chatId,
    added ? `✅ Добавлен админ <code>${id}</code>.` : `ℹ️ <code>${id}</code> уже админ.`,
    { parse_mode: 'HTML' }
  );
}

async function handleRemoveAdminReply(chatId: number, raw: string) {
  const id = Number(raw.trim());
  if (!Number.isFinite(id) || id <= 0) {
    await sendMessage(chatId, '⚠️ ID должен быть положительным числом.');
    return;
  }
  await doRemoveAdmin(chatId, id);
}

async function doRemoveAdmin(chatId: number, id: number) {
  const { removed, reason } = await removeAdmin(id);
  if (removed) {
    await sendMessage(chatId, `✅ Админ <code>${id}</code> удалён.`, { parse_mode: 'HTML' });
  } else if (reason === 'cannot_remove_main') {
    await sendMessage(chatId, '⛔ Главного админа удалить нельзя.');
  } else {
    await sendMessage(chatId, `ℹ️ <code>${id}</code> не админ.`, { parse_mode: 'HTML' });
  }
}

