/**
 * Area landing pages: /graphic-design-centurion, /graphic-design-pretoria-east,
 * /graphic-design-midrand and /graphic-design-johannesburg.
 *
 * READ THIS BEFORE ADDING AN AREA.
 *
 * This domain has had a Google manual action, partly for templated city pages
 * that differed only by the city name (see src/data/service-areas.ts). These
 * pages exist only because each one is written for its own area: its own intro,
 * its own choice and order of services, its own districts, industries, process
 * notes and FAQs. AreaLandingPage renders almost nothing that is not in the
 * entry below.
 *
 * Rules:
 *  - `coverage: 'in-person'` only for areas the studio genuinely visits. The
 *    owner confirmed the Gauteng areas on 2026-11-27. Other major cities are
 *    `coverage: 'remote'` (owner asked for them on 2026-11-27): those pages must
 *    say plainly that the work is done from Pretoria by video call, email and
 *    courier, and must never promise visits.
 *  - Never claim an office, phone number or staff member in the area. There is
 *    one studio, in Waterkloof Glen.
 *  - New entries live one per file in src/data/areas/ and are listed below.
 *  - Never invent clients, projects, testimonials or numbers. `localWork` is
 *    empty until the owner supplies real projects with permission to name them.
 *    The section does not render while it is empty.
 *  - Drive times are approximate, outside peak traffic, from the studio at
 *    194 Bancor Ave, Waterkloof Glen. Say "about".
 *  - Prices come from pricing.ts via `priceId`. Never type a price in here.
 *  - Copying an entry and swapping the place name is exactly what got the old
 *    pages penalised. Write a new one.
 */

import graphicDesignEastRand from './areas/graphic-design-east-rand';
import graphicDesignCapeTown from './areas/graphic-design-cape-town';
import graphicDesignDurban from './areas/graphic-design-durban';
import graphicDesignPortElizabeth from './areas/graphic-design-port-elizabeth';
import graphicDesignBloemfontein from './areas/graphic-design-bloemfontein';
import graphicDesignEastLondon from './areas/graphic-design-east-london';
import graphicDesignPolokwane from './areas/graphic-design-polokwane';
import graphicDesignNelspruit from './areas/graphic-design-nelspruit';
import graphicDesignPietermaritzburg from './areas/graphic-design-pietermaritzburg';
import graphicDesignKimberley from './areas/graphic-design-kimberley';
import annualReportDesignJohannesburg from './areas/annual-report-design-johannesburg';
import annualReportDesignCapeTown from './areas/annual-report-design-cape-town';
import annualReportDesignDurban from './areas/annual-report-design-durban';

export type AreaPage = {
  slug: string;
  /** Which service the page is about. Drives schema serviceType and cross-links. */
  kind: 'graphic-design' | 'annual-report';
  /** Whether the studio meets clients there in person or works remotely. */
  coverage: 'in-person' | 'remote';
  /** Province, used in schema areaServed. */
  province: string;
  /** Plain place name used in headings and schema areaServed. */
  placeName: string;
  /** Anchor text used when other pages link here. */
  linkLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  ctaLabel: string;
  quickFacts: { label: string; value: string }[];
  introHeading: string;
  intro: string[];
  servicesHeading: string;
  servicesIntro: string;
  services: { title: string; priceId?: string; body: string; href: string; linkLabel: string }[];
  districtsHeading: string;
  districtsIntro: string;
  districts: { name: string; note: string }[];
  industriesHeading: string;
  industries: { name: string; body: string }[];
  /** Real, named projects only, with the client's permission. */
  localWork: { client: string; what: string; summary: string }[];
  processHeading: string;
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  closingHeading: string;
  closing: string;
};

