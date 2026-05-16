import { promises as fs } from 'node:fs';
import path from 'node:path';
import { mainAdminId } from './telegram';

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  type: string;
  msg: string;
  locale: string;
};

type StoreShape = {
  admins: number[];
  leads: Lead[];
};

function storagePath(): string {
  if (process.env.STORAGE_PATH) return process.env.STORAGE_PATH;
  if (process.env.VERCEL) return '/tmp/visionair-store.json';
  return path.join(process.cwd(), 'data', 'store.json');
}

async function readStore(): Promise<StoreShape> {
  const p = storagePath();
  try {
    const raw = await fs.readFile(p, 'utf8');
    const parsed = JSON.parse(raw) as Partial<StoreShape>;
    return {
      admins: Array.isArray(parsed.admins) ? parsed.admins.filter((n) => Number.isFinite(n)) : [],
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    };
  } catch {
    return { admins: [], leads: [] };
  }
}

async function writeStore(s: StoreShape): Promise<void> {
  const p = storagePath();
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, JSON.stringify(s, null, 2), 'utf8');
}

export async function listAdmins(): Promise<number[]> {
  const s = await readStore();
  const set = new Set<number>(s.admins);
  set.add(mainAdminId());
  return [...set];
}

export async function isAdmin(userId: number): Promise<boolean> {
  if (userId === mainAdminId()) return true;
  const s = await readStore();
  return s.admins.includes(userId);
}

export async function isMainAdmin(userId: number): Promise<boolean> {
  return userId === mainAdminId();
}

export async function addAdmin(userId: number): Promise<{ added: boolean }> {
  const s = await readStore();
  if (userId === mainAdminId() || s.admins.includes(userId)) return { added: false };
  s.admins.push(userId);
  await writeStore(s);
  return { added: true };
}

export async function removeAdmin(userId: number): Promise<{ removed: boolean; reason?: string }> {
  if (userId === mainAdminId()) return { removed: false, reason: 'cannot_remove_main' };
  const s = await readStore();
  const before = s.admins.length;
  s.admins = s.admins.filter((id) => id !== userId);
  if (s.admins.length === before) return { removed: false, reason: 'not_admin' };
  await writeStore(s);
  return { removed: true };
}

export async function appendLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const s = await readStore();
  const full: Lead = {
    id: cryptoRandomId(),
    createdAt: new Date().toISOString(),
    ...lead,
  };
  s.leads.push(full);
  await writeStore(s);
  return full;
}

export async function listLeads(): Promise<Lead[]> {
  const s = await readStore();
  return s.leads;
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = ['id', 'createdAt', 'name', 'phone', 'type', 'locale', 'msg'];
  const esc = (v: string) => `"${v.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
  const rows = leads.map((l) => headers.map((h) => esc(String(l[h as keyof Lead] ?? ''))).join(','));
  return [headers.join(','), ...rows].join('\n');
}
