const API = 'https://api.telegram.org';

function token(): string {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t) throw new Error('TELEGRAM_BOT_TOKEN is not set');
  return t;
}

export function mainAdminId(): number {
  const v = process.env.TELEGRAM_MAIN_ADMIN_ID;
  if (!v) throw new Error('TELEGRAM_MAIN_ADMIN_ID is not set');
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error('TELEGRAM_MAIN_ADMIN_ID must be a number');
  return n;
}

export function webhookSecret(): string | null {
  return process.env.TELEGRAM_WEBHOOK_SECRET || null;
}

type TgResponse<T> = { ok: true; result: T } | { ok: false; description: string };

async function call<T>(method: string, payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API}/bot${token()}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const data = (await res.json()) as TgResponse<T>;
  if (!data.ok) throw new Error(`telegram ${method}: ${data.description}`);
  return data.result;
}

export type InlineButton = { text: string; callback_data: string };
export type InlineKeyboard = { inline_keyboard: InlineButton[][] };
export type ForceReply = { force_reply: true; input_field_placeholder?: string };
export type ReplyMarkup = InlineKeyboard | ForceReply | { remove_keyboard: true };

type SendOpts = { parse_mode?: 'HTML' | 'MarkdownV2'; reply_markup?: ReplyMarkup };

export async function sendMessage(chatId: number, text: string, opts: SendOpts = {}): Promise<{ message_id: number }> {
  return call<{ message_id: number }>('sendMessage', {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
    ...opts,
  });
}

export async function editMessageText(
  chatId: number,
  messageId: number,
  text: string,
  opts: SendOpts = {}
): Promise<void> {
  try {
    await call('editMessageText', {
      chat_id: chatId,
      message_id: messageId,
      text,
      disable_web_page_preview: true,
      ...opts,
    });
  } catch (err) {
    // Telegram throws "message is not modified" if text+markup are identical — safe to ignore.
    const msg = err instanceof Error ? err.message : '';
    if (!/not modified/i.test(msg)) throw err;
  }
}

export async function answerCallbackQuery(id: string, text?: string, showAlert = false): Promise<void> {
  await call('answerCallbackQuery', { callback_query_id: id, ...(text ? { text, show_alert: showAlert } : {}) });
}

export async function sendDocument(
  chatId: number,
  filename: string,
  contents: string,
  caption?: string
): Promise<void> {
  const form = new FormData();
  form.append('chat_id', String(chatId));
  form.append('document', new Blob([contents], { type: 'text/csv' }), filename);
  if (caption) form.append('caption', caption);
  const res = await fetch(`${API}/bot${token()}/sendDocument`, { method: 'POST', body: form, cache: 'no-store' });
  const data = (await res.json()) as TgResponse<unknown>;
  if (!data.ok) throw new Error(`telegram sendDocument: ${data.description}`);
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
