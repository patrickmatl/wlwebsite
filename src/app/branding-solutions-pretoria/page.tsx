import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CaseStudies from '@/components/CaseStudies';
import { BUSINESS } from '@/data/business';
import { findPriceItem, formatPrice, type PriceItem } from '@/data/pricing';

/*
  Every figure in the new copy below is read from pricing.ts rather than typed,
  so the page and the quote agent cannot drift apart. A missing id fails the
  build instead of quietly printing "undefined" on a live page.
*/
function priceItem(id: string): PriceItem {
  const item = findPriceItem(id);
  if (!item) throw new Error(`branding-solutions-pretoria: price item "${id}" is missing from pricing.ts`);
  return item;
}

const PACKAGE_IDS = [
  'brand-standard-essentials',
  'brand-standard-basic',
  'brand-standard-extended',
  'brand-illustrative-essentials',
  'brand-illustrative-basic',
  'brand-illustrative-extended',
] as const;

const PACKAGES = PACKAGE_IDS.map(priceItem);
const [STD_ESS, STD_BASIC, STD_EXT, ILL_ESS, ILL_BASIC, ILL_EXT] = PACKAGES.map(formatPrice);
const GUIDELINES = formatPrice(priceItem('brand-guidelines'));
const LOGO_REDRAW = formatPrice(priceItem('logo-redraw'));
const LOGO_FROM = formatPrice(priceItem('logo-2'));
const EXTRA_ROUND = formatPrice(priceItem('extra-revision'));

const PAGE_URL = 'https://wlcreationx.co.za/branding-solutions-pretoria';

/* What each tier adds, in the order the cards show it. */
const COMPARISON: Array<{ feature: string; tiers: [boolean, boolean, boolean] }> = [
  { feature: '3 creative concepts', tiers: [true, true, true] },
  { feature: '4 revision rounds', tiers: [true, true, true] },
  { feature: 'Final logo and logo package', tiers: [true, true, true] },
  { feature: 'Brand colour palette', tiers: [true, true, true] },
  { feature: 'Brand typography guide', tiers: [true, true, true] },
  { feature: '3 logo-based patterns', tiers: [true, true, true] },
  { feature: 'Letterhead design', tiers: [true, true, true] },
  { feature: 'Email signatures', tiers: [true, true, true] },
  { feature: 'Business cards', tiers: [false, true, true] },
  { feature: 'Social media templates', tiers: [false, true, true] },
  { feature: 'Folder design', tiers: [false, false, true] },
  { feature: 'PowerPoint template', tiers: [false, false, true] },
  { feature: 'Cover page', tiers: [false, false, true] },
];

