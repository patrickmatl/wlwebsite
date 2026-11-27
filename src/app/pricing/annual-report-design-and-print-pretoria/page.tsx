"use client";

import { motion } from "framer-motion";
import GetInTouchButton from "@/components/GetInTouchButton";
import RelatedServices from "@/components/RelatedServices";
import CaseStudies from "@/components/CaseStudies";
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const PAGE_URL = 'https://wlcreationx.co.za/pricing/annual-report-design-and-print-pretoria';

const relatedServices = [
  {
    title: "Graphic Design",
    description: "Creative graphic design for all your business needs.",
    href: "/pricing/graphic-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Brand Identity",
    description: "Build a memorable and cohesive brand identity.",
    href: "/branding-solutions-pretoria",
    anchor: "View Service"
  },
  {
    title: "Print Design",
    description: "Professional print design for brochures, flyers, and more.",
    href: "/pricing/print-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Packaging Design",
    description: "Eye-catching packaging design that stands out.",
    href: "/pricing/packaging-design-pretoria",
    anchor: "View Service"
  },
  {
    title: "Marketing Materials",
    description: "Effective marketing materials to promote your business.",
    href: "/pricing/marketing-materials-pretoria",
    anchor: "View Service"
  },
  {
    title: "Annual Report Design & Print",
    description: "Professional annual report design and print services in Pretoria.",
    href: "/pricing/annual-report-design-and-print-pretoria",
    anchor: "View Service"
  }
];

// Who produces annual reports in Pretoria. General types only: never name an
// organisation here unless it is a real client that has agreed to be named.
const audiences = [
  {
    title: "Public entities and state-owned companies",
    body: "Reports that set performance information against the targets in the annual performance plan, followed by the audited financial statements and the auditor’s report. The structure is usually set for you; our job is to make a fixed structure easy to read and easy to check.",
  },
  {
    title: "Agencies, regulators and statutory councils",
    body: "Bodies established under national departments, from regulators to professional councils. Their readers range from portfolio committee members to the public, so the report needs a clear summary up front and detail that is easy to find further in.",
  },
  {
    title: "NPOs, NGOs and foundations",
    body: "Annual reports and reviews for boards, funders and donors, often alongside audited statements. Many fit within 24 pages, and a clear account of where the money went matters more than heavy production.",
  },
  {
    title: "Associations and industry bodies",
    body: "Member-facing annual reports that go out with the AGM notice: the president’s review, the year’s work on behalf of members, membership figures, governance and the financial statements.",
  },
  {
    title: "Universities and research organisations",
    body: "Reports to council and stakeholders that combine research highlights, student and staff data, governance and financial results, usually with more photography and more data than a corporate report.",
  },
  {
    title: "Listed and private companies",
    body: "Annual and integrated reports, annual financial statements and AGM documents for companies in Centurion, Menlyn, Hatfield and the eastern suburbs, from a first designed report to a long-running series.",
  },
];

// What a client receives. Inclusions must stay in line with the annual-report
// items in src/data/pricing.ts; anything not listed there is "on request".
const deliverables = [
  {
    title: "Content plan and flatplan",
    body: "A page-by-page map of the report: section order, a page budget for each section, who owns the content and when it is due. It is agreed before layout starts, which is the single best protection against a report that keeps growing.",
  },
  {
    title: "A design system for the report",
    body: "Cover, grid, type hierarchy, colour logic, and table and chart styles, built on your brand guidelines and shown on sample spreads before full layout. Because it is a system, next year’s report starts from it rather than from a blank page.",
  },
  {
    title: "Narrative layout",
    body: "The chair’s and chief executive’s statements, organisational overview, strategy, performance review, governance and risk sections, laid out so readers can find the key messages without reading every word.",
  },
  {
    title: "Typeset financial statements",
    body: "The primary statements and notes set in one consistent table style from the final files your finance team and auditors approve. We check that totals, headings and note references carry through, and flag anything that does not match.",
  },
  {
    title: "Charts and infographics",
    body: "Financial and performance data turned into charts that are built from your spreadsheets, labelled properly and styled the same way throughout the report.",
  },
  {
    title: "Print-ready and screen PDFs",
    body: "Press-ready artwork for the printer plus a screen-optimised PDF for email and your website, both included in the packages above. A tagged, accessible PDF can be added and is scoped in your quote.",
  },
  {
    title: "Optional online or interactive edition",
    body: "An interactive PDF with working navigation, or a lighter online version for your website, for organisations that print only a short run or none at all.",
  },
  {
    title: "Print management",
    body: "We buy print from trade printers and manage the job: paper and binding advice, a quote per job, checking the printer’s proof against the approved file, and delivery to your offices.",
  },
];

