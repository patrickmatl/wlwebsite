import type { AreaPage } from '@/data/area-pages';

/**
 * Annual report design, Cape Town. Served REMOTELY from the Pretoria studio:
 * no office, staff or routine visits in the Western Cape. On-site visits only by
 * arrangement, quoted separately. Do not copy this entry for another city.
 */
const page: AreaPage = {
  kind: 'annual-report',
  coverage: 'remote',
  province: 'Western Cape',
  slug: 'annual-report-design-cape-town',
  placeName: 'Cape Town',
  linkLabel: 'Annual report design in Cape Town',
  metaTitle: 'Annual Report Design Cape Town | WL CreationX',
  metaDescription:
    'Annual, integrated and impact reports for Cape Town asset managers, insurers, retailers, NPOs and universities, designed remotely by a Pretoria studio.',
  eyebrow: 'Cape Town · designed remotely from Pretoria',
  h1: 'Annual Report Design for Cape Town',
  lead:
    'We design annual reports, integrated reports, impact reports and fund documents for organisations in the City Bowl, Century City, Claremont and Stellenbosch. WL CreationX is a Pretoria studio and works with Cape Town clients remotely: briefings by video call, proofs as marked-up PDFs, and finished reports delivered as files or couriered in print.',
  ctaLabel: 'Brief us on your report',
  quickFacts: [
    { label: 'Where we are', value: 'Pretoria studio, working remotely' },
    { label: 'Reviews', value: 'Video call and marked-up PDF' },
    { label: 'Printed copies', value: 'Couriered, or files to your printer' },
  ],
  introHeading: 'A Cape Town report, made in Pretoria',
  intro: [
    'Cape Town has a strong design culture, and its reports show it. Fund managers, insurers, retailers and wine and agricultural groups regularly publish work that is visibly art-directed. If you are considering a studio from outside the city, the fair question is whether both the work and the process will hold up. In our view that depends far more on how the project is run than on the distance.',
    'Annual reporting already happens mostly on screen. Copy moves between your team, your auditors and the designer as documents and PDFs, and approvals happen in comment threads and calls. We run Cape Town projects that way deliberately from day one: a video kick-off, a shared schedule, numbered PDF proofs with all comments in one place, and a call at each sign-off point so decisions are recorded instead of scattered across inboxes.',
    'What we cannot do from Pretoria is drop into your office on a Tuesday afternoon. If you need someone in the room, for a board presentation or a photography day, a visit can be arranged and the travel quoted separately. The design work itself does not depend on one.',
  ],
  servicesHeading: 'What Cape Town organisations can brief us on',
  servicesIntro:
    'Ordered with financial services and the non-profit sector in mind, since both produce a great deal of the city’s reporting. Each card links to the scope and published rate.',
  services: [
    {
      title: 'Investor and fund reporting',
      priceId: 'investor-relations',
      body:
        'Quarterly commentaries, fact sheets, investor letters and results presentations for asset managers and insurers, designed as templates your team can refresh each period without disturbing the layout.',
      href: '/pricing/investor-relations-material-design-services-pretoria',
      linkLabel: 'Investor reporting material',
    },
    {
      title: 'Annual reports and annual reviews',
      priceId: 'annual-report',
      body:
        'Shorter reports for NPOs, trusts, schools, associations and private companies that want a well-made document without the full integrated reporting structure. Audited financial summaries are set in clear, consistent tables.',
      href: '/pricing/annual-report-design-and-print-pretoria',
      linkLabel: 'Annual report rates by page band',
    },
    {
      title: 'Combined annual and ESG reports',
      priceId: 'esg-integrated',
      body:
        'One document covering performance, governance and sustainability, for groups that would rather tell a single story than publish two reports that repeat each other in different fonts.',
      href: '/pricing/sustainability-esg-report-design-services-pretoria',
      linkLabel: 'Combined annual and ESG report',
    },
    {
      title: 'Data visualisation sets',
      priceId: 'data-visualisation',
      body:
        'A family of charts, maps and diagrams: vineyard and farm footprints, store networks, fund performance, research output. Designed to read the same way in the report, the presentation and on the website.',
      href: '/pricing/infographic-data-visualization-design-pretoria',
      linkLabel: 'Data visualisation design',
    },
    {
      title: 'Interactive publications',
      priceId: 'interactive-pdf',
      body:
        'Interactive PDFs with clickable contents, section tabs and links out to fund documents or research papers, for organisations whose stakeholders mostly read on a laptop or phone.',
      href: '/pricing/interactive-digital-publication-interactive-pdf-design-pretoria',
      linkLabel: 'Interactive publication design',
    },
    {
      title: 'Prepress for a Cape Town printer',
      priceId: 'prepress',
      body:
        'If you would rather print locally, we prepare press-ready files to your printer’s specification and go through their proofs with you on a call. Otherwise we print in Pretoria and courier the copies down.',
      href: '/pricing/print-design-pretoria',
      linkLabel: 'Prepress and print preparation',
    },
  ],
  districtsHeading: 'Report-producing districts across the peninsula and Winelands',
  districtsIntro:
    'We serve all of these remotely. The notes describe the kind of organisation each area is known for and the reports they tend to need.',
  districts: [
    {
      name: 'City Bowl and the Foreshore',
      note: 'Listed head offices, law firms, consultancies and provincial government around the CBD and the Foreshore towers. Integrated reports and governance-heavy documents.',
    },
    {
      name: 'V&A Waterfront',
      note: 'Investment firms, shipping and tourism businesses and corporate offices around the harbour, often after an image-led report with strong photography.',
    },
    {
      name: 'Century City',
      note: 'A dense cluster of head offices, insurers and property groups off the N1. Results packs, combined reports and investor presentations.',
    },
    {
      name: 'Claremont and Newlands',
      note: 'Asset managers, advisory firms and retail head offices in the southern suburbs, alongside schools and research organisations. Fund reporting and annual reviews.',
    },
    {
      name: 'Bellville and Tyger Valley',
      note: 'Insurers, financial services and healthcare groups in the northern suburbs, with higher-education campuses nearby. Data-heavy annual reports that must stay readable.',
    },
    {
      name: 'Stellenbosch and the Winelands',
      note: 'Agricultural, wine and investment groups, a university town, and trusts and foundations. Reports that combine financial results with land, water and community data.',
    },
  ],
  industriesHeading: 'Notes for Cape Town’s main reporting sectors',
  industries: [
    {
      name: 'Asset managers and insurers',
      body:
        'Readers compare you with your peers line by line, so consistency matters more than novelty. Keep performance tables in the same order as your fund documents, label periods and fees exactly as compliance approved them, and leave time for compliance to review the final layout, not only the draft copy.',
    },
    {
      name: 'Retail and consumer groups',
      body:
        'Store counts, footprints and segment results read better on a map or simple tiles than in a paragraph. Retail reports also lean on photography, so book shoots or source images early; otherwise the layout ends up waiting for pictures in the last fortnight.',
    },
    {
      name: 'Agricultural and wine groups',
      body:
        'Harvests rarely line up neatly with the financial year, so explain the crop or vintage year once, clearly, near the front. Water use, hectares under cultivation and seasonal labour make good small charts; use the same units your operations team reports in so nothing is converted twice.',
    },
    {
      name: 'NPOs, foundations and universities',
      body:
        'Funders read impact reports quickly and look for evidence. Lead with what changed, give each number its source, and keep the audited financial summary honest and easy to find. A university may need a formal report for the Department of Higher Education and Training and a shorter public review; plan both from one content base.',
    },
  ],
  localWork: [],
  processHeading: 'How a remote Cape Town report runs',
  process: [
    {
      title: 'Video kick-off and content plan',
      body: 'An hour on Teams, Zoom or Google Meet with your reporting lead. We agree the contents, page budget, image needs and the dates that cannot move, then send a written plan and schedule.',
    },
    {
      title: 'Design direction, walked through on screen',
      body: 'A cover and two or three spreads, shared as a PDF and talked through on a call so we can explain the choices and hear objections first-hand. Once the look is agreed it becomes the template for every remaining page.',
    },
    {
      title: 'Layout, financials and comment rounds',
      body: 'Sections are laid out as they are approved, and the financial statements are imported from your spreadsheets and documents, not rekeyed. Each proof is a numbered PDF; your team comments in the file, we answer every comment, and nothing changes outside that record.',
    },
    {
      title: 'Release: courier, printer files or online',
      body: 'You receive a press-ready PDF, an accessible PDF and any online edition. Hard copies come off a Pretoria press and travel to you by courier, or the press files go to your own printer in the Western Cape.',
    },
  ],
  faqs: [
    {
      q: 'Will anyone from your studio meet us in Cape Town?',
      a: 'Not as a matter of course. WL CreationX has a single studio, in Waterkloof Glen, Pretoria, and no office or staff in the Western Cape. Cape Town projects run by video call and email. If a visit would genuinely help, we can arrange one by agreement and quote the travel separately.',
    },
    {
      q: 'How do proofs and approvals work if we never meet?',
      a: 'Every round is a PDF with a version number. Your reviewers comment directly in the file, ideally with one person on your side consolidating them, and we reply to each comment when the next round goes out. Bigger decisions get a short video call so they are agreed rather than guessed at.',
    },
    {
      q: 'Should we print through you or use a printer here?',
      a: 'Whichever suits you. A print run from Pretoria arrives by courier; a local printer gets files built to their own specifications, and we check their proofs with you before anything goes on press.',
    },
    {
      q: 'Our audited financials arrive late. Will that break the schedule?',
      a: 'Late audit sign-off is normal, and the schedule should assume it. We set up the financial section early using draft numbers, so the final figures become a controlled update rather than a fresh typesetting job. Allow a few days after the auditors finish for your own final proof check.',
    },
    {
      q: 'Can the report work for readers who use screen readers?',
      a: 'Yes. We can tag the PDF, set the reading order, add bookmarks and include alternative text your team has approved for charts and images. It is worth deciding on this at the start, because retrofitting accessibility into a finished file takes longer.',
    },
    {
      q: 'We are a small NPO. Is a designed annual report worth it?',
      a: 'If funders, donors or a board read it, usually yes, though it need not be long. A focused report with clear impact figures and a summary of the financials often does more than a thick one. Our page-band rates are published, so you can see the cost before you get in touch.',
    },
  ],
  closingHeading: 'Send us last year’s report',
  closing:
    'Email your previous report, your year-end and your publication date, and suggest a time for a call. We will reply with a plan and a fixed quote, and you can decide from there.',
};

export default page;
