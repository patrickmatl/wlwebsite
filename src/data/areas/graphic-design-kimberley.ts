import type { AreaPage } from '@/data/area-pages';

/**
 * Kimberley is served remotely from the Pretoria studio. There is no office,
 * phone number or staff member in Kimberley, and the copy must never imply one.
 * Facts used: Northern Cape capital and seat of the provincial government,
 * diamond-mining history and the Big Hole, Sol Plaatje University, mining,
 * solar energy and agriculture across the province, the N12 and N8. No
 * statistics, no company names, no clients.
 */
const page: AreaPage = {
  slug: 'graphic-design-kimberley',
  placeName: 'Kimberley',
  kind: 'graphic-design',
  coverage: 'remote',
  province: 'Northern Cape',
  linkLabel: 'Graphic design for Kimberley organisations',
  metaTitle: 'Graphic Design Kimberley & Northern Cape | WL CreationX',
  metaDescription:
    'Reports, ESG documents, identities and websites for Kimberley organisations, designed remotely by a Pretoria studio and delivered online or by courier.',
  eyebrow: 'Kimberley · designed in Pretoria, delivered online',
  h1: 'Graphic Design for Kimberley Organisations',
  lead:
    'WL CreationX is a Pretoria design studio working remotely with Kimberley government entities, mining and energy companies, NGOs and small businesses. We design annual and sustainability reports, interactive documents, identities and websites, and deliver them online or by courier.',
  ctaLabel: 'Get a Kimberley quote',
  quickFacts: [
    { label: 'Our only studio', value: 'Pretoria, Gauteng' },
    { label: 'Reviews', value: 'Video call or WhatsApp' },
    { label: 'Running since', value: '2013' },
  ],
  introHeading: 'Design for a capital that serves a very large province',
  intro: [
    'Kimberley grew out of the diamond rush, and the Big Hole is still the first thing many South Africans picture when they hear the name. Today the city earns its living differently. It is the capital of the Northern Cape and the seat of the provincial government, home to Sol Plaatje University, and the administrative base for organisations whose operations are spread across mines, solar plants, irrigated farms and small towns hundreds of kilometres apart.',
    'That spread is the reason distance matters less here than in most places. A Kimberley organisation is already used to managing people and projects it cannot drive to in an afternoon, so working with a design studio by video call is a familiar arrangement. What the work usually needs is reliability with long, formal documents: annual reports for public entities, sustainability reports for mining and renewable energy projects, community newsletters, and presentations for stakeholder meetings in towns across the province.',
    'We should be clear about where we are. The studio is in Waterkloof Glen, Pretoria, and there is nobody from WL CreationX based in Kimberley. Kimberley is linked to Gauteng by the N12, which makes courier delivery of printed reports straightforward, and anything digital is sent the moment it is approved. The prices shown below are the same published rates every client pays.',
  ],
  servicesHeading: 'Services Kimberley organisations use',
  servicesIntro:
    'Led by reporting and long-form documents, which is where a remote studio is most useful to Northern Cape clients. Each service links to its full price page.',
  services: [
    {
      title: 'Annual reports for public entities and NGOs',
      priceId: 'annual-report',
      body:
        'Typesetting, tables and charts for annual reports that have to follow a prescribed structure and pass through several layers of sign-off. We number every version and check each correction against the last, so late changes from finance or the audit committee are not lost.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report design pricing',
    },
    {
      title: 'Sustainability and ESG reports',
      priceId: 'esg-report',
      body:
        'Mining houses and energy producers report on water, land, employment and community spend. We turn those datasets into readable charts and sections that follow the reporting framework you name, with plain summaries for community readers.',
      href: '/pricing/sustainability-esg-report-design-services-pretoria',
      linkLabel: 'Report design pricing, including ESG',
    },
    {
      title: 'Interactive PDFs',
      priceId: 'interactive-pdf',
      body:
        'Clickable contents pages, linked sections and embedded forms in a file that opens offline. Handy for stakeholders on a weak signal far from town, who can download once and read without reconnecting.',
      href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      linkLabel: 'Digital document and marketing material pricing',
    },
    {
      title: 'Starter corporate identity',
      priceId: 'ci-1',
      body:
        'Logo, business cards, letterhead and email signature for a new Kimberley business, a contractor registering on a supplier database, or a community organisation that needs to look credible to funders.',
      href: '/visual-communication-services-pretoria',
      linkLabel: 'Corporate identity packages',
    },
    {
      title: 'Business websites',
      priceId: 'website',
      body:
        'A compact, fast site that explains what you do, where you operate in the province and how to reach you. Built and launched online, and yours to keep.',
      href: '/pricing/website-design-pretoria',
      linkLabel: 'Website packages and prices',
    },
    {
      title: 'Pull-up banners for roadshows and meetings',
      priceId: 'pullup-banner',
      body:
        'Public participation meetings, career days and project open days often move from town to town. A pull-up packs into a car boot, stands up in a community hall in minutes, and can be printed in Pretoria and couriered or produced by a Kimberley printer from our files.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Banner and print design pricing',
    },
  ],
  districtsHeading: 'Kimberley areas and nodes we design for',
  districtsIntro:
    'We serve Kimberley remotely, so these notes describe who works where rather than streets we visit. Clients elsewhere in the Northern Cape are welcome on the same terms.',
  districts: [
    {
      name: 'Kimberley CBD',
      note: 'Provincial departments, the legislature, municipal offices and the professional firms that work with them. Reports, tender documents and formal stationery.',
    },
    {
      name: 'Sol Plaatje University',
      note: 'The university and the accommodation, cafés and service providers that grow around a young campus. Event print, recruitment material and student-facing social content.',
    },
    {
      name: 'Big Hole & heritage precinct',
      note: 'Tourism operators, guesthouses and heritage organisations drawing on the city’s mining past. Visitor brochures, interpretive panels and booking websites.',
    },
    {
      name: 'Belgravia',
      note: 'Historic houses converted into consulting rooms, guesthouses and small offices. Identities that sit comfortably with old buildings.',
    },
    {
      name: 'Kimdustria',
      note: 'Industrial premises, mining suppliers and workshops. Fleet artwork, safety signage and product sheets.',
    },
    {
      name: 'Galeshewe',
      note: 'One of the city’s largest residential areas, with a growing number of owner-run shops, services and community organisations that usually start with a logo and printed flyers.',
    },
  ],
  industriesHeading: 'What works for Kimberley’s main sectors',
  industries: [
    {
      name: 'Provincial government and public entities',
      body:
        'Annual reports are judged on compliance first. Build the template around the prescribed section order from day one, leave space for audit findings you cannot predict, and agree a print deadline that allows for one last round of changes.',
    },
    {
      name: 'Mining and mining suppliers',
      body:
        'Communities, regulators and investors read the same report for different reasons. Put a short plain-language summary up front, keep technical tables in an appendix, and translate key community messages where your stakeholders need it.',
    },
    {
      name: 'Solar and renewable energy projects',
      body:
        'Projects in remote parts of the province have to explain jobs, training and local spending to people who may never visit the site. Simple infographics and a newsletter template your team can refill every quarter carry that message better than a long report.',
    },
    {
      name: 'Agriculture and heritage tourism',
      body:
        'Whether you sell lamb, grapes or a guided tour of the diamond fields, buyers decide on photographs. Invest in honest images of the product or the place, then keep the label, brochure or web page uncluttered around them.',
    },
  ],
  localWork: [],
  processHeading: 'From brief to delivery, Kimberley to Pretoria',
  process: [
    {
      title: 'Brief by video or WhatsApp',
      body: 'Start with a video call or a WhatsApp voice note, whichever suits you. Send last year’s report or your existing material and we will tell you what can be reused and what needs redesign.',
    },
    {
      title: 'Schedule set against your deadlines',
      body: 'For reports we work back from the tabling, AGM or publication date and agree when copy, data and sign-offs are due. You get the schedule and a fixed quote in writing.',
    },
    {
      title: 'Numbered PDF proofs',
      body: 'Each round is a numbered PDF with changes marked, so several reviewers in different offices can comment on one file and nobody approves an outdated version.',
    },
    {
      title: 'Online delivery, courier or local print',
      body: 'Digital reports, interactive PDFs and websites are delivered online. Printed copies are produced in Pretoria and couriered to Kimberley, or we send press-ready files to your preferred Kimberley printer.',
    },
  ],
  faqs: [
    {
      q: 'Does WL CreationX have anyone in Kimberley?',
      a: 'No. We have one studio, in Waterkloof Glen, Pretoria, with no office, agent or local phone number in Kimberley. All Kimberley and Northern Cape work is done remotely by the Pretoria team.',
    },
    {
      q: 'Can you design an annual report for a public entity?',
      a: 'Yes. Send us the prescribed structure or last year’s report, and we will design a template that follows it and manage the correction rounds up to the final print or digital file. The content and the numbers remain your responsibility.',
    },
    {
      q: 'How do printed reports get to Kimberley?',
      a: 'Either we arrange printing in Pretoria and courier the boxes to your office, or we supply press-ready files to a printer in Kimberley. We will include courier lead time in the schedule if we print.',
    },
    {
      q: 'Can you attend our stakeholder meeting or photograph our site?',
      a: 'Only by prior arrangement. Work on site outside Gauteng is quoted separately, including travel, and depends on our schedule. Many clients send us their own photographs, and we design around them.',
    },
    {
      q: 'Can a report be published in more than one language?',
      a: 'Yes. Supply the approved translated text, for example in Afrikaans or Setswana, and we lay out each language version on the same template, so the editions match page for page. We do not translate the text ourselves.',
    },
    {
      q: 'Do you work with organisations in other Northern Cape towns?',
      a: 'Yes, in the same way as Kimberley: by video call, WhatsApp and email, with print couriered or supplied to a local printer.',
    },
  ],
  closingHeading: 'Planning a report or a new identity in Kimberley?',
  closing:
    'Send us your deadline and whatever material you already have. We will arrange a call during studio hours, Monday to Friday 08:00 to 17:00 or Saturday 08:00 to 15:00, and follow up with a written schedule and a fixed price.',
};

export default page;
