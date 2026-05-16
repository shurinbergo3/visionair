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

  const { name, phone, email, type, msg, locale, consent } = body as {
    name?: string;
    phone?: string;
    email?: string;
    type?: string;
    msg?: string;
    locale?: string;
    consent?: boolean;
  };
  const phoneValue = String(phone ?? '').trim();
  if (!phoneValue) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: 'consent_required' }, { status: 400 });
  }

  const emailValue = String(email ?? '').trim().slice(0, 200);
  if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  try {
    const lead = await appendLead({
      name: String(name ?? '').trim().slice(0, 200),
      phone: phoneValue.slice(0, 80),
      email: emailValue,
      type: String(type ?? '').trim().slice(0, 120),
      msg: String(msg ?? '').slice(0, 2000),
      locale: String(locale ?? '').slice(0, 8) || 'unknown',
      consent: true,
    });
    await broadcastLeadToAdmins(lead);
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
