import { Redis } from '@upstash/redis';

// Anti-abuse rate limiting for the public form endpoints. Backed by the same
// Upstash Redis as the store in production; an in-memory fallback covers local
// dev (process-local, good enough since dev runs a single instance).
//
// The limiter fails OPEN: if the Redis backend errors we allow the request.
// It exists to stop floods, not to gate security — better to accept a lead on
// a Redis blip than to drop a genuine customer.

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

type MemEntry = { count: number; resetAt: number };
const mem = new Map<string, MemEntry>();

/**
 * Fixed-window counter. Returns ok:false once more than `limit` calls share the
 * same `key` within `windowSec`.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<{ ok: boolean }> {
  try {
    const r = redis();
    if (r) {
      const k = `ratelimit:${key}`;
      const count = await r.incr(k);
      if (count === 1) await r.expire(k, windowSec);
      return { ok: count <= limit };
    }
  } catch (err) {
    console.error('[ratelimit] backend error, allowing request:', err);
    return { ok: true };
  }

  const now = Date.now();
  const entry = mem.get(key);
  if (!entry || entry.resetAt <= now) {
    mem.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return { ok: true };
  }
  entry.count++;
  return { ok: entry.count <= limit };
}

/** Best-effort client IP from proxy headers (Dokploy sits in front of us). */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}