/*
  Portfolio pieces chosen from the logo folders. The institutional marks in
  /images/clients (a university, SAPS, a government department, an existing
  beverage brand) are left out on purpose: they are organisations the studio
  has worked for, not identities it designed, and showing them under
  "brand identity work" would claim otherwise.
*/
const PORTFOLIO: Array<{ src: string; alt: string; size: number }> = [
  { src: '/images/clients/Client10.webp', size: 500, alt: 'Thabo Law Firm logo: scales of justice resting on an open hand inside a copper circle on a navy background' },
  { src: '/images/clients/Client13.webp', size: 500, alt: 'LiKuba Investments logo: a black geometric emblem of curved lines around a yellow centre above a light sans-serif wordmark' },
  { src: '/images/clients/Client16.webp', size: 500, alt: 'Lebone Consulting Group logo: a seedling topped by a glowing bulb above green fields inside a teal circle' },
  { src: '/images/clients/Client11.webp', size: 500, alt: 'Elshadai Combined School crest: a white dove over a sunrise and water inside a shield framed by laurel leaves' },
  { src: '/images/clients/Client6.webp', size: 500, alt: 'Zonke Still Water logo: a bold slate-blue Z letterform with a water droplet cut into it' },
  { src: '/images/clients/Client17.webp', size: 500, alt: 'Lwazi Logistics Ventures logo: an illustrated map of Africa in red, yellow and green with an aeroplane and a container truck' },
  { src: '/images/clients/Client18.webp', size: 500, alt: 'Rusplek Wellness Spa logo: a lilac lotus flower under a white arc on a deep green background' },
  { src: '/images/clients/Client2.webp', size: 500, alt: 'Solaris Energy Solutions logo: a yellow sun rising over green rolling fields inside a circle' },
  { src: '/images/clients/Client12.webp', size: 500, alt: 'Eyethu Social logo: a green ES monogram inside a circle ringed by the name in heavy black type' },
  { src: '/images/clients/Client8.webp', size: 500, alt: 'Segwagwa Properties logo: a green frog perched on the roof of a blue house' },
  { src: '/images/logos/Logo31.webp', size: 1024, alt: 'Harmony Haven Hospice logo: a white dove carrying an olive branch inside a green heart-shaped ribbon' },
  { src: '/images/logos/Logo28.webp', size: 1024, alt: 'Lumina Luxe Interiors logo: a gold winged swan above a widely spaced serif wordmark on black' },
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: 'How much does a brand identity cost in Pretoria?',
    a: `Our six brand identity packages run from ${STD_ESS} for Standard Essentials to ${ILL_EXT} for Illustrative Extended, and the prices are fixed for what each package lists. If you only need a logo, standalone logo design starts at ${LOGO_FROM}. Printing, photography, copywriting and rights-managed stock images are not included in the package prices.`,
  },
  {
    q: 'What is the difference between a logo and a brand identity?',
    a: 'A logo is one mark. A brand identity is the mark plus the rules and files that make everything else match it: the colour palette with its print and screen values, the typefaces, patterns built from the logo, and the documents your business sends out every day, such as letterheads, email signatures and templates. A logo on its own leaves every supplier to guess the rest.',
  },
  {
    q: 'Do I need a full brand guidelines document?',
    a: `Every package includes a colour palette and a typography guide, which covers what most small businesses need. A full guidelines document, with logo clear-space and minimum sizes, colour and imagery rules and do-and-do-not examples a supplier can follow, is a separate item at ${GUIDELINES}. It earns its price when several people or outside suppliers produce material for you.`,
  },
  {
    q: 'How many rounds of changes are included?',
    a: `The brand identity packages include four revision rounds on the concept you choose, which is more than the two rounds included on standalone design work. If you need more, an additional round is ${EXTRA_ROUND}.`,
  },
  {
    q: 'Who owns the brand when the project is finished?',
    a: 'On final payment the artwork is yours to use however you like. Note the footnote under the packages: native working files are not included in these package prices and are quoted separately if you want them, so ask for them when you request a quote if you plan to edit the files yourself.',
  },
  {
    q: 'Should we rebrand or refresh our existing logo?',
    a: 'Refresh if customers already recognise you and the problem is that the logo looks dated, reproduces badly or exists only as a low-resolution file. Rebrand if the business itself has changed: a new name, a merger, a different market, or a mark that no longer describes what you do. We will tell you which one we think you need before you pay for either.',
  },
  {
    q: 'Can you print the business cards, letterheads and folders?',
    a: 'Yes. Printing is not part of the package price, but we can arrange it through trade printers and quote it separately once you know the quantities, paper and finish. Every file is checked for print-ready setup before it goes to press.',
  },
  {
    q: 'Do you only work with Pretoria businesses?',
    a: `No. The studio is at ${BUSINESS.address.street}, ${BUSINESS.address.suburb}, and we meet Pretoria and Centurion clients here or at their premises, but briefs, concept presentations and handover all work by email and video call for businesses elsewhere in South Africa.`,
  },
];

const FURTHER_READING = [
  {
    href: '/creative-industry-blog-pretoria/what-a-brand-identity-includes',
    title: 'What a brand identity includes',
    note: 'The full list of parts, what a guidelines document should cover, and when a logo alone is enough.',
  },
  {
    href: '/creative-industry-blog-pretoria/logo-file-formats-explained',
    title: 'Logo file formats explained',
    note: 'SVG, EPS, PDF, PNG and JPG: which file goes to the printer, the signwriter and the web developer.',
  },
  {
    href: '/creative-industry-blog-pretoria/how-to-choose-graphic-design-company-pretoria',
    title: 'How to choose a graphic design company in Pretoria',
    note: 'What to ask before you pay a deposit, and the warning signs in a cheap branding offer.',
  },
  {
    href: '/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026',
    title: 'Graphic design cost in Pretoria',
    note: 'Our actual 2026 rates for logos, corporate identity, print and marketing material.',
  },
];

