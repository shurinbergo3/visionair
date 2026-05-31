// Shared shape + aggregate-rating math for the testimonials block. Imported by
// both the client component (Testimonials.tsx) and the server page (for the
// hero rating + JSON-LD AggregateRating), so the displayed score, the per-card
// stars and the schema markup all derive from the SAME source of truth: the
// per-item `rating` values in messages/*.json. Never hardcode the average —
// it must always equal what the reviews actually add up to (Google flags
// AggregateRating markup that doesn't match the visible reviews).

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  rating: number; // 1–5, integer
};

export type ReviewAggregate = {
  count: number;
  value: number; // raw mean, e.g. 4.8846
  display: string; // one-decimal string for the UI / schema, e.g. "4.9"
};

export function aggregateRating(items: ReadonlyArray<{ rating?: number }>): ReviewAggregate {
  const ratings = items.map((i) => (typeof i.rating === 'number' ? i.rating : 5));
  const count = ratings.length;
  const value = count ? ratings.reduce((sum, r) => sum + r, 0) / count : 0;
  return { count, value, display: value.toFixed(1) };
}
