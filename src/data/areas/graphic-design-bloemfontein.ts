import type { AreaPage } from '@/data/area-pages';

/**
 * Bloemfontein is served remotely from the Pretoria studio. There is no office,
 * phone number or staff member in Bloemfontein, and the copy must never imply
 * one. Facts used: judicial capital (Supreme Court of Appeal), seat of the Free
 * State provincial government, University of the Free State, Central University
 * of Technology, Free State agriculture, the N1. No statistics, no clients.
 */
const page: AreaPage = {
  slug: 'graphic-design-bloemfontein',
  placeName: 'Bloemfontein',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'Free State',
  linkLabel: 'Graphic design for Bloemfontein businesses',
  metaTitle: 'Graphic Design for Bloemfontein Firms | WL CreationX',
  metaDescription:
    'Pretoria design studio working remotely with Bloemfontein law firms, agribusinesses and schools: identities, websites, packaging and reports. Fixed quotes.',
  eyebrow: 'Bloemfontein · served remotely from Pretoria',
  h1: 'Graphic Design for Bloemfontein Businesses',
  lead:
    'WL CreationX is a graphic design studio in Pretoria. We work with Bloemfontein law practices, agricultural businesses, schools and owner-run companies by video call, WhatsApp and email, and send finished print down the N1 by courier or straight to your own printer.',
  ctaLabel: 'Ask for a Bloemfontein quote',
  quickFacts: [
    { label: 'Studio', value: 'Pretoria, not Bloemfontein' },
    { label: 'Briefing', value: 'Video call, WhatsApp, email' },
    { label: 'Print', value: 'Couriered, or to your printer' },
  ],
  introHeading: 'A city of courts, campuses and farm country',
  intro: [
    'Bloemfontein is the judicial capital of South Africa. The Supreme Court of Appeal sits here, along with the Free State High Court and the provincial government, so the city has a deep bench of attorneys, advocates and the firms that support them. Add the University of the Free State, the Central University of Technology and a ring of agricultural towns that buy their seed, equipment and advice through the city, and you get a market that values documents that read clearly far more than design that shouts.',
    'That suits the way we work. Much of what Bloemfontein clients ask for is paper-heavy: practice stationery, company profiles, product catalogues for agricultural suppliers, annual reports for member organisations. These jobs are mostly about getting typography, structure and print specifications right, and none of that needs us in the same room as you.',
    'So we will be straight about the arrangement. Our only studio is in Waterkloof Glen, Pretoria, and we have no office or representative in Bloemfontein. Briefings and reviews happen on a video call or over WhatsApp, proofs come to you as marked-up PDFs, and the designer you speak to on the first call is the one who does the work. We have been running the studio since 2013, and the rates below are the ones on our public price list.',
  ],
  servicesHeading: 'Work we do for Bloemfontein clients',
  servicesIntro:
    'Chosen for the kinds of business that make up the Bloemfontein economy. Each card links to the full description and the current price.',
  services: [
    {
      title: 'Identities for legal and professional practices',
      priceId: 'ci-2',
      body:
        'Letterheads that survive being photocopied into a court bundle, business cards, email signatures, compliment slips and a logo that looks right engraved on a brass plate as well as on a screen. Designed as one set so every partner sends out the same thing.',
      href: '/branding-solutions-pretoria',
      linkLabel: 'Branding solutions for practices',
    },
    {
      title: 'Packaging and labels for agricultural products',
      priceId: 'packaging',
      body:
        'Seed bags, feed and fertiliser labels, honey jars, biltong pouches and dried-fruit packs. We work from your printer’s die line, leave room for batch codes and registration numbers, and make sure the product name can be read on a co-op shelf from across the aisle.',
      href: '/pricing/packaging-design-pretoria',
      linkLabel: 'Packaging design prices',
    },
    {
      title: 'Product catalogues for farm suppliers',
      priceId: 'catalogue-page',
      body:
        'Equipment dealers and input suppliers often need a catalogue that a rep can leave on a farmhouse table and a PDF that can be sent the same afternoon. We lay out both from one file, with part numbers and specifications in tables that are easy to scan.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Catalogue and marketing material pricing',
    },
    {
      title: 'Six-page business websites',
      priceId: 'website-6',
      body:
        'Enough room for a practice to list its areas of law, or for a supplier to give each product line its own page. Mobile-first, quick to load on a rural connection, and with the basic search set-up done before launch.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website packages',
    },
    {
      title: 'Annual reports for members and boards',
      priceId: 'annual-report',
      body:
        'Agricultural organisations, schools, sports bodies and professional associations report to members every year. We typeset the report from your approved text, build the charts, and manage the correction rounds from the treasurer, the chair and the auditor.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report design pricing',
    },
    {
      title: 'Logos with four concepts',
      priceId: 'logo-4',
      body:
        'For a new practice, a family business taking on a second generation, or a guest farm that has never had a proper mark. Four directions to choose from, two rounds of changes, and vector files that belong to you.',
      href: '/pricing/graphic-design-pretoria',
      linkLabel: 'Logo design packages',
    },
  ],
  districtsHeading: 'Bloemfontein business areas we design for',
  districtsIntro:
    'We know these areas from client briefs and research, not from walking past every week. A short description of where you trade still helps us design for the people who will see the work.',
  districts: [
    {
      name: 'Bloemfontein CBD',
      note: 'The courts, provincial departments and the legal and accounting firms clustered around them. Practice identities, tender documents and formal print make up most requests.',
    },
    {
      name: 'Westdene & Second Avenue',
      note: 'Restaurants, coffee shops, boutiques and consulting rooms. Menus, signage artwork and social templates for owner-run businesses.',
    },
    {
      name: 'Brandwag & the UFS main campus',
      note: 'Student housing, shops and service providers that live off the university calendar. Print in volume and campaigns timed to registration and exam season.',
    },
    {
      name: 'Loch Logan Waterfront & surrounds',
      note: 'Retail, hospitality and the sports crowd around the stadium. Window graphics, event print and promotional material.',
    },
    {
      name: 'Hamilton & East End',
      note: 'Industrial and light manufacturing premises. Vehicle artwork, safety signage, labels and product sheets.',
    },
    {
      name: 'Langenhoven Park',
      note: 'Newer residential and retail development on the north-western side, with plenty of young businesses that need a first logo and website.',
    },
  ],
  industriesHeading: 'Practical design notes for Bloemfontein sectors',
  industries: [
    {
      name: 'Attorneys and advocates',
      body:
        'Your letterhead gets scanned, printed in black and white and filed for years. Choose a mark that holds up in one colour at small sizes, set body text in a typeface that stays legible after a poor scan, and place registration and practice details wherever your professional rules require them.',
    },
    {
      name: 'Agribusiness and farm suppliers',
      body:
        'Many of your buyers read on a phone in a bakkie or a printed sheet at a farmers’ day. Put the price, the specification and the contact number where the eye lands first, and print on stock that will not fall apart in a dusty cab.',
    },
    {
      name: 'Schools and education providers',
      body:
        'Parents compare prospectuses side by side. Real photographs of your own learners and grounds, a clear fee and admissions section and a crest redrawn as clean vector artwork do more for enrolment than decoration.',
    },
    {
      name: 'Guest farms and hospitality on the N1',
      body:
        'Travellers between Gauteng and the Cape often book a stop on the day, from a phone. A fast website with photographs, rates and a working map pin matters more than a printed brochure for this trade.',
    },
  ],
  localWork: [],
  processHeading: 'How a project with a Bloemfontein client runs',
  process: [
    {
      title: 'First conversation on video',
      body: 'A call of about an hour on Teams, Zoom or Google Meet, or a WhatsApp call if that is easier. Share your screen to show us existing material, or send photographs of your premises and vehicles beforehand. A written scope and a fixed quote follow by email.',
    },
    {
      title: 'Concepts as annotated PDFs',
      body: 'Each concept arrives as a PDF with notes on why it was drawn that way. Mark it up, reply on WhatsApp, or book a short call to talk it through with the designer.',
    },
    {
      title: 'Print specification agreed early',
      body: 'If a Bloemfontein printer is producing the job, we ask for their file requirements before final artwork so bleed, colour profile and paper are right first time. If we arrange the printing in Pretoria, we tell you the courier lead time when we quote.',
    },
    {
      title: 'Delivery and file hand-over',
      body: 'Finished print arrives by courier, or your printer receives press-ready files directly. Websites go live online. You keep every source file, so future updates are simple.',
    },
  ],
  faqs: [
    {
      q: 'Is there a WL CreationX office in Bloemfontein?',
      a: 'No. We have a single studio, in Waterkloof Glen, Pretoria, and no office, phone line or staff in Bloemfontein. Everything for Bloemfontein clients is handled remotely by the same people who work on our Pretoria jobs.',
    },
    {
      q: 'Can you come to Bloemfontein for a meeting or a photo shoot?',
      a: 'Only by prior arrangement. On-site work outside Gauteng is quoted separately and includes travel costs, so most Bloemfontein clients keep the whole project online and send us photographs or use a local photographer.',
    },
    {
      q: 'Can our usual Bloemfontein printer print the work?',
      a: 'Yes. We supply press-ready PDFs to your printer’s specification and can deal with them directly about file questions. Alternatively we arrange printing in Pretoria and courier the finished job to you.',
    },
    {
      q: 'Do you design within legal practice advertising rules?',
      a: 'We design to the rules you give us. Tell us at the start which professional body governs your practice and send any guidance you have, and we will lay out stationery and the website within it.',
    },
    {
      q: 'Can you design packaging that meets labelling requirements for agricultural products?',
      a: 'We design the layout so the required information fits clearly and in the right place. The content itself, such as registration numbers, ingredients and claims, has to come from you or your regulatory adviser, and we check it is reproduced exactly.',
    },
    {
      q: 'What hours can we reach you?',
      a: 'Monday to Friday from 08:00 to 17:00 and Saturday from 08:00 to 15:00. Bloemfontein shares a time zone with Pretoria, so a call can be booked any time in those hours.',
    },
  ],
  closingHeading: 'Send us your Bloemfontein brief',
  closing:
    'Tell us what you need designed, who will print it and when it has to be ready. We will set up a call, then send a written scope and a fixed price you can approve before any work starts.',
};

export default page;
