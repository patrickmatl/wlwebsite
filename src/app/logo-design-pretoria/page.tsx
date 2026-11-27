'use client';

import Image from 'next/image';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';
import CaseStudies from '@/components/CaseStudies';
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
 *
 * Every section renders as plain markup (no entrance animations) so the copy is
 * in the server-rendered HTML. pricing.ts is deliberately not imported: it would
 * ship the whole price list to the browser. Amounts are hand-typed below and
 * must match it.
 */

const PAGE_URL = 'https://wlcreationx.co.za/logo-design-pretoria';
const GUIDE_FORMATS = '/creative-industry-blog-pretoria/logo-file-formats-explained';

// Amounts must match src/data/pricing.ts ids logo-redraw, logo-2, logo-4, logo-6.
const TIERS = [
  {
    id: 'logo-redraw',
    name: 'Logo Redraw',
    amount: 1040,
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
    amount: 2080,
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
    amount: 3120,
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
    amount: 4160,
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

const DELIVERABLES = [
  {
    title: 'Original concepts',
    text: 'The number you chose — two, four or six — and each one a different idea, not one idea in four colours. Every concept is shown at the sizes it will really be seen: on a business card, in a website header and as a small profile picture on a phone, so you judge it the way your customers will.',
  },
  {
    title: 'Two revision rounds',
    text: 'Once you pick a direction, two rounds of changes are built into the price. A round is one consolidated set of comments from you and one revised version from us. Most logos are settled inside two; if yours needs a third, an extra round is R520.',
  },
  {
    title: 'One final logo, in the layouts you will need',
    text: 'A logo rarely lives in one shape. The final artwork is set up as a main version plus the arrangements its design allows — usually a horizontal layout for website headers and letterheads, a stacked layout for square spaces, and the symbol on its own for social media profiles and browser tabs, where the logo has a symbol.',
  },
  {
    title: 'Colour versions',
    text: 'Full colour, single colour and reversed (white, for dark backgrounds and photographs). The single-colour version is the one embroiderers, rubber-stamp makers and laser engravers ask for, so it is worth having before anyone needs it.',
  },
  {
    title: 'Colours and fonts written down',
    text: 'The handover lists your colours as CMYK for print and RGB and HEX for screens, and names the typeface, so the next printer, signwriter or web developer can match them instead of guessing from a screenshot.',
  },
  {
    title: 'Files you own',
    text: 'On final payment the artwork is yours, editable working files included. There is no licence fee, nothing to renew, and you do not need to come back to us to make a change — although you are welcome to.',
  },
  {
    title: 'One designer throughout',
    text: 'The person who takes your brief draws the concepts, makes the revisions and prepares the final files. Nothing gets lost between a salesperson, a designer and a production artist.',
  },
];

const FORMATS = [
  {
    format: 'AI',
    kind: 'Vector, editable',
    use: 'The Adobe Illustrator working file. Keep it safe and give it to any designer who needs to edit or extend the logo.',
  },
  {
    format: 'EPS',
    kind: 'Vector',
    use: 'Signwriters, vinyl cutters, embroidery digitisers and promotional-goods suppliers who ask for "a vector file".',
  },
  {
    format: 'PDF',
    kind: 'Vector',
    use: 'Printers. It opens on any computer, keeps the artwork sharp at any size and is the safest file to email to a supplier.',
  },
  {
    format: 'SVG',
    kind: 'Vector for screens',
    use: 'Websites and web apps. It stays crisp on any screen and is usually smaller than a PNG.',
  },
  {
    format: 'PNG',
    kind: 'Raster, transparent background',
    use: 'Word and PowerPoint documents, email signatures, social media and anywhere the logo sits on top of a photo or colour.',
  },
  {
    format: 'JPG',
    kind: 'Raster, solid background',
    use: 'Online forms, directory listings and marketplaces that refuse other formats. Never the file to send to a signwriter.',
  },
];

const PROCESS = [
  {
    title: 'The brief',
    text: 'We ask what the business does, who it sells to, what the name means, and which logos you like and dislike — the dislikes are usually more useful. We also ask where the logo will be used most: a bakkie door, a website, embroidered shirts and a product label all pull a design in different directions. Fifteen minutes on the phone is normally enough, or we can meet at the studio or at your premises.',
  },
  {
    title: 'Research',
    text: 'Before drawing anything we look at the logos your competitors use, so yours does not end up resembling the one across the road, and at the practical limits. A logo that will be stitched onto golf shirts needs bolder shapes and fewer fine details than one that only ever appears on a screen.',
  },
  {
    title: 'Concepts',
    text: 'You receive your chosen number of distinct directions, each shown in use rather than floating on a white page. First concepts usually reach you within five to seven working days of the brief being settled.',
  },
  {
    title: 'Feedback and revisions',
    text: 'Pick a direction and tell us what works and what does not. It helps to gather everyone’s comments into one message and to describe the problem ("it feels too formal") rather than the fix ("make it blue"). Each revision round usually adds two to three days, and two rounds are included.',
  },
  {
    title: 'Final artwork and handover',
    text: 'We build the final files, check the print setup, and send the logo in every layout, colour version and file format listed on this page, with your colour codes and font noted. Most logo projects finish inside two to three weeks; the part that slows things down is almost always waiting on feedback rather than drawing.',
  },
];

// Images are from the studio portfolio (public/images/logos). Alt text describes
// what is visible in each file; the names are the ones lettered on the artwork.
const PORTFOLIO = [
  { n: 1, alt: 'Zonke Still Water logo: a navy letter Z with a blue water droplet at its base' },
  { n: 2, alt: 'Lemon Recruitment logo: a yellow lemon slice inside a navy circle with a single leaf' },
  { n: 3, alt: 'Bafana Construction logo: a black city skyline set against an orange sun' },
  { n: 4, alt: 'Dora Salon Bar logo: a woman’s profile with flowing patterned hair inside a navy circle' },
  { n: 5, alt: 'Fourie logo: a line drawing of a bull standing in front of a rust-red sun' },
  { n: 6, alt: 'Segwagwa Properties logo: a green frog peering over the roof of a blue house' },
  { n: 7, alt: 'Ikhaya Solar Company logo: a thatched rondavel with a solar-panel roof beneath a rising sun' },
  { n: 8, alt: 'Indlovu Logistics logo: a navy elephant head surrounded by orange cardboard boxes' },
  { n: 9, alt: 'Indoda Apparel logo: a geometric face built from bold blocks of red, orange and teal' },
  { n: 10, alt: 'Kgonyana Cultural Experiences logo: two patterned masks inside a multicoloured circle' },
  { n: 11, alt: 'Langa Lodge logo: a simple orange sun setting over horizontal lines' },
  { n: 13, alt: 'Chiedza Consulting logo: a golden sun with leaf and wave shapes on a dark navy background' },
  { n: 14, alt: 'Mokoena Farming logo: a farmhouse, hills and birds inside a navy circle above ploughed rows' },
  { n: 15, alt: 'Nomad Nest Group logo: two hands holding a woven nest in front of a gold sun' },
  { n: 19, alt: 'Serene Sanctuary logo: a white lotus flower inside a circle on a teal background' },
];

const LOGO_TYPES = [
  {
    name: 'Wordmark',
    text: 'The business name set in distinctive lettering, with no symbol. Works best for short, unusual names that are easy to read. A long name makes for a wide, small logo.',
  },
  {
    name: 'Lettermark',
    text: 'Initials or a monogram. Useful when the full name is long or already shortened in conversation — common with professional firms. It takes longer for people to connect the letters with the business.',
  },
  {
    name: 'Pictorial mark',
    text: 'A recognisable picture: an animal, a tool, a building. Strongest when the picture connects to the name or the trade, such as an elephant for a name like Indlovu, the isiZulu word for elephant.',
  },
  {
    name: 'Abstract mark',
    text: 'A shape that does not depict anything literal. Flexible and easy to keep unique, but the meaning has to be built up over time, so it usually travels with the name at first.',
  },
  {
    name: 'Combination mark',
    text: 'A symbol and the name together. The most common choice for a new business, because the name does the explaining while the symbol becomes familiar. Most of the work shown above is this type.',
  },
  {
    name: 'Emblem',
    text: 'The name enclosed in a badge, seal or crest. Suits schools, clubs, breweries and anything with a sense of tradition. Fine detail and small type make it harder to read at small sizes.',
  },
  {
    name: 'Illustrative logo',
    text: 'A drawn illustration such as a character, mascot or detailed scene. It involves custom illustration work, so it is priced differently from the concept tiers above: the branding page has separate illustrative packages, and a standalone illustrative logo is quoted. It also needs a simplified version for small uses.',
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
    a: 'Vector files (AI, EPS, PDF and SVG) for print, signage and the web, plus PNG and JPG for everyday use — in full colour, single colour and reversed, so you have versions for signage, for a website, and for stamps or embroidery. You own the artwork outright, editable working files included, once the work is paid for. There is no licence to renew and no fee to use it.',
  },
  {
    q: 'Which file do I send to a printer, signwriter or embroiderer?',
    a: 'For a printer, the PDF. For a signwriter or vinyl cutter, the EPS or PDF, because they need vector artwork. For an embroiderer, the vector file plus the single-colour version; they convert it into a stitch file themselves. For anything on a screen, SVG or PNG. Our guide to logo file formats explains each one.',
  },
  {
    q: 'What happens if I do not like any of the concepts?',
    a: 'That is what the revision rounds are for, and it is worth saying early rather than politely. If the whole direction is wrong we would rather hear it at concept stage than after final files. We will talk through what missed and redraw within the included rounds.',
  },
  {
    q: 'Can you fix a logo I already have?',
    a: 'Yes. The Logo Redraw rebuilds your existing logo as clean vector artwork from whatever you have — a low-resolution JPEG, a screenshot or a photo of a sign. It also suits logos made with online tools or AI image generators that only exist as a small picture file.',
  },
  {
    q: 'Can I register the logo as a trade mark?',
    a: 'The artwork is yours on final payment, so nothing on our side stops you registering it. In South Africa trade marks are registered through the Companies and Intellectual Property Commission (CIPC). We are designers, not attorneys: for a search and an application, speak to a trade mark attorney, ideally before the logo goes onto signage and vehicles.',
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

const FURTHER_READING = [
  {
    href: GUIDE_FORMATS,
    title: 'Logo file formats explained',
    text: 'AI, EPS, PDF, SVG, PNG, JPG and WebP: what each one is and which to send for print, web, signage and embroidery.',
  },
  {
    href: '/creative-industry-blog-pretoria/what-a-brand-identity-includes',
    title: 'What a brand identity includes',
    text: 'Where the logo stops and the rest of the identity begins.',
  },
  {
    href: '/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026',
    title: 'How much graphic design costs in Pretoria',
    text: 'Our 2026 prices for logos, identities, print and more, and what drives the cost.',
  },
  {
    href: '/creative-industry-blog-pretoria/how-to-choose-graphic-design-company-pretoria',
    title: 'How to choose a graphic design company in Pretoria',
    text: 'The questions to ask before you pay a deposit.',
  },
  {
    href: '/creative-industry-blog-pretoria/packaging-design-checklist-south-africa',
    title: 'Packaging design checklist for South Africa',
    text: 'For when the logo is about to go onto a product.',
  },
];

const linkClass = 'text-[#FFD700] hover:underline';

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
      {/* Service markup: the offers are the four visible price cards. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Logo design',
            serviceType: 'Logo design',
            url: PAGE_URL,
            areaServed: { '@type': 'City', name: 'Pretoria' },
            provider: { '@id': 'https://wlcreationx.co.za/#business' },
            offers: TIERS.map((t) => ({
              '@type': 'Offer',
              name: `Logo design: ${t.name}`,
              price: t.amount,
              priceCurrency: 'ZAR',
              url: PAGE_URL,
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
        <p className="mt-6 text-sm text-neutral-400">
          A 50% deposit books the job and the balance is invoiced at handover. For everything else
          we design, see our{' '}
          <Link href="/pricing/graphic-design-pretoria" className={linkClass}>
            graphic design prices
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-4 text-[#FFD700]">What you get</h2>
        <p className="text-neutral-300 mb-8">
          Every option except the redraw follows the same pattern: you choose from a set of original
          concepts, we refine the one you pick, and you leave with a finished logo and every file
          you need to use it. In detail:
        </p>
        <dl className="space-y-6">
          {DELIVERABLES.map((d) => (
            <div key={d.title} className="border-l-2 border-[#FFD700]/40 pl-4">
              <dt className="font-bold text-white mb-1">{d.title}</dt>
              <dd className="text-neutral-300">{d.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-neutral-400">
          The Logo Redraw is simpler: no new concepts, just your existing logo rebuilt accurately as
          vector artwork from whatever you have — a blurry JPEG, a screenshot or a photo of your
          shopfront sign — and supplied as one final logo with print-ready files.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-4 text-[#FFD700]">
          The file formats you receive
        </h2>
        <p className="text-neutral-300 mb-6">
          Vector files are drawn with mathematical paths, so they can be enlarged to a billboard
          without losing sharpness. Raster files are made of pixels and only look right at the size
          they were saved. You get both, because printers and signwriters need the first and your
          website and email signature need the second.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[#FFD700]/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 text-[#FFD700]">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold">Format</th>
                <th scope="col" className="px-4 py-3 font-bold">Type</th>
                <th scope="col" className="px-4 py-3 font-bold">Use it for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-neutral-300">
              {FORMATS.map((f) => (
                <tr key={f.format} className="align-top">
                  <th scope="row" className="px-4 py-3 font-bold text-white">{f.format}</th>
                  <td className="px-4 py-3">{f.kind}</td>
                  <td className="px-4 py-3">{f.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-neutral-300">
          A simple rule: if a supplier asks for &ldquo;a vector&rdquo;, send the PDF or EPS. If it
          is going on a screen, use the SVG or PNG. Print files are set up in CMYK and screen files
          in RGB, so colours come out as close as each medium allows. Our guide,{' '}
          <Link href={GUIDE_FORMATS} className={linkClass}>
            logo file formats explained
          </Link>
          , goes through each format, colour modes and Pantone, and what to check at handover.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-6 text-[#FFD700]">How the work runs</h2>
        <ol className="space-y-5 text-neutral-300">
          {PROCESS.map((step, i) => (
            <li key={step.title}>
              <strong className="text-white">
                {i + 1}. {step.title}.
              </strong>{' '}
              {step.text}
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16" aria-labelledby="logo-portfolio">
        <h2 id="logo-portfolio" className="font-syne text-2xl font-bold mb-4 text-[#FFD700]">
          Logo work from the studio
        </h2>
        <p className="text-neutral-300 mb-8 max-w-4xl">
          A selection of logos from our portfolio, across construction, logistics, hospitality,
          farming, beauty and retail. Notice how many pair a simple symbol with the name: that
          combination holds up best when the logo has to shrink onto a business card or a phone
          screen.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PORTFOLIO.map((p) => (
            <figure key={p.n} className="overflow-hidden rounded-lg bg-zinc-900">
              <Image
                src={`/images/logos/Logo${p.n}.webp`}
                alt={p.alt}
                width={1024}
                height={1024}
                loading="lazy"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
        <p className="mt-6 text-neutral-400">
          There is more in the{' '}
          <Link href="/project-showcase-pretoria" className={linkClass}>
            full project showcase
          </Link>
          , including packaging work.
        </p>
      </section>

      <CaseStudies service="logo" heading="Recent logo projects" />

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-4 text-[#FFD700]">Types of logo</h2>
        <p className="text-neutral-300 mb-6">
          You do not need to choose a type before the brief — recommending one is part of the job.
          But it helps to know the options, because each solves a different problem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOGO_TYPES.map((t) => (
            <div key={t.name} className="rounded-lg border border-[#FFD700]/20 bg-zinc-900 p-5">
              <h3 className="font-bold text-[#FFD700] mb-2">{t.name}</h3>
              <p className="text-sm text-neutral-300">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-neutral-400">
          Illustrative identities are priced on our{' '}
          <Link href="/branding-solutions-pretoria" className={linkClass}>
            branding packages page
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-4 text-[#FFD700]">
          Why not use a template or an AI logo generator?
        </h2>
        <p className="text-neutral-300 mb-6">
          Template sites and AI image generators will produce something that looks like a logo in
          minutes, and for a market stall or an idea you are still testing that may be enough. The
          trouble starts when the name goes onto vehicles, signage, uniforms and packaging, because
          changing it then costs far more than the logo did. Three practical problems come up again
          and again.
        </p>
        <div className="space-y-5 text-neutral-300">
          <p>
            <strong className="text-white">You may not own it outright.</strong> Template logos are
            usually sold to many buyers under a licence, and some licences rule out exclusive use or
            trade mark registration — read the terms before you print. With AI generators, what you
            may do with the output depends on the tool&rsquo;s terms, and whether a purely
            machine-made image can be owned by anyone is unsettled law in many countries. A logo
            drawn for you is yours on final payment.
          </p>
          <p>
            <strong className="text-white">It may not be unique.</strong> A template is, by
            definition, available to the next buyer. Generators lean on the most common visual
            patterns, so similar marks turn up for similar businesses. If a competitor in the same
            town has the same lion head, it helps neither of you.
          </p>
          <p>
            <strong className="text-white">It usually is not usable artwork.</strong> AI image
            generators produce pixel images at a fixed size, often with misspelt or warped
            lettering. They cannot be enlarged for a sign, cut in vinyl or stitched without being
            redrawn as vectors first. If you already have one you are attached to, that is exactly
            what the Logo Redraw is for.
          </p>
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          This is general information, not legal advice. For trade mark questions, speak to a trade
          mark attorney.
        </p>
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

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="font-syne text-2xl font-bold mb-6 text-[#FFD700]">Further reading</h2>
        <ul className="space-y-4">
          {FURTHER_READING.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className={`${linkClass} font-bold`}>
                {r.title}
              </Link>
              <span className="block text-sm text-neutral-400">{r.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <p className="text-neutral-400">
          A logo is usually the first piece of a larger job. When you are ready, we also do{' '}
          <Link href="/branding-solutions-pretoria" className={linkClass}>
            full brand identity
          </Link>
          ,{' '}
          <Link href="/pricing/graphic-design-pretoria" className={linkClass}>
            graphic design in Pretoria
          </Link>{' '}
          and{' '}
          <Link href="/pricing/packaging-design-pretoria" className={linkClass}>
            packaging design
          </Link>
          . You can also see{' '}
          <Link href="/project-showcase-pretoria" className={linkClass}>
            work from our Pretoria studio
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
