#!/usr/bin/env node
// Registers the Telegram webhook and bot command list.
//
// Usage:
//   node scripts/setup-telegram.mjs https://visionair.site
//   (or pass nothing and set WEBHOOK_BASE_URL in env)
//
// Requires env: TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET (optional but recommended).

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadDotEnvLocal() {
  const p = resolve(process.cwd(), '.env.local');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}
loadDotEnvLocal();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const base = process.argv[2] || process.env.WEBHOOK_BASE_URL;
if (!base) {
  console.error('Usage: node scripts/setup-telegram.mjs <base-url>');
  console.error('Example: node scripts/setup-telegram.mjs https://visionair.site');
  process.exit(1);
}

const url = `${base.replace(/\/$/, '')}/api/telegram`;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET || undefined;

async function call(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description}`);
  return data.result;
}

console.log('Setting webhook →', url);
await call('setWebhook', {
  url,
  allowed_updates: ['message', 'callback_query'],
  drop_pending_updates: false,
  ...(secret ? { secret_token: secret } : {}),
});

console.log('Setting bot commands…');
await call('setMyCommands', {
  commands: [
    { command: 'start', description: 'Открыть админ-панель' },
    { command: 'menu', description: 'Меню' },
    { command: 'myid', description: 'Узнать свой Telegram ID' },
    { command: 'help', description: 'Помощь' },
  ],
});

const info = await call('getWebhookInfo', {});
console.log('\nWebhook info:');
console.log(JSON.stringify(info, null, 2));
console.log('\n✅ Done.');
