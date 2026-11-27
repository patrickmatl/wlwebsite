import type { AreaPage } from '@/data/area-pages';

/**
 * Annual report design, Durban. Served REMOTELY from the Pretoria studio:
 * no office, staff or routine visits in KwaZulu-Natal. On-site visits only by
 * arrangement, quoted separately. Do not copy this entry for another city.
 */
const page: AreaPage = {
  kind: 'annual-report',
  coverage: 'remote',
  province: 'KwaZulu-Natal',
  slug: 'annual-report-design-durban',
  placeName: 'Durban',
  linkLabel: 'Annual report design in Durban',
  metaTitle: 'Annual Report Design Durban | WL CreationX',
  metaDescription:
    'Annual and integrated report design for Durban and Umhlanga companies, public bodies and family groups: AFS typesetting, infographics and print, run remotely.',
  eyebrow: 'Durban & KwaZulu-Natal · remote from Pretoria',
  h1: 'Annual Report Design in Durban',
  lead:
    'WL CreationX designs annual reports, integrated reports and financial statements for logistics, manufacturing, agri-processing and public-sector organisations in Durban, Umhlanga and the surrounding metro. The studio is in Pretoria, so Durban projects run remotely, with printed reports couriered down or press files sent to your printer.',
  ctaLabel: 'Get a Durban report quote',
  quickFacts: [
    { label: 'Studio', value: 'Pretoria only' },
    { label: 'How we work', value: 'Remote, by call and PDF' },
    { label: 'Operating since', value: '2013' },
  ],
  introHeading: 'From the first formal report to the twentieth',
  intro: [
    'Durban’s reporting market is unusually mixed. There is the port and the logistics trade around it, manufacturers in Pinetown and the southern industrial areas, sugar and agri-processing groups along the coast, municipal and provincial bodies in the city, and a good number of family-owned companies that have grown large enough for lenders, partners or new shareholders to expect proper annual reporting.',
    'That last group is where a designer can be most useful. A company moving from a management-accounts pack to its first published annual report has to decide what the document is for, who will read it and how much to disclose, and the layout choices follow from those answers. We help shape the content plan as well as design it, while the accounting and legal judgements stay with your auditors and advisers.',
    'Everything is run from our studio in Pretoria. Briefings and reviews take place by video call and email, proofs travel as marked-up PDFs, and finished copies are either printed here and couriered to you or supplied as press-ready files to a KwaZulu-Natal printer of your choosing.',
  ],
  servicesHeading: 'Reporting services for Durban organisations',
  servicesIntro:
    'Arranged roughly in the order Durban clients need them, starting with the core report and ending with the material that travels alongside it.',
  services: [
    {
      title: 'Annual reports with full financials',
      priceId: 'annual-report-large',
      body:
        'For companies and public bodies whose report carries complete financial statements alongside governance and operational sections. Priced by page band, with the statements set from your finance team’s working files.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report design and print',
    },
    {
      title: 'Integrated reports',
      priceId: 'integrated-report',
      body:
        'For listed groups, larger private companies and entities that have adopted integrated reporting, covering the business model, material matters and risk. We scope these on a call, since the volume of content drives the work.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Integrated report scope',
    },
    {
      title: 'Operational infographics',
      priceId: 'infographic',
      body:
        'Single-subject graphics that explain an operation at a glance: how cargo moves through a terminal, the stages from cane to refined sugar, a production line or a distribution network.',
      href: '/pricing/infographic-data-visualization-design-pretoria',
      linkLabel: 'Infographic design',
    },
    {
      title: 'Sustainability and ESG reports',
      priceId: 'esg-report',
      body:
        'For manufacturers and agri-processors whose emissions, water, energy, effluent and safety data is increasingly requested by customers, lenders and export buyers, not only shareholders.',
      href: '/pricing/sustainability-esg-report-design-services-pretoria',
      linkLabel: 'ESG report design',
    },
    {
      title: 'Company profiles as a first step',
      priceId: 'company-profile',
      body:
        'For a family group not yet ready for a full annual report, a well-structured profile covering operations, leadership and governance can bridge the gap with banks, empowerment partners and major customers.',
      href: '/pricing/marketing-materials-pretoria',
      linkLabel: 'Company profile design',
    },
    {
      title: 'Results and AGM presentations',
      priceId: 'powerpoint',
      body:
        'Board, council and funder briefings and AGM slides that reuse the report’s own charts, so the figures on screen match the figures on the page.',
      href: '/pricing/presentation-design-services-pretoria',
      linkLabel: 'Presentation design',
    },
    {
      title: 'Digital editions',
      priceId: 'digital-editions',
      body:
        'Web-ready, accessible and mobile-friendly versions of the report, delivered digitally for your website, shareholder portal or public download page.',
      href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      linkLabel: 'Digital publication versions',
    },
  ],
  districtsHeading: 'Durban business districts and the reports they produce',
  districtsIntro:
    'All served remotely. Each note describes the organisations clustered in that area and what their reports usually need.',
  districts: [
    {
      name: 'Umhlanga Ridge and Ridgeside',
      note: 'Corporate head offices, financial services firms and property groups in the newer office towers. Integrated reports and polished investor material.',
    },
    {
      name: 'Durban CBD',
      note: 'Municipal and provincial offices, older corporate headquarters, legal practices and professional bodies. Public-sector reports with prescribed structures.',
    },
    {
      name: 'The port precinct and Maydon Wharf',
      note: 'Shipping, freight forwarding, warehousing and port-services companies around the harbour. Throughput data, safety figures and network maps.',
    },
    {
      name: 'Westville',
      note: 'Office parks along the N3 with insurers, engineering firms and healthcare groups, and a university campus close by. Annual reports and stakeholder reviews.',
    },
    {
      name: 'La Lucia',
      note: 'Professional firms, investment companies and family offices in the La Lucia Ridge office estate. Smaller, carefully produced reports for shareholders and trustees.',
    },
    {
      name: 'Pinetown and the inland industrial areas',
      note: 'Manufacturing, packaging, food processing and engineering along the N3 corridor. First-time annual reports and ESG data for customers and lenders.',
    },
  ],
  industriesHeading: 'Advice for Durban’s reporting sectors',
  industries: [
    {
      name: 'Port, freight and logistics',
      body:
        'Readers want evidence of capacity and reliability. Show volumes over several years in one consistent chart, map your network instead of listing depots, and keep safety and incident figures prominent; burying them reads as evasion.',
    },
    {
      name: 'Sugar, agri-processing and food manufacturing',
      body:
        'Explain the season and crop cycle before the numbers, because a milling or harvest season may not match your financial year. Grower and community relationships, water and energy matter to your readers, so give them proper sections rather than a closing page.',
    },
    {
      name: 'Municipalities and provincial entities',
      body:
        'Councillors, oversight committees and residents all read the same report with very different needs. Keep the required structure, but add a short plain-language overview at the front, use the same symbols for achieved, partly achieved and not achieved throughout the performance section, and consider an isiZulu version of the summary.',
    },
    {
      name: 'Family-owned groups',
      body:
        'Decide early who the report is for: a bank, a minority shareholder, an empowerment partner, the next generation of the family. That decides how much to disclose. Start lean, adopt a design system you can grow into, and make the board and governance pages describe how decisions are actually made.',
    },
  ],
  localWork: [],
  processHeading: 'The production timeline for a Durban report',
  process: [
    {
      title: 'Content plan by video call',
      body: 'We start with who reads the report and what it must contain, then build a page-by-page plan with owners and dates. For a first-time report this may take two calls rather than one.',
    },
    {
      title: 'Design system and sample pages',
      body: 'A cover, a section opener, a narrative spread, a data spread and a financial statement page, sent as a PDF and discussed on a call. Those five pages set the rules for everything that follows.',
    },
    {
      title: 'Typesetting and correction rounds',
      body: 'Narrative and financials are laid out from your approved Word and Excel files. Corrections come back as comments on numbered PDF proofs, and the final audited figures replace the drafts in a single tracked update.',
    },
    {
      title: 'Print in Pretoria, or press files for Durban',
      body: 'We print and courier the copies to your office, or send press-ready files to your local printer, and deliver the online and accessible versions digitally at the same time.',
    },
  ],
  faqs: [
    {
      q: 'Do you have someone based in Durban we can call on?',
      a: 'No. WL CreationX works from one place, our Pretoria studio on Bancor Avenue, and nobody on our team is based in KwaZulu-Natal. You deal directly with the designers here by video call, phone and email. If a site visit is needed, for example to photograph an operation, it can be arranged by agreement and is quoted separately.',
    },
    {
      q: 'This is our first proper annual report. Where do we begin?',
      a: 'With last year’s financial statements, a list of the people who must approve the report, and a clear idea of who will read it. From that we can propose a page plan and a sensible length. What to disclose is a decision for your directors and auditors; our part is making the agreed content clear and readable.',
    },
    {
      q: 'Can you set our financial statements from the files the auditors send?',
      a: 'Yes. Send Word and Excel versions rather than a PDF wherever possible, because they can be imported and styled without retyping. If only a PDF exists we can still work from it, but it takes longer and every figure needs extra checking.',
    },
    {
      q: 'How much time should we allow?',
      a: 'For a mid-length report with financial statements, plan in weeks rather than days, and count backwards from the date the audit opinion is expected. Most of the time goes on content and approvals rather than layout, so the schedule depends heavily on how quickly your reviewers respond.',
    },
    {
      q: 'Can the report be printed and delivered to Durban?',
      a: 'Yes. The print run is produced in Pretoria and couriered to your address, or we prepare press-ready files for a Durban printer if you prefer to keep printing local.',
    },
    {
      q: 'Will the online version work for people using assistive technology?',
      a: 'It can. We produce tagged PDFs with proper headings, a correct reading order and alternative text, which matters particularly for public bodies whose reports are downloaded by residents. Plan for it at the start of the project, not after print approval.',
    },
  ],
  closingHeading: 'Tell us about your report',
  closing:
    'Send your year-end, your publication or AGM date and a copy of any previous report or financial statements. We will set up a video call, propose a plan and send a fixed quote.',
};

export default page;
