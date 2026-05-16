import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Redis } from '@upstash/redis';
import { mainAdminId } from './telegram';

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  msg: string;
  locale: string;
  consent: boolean;
};

const ADMINS_KEY = 'visionair:admins';
const LEADS_KEY = 'visionair:leads';

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// ─── file fallback (local dev only) ─────────────────────────────────

type FileShape = { admins: number[]; leads: Lead[] };

function filePath(): string {
  if (process.env.STORAGE_PATH) return process.env.STORAGE_PATH;
  return path.join(process.cwd(), 'data', 'store.json');
}

async function readFile(): Promise<FileShape> {
  try {
    const raw = await fs.readFile(filePath(), 'utf8');
    const parsed = JSON.parse(raw) as Partial<FileShape>;
    return {
      admins: Array.isArray(parsed.admins) ? parsed.admins.filter((n) => Number.isFinite(n)) : [],
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    };
  } catch {
    return { admins: [], leads: [] };
  }
}

async function writeFile(s: FileShape): Promise<void> {
  const p = filePath();
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(s, null, 2), 'utf8');
}

// ─── admins ─────────────────────────────────────────────────────────

export async function listAdmins(): Promise<number[]> {
  const r = redis();
  const set = new Set<number>();
  set.add(mainAdminId());
  if (r) {
    const ids = await r.smembers(ADMINS_KEY);
    for (const v of ids) {
      const n = Number(v);
      if (Number.isFinite(n)) set.add(n);
    }
  } else {
    for (const n of (await readFile()).admins) set.add(n);
  }
  return [...set];
}

export async function isAdmin(userId: number): Promise<boolean> {
  if (userId === mainAdminId()) return true;
  const r = redis();
  if (r) return (await r.sismember(ADMINS_KEY, String(userId))) === 1;
  return (await readFile()).admins.includes(userId);
}

export async function isMainAdmin(userId: number): Promise<boolean> {
  return userId === mainAdminId();
}

export async function addAdmin(userId: number): Promise<{ added: boolean }> {
  if (userId === mainAdminId()) return { added: false };
  const r = redis();
  if (r) {
    const added = await r.sadd(ADMINS_KEY, String(userId));
    return { added: added === 1 };
  }
  const s = await readFile();
  if (s.admins.includes(userId)) return { added: false };
  s.admins.push(userId);
  await writeFile(s);
  return { added: true };
}

export async function removeAdmin(userId: number): Promise<{ removed: boolean; reason?: string }> {
  if (userId === mainAdminId()) return { removed: false, reason: 'cannot_remove_main' };
  const r = redis();
  if (r) {
    const removed = await r.srem(ADMINS_KEY, String(userId));
    return removed === 1 ? { removed: true } : { removed: false, reason: 'not_admin' };
  }
  const s = await readFile();
  const before = s.admins.length;
  s.admins = s.admins.filter((id) => id !== userId);
  if (s.admins.length === before) return { removed: false, reason: 'not_admin' };
  await writeFile(s);
  return { removed: true };
}

// ─── leads ──────────────────────────────────────────────────────────

export async function appendLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const full: Lead = { id: cryptoRandomId(), createdAt: new Date().toISOString(), ...lead };
  const r = redis();
  if (r) {
    await r.rpush(LEADS_KEY, JSON.stringify(full));
    return full;
  }
  const s = await readFile();
  s.leads.push(full);
  await writeFile(s);
  return full;
}

export async function listLeads(): Promise<Lead[]> {
  const r = redis();
  if (r) {
    const raw = await r.lrange(LEADS_KEY, 0, -1);
    const out: Lead[] = [];
    for (const item of raw) {
      try {
        out.push(typeof item === 'string' ? (JSON.parse(item) as Lead) : (item as Lead));
      } catch {
        // Skip malformed entries.
      }
    }
    return out;
  }
  return (await readFile()).leads;
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = ['id', 'createdAt', 'name', 'phone', 'email', 'type', 'locale', 'consent', 'msg'];
  const esc = (v: string) => `"${v.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
  const rows = leads.map((l) => headers.map((h) => esc(String(l[h as keyof Lead] ?? ''))).join(','));
  return [headers.join(','), ...rows].join('\n');
}
