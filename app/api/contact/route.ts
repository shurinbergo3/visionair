import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { name, phone, type } = body as { name?: string; phone?: string; type?: string };
  if (!name || !phone || !type) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  // TODO: hook up real delivery — e.g. WhatsApp Business API, Telegram bot,
  // or a webhook to a CRM. Briefs land here as { name, phone, type, msg, locale }.

  console.log('[contact] brief received:', body);

  return NextResponse.json({ ok: true });
}