// Production steps, written backwards from the immovable dates. Deliberately
// no durations: every report's calendar is set by its own board and audit dates.
const steps = [
  {
    title: "Fix the dates that cannot move",
    body: "We list the board or council approval meeting, the audit committee, the auditor’s sign-off, the AGM, submission or tabling date, and the day printed copies must be in hand. The schedule is written from the last of these back to today.",
  },
  {
    title: "Brief, last year’s report and the flatplan",
    body: "We go through last year’s report with your team, agree what must change, and build the flatplan with page budgets, section owners and copy due dates.",
  },
  {
    title: "Design system on sample spreads",
    body: "Cover direction, grid, typography and the chart and table styles are presented on a few real spreads. This is where the look is debated and signed off, before every later page depends on it.",
  },
  {
    title: "Narrative layout in batches",
    body: "Sections are laid out as their copy is approved rather than all at once at the end, so proofing is spread out and a late section does not hold up the rest.",
  },
  {
    title: "Financial statements from the final files",
    body: "Draft statements can be set early to settle table styles and page count. The signed-off versions then replace them, and every table is checked against its source file.",
  },
  {
    title: "Numbered proof rounds",
    body: "Each round goes out as a numbered PDF. Your coordinator returns one consolidated set of comments, and the next version comes back with a list of what changed.",
  },
  {
    title: "Number lock and final approval",
    body: "Once the figures are signed off they are locked: after that, numbers change only on written instruction from finance or the auditors, and the version the board approves is the version that is published.",
  },
  {
    title: "Release: print, screen, accessible and online",
    body: "Press-ready files go to the printer and we check the printer’s proof. The screen PDF, any accessible PDF and the online edition are ready for your publication date.",
  },
];

const fileFormats = [
  {
    title: "Print-ready PDF",
    body: "CMYK artwork with bleed, crop marks and embedded fonts, exported to your printer’s specification (usually a PDF/X standard).",
  },
  {
    title: "Screen PDF",
    body: "An RGB version compressed for email and the web, with bookmarks and a clickable contents page.",
  },
  {
    title: "Accessible PDF",
    body: "A tagged PDF with a logical reading order, the document language set, bookmarks and alternative text on charts and photographs, checked with an accessibility checker. You approve the alt text, because describing a chart is partly a content decision.",
  },
  {
    title: "Interactive PDF or web edition",
    body: "Internal links, navigation and a file size suited to downloading, or content prepared for your website team to publish as web pages.",
  },
  {
    title: "Chart and image exports",
    body: "Individual charts and infographics exported for your website, social media and the results presentation, so the same figures look the same everywhere.",
  },
  {
    title: "Editable source files",
    body: "Packaged layout files with linked images and a font list, supplied on request. Agree this at quote stage, because font and stock image licences can limit what may be handed over.",
  },
];

