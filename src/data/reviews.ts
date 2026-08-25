/**
 * REAL Google Business Profile review data.
 *
 * Source: the verified GBP for WL CreationX, Park Lane West Building,
 * 194 Bancor Ave, Waterkloof Glen, Pretoria (checked 2026-08-25).
 * Rating and count are read from that profile — never invented, never rounded
 * up. If they drift, update here.
 *
 * IMPORTANT — no Review / AggregateRating JSON-LD anywhere for these.
 * Google's structured-data policy prohibits marking up reviews that were
 * collected on a third-party platform (Google itself) as if they were
 * first-party reviews. They are displayed visually, attributed to Google, and
 * linked to the live profile so anyone can verify them. That is honest social
 * proof; schema here would be a policy violation on a site recovering from a
 * spam penalty.
 */

export const GOOGLE_REVIEWS = {
  rating: 4.9,
  count: 40,
  /** Public profile / all reviews */
  profileUrl: 'https://maps.google.com/?cid=11662630280010273748',
  /** Direct "write a review" link to hand to clients at project close-out */
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ_____________w',
  lastChecked: '2026-08-25',
} as const;

export type Testimonial = {
  name: string;
  text: string;
  date: string;
  rating: number;
};

/**
 * Verbatim review text from the Google profile. Only reviews that actually
 * carry written text are listed — rating-only reviews are counted in the
 * total above but obviously cannot be quoted.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dalton Msimango',
    text: 'Thank you so much for such an amazing work and a quick turn around time',
    date: '2024-08-09',
    rating: 5,
  },
  {
    name: 'Wanda Novukela',
    text: 'Highly recommended! Excellent and on time service.',
    date: '2024-05-16',
    rating: 5,
  },
];
