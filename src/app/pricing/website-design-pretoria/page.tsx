'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedServices from '@/components/RelatedServices';
import GetInTouchButton from '@/components/GetInTouchButton';
import CaseStudies from '@/components/CaseStudies';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

const PAGE_URL = 'https://wlcreationx.co.za/pricing/website-design-pretoria';

const linkClass = 'text-[#FFD700] underline underline-offset-2 hover:no-underline';

type Faq = { question: string; answer: string; link?: { href: string; text: string } };

// Rand amounts below mirror pricing.ts ids: website (8980), website-6 (14780),
// website-9 (17420), website-catalog (19780), ecommerce (19780),
// ecommerce-advanced (23690), popia (1350), custom-web-app (27980),
// maintenance-essential (1500). Client component: keep in step by hand.
const faqs: Faq[] = [
  {
    question: 'How much does a website cost in Pretoria?',
    answer:
      'Our fixed packages are R8,980 for a three-page website, R14,780 for six pages and R17,420 for nine pages. A catalogue website with up to 50 products is R19,780, and the full e-commerce package on this page is R23,690 (online shops start at R19,780 on our e-commerce page). POPIA compliance set-up is an optional R1,350, and custom web applications start at R27,980. Hosting and domain registration are paid separately to the provider.',
  },
  {
    question: 'What is included in every website package?',
    answer:
      'Every package includes a mobile-responsive design, a contact form, links to your social media profiles, basic on-page SEO set up before launch, Google Analytics, rounds of revisions, training on how to edit the site, and a support period of three to twelve months depending on the package. You also get the admin logins and own the finished site.',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most of our website projects take one to four weeks once the content is ready. Catalogue and e-commerce sites take longer because products have to be loaded and tested. The biggest cause of delay is waiting for copy and photos, so having those ready shortens the timeline more than anything else. A rush service is available at 50% on top of the package price for delivery in five to seven business days.',
  },
  {
    question: 'Do I own my website and domain?',
    answer:
      'Yes. Your domain should be registered in your name or your company’s name, not ours, and at handover you receive the administrator logins for the site. The content, the photos you supplied and the design we built for you belong to your business once the project is paid for.',
  },
  {
    question: 'Is hosting included in the price?',
    answer:
      'Hosting is not included by default, because the right plan depends on your traffic, email needs and budget. We recommend reliable hosting, help you sign up in your own name, and set up the site, the SSL certificate and the connection to your domain. If you already have hosting, we can usually build on it or migrate to something better.',
  },
  {
    question: 'Can I update the website myself?',
    answer:
      'Yes. Sites are built on a content management system such as WordPress, so you can change text, swap images and add blog posts without touching code. Every package includes at least one training session, and the larger packages include two to four, so more than one person on your team can learn the editor.',
  },
  {
    question: 'Will my website rank on Google?',
    answer:
      'Nobody can honestly promise a ranking. What we do is set up the basics properly before launch: page titles, meta descriptions, a sensible heading structure, readable URLs, image alt text, an XML sitemap and analytics. That gives Google a clean site to read. Ranking for competitive searches usually needs ongoing work on content, local listings and links, which is what our separate SEO service covers.',
    link: { href: '/pricing/seo-pretoria', text: 'See our SEO packages' },
  },
  {
    question: 'Does my website need to comply with POPIA?',
    answer:
      'If your website collects personal information, for example through a contact form, a newsletter sign-up or tracking cookies, the Protection of Personal Information Act applies to how you collect and handle it. Our POPIA set-up adds a privacy policy, a cookie consent banner and data handling notices to the site for R1,350. This is practical website set-up, not legal advice, so check anything specific to your business with a legal adviser.',
  },
  {
    question: 'What should I prepare before the build starts?',
    answer:
      'Decide which pages you need, gather your logo, copy and photos, and make sure you have access to your domain. Our checklist for South African businesses walks through each item, including hosting, POPIA, Google Business Profile and who owns what at handover.',
    link: {
      href: '/creative-industry-blog-pretoria/website-project-checklist-south-africa',
      text: 'Read the website project checklist',
    },
  },
  {
    question: 'Which areas do you work with?',
    answer:
      'Our studio is at 194 Bancor Avenue in Waterkloof Glen, and we work with businesses across Pretoria and Centurion, from Menlyn and Lynnwood to Hatfield, Brooklyn and the CBD. You are welcome to meet us at the studio, and we also run projects fully online for clients elsewhere in South Africa.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

// Offer prices mirror pricing.ts: website, website-6, website-9,
// website-catalog, ecommerce-advanced, popia.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Website design in Pretoria',
  serviceType: 'Website design',
  url: PAGE_URL,
  description:
    'Fixed-price website design for Pretoria businesses: mobile-responsive business, catalogue and e-commerce websites with basic SEO set up before launch, training and a support period.',
  provider: { '@id': 'https://wlcreationx.co.za/#business' },
  areaServed: [
    { '@type': 'City', name: 'Pretoria' },
    { '@type': 'City', name: 'Centurion' },
  ],
  offers: [
    { name: '3 Page Custom Website', price: '8980' },
    { name: '6 Page Custom Website', price: '14780' },
    { name: '9 Page Custom Website', price: '17420' },
    { name: 'Catalogue Website', price: '19780' },
    { name: 'E-Commerce Website', price: '23690' },
    { name: 'POPIA compliance set-up (add-on)', price: '1350' },
  ].map((o) => ({
    '@type': 'Offer',
    name: o.name,
    price: o.price,
    priceCurrency: 'ZAR',
    url: PAGE_URL,
  })),
};

const WebsiteDesignPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Website Design', href: '/pricing/website-design-pretoria' }
  ];

  // Mirrors pricing.ts website, website-6, website-9, website-catalog, ecommerce-advanced.
  // Client component: keep these strings in step with that file by hand.
  const packages = [
    {
      name: "3 Page Custom Website",
      price: "R8,980.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "3 Custom Pages",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Social Media Integration",
        "Basic SEO Setup",
        "Google Analytics Integration",
        "2 Rounds of Revisions",
        "Training Session",
        "3 Months Support"
      ]
    },
    {
      name: "6 Page Custom Website",
      price: "R14,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "6 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Contact Forms",
        "Social Media Integration",
        "Enhanced SEO Setup",
        "Google Analytics & Search Console",
        "3 Rounds of Revisions",
        "2 Training Sessions",
        "6 Months Support"
      ]
    },
    {
      name: "9 Page Custom Website",
      price: "R17,420.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "9 Custom Pages",
        "Mobile Responsive Design",
        "Advanced Forms & Integration",
        "Social Media Integration",
        "Comprehensive SEO Setup",
        "Full Analytics Suite",
        "4 Rounds of Revisions",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "Catalog Website",
      price: "R19,780.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Up to 50 Products",
        "Product Categories",
        "Search Functionality",
        "Mobile Responsive Design",
        "Product Filtering",
        "SEO Optimisation",
        "Analytics Integration",
        "3 Training Sessions",
        "12 Months Support"
      ]
    },
    {
      name: "E-Commerce Website",
      price: "R23,690.00",
      icon: <FaCheck className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Unlimited Products",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Management",
        "Customer Accounts",
        "Mobile Responsive Design",
        "Advanced SEO Setup",
        "4 Training Sessions",
        "12 Months Support"
      ]
    }
  ];

  // Mirrors pricing.ts popia and custom-web-app.
  const additionalFeatures = [
    {
      name: "POPIA Compliancy",
      price: "R1,350.00",
      description: "Privacy policy, cookie consent and data handling notices added to your website"
    },
    {
      name: "Custom Development",
      price: "Starting at R27,980.00",
      description: "Tailored solutions for unique business requirements"
    },
    {
      name: "Rush Service",
      price: "+50% of package price",
      description: "Expedited delivery within 5-7 business days"
    }
  ];

  const included = [
    {
      title: 'A design made for your business',
      body: 'Each site starts from your brief, your brand and the pages you actually need. We lay out every page around what a visitor is trying to do there, whether that is finding your phone number, comparing services or asking for a quote, and we use your logo, colours and photography rather than stock filler.',
    },
    {
      title: 'Mobile-first, responsive layouts',
      body: 'Most people will see your site on a phone first, so we design for small screens and then scale up to tablet and desktop. Buttons are large enough to tap, phone numbers can be tapped to call, and text stays readable without zooming.',
    },
    {
      title: 'Basic on-page SEO before launch',
      body: 'Every page gets its own title and meta description, a clear heading structure, readable URLs and descriptive image alt text. We generate an XML sitemap and connect Google Analytics, and on the six- and nine-page packages we also set up Google Search Console so you can see which searches bring people in.',
    },
    {
      title: 'Contact forms that reach you',
      body: 'Enquiry forms are tested end to end before launch so messages land in the right inbox. Larger packages include more advanced forms, such as quote requests with extra fields or forms that feed into other tools you use.',
    },
    {
      title: 'Social media links and analytics',
      body: 'Your social profiles are linked from the site, and analytics are in place from day one, so you have real numbers on visitors and enquiries rather than guesses.',
    },
    {
      title: 'Revisions, training and support',
      body: 'You get two to four rounds of revisions depending on the package, at least one training session on editing the site, and a support period of three, six or twelve months after launch for questions and fixes.',
    },
    {
      title: 'An optional POPIA set-up',
      body: 'If your site collects personal information, we can add a privacy policy, a cookie consent banner and data handling notices for R1,350. It is offered as a separate line so you can see exactly what you are paying for.',
    },
    {
      title: 'You own the finished site',
      body: 'At handover you receive the administrator logins, and the domain and hosting are in your name. If you ever move to another developer, you take the whole site with you.',
    },
  ];

  const processSteps = [
    {
      title: 'Brief and sitemap',
      body: 'We start with a conversation, at our Waterkloof Glen studio or online, about what the website has to do for your business: who it is for, what you want visitors to do, and which services matter most. From that we agree a sitemap, the list of pages and how they link together, which also fixes the package and the price before any design work starts.',
    },
    {
      title: 'Content',
      body: (
        <>
          You gather the copy, photos, logo files and any product information. We tell you exactly what each
          page needs and roughly how many words, and point out gaps early. If writing is the hold-up, our{' '}
          <Link href="/pricing/copywriting-services-pretoria-johannesburg" className={linkClass}>
            copywriting service
          </Link>{' '}
          can draft the pages for you. Content is the step that most often sets the timeline, so the sooner it
          is in, the sooner you launch.
        </>
      ),
    },
    {
      title: 'Design',
      body: 'We design the home page and a key inner page first, so you can see the layout, typography and colour applied to your real content. Your revision rounds are used here, while changes are still quick to make.',
    },
    {
      title: 'Build',
      body: 'Once the design is approved, we build the remaining pages, set up the content management system, connect forms, analytics and social links, and put the on-page SEO in place. Catalogue and e-commerce sites have their products, categories and payment settings loaded at this stage.',
    },
    {
      title: 'Review',
      body: 'You get a private preview link to check every page on your own phone and computer. We test forms, links and loading on different screen sizes and browsers, and fix anything you or we find before going live.',
    },
    {
      title: 'Launch and handover',
      body: 'We connect the domain, switch on the SSL certificate, submit the sitemap and check that the live site behaves the same as the preview. You receive your logins, and we run the training session so you and your team can update the site yourselves.',
    },
    {
      title: 'Support and maintenance',
      body: 'Your support period starts on launch day. After that, you can look after the site yourself, ask us for once-off changes, or move onto a monthly maintenance plan that covers updates, backups and security monitoring.',
    },
  ];

  const relatedServices = [
    {
      title: 'Website Maintenance',
      description: 'Keep your website secure, up-to-date, and performing at its best.',
      href: '/pricing/website-maintenance-pretoria',
      anchor: 'View Maintenance Plans'
    },
    {
      title: 'Digital Marketing',
      description: 'Boost your online presence with our digital marketing services.',
      href: '/pricing/google-ads-pretoria',
      anchor: 'Explore Digital Marketing'
    },
    {
      title: 'Custom Development',
      description: 'Tailored web applications and custom functionality.',
      href: '/pricing/custom-development-pretoria',
      anchor: 'View Development Services'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us to discuss your project.',
      href: '/get-in-touch-pretoria',
      anchor: 'Contact Us'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Structured data: one FAQPage (built from the visible FAQ below) and one Service */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          Website Design in Pretoria
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Professional web design solutions tailored to your business needs.
          All packages include mobile responsiveness, basic SEO set up before launch, and dedicated support.
        </p>
        <div className="max-w-3xl mx-auto mt-6 space-y-4 text-left sm:text-center text-neutral-300 leading-relaxed">
          <p>
            WL CreationX is a design studio in Waterkloof Glen, Pretoria, and we have been designing for local
            businesses since 2013. Our websites are priced by page count, so you know the cost before the work
            starts: R8,980 for three pages, R14,780 for six and R17,420 for nine, with catalogue and e-commerce
            options for businesses that sell products.
          </p>
          <p>
            Below you will find every package, what each one includes, how a project runs from brief to launch,
            and the questions Pretoria business owners ask us most often about hosting, ownership, SEO and POPIA.
          </p>
        </div>
      </div>

      {/* Main Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900 rounded-lg p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold">{pkg.price}</p>
              </div>
              {pkg.icon}
            </div>

            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <FaCheck className="text-[#FFD700] mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <GetStartedButton
              packageName={pkg.name}
              packagePrice={pkg.price}
              service="Website design"
            />
          </motion.div>
        ))}
      </div>

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#FFD700] text-center mb-8">Additional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-lg p-6 border border-[#FFD700]/20"
            >
              <h3 className="text-xl font-bold text-[#FFD700] mb-2">{feature.name}</h3>
              <p className="text-2xl font-bold mb-4">{feature.price}</p>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What every website includes */}
      <section className="max-w-5xl mx-auto py-16" aria-labelledby="included-heading">
        <h2 id="included-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          What every website includes
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-8 max-w-3xl">
          The package cards above list the differences between tiers. These are the things you get whichever
          package you choose, so you can compare our quote against others like for like.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {included.map((item) => (
            <div key={item.title} className="rounded-lg border border-[#FFD700]/20 bg-zinc-900 p-6">
              <h3 className="font-syne text-xl font-bold text-white mb-2 flex items-start gap-2">
                <FaCheck className="text-[#FFD700] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{item.title}</span>
              </h3>
              <p className="text-neutral-300 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Website types */}
      <section className="max-w-5xl mx-auto py-12" aria-labelledby="types-heading">
        <h2 id="types-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          The kinds of websites we build
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-8 max-w-3xl">
          Choosing the right type of site matters more than choosing a colour scheme. A shop with no products
          online does not need a checkout, and a consultancy with one service does not need nine pages.
        </p>
        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">Business and brochure websites</h3>
            <p>
              Most of the websites we build are business sites of three to nine pages: a home page, an about
              page, your services, and a contact page with a map and enquiry form. A three-page site suits a sole
              practitioner or a new business that needs to be findable and credible. Six pages gives room for a
              page per main service, which helps both visitors and search engines understand what you do. Nine
              pages suits firms with several service lines, a team section, or separate pages for the areas
              they serve.
            </p>
          </div>
          <div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">Catalogue websites</h3>
            <p>
              A catalogue site shows up to 50 products with categories, search and filtering, but without an
              online checkout. It works well for suppliers, manufacturers and trade businesses whose customers
              want to browse a range and then ask for a quote, or whose prices change too often to publish.
              Visitors find the product and send an enquiry, and you handle the sale the way you already do.
            </p>
          </div>
          <div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">E-commerce websites</h3>
            <p>
              If customers should be able to pay online, you need an online shop with a payment gateway, stock
              and order management, and customer accounts. Our full e-commerce website package is listed above,
              and our{' '}
              <Link href="/pricing/ecommerce-pretoria" className={linkClass}>
                e-commerce packages in Pretoria
              </Link>{' '}
              page sets out the smaller and larger shop options, payment gateway set-up and inventory add-ons in
              more detail.
            </p>
          </div>
          <div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">Landing pages</h3>
            <p>
              A landing page is a single focused page for one campaign, product launch or service, often used
              with Google Ads or a social media campaign. It can be added to your existing site or built on its
              own. Because the scope varies a great deal, we quote landing pages on the brief rather than from
              a fixed package.
            </p>
          </div>
          <div>
            <h3 className="font-syne text-2xl font-bold text-white mb-2">Web applications and custom features</h3>
            <p>
              When a project needs logins for clients or staff, booking or quoting tools, or a connection to
              software you already run, it is no longer a standard website. Those builds start at R27,980 and
              are scoped individually through our{' '}
              <Link href="/pricing/custom-development-pretoria" className={linkClass}>
                custom development service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-5xl mx-auto py-12" aria-labelledby="process-heading">
        <h2 id="process-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          How a website project runs
        </h2>
        <p className="text-neutral-300 leading-relaxed mb-8 max-w-3xl">
          Every project follows the same seven steps. Knowing them in advance makes it easier to plan your
          time, because two of the steps depend on you more than on us.
        </p>
        <ol className="space-y-6">
          {processSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-lg border border-white/10 bg-zinc-900 p-6">
              <span
                className="font-syne text-2xl font-bold text-[#FFD700] w-8 flex-shrink-0"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Speed, SEO and accessibility */}
      <section className="max-w-5xl mx-auto py-12 text-neutral-300 leading-relaxed" aria-labelledby="launch-heading">
        <h2 id="launch-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          Speed, SEO and accessibility at launch
        </h2>
        <p className="mb-4">
          A website that looks good but loads slowly on mobile data, or that Google cannot read properly, will
          struggle to bring in enquiries. These are the basics we put in place on every build before it goes
          live:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong className="text-white">Images sized for the web.</strong> Photos are resized and compressed
            so pages load quickly on a phone, without visibly losing quality.
          </li>
          <li>
            <strong className="text-white">Only the code the site needs.</strong> We keep plugins and
            third-party scripts to what the site actually uses, because each one adds weight and something else
            to update.
          </li>
          <li>
            <strong className="text-white">HTTPS from day one.</strong> An SSL certificate is set up at launch, so
            browsers show the site as secure and form submissions are encrypted.
          </li>
          <li>
            <strong className="text-white">Search-friendly structure.</strong> One main heading per page, unique
            titles and descriptions, clean URLs, alt text on images, an XML sitemap, and your business name,
            address and phone number shown consistently.
          </li>
          <li>
            <strong className="text-white">Accessible basics.</strong> Readable font sizes, enough contrast between
            text and background, labelled form fields and links that make sense out of context, which helps
            people using screen readers and anyone reading on a small screen in bright sunlight.
          </li>
        </ul>
        <p>
          This gives your site a sound starting point. It does not guarantee a position on Google, and we will
          not pretend otherwise. If you want to compete for busy searches in your field, our{' '}
          <Link href="/pricing/seo-pretoria" className={linkClass}>
            SEO service for Pretoria businesses
          </Link>{' '}
          handles keyword research, content and technical work month by month.
        </p>
      </section>

      {/* Hosting, domain and ownership */}
      <section className="max-w-5xl mx-auto py-12 text-neutral-300 leading-relaxed" aria-labelledby="hosting-heading">
        <h2 id="hosting-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          Hosting, domains and who owns what
        </h2>
        <p className="mb-4">
          The most common problem we see when a business comes to us for a new site is that nobody can log in
          to the old one. The domain was registered by a previous developer, the hosting is in someone
          else&apos;s name, and the person who set it up has moved on. We set things up so that does not happen
          to you.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong className="text-white">Your domain, in your name.</strong> Whether it is a .co.za or a .com,
            the domain should be registered to you or your company. We can guide you through registering it or
            transferring it if someone else holds it.
          </li>
          <li>
            <strong className="text-white">Hosting you control.</strong> Hosting is not part of the package
            price. We recommend a suitable plan, help you open the account in your name, and set up the site,
            email records and SSL certificate on it.
          </li>
          <li>
            <strong className="text-white">Logins handed over.</strong> At launch you receive the administrator
            logins for the website. Any access we keep for support or maintenance is a separate account
            that you can remove at any time.
          </li>
          <li>
            <strong className="text-white">No lock-in.</strong> If you move to another developer later, the
            site, the domain and the content go with you.
          </li>
        </ul>
      </section>

      {/* Maintenance */}
      <section className="max-w-5xl mx-auto py-12 text-neutral-300 leading-relaxed" aria-labelledby="maintenance-heading">
        <h2 id="maintenance-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          After launch: support and maintenance
        </h2>
        <p className="mb-4">
          Every package includes a support period after launch: three months on the three-page site, six months
          on the six-page site, and twelve months on the larger packages. During that time we answer questions
          and fix anything that is not working as it should.
        </p>
        <p>
          A website is not finished on launch day. The content management system, plugins and themes release
          updates, some of them security fixes, and backups need to run in case something goes wrong. You can
          handle that yourself after training, or hand it to us on a{' '}
          <Link href="/pricing/website-maintenance-pretoria" className={linkClass}>
            website maintenance plan
          </Link>
          , which starts at R1,500 a month for software updates, security monitoring and monthly backups.
        </p>
      </section>

      {/* Pretoria context */}
      <section className="max-w-5xl mx-auto py-12 text-neutral-300 leading-relaxed" aria-labelledby="pretoria-heading">
        <h2 id="pretoria-heading" className="font-syne text-3xl font-bold text-[#FFD700] mb-4">
          Web design for Pretoria businesses
        </h2>
        <p className="mb-4">
          We work from our studio at 194 Bancor Avenue in Waterkloof Glen, a few minutes from Menlyn, so
          meeting in person is easy for most of Pretoria East. For businesses in the office parks and
          shopping centres around Menlyn, Lynnwood and Faerie Glen, the website is often the first thing a
          prospective client checks before picking up the phone.
        </p>
        <p className="mb-4">
          Businesses in Hatfield and Brooklyn, close to the University of Pretoria and the embassies, often need
          sites that work for very different audiences at once, from students to diplomatic and corporate
          visitors. In Centurion, where many companies serve both Pretoria and Johannesburg, a website usually
          needs to make the service area obvious. And for retailers and service businesses from the CBD and
          Arcadia to Pretoria North, whose customers mostly look them up on a phone, the mobile layout matters
          more than the desktop one.
        </p>
        <p>
          Whichever part of the city you are in, the packages and prices on this page are the same. Projects can
          run entirely online too, which is how we work with clients elsewhere in South Africa.
        </p>
      </section>

      {/* Case studies: renders nothing until real projects are added to src/data/case-studies.ts */}
      <CaseStudies service="web" heading="Recent website projects" />

      {/* FAQ Section (matches the FAQPage JSON-LD above) */}
      <section className="py-20 bg-neutral-800" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="faq-heading" className="font-syne text-3xl font-bold text-white text-center mb-12">
            Website design in Pretoria: frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-neutral-900 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
                {faq.link && (
                  <p className="mt-3">
                    <Link href={faq.link.href} className={linkClass}>
                      {faq.link.text}
                    </Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Further reading */}
      <section className="max-w-5xl mx-auto py-16" aria-labelledby="reading-heading">
        <h2 id="reading-heading" className="font-syne text-2xl font-bold text-[#FFD700] mb-4">
          Further reading
        </h2>
        <ul className="space-y-3 text-neutral-300">
          <li>
            <Link href="/creative-industry-blog-pretoria/website-project-checklist-south-africa" className={linkClass}>
              What to prepare before a website build: a checklist for South African businesses
            </Link>
          </li>
          <li>
            <Link href="/creative-industry-blog-pretoria/how-to-choose-graphic-design-company-pretoria" className={linkClass}>
              How to choose a graphic design company in Pretoria
            </Link>
          </li>
          <li>
            <Link href="/creative-industry-blog-pretoria/what-a-brand-identity-includes" className={linkClass}>
              What a brand identity includes
            </Link>
          </li>
          <li>
            Need a logo before the website? See our{' '}
            <Link href="/logo-design-pretoria" className={linkClass}>
              logo design service in Pretoria
            </Link>
            .
          </li>
          <li>
            Building the whole brand at once? Our{' '}
            <Link href="/branding-solutions-pretoria" className={linkClass}>
              branding solutions
            </Link>{' '}
            cover identity, stationery and guidelines.
          </li>
        </ul>
      </section>

      {/* Related Services */}
      <RelatedServices
        currentService="Website Design"
        services={relatedServices}
      />

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Contact us for a free consultation and let's create something amazing together
          </p>
          <GetInTouchButton variant="primary" text="Start Your Project" className="text-lg" />
        </div>
      </section>
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria web design studio</Link> on the homepage.
        </p>
      </div>
    </div>
  );
};

export default WebsiteDesignPage;