const centurion: AreaPage = {
  slug: 'graphic-design-centurion',
  kind: 'graphic-design',
  coverage: 'in-person',
  province: 'Gauteng',
  placeName: 'Centurion',
  linkLabel: 'Graphic design in Centurion',
  metaTitle: 'Graphic Design Company Centurion | WL CreationX',
  metaDescription:
    'Logos, corporate identity, websites, packaging and signage for Centurion businesses. Studio 20 minutes away in Pretoria, published prices, since 2013.',
  eyebrow: 'Centurion · 20 minutes up the N1',
  h1: 'Graphic Design Company in Centurion',
  lead:
    'WL CreationX designs logos, corporate identities, websites, packaging and signage for Centurion businesses. Our studio is in Waterkloof Glen, about twenty minutes away, so we meet you at your office in Highveld, Irene or Lyttelton, or you come to us.',
  ctaLabel: 'Get a Centurion quote',
  quickFacts: [
    { label: 'From our studio', value: 'About 20 min via the N1' },
    { label: 'Meetings', value: 'At your office or ours' },
    { label: 'Logo + identity', value: 'Usually 2–3 weeks' },
  ],
  introHeading: 'Design for a city that sits between two markets',
  intro: [
    'Centurion businesses sell to Pretoria and Johannesburg at the same time. A logistics company in Hennopspark quotes for clients in Midrand. A consulting firm in Highveld Techno Park pitches to a department in the Pretoria CBD in the morning and a bank in Sandton in the afternoon. The design has to hold up in both rooms, and it has to be ready when the tender closes, not a week after.',
    'That is most of what we do for Centurion clients: a clear identity that works on a tender cover, a vehicle, a website and a site board, delivered on a date we agree in writing before we start. We have been doing it from our Pretoria studio since 2013, and we price it openly. The rates below are the same ones on our price list.',
    'Because we are twenty minutes away, the first meeting is usually at your premises. Seeing your building, your vehicles and your existing material tells us more than a brief form does.',
  ],
  servicesHeading: 'What Centurion businesses hire us for',
  servicesIntro:
    'Ordered by how often we are asked. Each links to the full detail and price list for that service.',
  services: [
    {
      title: 'Corporate identity packs',
      priceId: 'ci-1',
      body:
        'A logo plus the stationery a company actually uses: business cards, letterhead and email signature, designed as one system. This is the usual starting point for a new Centurion firm or one that has outgrown a logo made in a hurry.',
      href: '/visual-communication-services-pretoria',
      linkLabel: 'See corporate identity packs and prices',
    },
    {
      title: 'Logo design',
      priceId: 'logo-2',
      body:
        'Two, four or six original concepts, two revision rounds, and print-ready vector files you own outright. We never start from a template.',
      href: '/logo-design-pretoria',
      linkLabel: 'Logo design detail and pricing',
    },
    {
      title: 'Company profiles and tender documents',
      priceId: 'company-profile',
      body:
        'A company profile is often the first thing a procurement panel reads. We lay out profiles, capability statements and tender covers so the important parts are easy to find and the document looks like it came from a serious supplier.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Company profile and marketing material pricing',
    },
    {
      title: 'Vehicle branding and signage',
      priceId: 'vehicle-branding',
      body:
        'Bakkies, vans and trailers spend all day on the N1, R21 and N14, and a branded vehicle is seen by more people than most adverts. We design the artwork to the vehicle template and supply files your installer can use directly. Site boards and shop signage are designed the same way.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Signage, vehicle and print design pricing',
    },
    {
      title: 'Business websites',
      priceId: 'website',
      body:
        'Fast, mobile-first websites with the basic SEO set up before launch, so a search for your service in Centurion has something to find. Fixed price by page count, and you own the site.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website packages and prices',
    },
    {
      title: 'Packaging and labels',
      priceId: 'packaging',
      body:
        'For manufacturers and food producers in Lyttelton, Hennopspark and Samrand: labels, sleeves and cartons designed to the printer’s die line, with the barcode and legal text where they need to be.',
      href: '/pricing/packaging-design-pretoria',
      linkLabel: 'Packaging design pricing',
    },
  ],
  districtsHeading: 'Where we work in Centurion',
  districtsIntro:
    'Centurion covers very different kinds of business within a few kilometres. These are the parts we visit most.',
  districts: [
    {
      name: 'Highveld & Highveld Techno Park',
      note: 'Office parks full of IT, engineering and consulting firms. The work is mostly identities, proposals and websites that need to look established.',
    },
    {
      name: 'Centurion CBD & the Lake',
      note: 'Retail, hospitality and professional practices around Centurion Mall, the lake and the Gautrain station.',
    },
    {
      name: 'Irene',
      note: 'Corporate parks off the R21 and independent businesses around Irene Village. Brand refreshes and print for events are common requests.',
    },
    {
      name: 'Lyttelton & Hennopspark',
      note: 'Industrial and light manufacturing. Packaging, labels, vehicle branding and safety signage.',
    },
    {
      name: 'Eco Park & Samrand',
      note: 'Newer office and logistics developments along the N1 and N14, often companies moving in and needing a full identity at once.',
    },
    {
      name: 'Eldoraigne, Rooihuiskraal & Wierdapark',
      note: 'Home-based and owner-run businesses. Usually a logo, business cards and a simple website to start with.',
    },
  ],
  industriesHeading: 'Advice for the businesses we see most in Centurion',
  industries: [
    {
      name: 'Logistics and transport',
      body:
        'Your vehicles are your biggest advertisement. Get the logo right on a white bakkie first, because if it does not read at 80 km/h it will not work anywhere. Keep the phone number large and the slogan short.',
    },
    {
      name: 'Engineering and construction',
      body:
        'Procurement panels judge capability partly by presentation. A consistent company profile, clean tender covers and proper site boards make a firm look like it can manage a big contract.',
    },
    {
      name: 'IT and professional services',
      body:
        'Most of your clients will look you up before a meeting. A sharp website with clear service pages and real contact details does more than a clever logo.',
    },
    {
      name: 'Food and light manufacturing',
      body:
        'Retail buyers look at the shelf, not the brand story. Packaging has to be legible from two metres and meet labelling rules, so we design to the retailer’s requirements from the start.',
    },
  ],
  localWork: [],
  processHeading: 'How a Centurion project runs',
  process: [
    {
      title: 'Meeting at your premises',
      body: 'We come to you, usually within the same week you call. It takes about an hour and you leave with a written scope and a fixed quote.',
    },
    {
      title: 'Concepts in your inbox',
      body: 'First concepts by email, with a short note on the thinking behind each. Feedback by email, a call or another visit, whichever suits you.',
    },
    {
      title: 'Two revision rounds',
      body: 'Included in the price. Most identities are signed off within two to three weeks of the first meeting.',
    },
    {
      title: 'Files and print',
      body: 'You receive every file in open formats. If you want us to manage printing or vehicle wraps, we brief the supplier and check the proofs.',
    },
  ],
  faqs: [
    {
      q: 'Do you have an office in Centurion?',
      a: 'No. We have one studio, in Waterkloof Glen, Pretoria, about twenty minutes from central Centurion via the N1. We come to Centurion for meetings and shoots, and you are welcome at the studio.',
    },
    {
      q: 'Do you charge for travelling to Centurion?',
      a: 'No. Meetings and shoots anywhere in Gauteng, including Centurion, carry no travel charge.',
    },
    {
      q: 'How quickly can you turn around a logo for a tender deadline?',
      a: 'A logo and basic identity usually takes two to three weeks. If a tender closes sooner, tell us the date at the first meeting and we will say honestly whether it can be done well in that time.',
    },
    {
      q: 'Can you design for our vehicle fleet?',
      a: 'Yes. We design to the template for each vehicle model and supply print-ready files your wrap installer can use. Fleet artwork is priced per vehicle design, not per vehicle.',
    },
    {
      q: 'We already have a logo. Can you build the rest of the identity around it?',
      a: 'Yes. If the original files are poor quality we can redraw the logo as clean vector artwork first, then design the stationery, profile and signage around it.',
    },
  ],
  closingHeading: 'Talk to us about your Centurion project',
  closing:
    'Tell us what you need and when you need it. We will arrange a visit to your premises, or a call if that is easier, and send a fixed quote.',
};

