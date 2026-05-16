import { NextResponse } from 'next/server';
import { appendLead } from '@/lib/store';
import { broadcastLeadToAdmins } from '@/lib/leads';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { name, phone, type, msg, locale } = body as {
    name?: string;
    phone?: string;
    type?: string;
    msg?: string;
    locale?: string;
  };
  if (!name || !phone || !type) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  try {
    const lead = await appendLead({
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 80),
      type: String(type).slice(0, 120),
      msg: String(msg ?? '').slice(0, 2000),
      locale: String(locale ?? '').slice(0, 8) || 'unknown',
    });
    await broadcastLeadToAdmins(lead);
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
