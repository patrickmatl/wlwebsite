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

export default function ProductPhotographyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
      {/* Visually Hidden SEO FAQ Section with Schema.org markup - Batch 1 */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Product Photography Pretoria</h2>
        <div><h3>What is product photography in Pretoria?</h3><p>Product photography in Pretoria involves capturing high-quality images of products for e-commerce, catalogs, and marketing.</p></div>
        <div><h3>How much does product photography cost in Pretoria?</h3><p>Product photography packages in Pretoria start from R1,500, with pricing based on quantity and complexity.</p></div>
        <div><h3>Do you offer white background product photography in Pretoria?</h3><p>Yes, we provide white background and lifestyle product photography in Pretoria.</p></div>
        <div><h3>Can you photograph large products in Pretoria?</h3><p>Yes, we can shoot products of all sizes in our Pretoria studio or on location.</p></div>
        <div><h3>Do you provide Pretoria product photography for e-commerce?</h3><p>Yes, we specialize in Pretoria e-commerce product photography for online stores.</p></div>
        <div><h3>Are Pretoria product photos edited and retouched?</h3><p>All Pretoria product images include professional editing and retouching.</p></div>
        <div><h3>How are Pretoria product photos delivered?</h3><p>Product images are delivered digitally via gallery or download link for Pretoria clients.</p></div>
        <div><h3>Can you provide Pretoria product photography for Amazon and Takealot?</h3><p>Yes, we create Pretoria product photos that meet Amazon and Takealot requirements.</p></div>
        <div><h3>Do you offer Pretoria product photography for food and beverages?</h3><p>Yes, we shoot food, drinks, and restaurant menu items in Pretoria.</p></div>
        <div><h3>Is Pretoria product photography available for clothing and fashion?</h3><p>Yes, we offer Pretoria fashion, apparel, and flat lay product photography.</p></div>
        <div><h3>How do I book a Pretoria product photography session?</h3><p>Contact us via our website or phone to book your Pretoria product shoot.</p></div>
        <div><h3>Do you offer Pretoria product photography for jewelry?</h3><p>Yes, we have experience photographing jewelry and small items in Pretoria.</p></div>
        <div><h3>Can you shoot Pretoria product videos as well?</h3><p>Yes, we offer product video production alongside product photography in Pretoria.</p></div>
        <div><h3>Do you provide Pretoria product photography props and styling?</h3><p>Props and styling can be arranged for Pretoria product shoots.</p></div>
        <div><h3>How long does a Pretoria product shoot take?</h3><p>Sessions range from 1–4 hours, depending on the number of products in Pretoria.</p></div>
      </section>
      {/* FAQPage Schema.org structured data for SEO - Batch 1 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What is product photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Product photography in Pretoria involves capturing high-quality images of products for e-commerce, catalogs, and marketing.' } },
          { '@type': 'Question', 'name': 'How much does product photography cost in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Product photography packages in Pretoria start from R1,500, with pricing based on quantity and complexity.' } },
          { '@type': 'Question', 'name': 'Do you offer white background product photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we provide white background and lifestyle product photography in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you photograph large products in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we can shoot products of all sizes in our Pretoria studio or on location.' } },
          { '@type': 'Question', 'name': 'Do you provide Pretoria product photography for e-commerce?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we specialize in Pretoria e-commerce product photography for online stores.' } },
          { '@type': 'Question', 'name': 'Are Pretoria product photos edited and retouched?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'All Pretoria product images include professional editing and retouching.' } },
          { '@type': 'Question', 'name': 'How are Pretoria product photos delivered?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Product images are delivered digitally via gallery or download link for Pretoria clients.' } },
          { '@type': 'Question', 'name': 'Can you provide Pretoria product photography for Amazon and Takealot?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we create Pretoria product photos that meet Amazon and Takealot requirements.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria product photography for food and beverages?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we shoot food, drinks, and restaurant menu items in Pretoria.' } },
          { '@type': 'Question', 'name': 'Is Pretoria product photography available for clothing and fashion?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer Pretoria fashion, apparel, and flat lay product photography.' } },
          { '@type': 'Question', 'name': 'How do I book a Pretoria product photography session?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Contact us via our website or phone to book your Pretoria product shoot.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria product photography for jewelry?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we have experience photographing jewelry and small items in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you shoot Pretoria product videos as well?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer product video production alongside product photography in Pretoria.' } },
          { '@type': 'Question', 'name': 'Do you provide Pretoria product photography props and styling?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Props and styling can be arranged for Pretoria product shoots.' } },
          { '@type': 'Question', 'name': 'How long does a Pretoria product shoot take?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Sessions range from 1–4 hours, depending on the number of products in Pretoria.' } },
        ]
      })}} />
      {/* Visually Hidden SEO FAQ Section with Schema.org markup - Batch 2 */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <div><h3>Do you offer Pretoria product photography for cosmetics?</h3><p>Yes, we have experience shooting cosmetics and beauty products in Pretoria.</p></div>
        <div><h3>Can you photograph Pretoria products for social media?</h3><p>We create product images optimized for Pretoria social media campaigns.</p></div>
        <div><h3>Do you offer Pretoria product photography for electronics?</h3><p>Yes, electronics and tech product photography is available in Pretoria.</p></div>
        <div><h3>Are Pretoria product photographers available on weekends?</h3><p>Yes, weekend and after-hours product shoots are available in Pretoria.</p></div>
        <div><h3>Can you shoot Pretoria product images for catalogs and brochures?</h3><p>Yes, we create catalog and brochure images for Pretoria products.</p></div>
        <div><h3>Do you offer Pretoria product photography for furniture?</h3><p>Yes, we photograph large items and furniture in Pretoria studios or on-site.</p></div>
        <div><h3>Can you help with Pretoria product photo styling and concepts?</h3><p>We assist with creative styling and concept planning for Pretoria product shoots.</p></div>
        <div><h3>Do you provide Pretoria product photography for marketing campaigns?</h3><p>We create product images for Pretoria marketing, advertising, and branding.</p></div>
        <div><h3>Is fast turnaround available for Pretoria product photos?</h3><p>Yes, we offer priority editing and fast delivery for Pretoria product shoots.</p></div>
        <div><h3>Do you offer monthly product photography packages in Pretoria?</h3><p>Yes, ongoing product photography packages are available for Pretoria businesses.</p></div>
        <div><h3>Can you shoot Pretoria product images for small businesses?</h3><p>Yes, we work with Pretoria startups and SMEs for affordable product photography.</p></div>
        <div><h3>Are commercial rights included for Pretoria product images?</h3><p>Yes, commercial use rights are included in Pretoria business packages.</p></div>
        <div><h3>What makes your Pretoria product photography unique?</h3><p>Our Pretoria team blends creativity, skill, and local knowledge for standout product images.</p></div>
      </section>
      {/* FAQPage Schema.org structured data for SEO - Batch 2 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'Do you offer Pretoria product photography for cosmetics?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we have experience shooting cosmetics and beauty products in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you photograph Pretoria products for social media?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We create product images optimized for Pretoria social media campaigns.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria product photography for electronics?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, electronics and tech product photography is available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Are Pretoria product photographers available on weekends?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, weekend and after-hours product shoots are available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you shoot Pretoria product images for catalogs and brochures?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we create catalog and brochure images for Pretoria products.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria product photography for furniture?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we photograph large items and furniture in Pretoria studios or on-site.' } },
          { '@type': 'Question', 'name': 'Can you help with Pretoria product photo styling and concepts?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We assist with creative styling and concept planning for Pretoria product shoots.' } },
          { '@type': 'Question', 'name': 'Do you provide Pretoria product photography for marketing campaigns?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We create product images for Pretoria marketing, advertising, and branding.' } },
          { '@type': 'Question', 'name': 'Is fast turnaround available for Pretoria product photos?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer priority editing and fast delivery for Pretoria product shoots.' } },
          { '@type': 'Question', 'name': 'Do you offer monthly product photography packages in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, ongoing product photography packages are available for Pretoria businesses.' } },
          { '@type': 'Question', 'name': 'Can you shoot Pretoria product images for small businesses?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we work with Pretoria startups and SMEs for affordable product photography.' } },
          { '@type': 'Question', 'name': 'Are commercial rights included for Pretoria product images?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, commercial use rights are included in Pretoria business packages.' } },
          { '@type': 'Question', 'name': 'What makes your Pretoria product photography unique?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our Pretoria team blends creativity, skill, and local knowledge for standout product images.' } },
        ]
      })}} />
      {/* Visually Hidden SEO Content Section with H1-H5 and Keyword-Rich Paragraphs */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Product Photography Services in Pretoria</h1>
        <p>Our Pretoria product photography services help businesses showcase their products with clarity, style, and professionalism. We understand the importance of high-quality images in driving sales and building brand credibility for Pretoria companies of all sizes.</p>
        <p>From e-commerce listings to marketing campaigns, our Pretoria product photographers deliver crisp, detailed images that highlight your products’ best features. We use advanced lighting, backgrounds, and editing techniques to ensure every product stands out.</p>
        <h2>Why Invest in Professional Product Photography in Pretoria?</h2>
        <p>Professional product photography in Pretoria gives your business a competitive edge by creating a strong first impression and increasing conversion rates. Our Pretoria team works closely with you to understand your brand and target audience, producing images that align with your marketing goals.</p>
        <p>We offer flexible product photography packages for Pretoria clients, including studio shoots, on-location sessions, and bulk discounts for large inventories. Our streamlined process ensures fast turnaround and consistent quality for every project.</p>
        <h3>Types of Product Photography Offered in Pretoria</h3>
        <p>We provide a range of product photography services in Pretoria, including white background shots, lifestyle images, group product arrangements, and macro photography for small items. Our Pretoria photographers are skilled in working with various product types, from electronics to fashion and food.</p>
        <p>Our portfolio features successful projects for Pretoria e-commerce stores, catalogs, and promotional materials, demonstrating our versatility and attention to detail. We tailor each shoot to your specific needs and brand identity.</p>
        <h4>Quality Assurance and Editing in Pretoria Product Photography</h4>
        <p>Quality control is central to our Pretoria product photography services. We meticulously edit each image for color accuracy, sharpness, and consistency, ensuring your products look their best across all platforms.</p>
        <p>Our Pretoria team uses the latest software and techniques to remove imperfections and enhance visual appeal, helping your products stand out in crowded marketplaces. We also provide image resizing and formatting for web and print use.</p>
        <h5>Book Your Pretoria Product Photography Session</h5>
        <p>Ready to elevate your product images in Pretoria? Contact us today to discuss your requirements, get a tailored quote, and schedule your Pretoria product photography session. We are committed to delivering results that drive growth for your business.</p>
        <p>Our Pretoria product photography experts are here to answer your questions and guide you through the process from start to finish. Let us help you create compelling visuals that convert browsers into buyers.</p>
      </section>
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
    </main>
  );
}
