// Supporting content and FAQ for the Project Showcase page (rendered below the portfolio grid)
import Link from 'next/link';
import { BUSINESS } from '@/data/business';

export const portfolioFaqs: { question: string; answer: string }[] = [
  {
    question: 'What types of projects are featured in your portfolio?',
    answer:
      'Our portfolio showcases logo design and packaging design work created for businesses in Pretoria and across South Africa. Beyond what is shown here, we also produce brand identities, marketing materials, and websites — visit our pricing pages to see the full range of services.',
  },
  {
    question: 'How does WL CreationX approach logo design?',
    answer:
      'We start with research and discovery to understand your brand, audience, and goals. We then develop concepts and refine them with your feedback until the final mark is unique, versatile, and scalable across print and digital applications.',
  },
  {
    question: 'Do you design product packaging?',
    answer:
      'Yes. Our packaging work balances visual appeal with practical requirements such as print specifications, labelling regulations, and shelf presence. The packaging examples in this showcase were designed for real South African products.',
  },
  {
    question: 'Do you also offer web design and other services?',
    answer:
      'Yes. Alongside graphic design we offer website design, digital marketing, photography, and videography. This showcase focuses on logo and packaging work, but you can explore our other services from the pricing section of the site.',
  },
  {
    question: 'Are revisions included in your design process?',
    answer:
      'Yes. Revisions are part of every project. We share concepts at key stages and refine the work based on your feedback, so the final design reflects your vision before anything is signed off.',
  },
  {
    question: 'How do project timelines work?',
    answer:
      'We agree on clear milestones at the start of each project and keep communication open throughout. Timelines vary by project scope — a logo typically moves faster than a full packaging range — and we confirm realistic delivery dates before work begins.',
  },
  {
    question: 'Can you work with startups and small businesses?',
    answer:
      'Absolutely. We work with startups, small businesses, and established companies alike, and we tailor our proposals to fit different budgets. See our pricing pages for package options.',
  },
  {
    question: 'Do you only work with businesses in Pretoria?',
    answer:
      'Our office is in Waterkloof Glen, Pretoria, and we meet clients on-site across Gauteng. We also work remotely with clients throughout South Africa, handling briefs, feedback, and delivery online.',
  },
  {
    question: 'How do I get started with WL CreationX?',
    answer:
      `Contact us through the website, email ${BUSINESS.email}, or call ${BUSINESS.phoneDisplay} to discuss your project. We will review your needs and put together a tailored proposal.`,
  },
];

export default function PortfolioSeoContent() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>About Our Pretoria Design Portfolio</h2>
        <p>
          WL CreationX is a graphic design agency based in Waterkloof Glen, Pretoria, creating branding, logo, and
          packaging design for businesses across South Africa since 2013. The work in this showcase reflects how we
          translate business goals into clear, memorable visual identities.
        </p>
        <p>
          Our portfolio ranges from minimalist logo marks for new ventures to packaging for established product brands.
          Every project starts with understanding the client&rsquo;s market and ends with artwork that is practical to
          use — across print, packaging, and digital channels.
        </p>

        <h3>Logo, Branding &amp; Packaging Design Expertise</h3>
        <p>
          Our logo design process involves research, concept development, and refinement to ensure every mark is unique
          and meaningful. For packaging, we focus on both aesthetics and functionality — designs that look great and
          work on the shelf. Our broader branding work covers typography, colour palettes, brand guidelines, and
          collateral.
        </p>
        <p>
          Working from Pretoria, we combine local market knowledge with current design practice. Whether you are
          launching a new product or refreshing an existing brand, we deliver design that builds recognition. We serve
          clients on-site across Gauteng and remotely throughout South Africa.
        </p>

        <h3>Why Work with WL CreationX?</h3>
        <p>
          We take the time to understand your vision and offer solutions that fit your objectives and budget. Clients
          are involved at every stage of the design process, so the final result reflects their brand — not a template.
        </p>
        <p>
          If you like what you see in this showcase, <Link href="/get-in-touch-pretoria" className="text-[#FFD700] hover:underline">get in touch</Link> to discuss your
          next design project, or explore our <Link href="/pricing" className="text-[#FFD700] hover:underline">pricing and services</Link>.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Frequently Asked Questions</h2>
        {portfolioFaqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
}
