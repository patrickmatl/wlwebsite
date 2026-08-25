import { GOOGLE_REVIEWS, TESTIMONIALS } from '@/data/reviews';

function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-[#FFD700]">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
      <span className="sr-only">{rating} out of 5</span>
    </span>
  );
}

/**
 * Compact rating badge — real numbers from the Google Business Profile,
 * linked so anyone can verify. No review schema (see src/data/reviews.ts).
 */
export function GoogleRatingBadge({ className = '' }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full border border-[#FFD700]/25 bg-white/[0.03] px-4 py-2 text-sm transition-colors hover:border-[#FFD700]/60 ${className}`}
    >
      <Stars rating={GOOGLE_REVIEWS.rating} />
      <span className="font-semibold text-white">{GOOGLE_REVIEWS.rating}</span>
      <span className="text-neutral-400">
        from {GOOGLE_REVIEWS.count} Google reviews
      </span>
    </a>
  );
}

/** Full section: rating summary + verbatim client reviews. */
export default function GoogleReviews() {
  return (
    <section
      aria-labelledby="client-reviews"
      className="mx-auto max-w-5xl px-4 py-16"
    >
      <div className="text-center mb-10">
        <h2
          id="client-reviews"
          className="font-syne text-3xl font-bold text-[#FFD700] mb-3"
        >
          What Our Clients Say
        </h2>
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Stars rating={GOOGLE_REVIEWS.rating} className="scale-125" />
            <span className="font-syne text-2xl font-bold text-white">
              {GOOGLE_REVIEWS.rating}
            </span>
          </div>
          <p className="text-neutral-400 text-sm">
            Rated {GOOGLE_REVIEWS.rating} out of 5 from{' '}
            <a
              href={GOOGLE_REVIEWS.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] hover:underline"
            >
              {GOOGLE_REVIEWS.count} verified Google reviews
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="rounded-xl border border-[#FFD700]/20 bg-zinc-900/50 p-6 backdrop-blur-sm"
          >
            <Stars rating={t.rating} />
            <blockquote className="mt-3 text-neutral-200 leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{t.name}</span>
              <span className="text-neutral-500">
                Google review &middot;{' '}
                {new Date(t.date).toLocaleDateString('en-ZA', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-400">
        <a
          href={GOOGLE_REVIEWS.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFD700] hover:underline"
        >
          Read all {GOOGLE_REVIEWS.count} reviews on Google &rarr;
        </a>
      </p>
    </section>
  );
}
