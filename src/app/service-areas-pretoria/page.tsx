import Link from 'next/link';
import type { Metadata } from 'next';
import { ANNUAL_REPORT_AREAS, IN_PERSON_AREAS, REMOTE_AREAS } from '@/data/area-pages';

export const metadata: Metadata = {
  title: 'Areas We Serve | Graphic Design South Africa',
  description:
    'WL CreationX works from one studio in Pretoria: on-site graphic design, branding and web design across Gauteng, with remote delivery for clients nationwide.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/service-areas-pretoria',
  },
  openGraph: {
    title: 'Service Areas | Graphic Design Across South Africa | WL CreationX',
    description:
      'WL CreationX works from one studio in Pretoria: on-site graphic design, branding and web design across Gauteng, with remote delivery for clients nationwide.',
    url: 'https://wlcreationx.co.za/service-areas-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

// href is the page that actually serves the area. Pretoria is the homepage,
// the Gauteng areas have their own landing pages (src/data/area-pages.ts).
// Remote cities and annual report pages are listed from the same data below.
const handWritten = [
  {
    id: 'pretoria',
    href: '/',
    name: 'Pretoria',
    badge: 'Home Base',
    description:
      'Our only studio — Park Lane West Building, Waterkloof Glen. In-person meetings, shoots and workshops happen here.',
    image: '/images/pretoria.jpg',
  },
  {
    id: 'pretoria-east',
    href: '/graphic-design-pretoria-east',
    name: 'Pretoria East & Menlyn',
    badge: 'Our Neighbourhood',
    description:
      'Lynnwood, Brooklyn, Garsfontein, Faerie Glen and Menlyn, minutes from the studio. Practices, shops and restaurants.',
    image: '/images/pretoria.jpg',
  },
  {
    id: 'centurion',
    href: '/graphic-design-centurion',
    name: 'Centurion',
    badge: 'On-Site in Gauteng',
    description:
      'About 20 minutes up the N1. Corporate identities, tender documents, vehicle branding and packaging.',
    image: '/images/pretoria.jpg',
  },
  {
    id: 'midrand',
    href: '/graphic-design-midrand',
    name: 'Midrand',
    badge: 'On-Site in Gauteng',
    description:
      'Exhibition and event branding for Gallagher and Kyalami, presentations and corporate video for head offices.',
    image: '/images/johannesburg.jpg',
  },
  {
    id: 'johannesburg',
    href: '/graphic-design-johannesburg',
    name: 'Johannesburg & Sandton',
    badge: 'On-Site in Gauteng',
    description:
      'Annual and ESG reports, investor presentations and corporate video for Sandton, Rosebank and the northern suburbs.',
    image: '/images/johannesburg.jpg',
  },
];

// Any in-person area without a hand-written card above gets one from its page data.
const serviceAreas = [
  ...handWritten,
  ...IN_PERSON_AREAS.filter((a) => !handWritten.some((h) => h.href === `/${a.slug}`)).map((a) => ({
    id: a.slug,
    href: `/${a.slug}`,
    name: a.placeName,
    badge: 'On-Site in Gauteng',
    description: a.metaDescription,
    image: '/images/johannesburg.jpg',
  })),
];

const cardCls =
  'block rounded-lg border border-[#FFD700]/20 bg-zinc-900/50 p-5 hover:border-[#FFD700]/60 transition-colors';

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-syne mb-4 text-[#FFD700]">
          Areas We Serve
        </h1>
        <p className="text-gray-300 max-w-3xl mb-10">
          WL CreationX operates from a single studio in Waterkloof Glen, Pretoria. We work
          on-site with clients across Gauteng and deliver graphic design, branding, web design
          and marketing projects remotely to businesses anywhere in South Africa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceAreas.map((area) => (
            <Link
              href={area.href}
              key={area.id}
              className="group relative overflow-hidden rounded-lg border border-[#FFD700]/20 bg-zinc-900/50 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${area.image})` }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <span className="inline-block text-xs uppercase tracking-wider text-[#FFD700] mb-2">
                  {area.badge}
                </span>
                <h2 className="text-2xl font-bold font-syne mb-2">{area.name}</h2>
                <p className="text-gray-200 text-sm">{area.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <section className="mt-16">
          <h2 className="text-3xl font-bold font-syne text-[#FFD700] mb-3">
            Major cities we serve remotely
          </h2>
          <p className="text-gray-300 max-w-3xl mb-8">
            We have no offices outside Pretoria. Clients in these cities work with us by video
            call and email, and printed work is couriered or sent to a printer near you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REMOTE_AREAS.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className={cardCls}>
                <span className="text-xs uppercase tracking-wider text-[#FFD700]">{a.province} · Remote</span>
                <h3 className="text-xl font-bold font-syne mt-1 mb-2">{a.placeName}</h3>
                <p className="text-gray-300 text-sm">{a.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold font-syne text-[#FFD700] mb-3">
            Annual report design by city
          </h2>
          <p className="text-gray-300 max-w-3xl mb-8">
            Annual, integrated and ESG reports for listed companies, public entities and
            non-profits, typeset and print-managed from our Pretoria studio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/pricing/annual-report-design-and-print-pretoria" className={cardCls}>
              <span className="text-xs uppercase tracking-wider text-[#FFD700]">Gauteng · Studio</span>
              <h3 className="text-xl font-bold font-syne mt-1 mb-2">Pretoria</h3>
              <p className="text-gray-300 text-sm">Annual report design and print, with published prices.</p>
            </Link>
            {ANNUAL_REPORT_AREAS.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className={cardCls}>
                <span className="text-xs uppercase tracking-wider text-[#FFD700]">
                  {a.province} · {a.coverage === 'in-person' ? 'On-site' : 'Remote'}
                </span>
                <h3 className="text-xl font-bold font-syne mt-1 mb-2">{a.placeName}</h3>
                <p className="text-gray-300 text-sm">{a.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-lg border border-[#FFD700]/20 bg-zinc-900/50 p-6 max-w-3xl">
          <h2 className="text-xl font-bold font-syne text-[#FFD700] mb-2">
            One Studio, Nationwide Reach
          </h2>
          <p className="text-gray-300 text-sm">
            We do not have offices in other cities. Every project is run from our Pretoria
            studio — in person where distance allows, and remotely everywhere else.{' '}
            <Link href="/get-in-touch-pretoria" className="text-[#FFD700] underline underline-offset-4">
              Get in touch
            </Link>{' '}
            to discuss how we can work with your team.
          </p>
        </div>

        <div className="mt-12 max-w-3xl space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
              Working with us on-site in Gauteng
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Gauteng is close enough to drive, so anything that genuinely benefits from being
              in the room happens in the room. That usually means the first briefing on a
              brand or a report, a photography or video shoot at your premises, and the
              sign-off meeting where a printed proof gets looked at under proper light rather
              than on a screen. Everything between those points runs over email and shared
              files, because a studio visit to review a second draft wastes an afternoon for
              both of us.
            </p>
            <p className="text-sm leading-relaxed">
              Clients we see in person are usually in Pretoria and the eastern suburbs —
              Waterkloof, Lynnwood, Menlyn, Brooklyn, Hatfield, Silver Lakes and Arcadia — as
              well as Centurion, Midrand, Sandton and the rest of Johannesburg. Travel inside
              Gauteng is built into the quote; we do not bill it as an extra line.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
              How remote projects actually run
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              For clients outside Gauteng, nothing about the work changes — only the meetings
              do. The brief is taken on a video call, concepts arrive as PDFs you can comment
              on directly, and the two rounds of changes included in every project happen the
              same way they would across a table. One designer stays on your project from the
              brief through to handover, so you are never re-explaining it to someone new.
            </p>
            <p className="text-sm leading-relaxed">
              Print is the one part worth planning for. We buy printing in from trade printers
              rather than running presses ourselves, which means a job printed for a Cape Town
              or Durban client can either be produced in Gauteng and couriered, or the
              print-ready files can go to a printer local to you. The second is usually faster
              and cheaper on a large run, and we will say so rather than quietly adding freight
              to the quote. On final payment the artwork is yours, in editable working files,
              so a local printer can be handed exactly what they need.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
              What we will not claim
            </h2>
            <p className="text-sm leading-relaxed">
              Plenty of studios list a dozen cities and imply an office in each one. We have
              one studio, in Waterkloof Glen, and it is the address on every quote and invoice
              we issue. If a project genuinely needs someone standing in a room in another
              province on a given morning, we will tell you that up front rather than take the
              work and manage it badly from four hundred kilometres away.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
