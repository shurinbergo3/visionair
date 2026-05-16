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

export type ReplyKeyboard = {
  keyboard: Array<Array<{ text: string }>>;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  is_persistent?: boolean;
};

export async function sendMessage(
  chatId: number,
  text: string,
  opts: { parse_mode?: 'HTML' | 'MarkdownV2'; reply_markup?: ReplyKeyboard | { remove_keyboard: true } } = {}
): Promise<void> {
  await call('sendMessage', { chat_id: chatId, text, disable_web_page_preview: true, ...opts });
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

export async function setWebhook(url: string): Promise<void> {
  const payload: Record<string, unknown> = {
    url,
    allowed_updates: ['message'],
    drop_pending_updates: false,
  };
  const secret = webhookSecret();
  if (secret) payload.secret_token = secret;
  await call('setWebhook', payload);
}

export async function setMyCommands(
  commands: Array<{ command: string; description: string }>,
  scope?: { type: 'default' } | { type: 'chat'; chat_id: number }
): Promise<void> {
  await call('setMyCommands', { commands, ...(scope ? { scope } : {}) });
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