const pretoriaEast: AreaPage = {
  slug: 'graphic-design-pretoria-east',
  kind: 'graphic-design',
  coverage: 'in-person',
  province: 'Gauteng',
  placeName: 'Pretoria East',
  linkLabel: 'Graphic design in Pretoria East & Menlyn',
  metaTitle: 'Graphic Design Pretoria East & Menlyn | WL CreationX',
  metaDescription:
    'Graphic design studio in Pretoria East, minutes from Menlyn Maine. Branding, websites, menus, signage and headshots for practices, shops and restaurants.',
  eyebrow: 'Pretoria East · our own neighbourhood',
  h1: 'Graphic Design in Pretoria East & Menlyn',
  lead:
    'Our studio is in Waterkloof Glen, a few minutes from Menlyn Maine. If your business is in Lynnwood, Brooklyn, Garsfontein, Faerie Glen or Moreleta Park, you can sit down with the designer doing your work, look at real samples and leave with a quote.',
  ctaLabel: 'Book a studio visit',
  quickFacts: [
    { label: 'From Menlyn', value: 'Under 10 minutes' },
    { label: 'Studio hours', value: 'Mon–Fri 8–5, Sat 8–3' },
    { label: 'Designing here since', value: '2013' },
  ],
  introHeading: 'A studio down the road, not a call centre',
  intro: [
    'Pretoria East is where we work every day. The studio is in the Park Lane West Building on Bancor Avenue, so most clients in this part of the city are a short drive away. That changes how a project goes. You can drop off old brochures, bring the product we are photographing, or approve a menu proof in person on your way past.',
    'The businesses here are mostly ones where the owner is the brand: a medical or dental practice in Lynnwood, an accounting firm in Brooklyn, a restaurant near Menlyn, a boutique in a Garsfontein centre. People choose them partly on trust, so the design has to look professional without looking like a chain.',
    'We do that work at published prices, with two revision rounds included and the final files handed over to you. Nothing is outsourced, and the person you meet is the person designing.',
  ],
  servicesHeading: 'What Pretoria East businesses ask us for',
  servicesIntro:
    'Practices, shops and restaurants need different things. These are the services we are asked for most in this part of the city.',
  services: [
    {
      title: 'Brand identity for practices and firms',
      priceId: 'ci-2',
      body:
        'Logo, stationery, appointment cards and email signatures for medical, dental, legal and financial practices. Calm and trustworthy is usually the brief, and it is harder to get right than loud.',
      href: '/branding-solutions-pretoria',
      linkLabel: 'Branding solutions',
    },
    {
      title: 'Menus, price lists and in-store print',
      priceId: 'menu-design',
      body:
        'Menus that are easy to read in low light, price lists that are easy to update, and window posters for centres around Menlyn and Garsfontein. We prepare files for your printer or manage the printing for you.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Print design pricing',
    },
    {
      title: 'Websites that bring in bookings',
      priceId: 'website',
      body:
        'A practice or restaurant website has one job: get the visitor to call, book or find you. We build fast, mobile-first sites with the location, hours and booking route obvious on every page.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website design packages',
    },
    {
      title: 'Corporate headshots and team photos',
      priceId: 'photo-corporate',
      body:
        'Consistent headshots for your website, profiles and LinkedIn, shot at your practice or at our studio. Patients and clients like to see who they will be dealing with.',
      href: '/photography-services-pretoria',
      linkLabel: 'Photography services',
    },
    {
      title: 'Social media management',
      priceId: 'social-essential',
      body:
        'Monthly content for restaurants, salons and shops that want a steady presence without doing it themselves. Designed in the same style as the rest of your brand.',
      href: '/pricing/social-media-pretoria',
      linkLabel: 'Social media packages',
    },
    {
      title: 'Signage and shopfronts',
      priceId: 'signage',
      body:
        'Fascia signs, window graphics and pull-up banners designed to the landlord’s requirements, which in the larger centres can be strict.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Signage design pricing',
    },
  ],
  districtsHeading: 'The Pretoria East suburbs we serve',
  districtsIntro:
    'All of these are within a short drive of the studio, so we can meet at your premises or ours.',
  districts: [
    {
      name: 'Menlyn & Menlyn Maine',
      note: 'Retail, restaurants and offices around the mall and the Menlyn Maine precinct, a few minutes from the studio.',
    },
    {
      name: 'Lynnwood',
      note: 'Medical suites, professional firms and the office parks along Lynnwood Road.',
    },
    {
      name: 'Brooklyn & Waterkloof',
      note: 'Law and accounting firms, consultancies, embassies and the organisations that work with them.',
    },
    {
      name: 'Hatfield',
      note: 'Businesses around the University of Pretoria and the Gautrain station that need print and social content in volume.',
    },
    {
      name: 'Garsfontein & Faerie Glen',
      note: 'Neighbourhood shopping centres, family businesses, schools and clubs.',
    },
    {
      name: 'Moreleta Park & Silver Lakes',
      note: 'Owner-run businesses, estates and service providers further east along Atterbury Road and Solomon Mahlangu Drive.',
    },
  ],
  industriesHeading: 'What we have learned designing for Pretoria East',
  industries: [
    {
      name: 'Medical and dental practices',
      body:
        'Patients often arrive anxious, so the identity should feel calm and clean. Keep the practice name and the practitioners’ names easy to read. Appointment cards and signage have to work for older patients as well as younger ones.',
    },
    {
      name: 'Legal and financial firms',
      body:
        'Clients are trusting you with serious matters. A restrained identity, well-set documents and a website that states clearly what you do and who does it will do more than decoration.',
    },
    {
      name: 'Restaurants and coffee shops',
      body:
        'The menu is the most-read piece of design you own. Short descriptions, clear prices and a layout that survives being reprinted when prices change will save you money over a year.',
    },
    {
      name: 'Boutiques and salons',
      body:
        'Your Instagram grid and your shopfront should look like the same business. We design a small set of templates so the posts you make yourself stay on-brand.',
    },
  ],
  localWork: [],
  processHeading: 'Working with a studio around the corner',
  process: [
    {
      title: 'Come to the studio',
      body: 'Book a time, bring what you have, and see samples of printed work on different papers and finishes. We are open on Saturday mornings too.',
    },
    {
      title: 'Fixed quote the same week',
      body: 'A written scope and price, so you know exactly what you are getting before anything starts.',
    },
    {
      title: 'Proofs you can hold',
      body: 'For menus, cards and signage we can print proofs at the studio so you see the real size and colour before the full run.',
    },
    {
      title: 'Hand-over and updates',
      body: 'You get every file. When prices change or a new practitioner joins, updates are quick because we already have the artwork.',
    },
  ],
  faqs: [
    {
      q: 'Where exactly is your studio?',
      a: 'Park Lane West Building, 194 Bancor Ave, Waterkloof Glen, Pretoria, 0181. It is a few minutes from Menlyn Maine, with parking on site.',
    },
    {
      q: 'Can I just walk in?',
      a: 'Please book first so the right designer is free. We are open Monday to Friday from 8:00 to 17:00 and Saturday from 8:00 to 15:00.',
    },
    {
      q: 'Do you design for medical practices?',
      a: 'Yes. Practice identities, appointment cards, signage and websites are a large part of our work in Pretoria East. Check any professional-body rules on advertising with us at the start and we will design within them.',
    },
    {
      q: 'Can you update our menu when prices change?',
      a: 'Yes. We design menus so that prices and items can be changed without redesigning the layout, and we keep the files, so updates are quick and charged at a small fixed fee.',
    },
    {
      q: 'Do you manage printing as well?',
      a: 'If you want us to. We send the files to a trade printer, check the proofs and deliver the finished print, or we hand the files to your own printer.',
    },
  ],
  closingHeading: 'Visit the studio',
  closing:
    'We are in your part of town. Book a time to come in, or ask us to come to you, and we will talk through what your business needs.',
};

