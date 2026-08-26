'use client';

import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';
import { BUSINESS } from '@/data/business';

/**
 * The logo page, and why it exists.
 *
 * An audit of the studio's Search Console data found one commercial keyword
 * within reach: "logo design pretoria", already at position 15 with no page
 * to point at it. It is also the only term on the list where agency pages beat
 * directories — "graphic design pretoria" returns job boards, "graphic design
 * agency" returns Clutch and DesignRush, and "branding companies in pretoria"
 * returns signage and golf shirts. This is the one worth a page.
 *
 * Everything here is checkable: the four prices come from src/data/pricing.ts,
 * the two revision rounds and file ownership are the studio's actual terms, and
 * the FAQ answers match the visible copy so the FAQPage markup describes what a
 * reader can see. No superlatives, no award claims, no rating markup — this
 * domain has one manual action behind it and nothing here is worth a second.
 */

const TIERS = [
  {
    id: 'logo-redraw',
    name: 'Logo Redraw',
    price: 'R1,040',
    forWhom: 'You already have a logo, but only as a JPEG or a photo of a sign.',
    features: [
      'Existing logo rebuilt as clean vector artwork',
      'One final logo',
      'Print-ready files supplied',
      'Scales to any size without going fuzzy',
    ],
  },
  {
    id: 'logo-2',
    name: '2 Concepts',
    price: 'R2,080',
    forWhom: 'You know roughly what you want and would rather not wade through options.',
    features: [
      '2 unique concepts to choose from',
      '1 final logo',
      '2 revision rounds included',
      'Print-ready files supplied',
    ],
  },
  {
    id: 'logo-4',
    name: '4 Concepts',
    price: 'R3,120',
    forWhom: 'The usual choice. Enough range to compare directions without decision fatigue.',
    features: [
      '4 unique concepts to choose from',
      '1 final logo',
      '2 revision rounds included',
      'Print-ready files supplied',
    ],
    popular: true,
  },
  {
    id: 'logo-6',
    name: '6 Concepts',
    price: 'R4,160',
    forWhom: 'A committee has to agree, or the brand direction is genuinely open.',
    features: [
      '6 unique concepts to choose from',
      '1 final logo',
      '2 revision rounds included',
      'Print-ready files supplied',
    ],
  },
];

const FAQS = [
  {
    q: 'How much does a logo cost in Pretoria?',
    a: 'Ours are R1,040 to redraw an existing logo as vector artwork, R2,080 for two original concepts, R3,120 for four and R4,160 for six. The price is set by how many concepts you want to choose from, not by how long it takes us. Two revision rounds are included in every option except the redraw, which has one.',
  },
  {
    q: 'How many concepts should I ask for?',
    a: 'Four is the usual answer. Two is enough when you already know the direction; six is worth it when several people have to agree or the brand could genuinely go more than one way. More concepts is not the same as a better logo — past about six, most clients find it harder to choose, not easier.',
  },
  {
    q: 'How long does a logo take?',
    a: 'First concepts usually reach you within five to seven working days of the brief being settled. Each revision round adds two to three days. Most logo projects finish inside two to three weeks, and the part that slows it down is almost always waiting on feedback rather than drawing.',
  },
  {
    q: 'What files do I get?',
    a: 'Print-ready vector files plus the everyday formats you will actually use — versions for signage, for a website, and in single colour for stamps or embroidery. You own the artwork outright once the work is paid for. There is no licence to renew and no fee to use it.',
  },
  {
    q: 'What happens if I do not like any of the concepts?',
    a: 'That is what the revision rounds are for, and it is worth saying early rather than politely. If the whole direction is wrong we would rather hear it at concept stage than after final files. We will talk through what missed and redraw within the included rounds.',
  },
  {
    q: 'Do you design the rest of the brand as well?',
    a: 'Yes. A logo on its own is rarely the whole job — business cards, letterheads, email signatures and social templates usually follow. Those are priced separately so you are never paying for something you did not ask for.',
  },
  {
    q: 'Can we meet in person?',
    a: `Yes. The studio is at ${BUSINESS.address.street}, ${BUSINESS.address.suburb}, and we hold briefings and artwork reviews here or at your premises anywhere in Pretoria and Centurion. Book a time by phone or email first.`,
  },
];

export default function LogoDesignPretoriaPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* FAQPage markup describes only questions visible on this page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <section className="mx-auto max-w-4xl px-4 pt-28 pb-12">
        <h1 className="font-syne text-4xl md:text-5xl font-bold mb-6 text-[#FFD700]">
          Logo Design in Pretoria
        </h1>
        <p className="text-lg text-neutral-300 mb-4">
          We have been drawing logos from a studio in Pretoria since {BUSINESS.foundedYear}. A logo
          costs between R1,040 and R4,160 here, depending on how many concepts you want to choose
          from — the prices are below rather than behind a form.
        </p>
        <p className="text-neutral-400">
          Two revision rounds are included, you get print-ready files, and the artwork is yours
          outright once it is paid for.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-8 text-[#FFD700]">What a logo costs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-lg bg-zinc-900 p-6 ${
                tier.popular ? 'border-2 border-[#FFD700]' : 'border border-[#FFD700]/20'
              }`}
            >
              {tier.popular && (
                <span className="mb-3 self-start rounded-full bg-[#FFD700] px-3 py-1 text-xs font-bold text-black">
                  Most chosen
                </span>
              )}
              <h3 className="text-xl font-bold text-[#FFD700]">{tier.name}</h3>
              <p className="mt-1 text-3xl font-bold">{tier.price}</p>
              <p className="mt-3 text-sm text-neutral-400">{tier.forWhom}</p>
              <ul className="mt-4 mb-6 space-y-2 text-sm text-neutral-300">
                {tier.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-auto">
                <GetStartedButton
                  packageName={tier.name}
                  packagePrice={tier.price}
                  service="Logo design"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-6 text-[#FFD700]">How the work runs</h2>
        <ol className="space-y-4 text-neutral-300">
          <li>
            <strong className="text-white">1. The brief.</strong> We ask what the business does, who
            it sells to, and which logos you like and dislike — the dislikes are usually more useful.
            Fifteen minutes on the phone is normally enough.
          </li>
          <li>
            <strong className="text-white">2. Concepts.</strong> You get your chosen number of
            distinct directions, each shown at the sizes you will actually use it — not one idea in
            four colours.
          </li>
          <li>
            <strong className="text-white">3. Revisions.</strong> Pick a direction and we refine it.
            Two rounds are included; further rounds are R520 each, and most projects never need one.
          </li>
          <li>
            <strong className="text-white">4. Handover.</strong> Print-ready vector files, everyday
            formats, and a single-colour version. Yours outright, with no licence to renew.
          </li>
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-6 text-[#FFD700]">
          Questions we get asked about logo design
        </h2>
        <div className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-bold text-white mb-2">{f.q}</h3>
              <p className="text-neutral-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <p className="text-neutral-400">
          A logo is usually the first piece of a larger job. When you are ready, we also do{' '}
          <Link href="/branding-solutions-pretoria" className="text-[#FFD700] hover:underline">
            full brand identity
          </Link>
          ,{' '}
          <Link
            href="/pricing/graphic-design-pretoria"
            className="text-[#FFD700] hover:underline"
          >
            graphic design in Pretoria
          </Link>{' '}
          and{' '}
          <Link
            href="/pricing/packaging-design-pretoria"
            className="text-[#FFD700] hover:underline"
          >
            packaging design
          </Link>
          . You can also see{' '}
          <Link href="/project-showcase-pretoria" className="text-[#FFD700] hover:underline">
            work from our Pretoria studio
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
