import { NextResponse } from 'next/server';
import { broadcastReviewToAdmins } from '@/lib/reviews';
import { clientIp, rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { ok: allowed } = await rateLimit(`review:${clientIp(req)}`, 5, 600);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { name, role, rating, text, email, locale, consent } = body as {
    name?: string;
    role?: string;
    rating?: number;
    text?: string;
    email?: string;
    locale?: string;
    consent?: boolean;
  };

  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ ok: false, error: 'invalid_rating' }, { status: 400 });
  }

  const textValue = String(text ?? '').trim();
  if (textValue.length < 5) {
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
    await broadcastReviewToAdmins({
      name: String(name ?? '').trim().slice(0, 200),
      role: String(role ?? '').trim().slice(0, 160),
      rating: ratingNum,
      text: textValue.slice(0, 2000),
      email: emailValue,
      locale: String(locale ?? '').slice(0, 8) || 'unknown',
    });
  } catch (err) {
    console.error('[review] delivery failed:', err);
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