const midrand: AreaPage = {
  slug: 'graphic-design-midrand',
  kind: 'graphic-design',
  coverage: 'in-person',
  province: 'Gauteng',
  placeName: 'Midrand',
  linkLabel: 'Graphic design in Midrand',
  metaTitle: 'Graphic Design Company Midrand | WL CreationX',
  metaDescription:
    'Exhibition and event branding, presentations, corporate video and websites for Midrand companies in Waterfall, Kyalami and Halfway House. Published prices.',
  eyebrow: 'Midrand · halfway between Pretoria and Joburg',
  h1: 'Graphic Design Company in Midrand',
  lead:
    'Midrand runs on head offices, warehouses and the exhibitions at Gallagher. WL CreationX designs exhibition stands, event branding, presentations, corporate video and websites for Midrand companies, from our Pretoria studio about 35 minutes up the N1.',
  ctaLabel: 'Get a Midrand quote',
  quickFacts: [
    { label: 'From our studio', value: 'About 35 min via the N1' },
    { label: 'Event work', value: 'Planned back from build-up day' },
    { label: 'Website build', value: 'Usually 6–8 weeks' },
  ],
  introHeading: 'Design that has to be ready on the day',
  intro: [
    'A lot of Midrand design work has a fixed date attached. The exhibition opens at Gallagher on Tuesday, the conference at Kyalami starts at eight, the new head office in Waterfall has staff arriving on the first of the month. Missing that date is not an option, so we plan every Midrand event job backwards from build-up day and tell you at the start what we need from you and when.',
    'The other half of the work is corporate. Midrand is full of national and regional head offices, and their marketing, HR and investor teams need presentations, internal campaigns and video that look the same whether they are shown in a boardroom in Waterfall or a branch in Polokwane.',
    'We have been doing this from Pretoria since 2013. Our prices are published, our team is in-house, and we come to Midrand for briefings, site checks and shoots at no travel charge.',
  ],
  servicesHeading: 'Services Midrand companies use most',
  servicesIntro:
    'Weighted toward events and corporate communication, because that is what Midrand asks for.',
  services: [
    {
      title: 'Exhibition and event branding',
      priceId: 'event-branding',
      body:
        'Stand graphics, banners, backdrops, lanyards and signage designed to the organiser’s specifications and your stand builder’s templates. We check every panel size before artwork goes to print.',
      href: '/pricing/event-branding-design-pretoria',
      linkLabel: 'Event branding design and pricing',
    },
    {
      title: 'Presentation design',
      priceId: 'powerpoint',
      body:
        'PowerPoint templates and pitch decks that your team can edit without breaking. Useful for sales teams presenting all over the country from a Midrand base.',
      href: '/pricing/presentation-design-services-pretoria',
      linkLabel: 'Presentation design services',
    },
    {
      title: 'Corporate and event video',
      priceId: 'video-event',
      body:
        'Event coverage, conference highlights and brand films, shot and edited in-house. We often film the same event we designed the branding for, so everything matches.',
      href: '/videography-services-pretoria',
      linkLabel: 'Videography services',
    },
    {
      title: 'Internal communications',
      priceId: 'internal-comms',
      body:
        'Office moves, policy launches, safety campaigns and staff newsletters for large teams. Clear, consistent material that people actually read.',
      href: '/pricing/internal-communications-design-pretoria',
      linkLabel: 'Internal communications design',
    },
    {
      title: 'Websites for technology and logistics firms',
      priceId: 'website-6',
      body:
        'Six-page and nine-page business websites with service pages written for the buyer, not the engineer. Built fast, mobile-first and set up for search before launch.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website design packages',
    },
    {
      title: 'Pull-up banners and conference print',
      priceId: 'pullup-banner',
      body:
        'The small things that are always needed the week before an event: pull-ups, name badges, programmes and table cards.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Print design pricing',
    },
  ],
  districtsHeading: 'Parts of Midrand we work in',
  districtsIntro:
    'Midrand is spread out, so it helps to know where you are. These are the areas we travel to most.',
  districts: [
    {
      name: 'Waterfall City',
      note: 'Head offices around the Mall of Africa and the newer office towers. Corporate identity roll-outs and internal campaigns.',
    },
    {
      name: 'Gallagher Convention Centre',
      note: 'Exhibitions and trade shows. Stand graphics and event print to tight build-up schedules.',
    },
    {
      name: 'Kyalami',
      note: 'Conferences, launches and events around the circuit and convention venue, plus the business parks nearby.',
    },
    {
      name: 'Halfway House & Grand Central',
      note: 'Warehousing, aviation and industrial businesses along Old Pretoria Road and near Grand Central Airport.',
    },
    {
      name: 'Carlswald & Vorna Valley',
      note: 'Office parks and owner-run businesses close to the N1 and the Gautrain station.',
    },
    {
      name: 'Noordwyk & Blue Hills',
      note: 'Smaller firms and home businesses on the northern side, usually starting with an identity and a website.',
    },
  ],
  industriesHeading: 'Notes for the industries that fill Midrand',
  industries: [
    {
      name: 'Exhibitors',
      body:
        'Your stand gets about three seconds of attention from someone walking past. One large, simple message beats a wall of bullet points. Put your name and what you do at eye level and above the heads of the crowd.',
    },
    {
      name: 'Head offices',
      body:
        'Branding drifts when every department makes its own material. A shared template set for presentations, documents and email keeps a big company looking like one company.',
    },
    {
      name: 'Logistics and warehousing',
      body:
        'Clients buy reliability. Clear fleet branding, a tidy website with coverage maps and proper safety signage all help to show it.',
    },
    {
      name: 'Technology companies',
      body:
        'Buyers rarely understand the product at first glance. Diagrams, explainer video and plain-language web copy shorten the sales conversation.',
    },
  ],
  localWork: [],
  processHeading: 'How we run a Midrand event job',
  process: [
    {
      title: 'Briefing on site or by call',
      body: 'We meet at your offices or the venue, or start with a call. We collect the organiser’s manual and the stand builder’s templates on day one.',
    },
    {
      title: 'A dated schedule',
      body: 'We set dates working back from build-up: concepts, sign-off, final artwork, print and delivery. Everyone knows what is due when.',
    },
    {
      title: 'Artwork checked against the specs',
      body: 'Every panel and banner is checked against the template dimensions and bleed before it goes to print, which is where most event artwork goes wrong.',
    },
    {
      title: 'On the day',
      body: 'If you have booked video or photography, we film the event, and you can have short edits for social media within days.',
    },
  ],
  faqs: [
    {
      q: 'Are you based in Midrand?',
      a: 'No. Our only studio is in Waterkloof Glen, Pretoria, about 35 minutes from Midrand on the N1. We come to Midrand for briefings, venue checks and shoots at no travel charge.',
    },
    {
      q: 'How far ahead should we brief you for an exhibition at Gallagher?',
      a: 'Four to six weeks before build-up is comfortable. Less is possible, but tell us the build-up date at the start so we can say honestly what can be done properly in the time.',
    },
    {
      q: 'Can you work with our stand builder?',
      a: 'Yes. Send us their templates and we will supply artwork to their exact sizes and file requirements, and deal with them directly if you prefer.',
    },
    {
      q: 'Can you film the event as well as brand it?',
      a: 'Yes. We offer event coverage and highlight videos, shot and edited in-house, so the footage matches the branding.',
    },
    {
      q: 'Do you design presentations our team can edit?',
      a: 'Yes. We build proper PowerPoint templates with locked layouts and editable text, so staff can make new slides without breaking the design.',
    },
  ],
  closingHeading: 'Got a date in the diary?',
  closing:
    'Tell us the event, the venue and the build-up date, or whatever else you are working on in Midrand. We will come back with a schedule and a fixed quote.',
};

