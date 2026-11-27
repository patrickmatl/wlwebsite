import Link from 'next/link';
import type { Metadata } from 'next';
import { BUSINESS, FULL_ADDRESS } from '@/data/business';
import { findPriceItem, formatPrice } from '@/data/pricing';
import { GoogleRatingBadge } from '@/components/GoogleReviews';
import {
  ANNUAL_REPORT_AREAS,
  IN_PERSON_AREAS,
  REMOTE_AREAS,
  type AreaPage,
} from '@/data/area-pages';

/**
 * Landing page for one area the studio serves, in person or remotely.
 *
 * Read src/data/area-pages.ts before touching this. Almost every word on these
 * pages comes from that area's own entry. The component supplies layout, real
 * prices from pricing.ts and the studio's real address, nothing more. If you
 * add a sentence here that renders the same on every area page, you are
 * rebuilding the templated doorway pages this domain was penalised for.
 */

const SITE = BUSINESS.url;

export function areaMetadata(area: AreaPage): Metadata {
  const url = `${SITE}/${area.slug}`;
  return {
    title: { absolute: area.metaTitle },
    description: area.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url,
      siteName: BUSINESS.name,
      locale: 'en_ZA',
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: area.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: area.metaTitle,
      description: area.metaDescription,
      images: ['/images/og-image.jpg'],
    },
  };
}

