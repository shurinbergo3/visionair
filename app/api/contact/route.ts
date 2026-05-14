import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { name, email, type } = body as { name?: string; email?: string; type?: string };
  if (!name || !email || !type) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  // TODO: hook up real delivery — e.g. Resend, SendGrid, or a webhook to your CRM.
  // Example with Resend (uncomment and install `resend`):
  //
  //   import { Resend } from 'resend';
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'briefs@visionair.site',
  //     to: 'hello@visionair.site',
  //     subject: `New brief — ${type} — ${name}`,
  //     text: JSON.stringify(body, null, 2),
  //   });

  console.log('[contact] brief received:', body);

  return NextResponse.json({ ok: true });
}