const johannesburg: AreaPage = {
  slug: 'graphic-design-johannesburg',
  kind: 'graphic-design',
  coverage: 'in-person',
  province: 'Gauteng',
  placeName: 'Johannesburg',
  linkLabel: 'Graphic design in Johannesburg & Sandton',
  metaTitle: 'Graphic Design Johannesburg & Sandton | WL CreationX',
  metaDescription:
    'Annual reports, ESG reports, investor decks, corporate video and brand identity for Johannesburg and Sandton companies. In-house team, published prices.',
  eyebrow: 'Johannesburg & Sandton · on-site from Pretoria',
  h1: 'Graphic Design for Johannesburg & Sandton Businesses',
  lead:
    'WL CreationX designs annual reports, ESG reports, investor presentations, corporate video and brand identities for companies in Sandton, Rosebank, Rivonia and the northern suburbs. We are a Pretoria studio, we come to your offices for kick-offs and shoots, and our prices are published.',
  ctaLabel: 'Request a Johannesburg quote',
  quickFacts: [
    { label: 'Sandton from our studio', value: 'About 45–60 min via the N1' },
    { label: 'Kick-off', value: 'On-site at your offices' },
    { label: 'Annual report design', value: 'Priced per page band' },
  ],
  introHeading: 'Corporate reporting and brand work, without agency overheads',
  intro: [
    'Sandton is home to the JSE and a large share of the country’s listed and large private companies. The design they need most is not the flashy kind. It is reporting: integrated annual reports, sustainability and ESG reports, results presentations and investor packs that are accurate, easy to read and on time for the board.',
    'That work is a large part of what we do. We lay out long reports with consistent typography and clear infographics, handle the rounds of changes that come from finance, legal and the auditors, and keep track of versions so nothing old slips into the final file. Our published rates for report design start below what many Johannesburg agencies charge for a concept.',
    'We are based in Pretoria and do not pretend otherwise. For Johannesburg clients that means kick-off meetings and shoots at your offices, reviews over video call, and a direct line to the designer instead of an account manager.',
  ],
  servicesHeading: 'Services for Johannesburg companies',
  servicesIntro:
    'Led by corporate reporting, because that is where Johannesburg clients most often need a reliable outside team.',
  services: [
    {
      title: 'Annual and integrated reports',
      priceId: 'annual-report',
      body:
        'Layout, infographics and typesetting for annual and integrated reports, priced by page band. We work from your approved copy and manage the correction rounds through to the print or digital file.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report design pricing',
    },
    {
      title: 'Sustainability and ESG reports',
      priceId: 'esg-report',
      body:
        'ESG data is hard to read in tables. We turn it into clear charts and sections that follow the reporting framework you use, so readers and rating agencies can find what they need.',
      href: '/pricing/sustainability-esg-report-design-services-pretoria',
      linkLabel: 'ESG report design services',
    },
    {
      title: 'Investor relations material',
      priceId: 'investor-relations',
      body:
        'Results presentations, investor decks and fact sheets with charts that match your report and a template your IR team can update each period.',
      href: '/pricing/investor-relations-material-design-services-pretoria',
      linkLabel: 'Investor relations design',
    },
    {
      title: 'Corporate video',
      priceId: 'video-corporate',
      body:
        'Full-day shoots with two cameras, scripting, motion graphics and social cut-downs. CEO messages, company profiles and results videos filmed at your offices.',
      href: '/pricing/corporate-video-pretoria',
      linkLabel: 'Corporate video pricing',
    },
    {
      title: 'Brand identity and guidelines',
      priceId: 'ci-3',
      body:
        'New identities and refreshes with a guidelines document your marketing team and outside suppliers can follow.',
      href: '/branding-solutions-pretoria',
      linkLabel: 'Branding solutions',
    },
    {
      title: 'Presentation templates',
      priceId: 'powerpoint',
      body:
        'Board packs and sales decks in properly built PowerPoint templates, so staff produce on-brand slides without a designer every time.',
      href: '/pricing/presentation-design-services-pretoria',
      linkLabel: 'Presentation design services',
    },
  ],
  districtsHeading: 'Johannesburg areas we visit',
  districtsIntro:
    'We travel to the northern business districts for kick-offs, reviews and shoots. Remote work covers the rest of the city.',
  districts: [
    {
      name: 'Sandton CBD',
      note: 'Listed companies, financial services and law firms around the JSE, Sandton City and the convention centre.',
    },
    {
      name: 'Rosebank & Parktown',
      note: 'Head offices, agencies and professional firms, plus the galleries and creative businesses around Rosebank.',
    },
    {
      name: 'Rivonia, Sunninghill & Woodmead',
      note: 'Large office parks along the N1 and M1 with corporate head offices and technology companies.',
    },
    {
      name: 'Bryanston & Fourways',
      note: 'Mid-sized firms, private schools, medical groups and owner-run businesses in the north-west.',
    },
    {
      name: 'Melrose Arch & Illovo',
      note: 'Investment, property and advisory firms that need polished, discreet material.',
    },
    {
      name: 'Braamfontein & the inner city',
      note: 'Universities, NGOs and creative businesses, mostly served remotely with visits for shoots.',
    },
  ],
  industriesHeading: 'What matters to Johannesburg’s corporate clients',
  industries: [
    {
      name: 'Listed companies',
      body:
        'The annual report will be read by analysts, journalists and shareholders who skim. Put the key numbers and the strategy up front, keep chart styles consistent, and leave enough time in the schedule for audit changes.',
    },
    {
      name: 'Financial and professional services',
      body:
        'Clients judge quality by the documents you send. A proper template set for proposals, reports and presentations is worth more than an expensive logo refresh.',
    },
    {
      name: 'Mining, energy and industrial groups',
      body:
        'ESG reporting is now scrutinised as closely as the financials. Clear data visualisation and a structure that follows the framework you report against make the report credible.',
    },
    {
      name: 'NGOs and foundations',
      body:
        'Funders want to see impact quickly. Short impact reports with strong photography and a few clear numbers do more than long narratives.',
    },
  ],
  localWork: [],
  processHeading: 'How we work with a Johannesburg team',
  process: [
    {
      title: 'Kick-off at your offices',
      body: 'We come to Sandton, Rosebank or wherever you are for the first meeting, collect the brief and agree the schedule against your board or publication dates.',
    },
    {
      title: 'Reviews by video call',
      body: 'Proofs arrive as marked-up PDFs, and review rounds happen over video call, so a meeting does not cost you two hours in traffic.',
    },
    {
      title: 'Version control',
      body: 'Every round is numbered and logged, and corrections are checked against the previous version, so changes from finance, legal and the auditors are not lost.',
    },
    {
      title: 'Final files and print',
      body: 'Print-ready, web and accessible PDF versions as needed. We can manage printing and courier delivery to your offices.',
    },
  ],
  faqs: [
    {
      q: 'You are in Pretoria. Can you really service a Sandton client?',
      a: 'Yes. Sandton is about 45 to 60 minutes from our studio on the N1. We come in for kick-offs, important reviews and shoots, and handle the day-to-day reviews by video call, which most corporate teams prefer anyway.',
    },
    {
      q: 'How long does an annual report take to design?',
      a: 'It depends on the page count and how final the copy is. Start talking to us when the structure is agreed, usually eight to ten weeks before publication, and we will build the schedule around your board and audit dates.',
    },
    {
      q: 'What do you charge for annual report design?',
      a: 'Report design is priced by page band, and the current rates are on our annual report pricing page. A quote for your report is fixed once we have seen the page count and the amount of infographic work.',
    },
    {
      q: 'Can you design to our existing brand guidelines?',
      a: 'Yes. Most corporate work is within an existing identity. Send the guidelines and any previous reports and we will work within them.',
    },
    {
      q: 'Do you charge travel for meetings in Johannesburg?',
      a: 'No. Meetings and shoots in Gauteng, including Johannesburg and Sandton, carry no travel charge.',
    },
    {
      q: 'Is there a Johannesburg office?',
      a: 'No. We have one studio, in Waterkloof Glen, Pretoria. Everything is designed and produced there by our own team.',
    },
  ],
  closingHeading: 'Planning a report or a launch?',
  closing:
    'Send us the publication date and what you have so far. We will come back with a schedule, a fixed quote, and a time to meet at your offices.',
};

