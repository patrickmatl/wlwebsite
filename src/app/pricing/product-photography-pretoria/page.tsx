import PackageCard from '@/components/PackageCard';
import Link from 'next/link';
import RelatedServices from '@/components/RelatedServices';

const packages = [
  {
    name: 'Starter',
    price: 'R1,800',
    features: [
      'Up to 10 products',
      'White background shots',
      'High-res images',
      'Online gallery delivery',
      'Standard editing',
      'Personal use rights',
    ],
  },
  {
    name: 'Business',
    price: 'R3,200',
    features: [
      'Up to 25 products',
      'Creative backgrounds & props',
      'High-res & web images',
      'Online gallery & USB',
      'Advanced editing & retouching',
      'Commercial use rights',
      'Social media formats',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'R5,900',
    features: [
      'Up to 50 products',
      'Multiple backgrounds & props',
      'Lifestyle/action shots',
      'High-res, web & print images',
      'Priority editing & retouching',
      'Full commercial rights',
      'On-site or studio shoot',
      'Fast turnaround',
    ],
  },
];

const relatedServices = [
  {
    href: '/pricing/corporate-video-pretoria',
    anchor: 'Corporate Video',
    title: 'Corporate Video Services',
    description: 'Professional video production for businesses and brands in Pretoria.'
  },
  {
    href: '/pricing/drone-video-pretoria',
    anchor: 'Drone Video',
    title: 'Drone Video Services',
    description: 'Aerial video production for stunning perspectives and dynamic storytelling.'
  },
  {
    href: '/pricing/photography-pretoria',
    anchor: 'Photography',
    title: 'Photography Services',
    description: 'Professional photography for events, brands, and businesses in Pretoria.'
  }
];

// Single source for the FAQ structured data — mirrors the visible FAQ sections below exactly.
const faqs: { q: string; a: string }[] = [
  { q: 'What is product photography in Pretoria?', a: 'Product photography in Pretoria involves capturing high-quality images of products for e-commerce, catalogs, and marketing.' },
  { q: 'How much does product photography cost in Pretoria?', a: 'Product photography packages in Pretoria start from R1,800, with pricing based on quantity and complexity.' },
  { q: 'Do you offer white background product photography in Pretoria?', a: 'Yes, we provide white background and lifestyle product photography in Pretoria.' },
  { q: 'Can you photograph large products in Pretoria?', a: 'Yes, we can shoot products of all sizes in our Pretoria studio or on location.' },
  { q: 'Do you provide Pretoria product photography for e-commerce?', a: 'Yes, we specialize in Pretoria e-commerce product photography for online stores.' },
  { q: 'Are Pretoria product photos edited and retouched?', a: 'All Pretoria product images include professional editing and retouching.' },
  { q: 'How are Pretoria product photos delivered?', a: 'Product images are delivered digitally via gallery or download link for Pretoria clients.' },
  { q: 'Can you provide Pretoria product photography for Amazon and Takealot?', a: 'Yes, we create Pretoria product photos that meet Amazon and Takealot requirements.' },
  { q: 'Do you offer Pretoria product photography for food and beverages?', a: 'Yes, we shoot food, drinks, and restaurant menu items in Pretoria.' },
  { q: 'Is Pretoria product photography available for clothing and fashion?', a: 'Yes, we offer Pretoria fashion, apparel, and flat lay product photography.' },
  { q: 'How do I book a Pretoria product photography session?', a: 'Contact us via our website or phone to book your Pretoria product shoot.' },
  { q: 'Do you offer Pretoria product photography for jewelry?', a: 'Yes, we have experience photographing jewelry and small items in Pretoria.' },
  { q: 'Can you shoot Pretoria product videos as well?', a: 'Yes, we offer product video production alongside product photography in Pretoria.' },
  { q: 'Do you provide Pretoria product photography props and styling?', a: 'Props and styling can be arranged for Pretoria product shoots.' },
  { q: 'How long does a Pretoria product shoot take?', a: 'Sessions range from 1–4 hours, depending on the number of products in Pretoria.' },
  { q: 'Do you offer Pretoria product photography for cosmetics?', a: 'Yes, we have experience shooting cosmetics and beauty products in Pretoria.' },
  { q: 'Can you photograph Pretoria products for social media?', a: 'We create product images optimized for Pretoria social media campaigns.' },
  { q: 'Do you offer Pretoria product photography for electronics?', a: 'Yes, electronics and tech product photography is available in Pretoria.' },
  { q: 'Are Pretoria product photographers available on weekends?', a: 'Yes, weekend and after-hours product shoots are available in Pretoria.' },
  { q: 'Can you shoot Pretoria product images for catalogs and brochures?', a: 'Yes, we create catalog and brochure images for Pretoria products.' },
  { q: 'Do you offer Pretoria product photography for furniture?', a: 'Yes, we photograph large items and furniture in Pretoria studios or on-site.' },
  { q: 'Can you help with Pretoria product photo styling and concepts?', a: 'We assist with creative styling and concept planning for Pretoria product shoots.' },
  { q: 'Do you provide Pretoria product photography for marketing campaigns?', a: 'We create product images for Pretoria marketing, advertising, and branding.' },
  { q: 'Is fast turnaround available for Pretoria product photos?', a: 'Yes, we offer priority editing and fast delivery for Pretoria product shoots.' },
  { q: 'Do you offer monthly product photography packages in Pretoria?', a: 'Yes, ongoing product photography packages are available for Pretoria businesses.' },
  { q: 'Can you shoot Pretoria product images for small businesses?', a: 'Yes, we work with Pretoria startups and SMEs for affordable product photography.' },
  { q: 'Are commercial rights included for Pretoria product images?', a: 'Yes, commercial use rights are included in Pretoria business packages.' },
  { q: 'What makes your Pretoria product photography unique?', a: 'Our Pretoria team blends creativity, skill, and local knowledge for standout product images.' },
];

export default function ProductPhotographyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-4 text-center">
        <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]">Product Photography Pretoria</h1>
        <p className="text-lg text-neutral-300 max-w-3xl mx-auto">Studio-quality product images for e-commerce, catalogues and campaigns.</p>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Why Choose Our Product Photography?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg mb-8">
          <li>Studio or on-site product shoots</li>
          <li>Creative styling and backgrounds</li>
          <li>Fast turnaround and professional editing</li>
          <li>Perfect for e-commerce, catalogs, and ads</li>
          <li>Flexible packages for all business sizes</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-10 mb-8">Product Photography Packages & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">All packages include:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Pre-shoot consultation</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
            <li>Commercial usage rights</li>
          </ul>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/get-in-touch-pretoria" className="px-8 py-3 bg-[#FFD700] text-black rounded-full font-bold text-lg hover:bg-[#FFA500] transition">Book a Shoot</Link>
        </div>
      </section>
      {/* Single FAQPage structured data node - mirrors the visible FAQ sections below */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })}} />
      <RelatedServices currentService="Product Photography" services={relatedServices} />
      <div className="mt-10 text-center">
        <p className="text-neutral-400 text-sm">
          Discover more from our
          {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria product photography studio</Link>
          {" "}
          on the homepage.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Browse <Link href="/photography-services-pretoria" className="text-[#FFD700] hover:underline">all our photography services in Pretoria</Link>.
        </p>
      </div>
    
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Product Photography Pretoria</h3>
        <div><h4>What is product photography in Pretoria?</h4><p>Product photography in Pretoria involves capturing high-quality images of products for e-commerce, catalogs, and marketing.</p></div>
        <div><h4>How much does product photography cost in Pretoria?</h4><p>Product photography packages in Pretoria start from R1,800, with pricing based on quantity and complexity.</p></div>
        <div><h4>Do you offer white background product photography in Pretoria?</h4><p>Yes, we provide white background and lifestyle product photography in Pretoria.</p></div>
        <div><h4>Can you photograph large products in Pretoria?</h4><p>Yes, we can shoot products of all sizes in our Pretoria studio or on location.</p></div>
        <div><h4>Do you provide Pretoria product photography for e-commerce?</h4><p>Yes, we specialize in Pretoria e-commerce product photography for online stores.</p></div>
        <div><h4>Are Pretoria product photos edited and retouched?</h4><p>All Pretoria product images include professional editing and retouching.</p></div>
        <div><h4>How are Pretoria product photos delivered?</h4><p>Product images are delivered digitally via gallery or download link for Pretoria clients.</p></div>
        <div><h4>Can you provide Pretoria product photography for Amazon and Takealot?</h4><p>Yes, we create Pretoria product photos that meet Amazon and Takealot requirements.</p></div>
        <div><h4>Do you offer Pretoria product photography for food and beverages?</h4><p>Yes, we shoot food, drinks, and restaurant menu items in Pretoria.</p></div>
        <div><h4>Is Pretoria product photography available for clothing and fashion?</h4><p>Yes, we offer Pretoria fashion, apparel, and flat lay product photography.</p></div>
        <div><h4>How do I book a Pretoria product photography session?</h4><p>Contact us via our website or phone to book your Pretoria product shoot.</p></div>
        <div><h4>Do you offer Pretoria product photography for jewelry?</h4><p>Yes, we have experience photographing jewelry and small items in Pretoria.</p></div>
        <div><h4>Can you shoot Pretoria product videos as well?</h4><p>Yes, we offer product video production alongside product photography in Pretoria.</p></div>
        <div><h4>Do you provide Pretoria product photography props and styling?</h4><p>Props and styling can be arranged for Pretoria product shoots.</p></div>
        <div><h4>How long does a Pretoria product shoot take?</h4><p>Sessions range from 1–4 hours, depending on the number of products in Pretoria.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <div><h4>Do you offer Pretoria product photography for cosmetics?</h4><p>Yes, we have experience shooting cosmetics and beauty products in Pretoria.</p></div>
        <div><h4>Can you photograph Pretoria products for social media?</h4><p>We create product images optimized for Pretoria social media campaigns.</p></div>
        <div><h4>Do you offer Pretoria product photography for electronics?</h4><p>Yes, electronics and tech product photography is available in Pretoria.</p></div>
        <div><h4>Are Pretoria product photographers available on weekends?</h4><p>Yes, weekend and after-hours product shoots are available in Pretoria.</p></div>
        <div><h4>Can you shoot Pretoria product images for catalogs and brochures?</h4><p>Yes, we create catalog and brochure images for Pretoria products.</p></div>
        <div><h4>Do you offer Pretoria product photography for furniture?</h4><p>Yes, we photograph large items and furniture in Pretoria studios or on-site.</p></div>
        <div><h4>Can you help with Pretoria product photo styling and concepts?</h4><p>We assist with creative styling and concept planning for Pretoria product shoots.</p></div>
        <div><h4>Do you provide Pretoria product photography for marketing campaigns?</h4><p>We create product images for Pretoria marketing, advertising, and branding.</p></div>
        <div><h4>Is fast turnaround available for Pretoria product photos?</h4><p>Yes, we offer priority editing and fast delivery for Pretoria product shoots.</p></div>
        <div><h4>Do you offer monthly product photography packages in Pretoria?</h4><p>Yes, ongoing product photography packages are available for Pretoria businesses.</p></div>
        <div><h4>Can you shoot Pretoria product images for small businesses?</h4><p>Yes, we work with Pretoria startups and SMEs for affordable product photography.</p></div>
        <div><h4>Are commercial rights included for Pretoria product images?</h4><p>Yes, commercial use rights are included in Pretoria business packages.</p></div>
        <div><h4>What makes your Pretoria product photography unique?</h4><p>Our Pretoria team blends creativity, skill, and local knowledge for standout product images.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Product Photography Services in Pretoria</h2>
        <p>Our Pretoria product photography services help businesses showcase their products with clarity, style, and professionalism. We understand the importance of high-quality images in driving sales and building brand credibility for Pretoria companies of all sizes.</p>
        <p>From e-commerce listings to marketing campaigns, our Pretoria product photographers deliver crisp, detailed images that highlight your products’ best features. We use advanced lighting, backgrounds, and editing techniques to ensure every product stands out.</p>
        <h3>Why Invest in Professional Product Photography in Pretoria?</h3>
        <p>Professional product photography in Pretoria gives your business a competitive edge by creating a strong first impression and increasing conversion rates. Our Pretoria team works closely with you to understand your brand and target audience, producing images that align with your marketing goals.</p>
        <p>We offer flexible product photography packages for Pretoria clients, including studio shoots, on-location sessions, and bulk discounts for large inventories. Our streamlined process ensures fast turnaround and consistent quality for every project.</p>
        <h4>Types of Product Photography Offered in Pretoria</h4>
        <p>We provide a range of product photography services in Pretoria, including white background shots, lifestyle images, group product arrangements, and macro photography for small items. Our Pretoria photographers are skilled in working with various product types, from electronics to fashion and food.</p>
        <p>Our portfolio features successful projects for Pretoria e-commerce stores, catalogs, and promotional materials, demonstrating our versatility and attention to detail. We tailor each shoot to your specific needs and brand identity.</p>
        <h5>Quality Assurance and Editing in Pretoria Product Photography</h5>
        <p>Quality control is central to our Pretoria product photography services. We meticulously edit each image for color accuracy, sharpness, and consistency, ensuring your products look their best across all platforms.</p>
        <p>Our Pretoria team uses the latest software and techniques to remove imperfections and enhance visual appeal, helping your products stand out in crowded marketplaces. We also provide image resizing and formatting for web and print use.</p>
        <h6>Book Your Pretoria Product Photography Session</h6>
        <p>Ready to elevate your product images in Pretoria? Contact us today to discuss your requirements, get a tailored quote, and schedule your Pretoria product photography session. We are committed to delivering results that drive growth for your business.</p>
        <p>Our Pretoria product photography experts are here to answer your questions and guide you through the process from start to finish. Let us help you create compelling visuals that convert browsers into buyers.</p>
      </section>
    </main>  );
}