const reportServices = [
  {
    title: "Sustainability and ESG reports",
    body: "Standalone sustainability reports, or the ESG section of your annual report, with environmental and social data designed to be updated each year.",
    href: "/pricing/sustainability-esg-report-design-services-pretoria",
  },
  {
    title: "Investor relations material",
    body: "Results presentations, investor decks and shareholder reports that use the same chart styles and colours as the annual report.",
    href: "/pricing/investor-relations-material-design-services-pretoria",
  },
  {
    title: "Interactive digital publications",
    body: "Interactive PDFs with clickable contents pages, cross-references and working navigation for reports published mainly online.",
    href: "/pricing/interactive-digital-publication-interactive-pdf-design-pretoria",
  },
  {
    title: "Infographics and data visualisation",
    body: "Charts, data graphics and infographic spreads for the performance and sustainability sections of a report.",
    href: "/pricing/infographic-data-visualization-design-pretoria",
  },
];

// Rand amounts below mirror src/data/pricing.ts: annual-report, annual-report-large,
// annual-report-page, esg-integrated (integrated-report has no fixed price).
const faqs = [
  {
    question: "How much does annual report design cost in Pretoria?",
    answer: "Our annual report design costs R 18 500 for up to 24 pages and R 32 000 for 25–48 pages, with each page beyond 48 at R 250. A combined annual and ESG report is R 28 000. Integrated reports are always scoped on a call, because page count and content volume vary so much. Prices assume you supply final copy and signed-off figures, and printing is quoted separately.",
  },
  {
    question: "Is printing included in the price?",
    answer: "No. Printing is quoted per job once the page count, quantity, paper, binding and finishing are known. We buy print from trade printers, manage the job, check the printer’s proof against the approved file and arrange delivery, or we supply press-ready files to a printer you already use.",
  },
  {
    question: "What do we need to give you to start?",
    answer: "Last year’s report, your brand guidelines, the key dates (board, audit committee, auditor’s sign-off and AGM, submission or tabling date), a contact person for content, and then approved copy, photographs and data as each section is ready. The financial statements come last, as the Word and Excel files your finance team and auditors work from.",
  },
  {
    question: "Can you typeset our annual financial statements?",
    answer: "Yes. We set the primary statements and notes in the report’s table style from your final files, and check that totals, headings and note references carry through. We do not change a figure on our own judgement: if something does not add up or a reference does not match, we flag it for finance and the auditors to resolve.",
  },
  {
    question: "We are a public entity. Can you work within a prescribed structure?",
    answer: "Yes. Many public entities report under the Public Finance Management Act (PFMA) and follow guidance on the order and content of the annual report from National Treasury or their oversight department. We design within the structure you are given, so the performance information, financial statements and auditor’s report appear where they should. Decisions about what must be disclosed stay with your organisation and its auditors.",
  },
  {
    question: "When should we contact you?",
    answer: "As soon as your board and publication dates are known, and ideally before financial year-end, so the flatplan and design system can be agreed before copy and audited figures start arriving. We plan the whole schedule backwards from your fixed dates, so the earlier we have them, the more room there is for review.",
  },
  {
    question: "How do proof rounds and changes work?",
    answer: "Each proof goes out as a numbered PDF with a list of what changed since the last version. We ask for one consolidated set of comments per round from a single coordinator. Once the figures are locked, changes to numbers are made only on written instruction from finance or the auditors. The number of rounds is agreed at quote stage.",
  },
  {
    question: "Can the report be published as an accessible PDF?",
    answer: "Yes. An accessible version is tagged, has a logical reading order and bookmarks, sets the document language and carries alternative text on charts and photographs, which you approve. We check it with an accessibility checker before release. It is scoped as part of your quote.",
  },
  {
    question: "Can you produce an online or interactive version?",
    answer: "Yes. We can produce an interactive PDF with a clickable contents page and internal links, or prepare content for your website team to publish online. Some organisations now publish online first and print only a short run for the board and AGM.",
  },
  {
    question: "Do you design combined annual and ESG reports, or integrated reports?",
    answer: "Yes. A combined annual and sustainability report with full data visualisation is R 28 000. Integrated reports, which connect strategy, the business model, risks and performance across financial and non-financial information, are scoped on a call. Standalone sustainability reports have their own rates on our ESG report design page.",
  },
  {
    question: "Will you sign an NDA for draft results?",
    answer: "Yes. Draft reports often contain unpublished results, so we sign NDAs on request, keep drafts within the project team and do not show any part of a report until it has been published, and then only with your permission.",
  },
  {
    question: "Can we meet you in person in Pretoria?",
    answer: "Yes. Our studio is at 194 Bancor Ave, Waterkloof Glen, and we meet clients at their offices across Pretoria and Centurion for kick-offs and the reviews that matter. Routine proof rounds usually happen by email and video call.",
  },
];