/** Every area landing page, in the order they are listed in navigation. */
export const AREA_PAGES: AreaPage[] = [
  // Graphic design, Gauteng, in person
  centurion,
  pretoriaEast,
  midrand,
  johannesburg,
  graphicDesignEastRand,
  // Graphic design, other major cities, remote
  graphicDesignCapeTown,
  graphicDesignDurban,
  graphicDesignPortElizabeth,
  graphicDesignBloemfontein,
  graphicDesignEastLondon,
  graphicDesignPolokwane,
  graphicDesignNelspruit,
  graphicDesignPietermaritzburg,
  graphicDesignKimberley,
  // Annual report design
  annualReportDesignJohannesburg,
  annualReportDesignCapeTown,
  annualReportDesignDurban,
];

export const GRAPHIC_DESIGN_AREAS = AREA_PAGES.filter((a) => a.kind === 'graphic-design');
export const IN_PERSON_AREAS = GRAPHIC_DESIGN_AREAS.filter((a) => a.coverage === 'in-person');
export const REMOTE_AREAS = GRAPHIC_DESIGN_AREAS.filter((a) => a.coverage === 'remote');
export const ANNUAL_REPORT_AREAS = AREA_PAGES.filter((a) => a.kind === 'annual-report');

export function getAreaPage(slug: string): AreaPage {
  const page = AREA_PAGES.find((a) => a.slug === slug);
  if (!page) throw new Error(`Unknown area page: ${slug}`);
  return page;
}
