import type { AreaPage } from '@/data/area-pages';

/**
 * Annual report design, Johannesburg. Served in person from the Pretoria studio
 * (about 45–60 minutes on the N1, no travel charge in Gauteng). Written for the
 * JSE / head-office market. Do not copy this entry for another city.
 */
const page: AreaPage = {
  kind: 'annual-report',
  coverage: 'in-person',
  province: 'Gauteng',
  slug: 'annual-report-design-johannesburg',
  placeName: 'Johannesburg',
  linkLabel: 'Annual report design in Johannesburg',
  metaTitle: 'Annual Report Design Johannesburg | WL CreationX',
  metaDescription:
    'Integrated reports, AFS typesetting, ESG sections and AGM packs for Johannesburg and Sandton organisations, from a Pretoria studio that comes to your office.',
  eyebrow: 'Johannesburg · reporting season, from Pretoria',
  h1: 'Annual Report Design for Johannesburg Organisations',
  lead:
    'WL CreationX lays out integrated reports, annual financial statements, ESG reports and AGM documents for companies and public bodies in Sandton, Rosebank, Parktown and the inner city. Our studio is in Pretoria, about 45 to 60 minutes away on the N1, and we drive in for the meetings where the decisions get made.',
  ctaLabel: 'Plan a Johannesburg report',
  quickFacts: [
    { label: 'Sandton from the studio', value: 'About 45–60 min on the N1' },
    { label: 'Gauteng meetings', value: 'No travel charge' },
    { label: 'Routine reviews', value: 'By video call' },
  ],
  introHeading: 'Reports that have to survive a long sign-off chain',
  intro: [
    'In a Johannesburg head office the annual report rarely belongs to one person. Investor relations drafts the strategy section, the company secretary owns governance and the AGM notice, finance and the auditors own every number, sustainability sends its data late, and the chief executive and the chair each want to read the whole document before it reaches the board. The designer sits in the middle of all that, and the job is as much about controlling versions as it is about typography.',
    'We plan for this from the first meeting. Each section gets an owner and a due date, every proof carries a version number, and changes are made only from marked-up PDFs or tracked documents, so a figure corrected in the audit committee pack does not quietly revert in the published report. When the final audited numbers arrive, the financial statements are updated from the source files rather than retyped by hand.',
    'For listed companies, the integrated report also sits beside a results announcement, an investor presentation and often a separate sustainability or climate report. One design system for all of them, with shared grids, chart styles, table rules and a colour logic for business segments, costs less over a few reporting cycles than redesigning each document every year, and it makes the group look coherent to the analysts who read every piece.',
  ],
  servicesHeading: 'Reporting work we take on for Johannesburg clients',
  servicesIntro:
    'Listed and large private groups usually begin with the integrated report, so it comes first here. Every card links to the full scope and published rate.',
  services: [
    {
      title: 'Integrated reports',
      priceId: 'integrated-report',
      body:
        'For organisations reporting in line with the integrated reporting framework: business model and value creation, the capitals, risks and material matters, governance and remuneration, arranged so a reader can follow strategy through to outcomes. Always scoped on a call first, because page count and content volume vary widely.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Integrated report design scope',
    },
    {
      title: 'Annual reports and financial statements',
      priceId: 'annual-report-large',
      body:
        'Typesetting of IFRS-based annual financial statements from the Word and Excel files your finance team and auditors already use, with consistent table styles, checked note references and a page structure that makes next year’s update quicker.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report and AFS layout rates',
    },
    {
      title: 'ESG and climate reporting',
      priceId: 'esg-report',
      body:
        'Standalone sustainability reports and the ESG sections of a combined report. With ISSB standards (IFRS S1 and S2) emerging as the reference point for sustainability and climate disclosure, we design data tables and charts that can be refreshed year on year without a new layout.',
      href: '/pricing/sustainability-esg-report-design-services-pretoria',
      linkLabel: 'Sustainability and ESG report design',
    },
    {
      title: 'Results presentations and investor packs',
      priceId: 'investor-relations',
      body:
        'Interim and year-end results decks, investor day material and fact sheets using the same chart styles and segment colours as the report. Built in editable PowerPoint, so IR can make a late change on the morning of the presentation.',
      href: '/pricing/investor-relations-material-design-services-pretoria',
      linkLabel: 'Investor relations material',
    },
    {
      title: 'AGM notices, proxy forms and shareholder documents',
      priceId: 'ir-shareholder-report',
      body:
        'A notice of annual general meeting, form of proxy or summarised shareholder report has fewer pages than the main report and less room for error. We set them from the company secretary’s approved text and keep them visually in step with the integrated report.',
      href: '/pricing/investor-relations-material-design-services-pretoria',
      linkLabel: 'Shareholder document design',
    },
    {
      title: 'Accessible and online editions',
      priceId: 'digital-editions',
      body:
        'Tagged, bookmarked PDFs with a sensible reading order and alternative text on charts, plus lighter versions for your investor relations website. Some groups now publish online and print only a short run for directors and the AGM.',
      href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      linkLabel: 'Digital and accessible report versions',
    },
  ],
  districtsHeading: 'Where Johannesburg’s reports are put together',
  districtsIntro:
    'Reporting teams are concentrated in a handful of business districts. These are the ones we drive to most often for kick-offs and pre-board reviews.',
  districts: [
    {
      name: 'Sandton',
      note: 'The JSE and the head offices of many listed groups, banks and law firms. Expect integrated reports, results packs and audit committee dates that do not move.',
    },
    {
      name: 'Rosebank',
      note: 'Head offices, investment firms and agencies along the Gautrain line, sometimes wanting the report redesigned alongside a wider brand refresh.',
    },
    {
      name: 'Parktown',
      note: 'Corporate campuses, health and research organisations and resource companies on the ridge. Environmental and social data is often the heaviest part of the job.',
    },
    {
      name: 'Braamfontein',
      note: 'Foundations, NGOs and higher-education offices around Wits. Annual reviews for funders and governance-heavy reports for boards and councils.',
    },
    {
      name: 'The CBD and Marshalltown',
      note: 'Provincial departments, public entities and long-established corporate head offices. Reports here often follow a set structure that the design must fit rather than replace.',
    },
    {
      name: 'Bryanston, Sunninghill and Woodmead',
      note: 'Office parks off the N1 with technology, healthcare and services groups, including companies preparing a first designed report after a listing or a change of ownership.',
    },
  ],
  industriesHeading: 'Practical advice by type of reporter',
  industries: [
    {
      name: 'JSE-listed companies',
      body:
        'Agree the page plan before anyone writes. Most late nights in reporting season come from sections that keep growing after layout has started. Fix a page budget per section, put the key performance numbers on the first spread, and keep governance and remuneration on the same grid as everything else so they do not read like a bolted-on appendix.',
    },
    {
      name: 'Banks, asset managers and insurers',
      body:
        'Your readers are numerate and sceptical. Use fewer chart types and use each one the same way throughout: one colour per segment, axes that start at zero unless there is a stated reason, and footnotes placed next to the chart they qualify. Regulatory disclosures should stay readable, not shrunk to the smallest type that fits.',
    },
    {
      name: 'Mining and resources groups',
      body:
        'Safety, water, energy, emissions, rehabilitation and community figures often run across many pages and many operations. A small set of reusable data modules with identical units and year-on-year comparisons lets readers compare sites quickly, and lets your team drop next year’s numbers into the same places.',
    },
    {
      name: 'Public entities and state-owned companies',
      body:
        'The sequence of sections is frequently prescribed by Treasury guidelines or your oversight department, and the audit report must be reproduced exactly as issued. Design still helps within those limits: clear performance-against-target tables, a legible organogram and a version that opens properly on a phone for members of the public.',
    },
  ],
  localWork: [],
  processHeading: 'A typical Johannesburg report, from kick-off to release',
  process: [
    {
      title: 'Kick-off in your boardroom',
      body: 'We come to Johannesburg for the first meeting with your reporting team to settle the page plan, section owners, the board, audit committee and publication dates, and what must change from last year. A written schedule follows within a few days.',
    },
    {
      title: 'Design system on real spreads',
      body: 'Cover direction, grid, typography and chart and table styles, shown on a handful of spreads built from last year’s content or early drafts. This is the moment to debate the look, before a couple of hundred pages depend on it.',
    },
    {
      title: 'Narrative layout, then the financials',
      body: 'Narrative sections are laid out as copy is approved. The annual financial statements are typeset from your finance team’s files once the numbers are close, then updated after audit sign-off, with each table checked against its source.',
    },
    {
      title: 'Proof rounds, sign-off and release',
      body: 'Numbered rounds by marked-up PDF and video call, with an in-person review before the board if you want one. Then the press-ready file, an accessible PDF and online versions, with printing in Pretoria and delivery to your offices if you need hard copies.',
    },
  ],
  faqs: [
    {
      q: 'Is there a WL CreationX office in Sandton or anywhere in Johannesburg?',
      a: 'No. The only studio is at 194 Bancor Ave, Waterkloof Glen, Pretoria. Johannesburg is near enough that we come to you for the kick-off and the reviews that matter, and routine proof rounds happen by video call.',
    },
    {
      q: 'Is there a charge for coming through to Johannesburg?',
      a: 'No. Meetings anywhere in Gauteng carry no travel charge, so a kick-off in Sandton or a review in Braamfontein costs nothing extra.',
    },
    {
      q: 'Our auditors sign off late. How do you handle the final numbers?',
      a: 'The financial statements are built so tables can be refreshed from the finance team’s final Word or Excel files instead of being retyped. When the signed figures arrive we update them and send a proof highlighting every change, so finance can compare it with the audited version. We lay out what you supply; confirming the numbers stays with your team and the auditors.',
    },
    {
      q: 'Can you typeset our AFS straight from Word and Excel?',
      a: 'Yes, that is how most finance teams supply them. Keep each note and table in a consistent structure, avoid merged cells where you can, and accept or remove tracked changes before sending. We set the statements in the report’s table style and check that note numbers referred to in the primary statements match the notes themselves.',
    },
    {
      q: 'When should we start talking to you?',
      a: 'Before financial year-end if possible, while the page plan and design can be agreed calmly. The weeks after year-end are when copy, data and audit work all land together, and a design system agreed in advance is what keeps that stretch under control. Give us your board and publication dates and we will plan backwards from them.',
    },
    {
      q: 'Can the report be published as an accessible PDF?',
      a: 'Yes. We produce tagged PDFs with a logical reading order, bookmarks, the document language set and alternative text for charts and photographs, and run them through an accessibility checker before release. Your team approves the alt text, since describing a chart well is partly a content decision.',
    },
  ],
  closingHeading: 'Starting this year’s report?',
  closing:
    'Send us last year’s report, your year-end and your board date. We will book a kick-off at your offices, then send a dated production plan and a fixed quote.',
};

export default page;