function areaJsonLd(area: AreaPage) {
  const url = `${SITE}/${area.slug}`;
  const offers = area.services
    .map((s) => (s.priceId ? findPriceItem(s.priceId) : undefined))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.amount !== null))
    .map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: p.amount,
      priceCurrency: 'ZAR',
      url: `${SITE}${p.url}`,
    }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: area.metaTitle,
      description: area.metaDescription,
      inLanguage: 'en-ZA',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${url}#service` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: area.h1,
      serviceType: area.kind === 'annual-report' ? 'Annual report design' : 'Graphic design',
      description: area.metaDescription,
      // The provider is the one real studio. There is no office in this area
      // and the schema must not imply one.
      provider: { '@id': `${SITE}/#business` },
      areaServed: {
        '@type': 'Place',
        name: area.placeName,
        containedInPlace: { '@type': 'AdministrativeArea', name: `${area.province}, South Africa` },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Design services for ${area.placeName}`,
        itemListElement: offers,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: area.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}

const linkCls = 'text-[#FFD700] underline underline-offset-2 hover:text-[#FFE55C]';

export default function AreaLandingPage({ area }: { area: AreaPage }) {
  const notThis = (a: AreaPage) => a.slug !== area.slug;
  // The matching page for the same city in the other service, if one exists.
  const sibling = (area.kind === 'annual-report' ? [...IN_PERSON_AREAS, ...REMOTE_AREAS] : ANNUAL_REPORT_AREAS).find(
    (a) => a.placeName === area.placeName,
  );
  const linkGroups: { heading: string; links: { href: string; label: string }[] }[] =
    area.kind === 'annual-report'
      ? [
          {
            heading: 'Annual report design in other cities',
            links: [
              { href: '/pricing/annual-report-design-and-print-pretoria', label: 'Annual report design in Pretoria' },
              ...ANNUAL_REPORT_AREAS.filter(notThis).map((a) => ({ href: `/${a.slug}`, label: a.linkLabel })),
              ...(sibling ? [{ href: `/${sibling.slug}`, label: sibling.linkLabel }] : []),
            ],
          },
        ]
      : [
          {
            heading: 'Areas we cover in person',
            links: [
              { href: '/', label: 'Graphic design company in Pretoria' },
              ...IN_PERSON_AREAS.filter(notThis).map((a) => ({ href: `/${a.slug}`, label: a.linkLabel })),
            ],
          },
          {
            heading: 'Cities we serve remotely',
            links: [
              ...REMOTE_AREAS.filter(notThis).map((a) => ({ href: `/${a.slug}`, label: a.linkLabel })),
              ...(sibling ? [{ href: `/${sibling.slug}`, label: sibling.linkLabel }] : []),
              { href: '/service-areas-pretoria', label: 'All service areas' },
            ],
          },
        ];
  const reading =
    area.kind === 'annual-report'
      ? [
          { href: '/pricing/sustainability-esg-report-design-services-pretoria', label: 'Sustainability and ESG report design' },
          { href: '/pricing/investor-relations-material-design-services-pretoria', label: 'Investor relations material' },
        ]
      : [
          { href: '/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026', label: 'What graphic design costs in 2026' },
          {
            href: '/creative-industry-blog-pretoria/how-to-choose-graphic-design-company-pretoria',
            label: 'How to choose a design company: 9 checks',
          },
        ];

  return (
    <div className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd(area)) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#141000] via-black to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#FFD700] font-semibold mb-5">
            {area.eyebrow}
          </p>
          <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl leading-tight max-w-4xl">
            {area.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
            {area.lead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/get-in-touch-pretoria"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FFD700] text-black rounded-full font-semibold hover:bg-[#FFE44D] transition-colors"
            >
              {area.ctaLabel}
            </Link>
            <Link
              href="/project-showcase-pretoria"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/25 text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              See our work
            </Link>
          </div>
          <div className="mt-8">
            <GoogleRatingBadge />
          </div>

          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            {area.quickFacts.map((f) => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="text-xs uppercase tracking-wider text-neutral-400">{f.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="font-syne text-3xl md:text-4xl font-bold mb-6">{area.introHeading}</h2>
        <div className="space-y-5 text-neutral-300 text-lg leading-relaxed">
          {area.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Services with real prices */}
      <section className="bg-zinc-950 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-3">{area.servicesHeading}</h2>
          <p className="text-neutral-300 max-w-3xl mb-10">{area.servicesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {area.services.map((s) => {
              const price = s.priceId ? findPriceItem(s.priceId) : undefined;
              return (
                <article key={s.title} className="rounded-2xl border border-white/10 bg-black p-6 flex flex-col">
                  <h3 className="font-syne text-xl font-bold mb-2">{s.title}</h3>
                  {price && (
                    <p className="text-[#FFD700] font-semibold mb-3">
                      {formatPrice(price)}
                      <span className="text-neutral-400 font-normal"> · {price.name}</span>
                    </p>
                  )}
                  <p className="text-neutral-300 leading-relaxed flex-1">{s.body}</p>
                  <Link href={s.href} className={`${linkCls} mt-4 text-sm font-medium`}>
                    {s.linkLabel}
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-neutral-400">
            Prices are our published rates in rand. Every design job includes two revision rounds and
            final files you own. The full list is on our{' '}
            <Link href="/pricing" className={linkCls}>pricing page</Link>.
          </p>
        </div>
      </section>

      {/* Districts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="font-syne text-3xl md:text-4xl font-bold mb-3">{area.districtsHeading}</h2>
        <p className="text-neutral-300 max-w-3xl mb-10">{area.districtsIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {area.districts.map((d) => (
            <div key={d.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-syne text-lg font-bold text-[#FFD700] mb-1">{d.name}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-zinc-950 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-10">{area.industriesHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {area.industries.map((ind) => (
              <div key={ind.name}>
                <h3 className="font-syne text-xl font-bold mb-2">{ind.name}</h3>
                <p className="text-neutral-300 leading-relaxed">{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local work: rendered only when the studio has supplied real projects */}
      {area.localWork.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-10">
            Recent work for {area.placeName} clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {area.localWork.map((w) => (
              <article key={w.client} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-syne text-xl font-bold">{w.client}</h3>
                <p className="text-sm text-[#FFD700] mb-3">{w.what}</p>
                <p className="text-neutral-300 leading-relaxed">{w.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Working together */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="font-syne text-3xl md:text-4xl font-bold mb-8">{area.processHeading}</h2>
        <ol className="space-y-6">
          {area.process.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex-none w-10 h-10 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-syne text-lg font-bold mb-1">{step.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ: visible text, matching the FAQPage schema exactly */}
      <section className="bg-zinc-950 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-8">
            Questions from {area.placeName} businesses
          </h2>
          <div className="space-y-6">
            {area.faqs.map((f) => (
              <div key={f.q} className="border-b border-white/10 pb-6">
                <h3 className="font-syne text-lg font-bold mb-2">{f.q}</h3>
                <p className="text-neutral-300 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + internal links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/[0.04] p-8">
          <h2 className="font-syne text-2xl md:text-3xl font-bold mb-4">{area.closingHeading}</h2>
          <p className="text-neutral-300 leading-relaxed mb-6">{area.closing}</p>
          <ul className="space-y-2 text-neutral-200">
            <li>
              Phone / WhatsApp:{' '}
              <a href={`tel:${BUSINESS.phoneE164}`} className={linkCls}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li>
              Email: <a href={`mailto:${BUSINESS.email}`} className={linkCls}>{BUSINESS.email}</a>
            </li>
            <li>Studio: {FULL_ADDRESS}</li>
          </ul>
          <Link
            href="/get-in-touch-pretoria"
            className="mt-6 inline-flex items-center justify-center px-8 py-3.5 bg-[#FFD700] text-black rounded-full font-semibold hover:bg-[#FFE44D] transition-colors"
          >
            {area.ctaLabel}
          </Link>
        </div>
        <div>
          {linkGroups.map((g) => (
            <div key={g.heading} className="mb-8">
              <h2 className="font-syne text-2xl font-bold mb-4">{g.heading}</h2>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h2 className="font-syne text-2xl font-bold mb-4">Useful reading</h2>
          <ul className="space-y-2">
            {reading.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