const link = 'text-[#FFD700] hover:underline';
const h2 = 'text-2xl md:text-3xl font-bold font-syne text-[#FFD700] mb-4';
const para = 'text-sm md:text-base leading-relaxed mb-3';

const BrandIdentityPackages = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Service + Offer markup: one Offer per package, figures from pricing.ts. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${PAGE_URL}#service`,
            name: 'Brand identity design',
            serviceType: 'Brand identity design',
            url: PAGE_URL,
            description:
              'Brand identity packages from a Pretoria design studio: logo, colour palette, typography guide, logo-based patterns, stationery and templates, with standard or illustrative logos.',
            provider: { '@id': 'https://wlcreationx.co.za/#business' },
            areaServed: [
              { '@type': 'City', name: 'Pretoria' },
              { '@type': 'City', name: 'Centurion' },
              { '@type': 'Country', name: 'South Africa' },
            ],
            offers: PACKAGES.map((p) => ({
              '@type': 'Offer',
              name: p.name,
              description: p.includes.join('; '),
              price: String(p.amount),
              priceCurrency: 'ZAR',
              url: PAGE_URL,
            })),
          }),
        }}
      />
      {/* FAQPage markup describes only the questions visible on this page. */}
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

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          BRANDING AGENCY IN PRETORIA
        </h1>
        <p className="text-lg mb-4">
          Choose from three design packages at a 10% discount on standard package pricing — mention this page when you enquire.
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Professional visual identity and logo design packages for startup businesses.
          An ideal solution for micro, small, and medium enterprises looking to rebrand
          or update their corporate identity.
        </p>
        <p className="text-gray-300 max-w-3xl mx-auto mt-4">
          WL CreationX has designed brand identities from a studio at {BUSINESS.address.street},{' '}
          {BUSINESS.address.suburb} since {BUSINESS.foundedYear}. Each package below is a fixed price
          for a defined list of pieces, so you can see what you are buying before you pick up the
          phone. If all you need is a mark, our{' '}
          <Link href="/logo-design-pretoria" className={link}>
            logo design service
          </Link>{' '}
          covers that. If you need the mark plus the system that makes your business look the same
          on a letterhead, a proposal and a social post, this is the page.
        </p>
      </div>

      {/* Packages Grid — mirrors pricing.ts brand-standard-essentials/-basic/-extended
          and brand-illustrative-essentials/-basic/-extended. Change both together. */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Standard Packages */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD ESSENTIALS</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 6 683*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ 3 Creative Concepts</li>
            <li>✓ 4 Revision Rounds</li>
            <li>✓ 1 Final Design</li>
            <li>✓ Logo Package</li>
            <li>✓ Brand Colour Palette</li>
            <li>✓ Brand Typography Guide</li>
            <li>✓ 3 Logo-Based Patterns</li>
            <li>✓ Letterhead Design</li>
            <li>✓ Email Signatures</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD BASIC</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 9 356*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ All Essentials Features</li>
            <li>✓ Business Cards</li>
            <li>✓ Social Media Templates</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">STANDARD EXTENDED</h3>
          <p className="text-sm text-gray-400 mb-2">WITH LETTERMARK, WORDMARK, ABSTRACT OR PICTORIAL LOGO</p>
          <p className="text-2xl font-bold mb-6">R 13 662*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ All Basic Features</li>
            <li>✓ Folder Design</li>
            <li>✓ PowerPoint Template</li>
            <li>✓ Cover Page</li>
          </ul>
        </div>
      </div>

      {/* Illustrative Packages */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE ESSENTIALS</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 12 029*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Essentials</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE BASIC</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 14 702*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Basic</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all">
          <h3 className="text-[#FFD700] text-xl font-bold mb-4">ILLUSTRATIVE EXTENDED</h3>
          <p className="text-sm text-gray-400 mb-2">WITH ILLUSTRATIVE LOGO</p>
          <p className="text-2xl font-bold mb-6">R 19 008*</p>
          <ul className="space-y-3 text-gray-300">
            <li>✓ Same features as Standard Extended</li>
            <li>✓ Custom Illustration Work</li>
          </ul>
        </div>
      </div>

  {/* Disclaimer */}
  <div className="max-w-7xl mx-auto text-sm text-gray-400 italic">
    *All prices exclude native files, purchasing of rights managed stock photos or illustrations,
    proofreading, copywriting, content generation, printing, photography, and custom illustration work.
  </div>

  {/*
    The page ranked for "branding companies in pretoria" on six price cards and
    barely three hundred words — a grid with nothing on it a buyer could use to
    choose. The prose below is not padding: it answers the two questions every
    enquiry about these packages actually asks, which is standard versus
    illustrative, and which of the three tiers. Content that answers the
    decision is what earns the ranking; a longer price list is not.
  */}
  <div className="max-w-4xl mx-auto mt-16 space-y-8 text-gray-300 text-left">
    <section>
      <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
        Standard or illustrative — which one do you need?
      </h2>
      <p className="text-sm leading-relaxed mb-3">
        The difference is roughly R5,000 a tier, so it is worth understanding
        rather than guessing. A standard logo is built from letterforms and
        geometry: a lettermark, a wordmark, an abstract shape or a simple
        pictorial mark. It reproduces cleanly at any size, survives being
        embroidered onto a golf shirt or etched into signage, and it is what
        most professional services, consultancies and B2B businesses should be
        buying.
      </p>
      <p className="text-sm leading-relaxed">
        An illustrative identity adds custom drawn artwork — a character, a
        detailed scene, a hand-built emblem. It is the right answer when the
        drawing is doing commercial work: on packaging that has to be picked up
        off a shelf, for a food or beverage brand, a school or club with a
        crest, or anywhere the mark itself is the story. If you are choosing it
        because it looks nicer on the pitch document, buy the standard package
        instead and put the difference into printing.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
        Essentials, Basic or Extended
      </h2>
      <p className="text-sm leading-relaxed mb-3">
        All three tiers include the same core: three creative concepts, four
        rounds of changes, the final logo package, a colour palette, a
        typography guide, logo-based patterns, letterhead and email signatures.
        That is a complete identity — Essentials is not a starter kit, it is the
        whole brand, and plenty of businesses never need more than it.
      </p>
      <p className="text-sm leading-relaxed">
        Basic adds business cards and social media templates, which matters if
        you meet clients in person or post regularly. Extended adds a folder
        design, a PowerPoint template and a cover page, and it earns its price
        for businesses that pitch — if your team sends proposals or presents to
        boards, a branded deck template stops six people building six different
        looking documents. If none of that describes how you actually trade, the
        cheaper tier is the right one and we will say so.
      </p>
    </section>

    <section>
      <h2 className="text-2xl font-bold font-syne text-[#FFD700] mb-3">
        What happens after you choose
      </h2>
      <p className="text-sm leading-relaxed">
        A 50% deposit books the work into the schedule and the balance is
        invoiced on handover. Concepts are presented as a set for you to choose
        from, not one option to approve, and the four revision rounds are for
        refining the direction you pick. Everything is designed from scratch —
        we do not work from template marketplaces — and one designer stays on
        your project from the brief through to handover. On final payment the
        artwork is yours, and note the asterisk above: native working files sit
        outside these package prices and are quoted separately if you want them.
      </p>
    </section>
  </div>

      {/* ── What you receive ─────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mt-20 text-gray-300 text-left">
        <section aria-labelledby="whats-included">
          <h2 id="whats-included" className={h2}>
            What a brand identity from WL CreationX includes
          </h2>
          <p className={para}>
            A brand identity is the set of decisions and files that make your business look like
            itself wherever it appears. The logo is the visible part; the rest of the kit stops your
            printer, your signwriter and whoever does your social posts from each inventing their
            own version. Here is what the packages hand over, piece by piece.
          </p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-syne font-bold text-white">The logo and its logo package</dt>
              <dd className={para}>
                One final mark, refined from the concept you choose, prepared in the versions you
                will need in practice: typically full colour, a single-colour version and a
                reversed version for dark backgrounds, so the logo works on a white letterhead, a
                black golf shirt and a vehicle door.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Brand colour palette</dt>
              <dd className={para}>
                Your primary and supporting colours, each written down with its values for print
                and for screen. Without those codes, the same green comes back from three suppliers
                as three different greens.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Brand typography guide</dt>
              <dd className={para}>
                Which typefaces the brand uses for headings and body text, and how they are set. It
                is the difference between documents that look related and documents that merely
                share a logo.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Three logo-based patterns</dt>
              <dd className={para}>
                Graphic devices built from the shapes in your mark, for backgrounds, the reverse of
                business cards, packaging, wall graphics and social posts. They let the brand show
                up in places where repeating the logo would look heavy-handed.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Letterhead and email signatures</dt>
              <dd className={para}>
                The two items most businesses use every day, which is why both are in every tier:
                a quotation on a proper letterhead and one signature across the team are where
                clients first notice whether a business is organised.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Business cards and social media templates (Basic and Extended)</dt>
              <dd className={para}>
                Cards for people who meet clients face to face, and templates so your posts share
                one layout, one type style and one colour logic rather than whatever the day&apos;s app
                suggested.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Folder, PowerPoint template and cover page (Extended)</dt>
              <dd className={para}>
                The pitching kit. A presentation template your staff can type into, a cover page for
                proposals and reports, and a presentation folder for printed documents handed over in
                meetings.
              </dd>
            </div>
            <div>
              <dt className="font-syne font-bold text-white">Custom illustration (Illustrative packages)</dt>
              <dd className={para}>
                The illustrative tiers replace the standard logo with drawn artwork: a character, a
                crest or a detailed emblem, with the same supporting pieces as the matching standard
                tier.
              </dd>
            </div>
          </dl>

          <h3 className="font-syne text-xl font-bold text-white mt-10 mb-4">The packages side by side</h3>
          <div className="overflow-x-auto rounded-lg border border-[#FFD700]/20">
            <table className="w-full min-w-[480px] text-sm text-left">
              <caption className="sr-only">Brand identity package comparison</caption>
              <thead className="bg-zinc-900 text-[#FFD700]">
                <tr>
                  <th scope="col" className="p-3 font-syne">Included</th>
                  <th scope="col" className="p-3 font-syne text-center">Essentials</th>
                  <th scope="col" className="p-3 font-syne text-center">Basic</th>
                  <th scope="col" className="p-3 font-syne text-center">Extended</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-t border-white/10">
                    <th scope="row" className="p-3 font-normal text-gray-300">{row.feature}</th>
                    {row.tiers.map((has, i) => (
                      <td key={i} className="p-3 text-center">
                        {has ? (
                          <span className="text-[#FFD700]">✓<span className="sr-only"> included</span></span>
                        ) : (
                          <span className="text-gray-500">–<span className="sr-only"> not included</span></span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-[#FFD700]/30 bg-zinc-900">
                  <th scope="row" className="p-3 text-white">Standard logo</th>
                  <td className="p-3 text-center text-white">{STD_ESS}</td>
                  <td className="p-3 text-center text-white">{STD_BASIC}</td>
                  <td className="p-3 text-center text-white">{STD_EXT}</td>
                </tr>
                <tr className="border-t border-white/10 bg-zinc-900">
                  <th scope="row" className="p-3 text-white">Illustrative logo</th>
                  <td className="p-3 text-center text-white">{ILL_ESS}</td>
                  <td className="p-3 text-center text-white">{ILL_BASIC}</td>
                  <td className="p-3 text-center text-white">{ILL_EXT}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed mt-4">
            Read the footnote under the cards before you budget. The package prices cover design
            only: printing, photography, copywriting and proofreading, rights-managed stock images
            and native working files are separate. A full brand guidelines document, with clear-space
            rules, minimum sizes, imagery direction and do-and-do-not examples, is also a separate
            item at {GUIDELINES} on our{' '}
            <Link href="/pricing/graphic-design-pretoria" className={link}>
              graphic design price list
            </Link>
            . Most small businesses are well served by the palette and typography guide in the
            package; the full document pays off once several people or outside suppliers are
            producing material for you.
          </p>
        </section>

        {/* ── Strategy ─────────────────────────────────────────────────── */}
        <section aria-labelledby="positioning" className="mt-16">
          <h2 id="positioning" className={h2}>
            Before anything is drawn: the positioning questions
          </h2>
          <p className={para}>
            A logo designed without a brief is a guess about taste. The useful work happens before
            the first sketch, when we pin down what the identity has to do. These are the questions
            we work through with you at the start of every brand project, in plain language:
          </p>
          <ol className="list-decimal pl-5 space-y-3 text-sm md:text-base leading-relaxed mt-4">
            <li>
              <strong className="text-white">Who buys from you, and who signs off the purchase?</strong>{' '}
              A homeowner choosing a plumber, a procurement committee choosing a supplier and a
              parent choosing a school read a brand very differently.
            </li>
            <li>
              <strong className="text-white">Who else are they considering?</strong> Name the three
              businesses your customer would call if you did not answer the phone. The identity has
              to be told apart from those, not from every business in Pretoria.
            </li>
            <li>
              <strong className="text-white">What should people believe about you at a glance?</strong>{' '}
              Pick two or three words, such as established, careful, quick, affordable, premium or
              local. You cannot be all of them, and the choice drives colour, type and the style of
              the mark.
            </li>
            <li>
              <strong className="text-white">Where will the brand mostly appear?</strong> A logo that
              lives on a WhatsApp profile picture and embroidered shirts needs different handling
              from one that lives on tender documents and a boardroom screen.
            </li>
            <li>
              <strong className="text-white">What must stay?</strong> For an existing business:
              the name, a colour customers already associate with you, a symbol with history.
              Throwing away recognition you have paid for is rarely smart.
            </li>
            <li>
              <strong className="text-white">What are the constraints?</strong> Industry
              conventions, several languages on one sign, a print budget that favours one or two
              colours, or a parent organisation&apos;s rules you have to sit within.
            </li>
            <li>
              <strong className="text-white">Where is the business going?</strong> A name and mark
              that suit one suburb today may need to carry a national business in five years.
            </li>
          </ol>
          <p className={`${para} mt-4`}>
            The answers become the written brief, and the brief is the yardstick for the concepts.
            When you choose between the three directions, the question is which one does what the
            brief asks, not only which one you like best on the day.
          </p>
        </section>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <section aria-labelledby="process" className="mt-16">
          <h2 id="process" className={h2}>
            How a brand identity project runs, from enquiry to handover
          </h2>
          <ol className="space-y-5 mt-4">
            {[
              ['Enquiry and quote', 'Tell us about the business and which package you are considering, or ask which one fits. You get a written quote for the package and anything outside it, such as printing or copywriting.'],
              ['Deposit and scheduling', 'A 50% deposit books the work and confirms the start date. Nothing is designed on spec before that.'],
              ['Brief and discovery', 'We work through the positioning questions above, look at your competitors and anything you already have, and write the brief together.'],
              ['Three concepts', 'Three distinct directions are presented as a set, so you compare approaches rather than approve or reject a single idea.'],
              ['Refinement', 'You choose one direction and the four included revision rounds go into getting it right: proportions, colour, type and detail.'],
              ['Roll-out', 'The approved logo is built into the rest of your tier: palette, typography, patterns, stationery and, depending on the package, templates.'],
              ['Final artwork check', 'Every file is set up and checked for print or screen before it is released.'],
              ['Handover', 'You receive the final files with colour codes and fonts documented, and the balance is invoiced.'],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="flex-none w-9 h-9 rounded-full bg-[#FFD700] text-black font-bold font-syne flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-syne font-bold text-white">{title}</h3>
                  <p className="text-sm md:text-base leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Files ────────────────────────────────────────────────────── */}
        <section aria-labelledby="files" className="mt-16">
          <h2 id="files" className={h2}>
            The files you receive, and what each one is for
          </h2>
          <p className={para}>
            A brand that only exists as a JPEG attached to an old email is a brand you will pay to
            have redrawn. Your logo is handed over as vector artwork that scales to any size, for
            printers, signwriters and embroiderers, plus PNG files with transparent backgrounds for
            documents, websites and social media. Stationery and templates come as print-ready
            PDFs or in the format they are used in, such as a PowerPoint template.
          </p>
          <p className={para}>
            If you have ever been asked by a supplier for &ldquo;the vector&rdquo; and not known
            which file to send, our guide to{' '}
            <Link href="/creative-industry-blog-pretoria/logo-file-formats-explained" className={link}>
              logo file formats
            </Link>{' '}
            explains SVG, EPS, PDF, PNG and JPG and which supplier needs which. One thing to settle
            at quote stage: native working files are outside the package prices (see the footnote),
            so if you want them for your own designer to edit later, ask for them to be quoted.
          </p>
        </section>

        {/* ── Rebrand vs refresh ───────────────────────────────────────── */}
        <section aria-labelledby="rebrand" className="mt-16">
          <h2 id="rebrand" className={h2}>
            Rebrand or refresh?
          </h2>
          <p className={para}>
            Most established businesses that contact us do not need to start again. They need a{' '}
            <strong className="text-white">refresh</strong>: the same name, the same basic idea and
            colours customers already recognise, redrawn so it reproduces cleanly, works small on a
            phone screen and comes with the palette and type rules it never had. If the logo is fine
            and the only problem is that nobody can find a decent file, a vector redraw costs{' '}
            {LOGO_REDRAW} and may be all you need.
          </p>
          <p className={para}>
            A <strong className="text-white">rebrand</strong> is for when the business itself has
            changed: a merger, a new name, a move from residential to commercial work, a name that
            clashes with someone else&apos;s, or a mark that describes what you did ten years ago.
            It starts from the positioning questions with nothing assumed.
          </p>
          <p className={para}>
            Either way, list every place the old identity lives (signage, vehicles, uniforms,
            templates, website, Google Business Profile, tender documents) before launch. Switch
            the digital items at once and replace physical ones as they are reprinted.
          </p>
        </section>

        {/* ── Who it suits ─────────────────────────────────────────────── */}
        <section aria-labelledby="who" className="mt-16">
          <h2 id="who" className={h2}>
            Who these packages suit
          </h2>
          <ul className="space-y-3 text-sm md:text-base leading-relaxed">
            <li>
              <strong className="text-white">Professional services</strong> such as attorneys,
              accountants, engineers and consultancies, where a standard mark and a disciplined
              Extended kit (proposal cover, presentation template, folder) matter more than
              decoration.
            </li>
            <li>
              <strong className="text-white">Government suppliers and tender bidders.</strong>{' '}
              Bid documents and company profiles are judged partly on how organised they look;
              ready-made cover pages and templates take that off the list at every deadline.
            </li>
            <li>
              <strong className="text-white">Retail and product brands</strong>, where the mark has
              to work on shelves and labels as well as on screens. The illustrative tiers often earn
              their place here, and the identity carries straight into{' '}
              <Link href="/pricing/packaging-design-pretoria" className={link}>
                packaging design
              </Link>
              .
            </li>
            <li>
              <strong className="text-white">Hospitality</strong>: guest houses, restaurants, venues
              and wellness businesses, where signage, menus and social media carry most of the brand.
            </li>
            <li>
              <strong className="text-white">NPOs, schools and associations</strong>, which often
              need a crest or emblem, donor-facing documents and a look volunteers can apply without
              a designer on hand.
            </li>
            <li>
              <strong className="text-white">New businesses</strong>: Standard Essentials gives you
              a complete identity from the first invoice, ready to carry onto a website when you
              need one, built yourself or through our{' '}
              <Link href="/pricing/website-design-pretoria" className={link}>
                website design service
              </Link>
              .
            </li>
          </ul>
        </section>
      </div>

      {/* ── Portfolio ──────────────────────────────────────────────────── */}
      <section aria-labelledby="portfolio" className="max-w-6xl mx-auto mt-20">
        <h2 id="portfolio" className={`${h2} text-center`}>
          Logo and identity work from the studio
        </h2>
        <p className="text-sm md:text-base text-gray-300 text-center max-w-3xl mx-auto mb-8">
          A selection of marks across professional services, education, retail, logistics,
          hospitality and the non-profit sector. More finished work is in our{' '}
          <Link href="/project-showcase-pretoria" className={link}>
            project showcase
          </Link>
          .
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PORTFOLIO.map((item) => (
            <figure key={item.src} className="rounded-lg overflow-hidden border border-[#FFD700]/20 bg-zinc-900">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.size}
                height={item.size}
                loading="lazy"
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link
            href="/project-showcase-pretoria"
            className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300"
          >
            See the full project showcase
          </Link>
        </p>
      </section>

      <CaseStudies service="branding" heading="Recent brand identity projects" />

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="faq" className="max-w-4xl mx-auto mt-20 text-gray-300 text-left">
        <h2 id="faq" className={h2}>
          Brand identity questions we are asked most
        </h2>
        <div className="space-y-6">
          {FAQS.map((f) => (
            <div key={f.q} className="border-b border-white/10 pb-5">
              <h3 className="font-syne font-bold text-white text-lg mb-2">{f.q}</h3>
              <p className="text-sm md:text-base leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed mt-6">
          Still deciding? Send us a short description of the business and the package you are
          leaning towards through our{' '}
          <Link href="/get-in-touch-pretoria" className={link}>
            contact page
          </Link>{' '}
          and we will tell you honestly whether a smaller one would do. Names, taglines and
          wording sit outside the package prices and can be quoted through our{' '}
          <Link href="/pricing/copywriting-services-pretoria-johannesburg" className={link}>
            copywriting service
          </Link>
          .
        </p>
      </section>

      {/* ── Further reading ────────────────────────────────────────────── */}
      <section aria-labelledby="further-reading" className="max-w-4xl mx-auto mt-16 text-left">
        <h2 id="further-reading" className={h2}>
          Further reading
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {FURTHER_READING.map((r) => (
            <li key={r.href} className="rounded-lg border border-[#FFD700]/20 bg-zinc-900 p-5">
              <Link href={r.href} className="font-syne font-bold text-[#FFD700] hover:underline">
                {r.title}
              </Link>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">{r.note}</p>
            </li>
          ))}
        </ul>
      </section>

  {/*
    This page ranks first for "branding companies in pretoria" and, until now,
    linked out exactly once — to the home page. A page with authority and no
    outbound internal links passes none of it on, so the terms that actually
    pay saw nothing from it. Each link below is descriptive on purpose: the
    anchor text is what tells a crawler what sits at the other end.
  */}
  <div className="max-w-7xl mx-auto mt-10 text-center">
    <p className="text-neutral-400 text-sm">
      Not sure which package fits? Compare our{' '}
      <Link href="/pricing/graphic-design-pretoria" className="text-[#FFD700] hover:underline">
        graphic design prices in Pretoria
      </Link>
      ,{' '}
      <Link href="/pricing/website-design-pretoria" className="text-[#FFD700] hover:underline">
        website design prices in Pretoria
      </Link>{' '}
      and{' '}
      <Link href="/pricing/packaging-design-pretoria" className="text-[#FFD700] hover:underline">
        packaging design prices
      </Link>
      , or see{' '}
      <Link href="/project-showcase-pretoria" className="text-[#FFD700] hover:underline">
        recent branding work from our Pretoria studio
      </Link>
      .
    </p>
    <p className="text-neutral-400 text-sm mt-3">
      Everything <Link href="/" className="text-[#FFD700] hover:underline">WL CreationX</Link> offers,
      from design to web, video and photography, is listed on our{' '}
      <Link href="/pricing" className="text-[#FFD700] hover:underline">
        pricing page
      </Link>
      .
    </p>
  </div>
    </div>
  );
};

export default BrandIdentityPackages;
