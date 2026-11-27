import type { AreaPage } from '@/data/area-pages';

/**
 * Durban: served remotely from the Pretoria studio. No office, staff or phone
 * number in KwaZulu-Natal. Read the rules at the top of area-pages.ts.
 */
const page: AreaPage = {
  slug: 'graphic-design-durban',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'KwaZulu-Natal',
  placeName: 'Durban',
  linkLabel: 'Graphic design for Durban & Umhlanga',
  metaTitle: 'Graphic Design Durban & Umhlanga | WL CreationX',
  metaDescription:
    'Company profiles, catalogues, fleet and exhibition artwork for Durban and Umhlanga businesses. Designed remotely in Pretoria, at our published prices.',
  eyebrow: 'Durban · briefed from the coast, designed in Pretoria',
  h1: 'Graphic Design for Durban & Umhlanga Businesses',
  lead:
    'Durban moves goods to the rest of the country, and much of what we design for Durban firms is meant to win business inland: company profiles, product catalogues, fleet artwork and exhibition graphics. WL CreationX is based in Pretoria and works with Durban clients remotely.',
  ctaLabel: 'Send us your Durban brief',
  quickFacts: [
    { label: 'Studio', value: 'Pretoria only, no Durban branch' },
    { label: 'Contact', value: 'WhatsApp, email, video call' },
    { label: 'Hours', value: 'Mon–Fri 8–5, Sat 8–3' },
  ],
  introHeading: 'Selling up the N3 is partly a design problem',
  intro: [
    'Durban’s harbour is the busiest in the country, and a great deal of what lands there is trucked up the N3 to Gauteng. The forwarders, manufacturers and distributors who make that happen often pitch to buyers they seldom meet: procurement teams in Johannesburg, retail head offices in Midrand, mines and municipalities further north. The first impression they make is a PDF in someone’s inbox.',
    'That is where a Gauteng studio can help. Our Pretoria and Johannesburg clients pitch to the same kind of procurement panels, so we know what those panels are used to reading. We design Durban companies’ material to stand up next to it: clear about what you supply, how quickly and from where, without padding.',
    'We should be plain about the arrangement. WL CreationX has one studio, in Waterkloof Glen, Pretoria, and no presence in KwaZulu-Natal. Briefing happens over a video call or WhatsApp, proofs travel as marked-up PDFs, and print is either couriered from Pretoria or prepared as files for a printer in Durban.',
  ],
  servicesHeading: 'Design work Durban firms send us',
  servicesIntro:
    'Chosen for a city built on trade, manufacturing and the visitors who arrive every holiday. Each card shows our published rate.',
  services: [
    {
      title: 'Company profiles for supplier registration',
      priceId: 'company-profile',
      body:
        'When a buyer adds a new supplier, someone reads your profile to decide whether you can handle the volume. We structure it around what they look for: capacity, certifications, delivery coverage and named contacts. It is priced per page, so a short profile stays affordable.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Company profile pricing',
    },
    {
      title: 'Product catalogues',
      priceId: 'catalogue-page',
      body:
        'Distributors and manufacturers with hundreds of lines need a catalogue a buyer can search quickly. We set up a product grid, clean up the images you supply and produce a print file plus a lighter screen PDF for email.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Catalogue and marketing material prices',
    },
    {
      title: 'Fleet and vehicle artwork',
      priceId: 'vehicle-branding',
      body:
        'Trucks running the N3 carry your name past a lot of people every day. We lay out the artwork on your wrap installer’s template for each vehicle type, show you every side before approval, and send the files straight to your installer.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Vehicle branding design prices',
    },
    {
      title: 'Exhibition and event branding',
      priceId: 'event-branding',
      body:
        'For stands and conferences at the Durban ICC or any other venue: key visual, backdrop, banners, name badges and programme, all built to the organiser’s sizes. We supply print-ready files for your printer or stand builder in Durban.',
      href: '/pricing/event-branding-design-pretoria',
      linkLabel: 'Event branding design and pricing',
    },
    {
      title: 'Six-page business websites',
      priceId: 'website-6',
      body:
        'Room for your services, coverage area, credentials and contact details. Analytics are set up at launch, so you can see whether enquiries from Gauteng and elsewhere are actually arriving.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website design packages',
    },
    {
      title: 'Signage and boards',
      priceId: 'signage',
      body:
        'Warehouse, yard and shopfront signs designed for the coast: high contrast and generous sizes, with a note to your sign-maker about choosing materials that cope with humidity and salt air.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Signage design pricing',
    },
  ],
  districtsHeading: 'Durban business nodes we design for',
  districtsIntro:
    'All of them handled remotely from Pretoria. Each note describes the kind of design that part of the metro tends to need.',
  districts: [
    {
      name: 'Umhlanga Ridge & Gateway',
      note: 'Regional head offices, financial and property firms, and the medical and retail businesses around Gateway. Corporate identity, presentations and websites.',
    },
    {
      name: 'Durban CBD',
      note: 'Legal practices, government-facing firms and long-established family businesses in the city centre. Profiles, tender documents and signage.',
    },
    {
      name: 'Point Waterfront & the beachfront',
      note: 'Hotels, restaurants and tourism operators along the promenade. Menus, visitor brochures and social posts timed for the school holidays.',
    },
    {
      name: 'Westville',
      note: 'Office parks off the N3 with professional services, IT and healthcare groups. Brochures, stationery and staff-facing material.',
    },
    {
      name: 'Pinetown & New Germany',
      note: 'Industrial areas full of manufacturers and engineering workshops. Catalogues, packaging, safety signage and fleet artwork.',
    },
    {
      name: 'South Durban Basin',
      note: 'Jacobs, Mobeni and Prospecton, close to the harbour: logistics yards, petrochemical suppliers and component makers. Technical brochures and capability statements.',
    },
    {
      name: 'Dube TradePort',
      note: 'The special economic zone beside King Shaka International Airport, with air cargo, agri-processing and light manufacturing. Export-facing brochures and packaging.',
    },
  ],
  industriesHeading: 'What we would tell Durban businesses in these sectors',
  industries: [
    {
      name: 'Freight forwarding and clearing',
      body:
        'Buyers comparing forwarders want three answers fast: which routes, how quickly, and who to phone. Put those on the first page of the profile and on the home page. A simply drawn route map tells them more than a stock photo of a container ship.',
    },
    {
      name: 'Manufacturing and FMCG',
      body:
        'If your product goes to a retailer, design the packaging to that retailer’s supplier requirements from the first concept, including barcode size and placement. In catalogues, keep part numbers and pack sizes in the same spot on every page so buyers can scan down them.',
    },
    {
      name: 'Hospitality and tourism',
      body:
        'Much of Durban’s holiday trade comes down the N3 from Gauteng during the school holidays. Have menus, specials boards and social posts ready a few weeks before the holidays begin, and remember that many of those visitors choose where to eat and stay on their phones before they leave home.',
    },
    {
      name: 'Property and development',
      body:
        'New developments on the north coast often sell off-plan, so the brochure and website have to do the job of a show house. Floor plans and finishes need to be clear and honestly drawn, and the sales pack should be easy to update as each phase sells.',
    },
  ],
  localWork: [],
  processHeading: 'Working with us from KwaZulu-Natal',
  process: [
    {
      title: 'WhatsApp or email first',
      body: 'Send a few lines on what you need, with any existing logo, profile or photos attached. We reply with questions and suggest a time for a video call.',
    },
    {
      title: 'Scope agreed in writing',
      body: 'After the call you receive a written scope with the published price, the deliverables and the dates. Nothing starts until you approve it.',
    },
    {
      title: 'Proofs marked up on screen',
      body: 'Designs come as PDFs. Annotate them in any PDF reader or list your changes in an email. Two revision rounds are included.',
    },
    {
      title: 'Delivery to Durban',
      body: 'Websites go live online and digital files arrive by email. Printed items are produced in Pretoria and couriered to you, or we send print-ready artwork to your own printer, sign-maker or wrap installer.',
    },
  ],
  faqs: [
    {
      q: 'Do you have anyone based in Durban?',
      a: 'No. There is no Durban office, representative or phone number. WL CreationX works from a single studio in Waterkloof Glen, Pretoria, and every Durban job is handled from there over video call, WhatsApp and email.',
    },
    {
      q: 'Can you install our signage or exhibition stand?',
      a: 'We design the artwork; installation is normally done by your own sign-maker or stand builder. If you need us on site in Durban, that is possible only by arrangement and is quoted separately, including travel.',
    },
    {
      q: 'Should we print in Pretoria or in Durban?',
      a: 'It depends on the job. Brochures, cards and other flat print can be produced in Pretoria and couriered down. Large signage, vehicle wraps and anything bulky usually make more sense with a supplier in Durban. We prepare the files either way.',
    },
    {
      q: 'Do our Gauteng buyers need different material from our KZN customers?',
      a: 'Usually the same core material works for both, with a different emphasis. Buyers further away want reassurance about lead times and coverage, so we make those details prominent. Customers nearby already know where you are.',
    },
    {
      q: 'How long does a company profile take?',
      a: 'That depends on the page count and how ready your text is. Tell us your registration or tender deadline at the start and we will say honestly whether it is realistic.',
    },
    {
      q: 'Can you work with photos we take ourselves?',
      a: 'Yes. Clear daylight photos of your premises, fleet and products are often enough for a profile or catalogue. We will tell you which shots to take and clean them up where we can. We do not travel to Durban for shoots unless that has been arranged and quoted separately.',
    },
  ],
  closingHeading: 'Tell us what needs to reach your buyers',
  closing:
    'WhatsApp or email us with the job, the deadline and whatever you already have. We will reply during business hours with questions, book a call, and follow up with the price and dates in writing.',
};

export default page;