const linkClass = "text-[#FFD700] underline underline-offset-2 hover:text-[#FFE55C]";

export default function AnnualReportDesignPrintPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* The one FAQPage on this page, generated from the visible FAQ list below */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />
      {/* Service + offers. Prices mirror src/data/pricing.ts: annual-report,
          annual-report-large, annual-report-page, esg-integrated. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${PAGE_URL}#service`,
            name: "Annual report design and print in Pretoria",
            serviceType: "Annual report design",
            description: "Design, typesetting and print management for annual reports, integrated reports and annual financial statements, from a studio in Waterkloof Glen, Pretoria.",
            url: PAGE_URL,
            provider: { "@id": "https://wlcreationx.co.za/#business" },
            areaServed: [
              { "@type": "City", name: "Pretoria" },
              { "@type": "Country", name: "South Africa" }
            ],
            offers: [
              { "@type": "Offer", name: "Annual report design (up to 24 pages)", price: "18500", priceCurrency: "ZAR", url: PAGE_URL },
              { "@type": "Offer", name: "Annual report design (25–48 pages)", price: "32000", priceCurrency: "ZAR", url: PAGE_URL },
              { "@type": "Offer", name: "Integrated annual and ESG report", price: "28000", priceCurrency: "ZAR", url: PAGE_URL },
              {
                "@type": "Offer",
                name: "Additional report page (beyond 48 pages)",
                url: PAGE_URL,
                priceSpecification: { "@type": "UnitPriceSpecification", price: "250", priceCurrency: "ZAR", unitText: "page" }
              }
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          Annual Report Design in Pretoria
        </motion.h1>
        <p className="text-lg text-gray-300 mb-6">Annual reports, integrated reports and financial statements designed, typeset and print-managed from our Waterkloof Glen studio, for organisations that answer to boards, councils, funders, members and oversight bodies.</p>
        <GetInTouchButton className="mx-auto" />
      </section>

      {/* Pretoria context */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Annual reports in the administrative capital</h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>Pretoria is South Africa’s administrative capital, and it produces more annual reports than its size suggests. Most national departments have their head offices here, and so do many of the public entities, agencies, regulators and statutory councils that report to them. Add the universities and research organisations, the professional associations and industry bodies, the NPOs and development organisations, and the companies in Centurion and Menlyn, and there are reports being finalised in Tshwane throughout the year.</p>
          <p>Many public entities follow the government financial year, which ends on 31 March, while companies and NPOs choose their own year-ends. Reporting work here is therefore not squeezed into one season, but each report still runs to its own fixed dates: an audit sign-off, a board or council meeting and an AGM, submission or tabling date that will not move for a late chart.</p>
          <p>WL CreationX has designed for Pretoria organisations since 2013, from a studio at 194 Bancor Ave, Waterkloof Glen. An annual report is a long document where the figures and tables have to be right as well as look right, so most of what follows is about how we keep it accurate and on schedule, not only how it looks.</p>
        </div>
      </section>

      {/* Who it is for */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center">Who we design annual reports for</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
              <p className="text-gray-400">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-6 text-center max-w-3xl mx-auto">Reports in more than one language are laid out from translations you supply, with each language proofed in its own round.</p>
      </section>

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto mb-20">
        <motion.h2
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-yellow-400 mb-8 text-center"
        >
          Design Packages & Pricing
        </motion.h2>
        {/* Prices mirror src/data/pricing.ts: annual-report, annual-report-large,
            esg-integrated, annual-report-page (and integrated-report, quoted on a
            call). Typed here because this is a client component — importing the
            price list would ship all of it to the browser. Change both together. */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Up to 24 pages — annual-report */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Up to 24 Pages</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 18 500</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>Striking cover design</li>
              <li>Custom collage artwork</li>
              <li>Professional typography</li>
              <li>Financial tables and charts styled</li>
              <li>Layout for up to 24 pages</li>
            </ul>
            <GetStartedButton packageName="Up to 24 pages" packagePrice="R 18 500" service="Annual report design" label="Select Plan" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFA500] transition-all" />
          </div>
          {/* 25–48 pages — annual-report-large */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">25–48 Pages</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 32 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>All 24-page features</li>
              <li>Layout for 25–48 pages</li>
              <li>Extended chart and infographic set</li>
              <li>Section dividers and navigation</li>
            </ul>
            <GetStartedButton packageName="25–48 pages" packagePrice="R 32 000" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
          {/* Integrated annual + ESG — esg-integrated */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Integrated Annual + ESG Report</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 28 000</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>Combined annual and sustainability report</li>
              <li>Full data visualisation</li>
              <li>Print-ready and digital versions</li>
            </ul>
            <GetStartedButton packageName="Integrated annual + ESG report" packagePrice="R 28 000" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
          {/* Larger reports — annual-report-large + annual-report-page */}
          <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col items-center p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-semibold text-white mb-2">Larger Reports</h3>
            <p className="text-yellow-300 text-3xl font-bold mb-2">R 32 000</p>
            <p className="text-yellow-300 text-sm font-semibold mb-2">+ R 250 per page beyond 48</p>
            <ul className="text-gray-400 mb-6 space-y-1 text-sm">
              <li>All 25–48-page features</li>
              <li>Every page beyond 48 at R 250</li>
              <li>Integrated reports quoted on a call</li>
            </ul>
            <GetStartedButton packageName="Larger report (over 48 pages)" packagePrice="R 32 000 + R 250 per page beyond 48" service="Annual report design" label="Select Plan" className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-medium hover:bg-[#FFA500] transition-all block" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-10 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">What the prices assume</h3>
          <p className="text-gray-400 leading-relaxed">The packages assume you supply final, approved copy and signed-off figures. Copywriting, editing, photography and translation can be added and are scoped separately. Printing is quoted per job once the page count, quantity, paper and binding are known. Integrated reports are always scoped on a call first, and a standalone sustainability report has its own rates on our{' '}
            <Link href="/pricing/sustainability-esg-report-design-services-pretoria" className={linkClass}>sustainability and ESG report design</Link> page.
          </p>
        </div>
      </section>

      {/* Deliverables */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">What you get</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">Every annual report project covers planning, design, typesetting and the files you need to publish. Print is managed by us or handed to your own printer.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{d.title}</h3>
              <p className="text-gray-400">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process, planned backwards from the fixed dates */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">How a report is produced, working back from your dates</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">An annual report is built backwards. The board approval, audit sign-off and AGM, submission or tabling dates are set long before the first page is laid out, so we start with them and plan every step to land in time.</p>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-gray-900 p-6 rounded-lg shadow-lg flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
                <p className="text-gray-400">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Auditors and company secretaries */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Working with your auditors and company secretary</h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>The design studio is one link in a chain that includes your finance team, the auditors, the company secretary or board secretariat, and whoever signs off the narrative. Most problems in reporting season come from versions crossing, so these are the rules we work to:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-white">One coordinator, one set of comments.</strong> Each proof round gets a single consolidated mark-up from your side, so two reviewers never send conflicting corrections to the same paragraph.</li>
            <li><strong className="text-white">Version names that mean something.</strong> Every file carries a version number, a date and its purpose, such as the audit committee draft or the board approval copy.</li>
            <li><strong className="text-white">A change list with every proof.</strong> Finance can see exactly what moved since the last round without re-reading the whole document.</li>
            <li><strong className="text-white">We never correct a figure ourselves.</strong> If a total does not add or a note reference does not match, we query it and wait for an instruction from finance or the auditors.</li>
            <li><strong className="text-white">A number lock.</strong> After an agreed point, figures change only on written instruction, so the published report matches the audited statements.</li>
            <li><strong className="text-white">Governance pages from approved text.</strong> Director and committee lists, the AGM notice and proxy forms are set from the company secretary’s approved wording, with names and titles checked against the final list they supply.</li>
          </ul>
        </div>
      </section>

      {/* File formats and handover */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">File formats and handover</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">A report is now read in print, on screen and through assistive technology. These are the files we can hand over; your quote lists the ones included for your project.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fileFormats.map((f) => (
            <div key={f.title} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related report services */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center">Related report work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportServices.map((r) => (
            <Link key={r.href} href={r.href} className="block bg-gray-900 p-6 rounded-lg shadow-lg border border-transparent hover:border-yellow-400 transition-colors">
              <h3 className="text-lg font-semibold text-[#FFD700] mb-2">{r.title}</h3>
              <p className="text-gray-400">{r.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Real projects only; renders nothing until src/data/case-studies.ts has one. */}
      <CaseStudies service="annual-report" heading="Recent report projects" />

      {/* Contact Encouragement */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-xl font-bold text-[#FFD700] mb-2">Not sure which plan is right for you?</h2>
        <p className="text-neutral-200 mb-4">Send us last year’s report and your key dates. We will suggest the right package, or scope an integrated report with you on a call.</p>
        <Link href="/get-in-touch-pretoria" className="inline-block bg-[#FFD700] text-black px-8 py-3 rounded-full font-medium hover:bg-[#FFA500] transition-all">Contact Us</Link>
      </section>

      {/* Annual report design for other cities: each has its own written page. */}
      <section className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-xl font-bold text-[#FFD700] mb-2">Reporting from outside Pretoria?</h2>
        <p className="text-neutral-200">
          {/* Plain links: this is a client component, and importing the area
              data here would ship every city page's copy to the browser. */}
          We also produce annual reports for organisations in{' '}
          <Link href="/annual-report-design-johannesburg" className={linkClass}>Johannesburg</Link>,{' '}
          <Link href="/annual-report-design-cape-town" className={linkClass}>Cape Town</Link> and{' '}
          <Link href="/annual-report-design-durban" className={linkClass}>Durban</Link>.
        </p>
      </section>

      {/* FAQ: the visible list and the FAQPage JSON-LD above come from the same array */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Frequently asked questions about annual report design in Pretoria</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* Further reading */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-[#FFD700] mb-4 text-center">Further reading</h2>
        <ul className="space-y-2 text-neutral-200">
          <li>
            <Link href="/creative-industry-blog-pretoria/what-goes-in-an-annual-report-south-africa" className={linkClass}>What goes in an annual report: a guide for South African organisations</Link>{' '}
            — the usual sections, integrated reporting, public entity reports and planning around audit dates.
          </li>
          <li>
            <Link href="/creative-industry-blog-pretoria/graphic-design-cost-pretoria-2026" className={linkClass}>How much does graphic design cost in Pretoria?</Link>{' '}
            — our 2026 price guide across logos, identities, print and more.
          </li>
        </ul>
      </section>

      {/* Related Services */}
      <RelatedServices currentService="Annual Report Design & Print" services={relatedServices} />
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-3xl mx-auto text-center mt-8">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">graphic design company Pretoria</Link> on the homepage.
        </p>
      </div>
    </div>
  );
}
