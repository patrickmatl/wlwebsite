import PackageCard from '@/components/PackageCard';
import Link from 'next/link';
import RelatedServices from '@/components/RelatedServices';

const packages = [
  {
    name: 'Basic',
    price: 'R2,500',
    features: [
      '1-hour shoot',
      '1 Pretoria location',
      '20 professionally edited images',
      'Online gallery delivery',
      '1 outfit change',
      'Personal use rights',
    ],
  },
  {
    name: 'Standard',
    price: 'R4,500',
    features: [
      '2-hour shoot',
      'Up to 2 Pretoria locations',
      '40 edited images',
      'Online gallery & USB',
      'Up to 3 outfit changes',
      'Personal & commercial use rights',
      'Social media formats',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'R7,800',
    features: [
      'Half-day shoot (4+ hours)',
      'Multiple Pretoria locations',
      '80+ edited images',
      'Online gallery, USB & prints',
      'Unlimited outfit changes',
      'Full commercial rights',
      'Professional retouching',
      'Priority delivery',
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
    href: '/pricing/product-photography-pretoria',
    anchor: 'Product Photography',
    title: 'Product Photography',
    description: 'High-quality product images to boost your e-commerce and marketing.'
  }
];

// Single source for the FAQ structured data — mirrors the visible FAQ sections below exactly.
const faqs: { q: string; a: string }[] = [
  { q: 'What types of photography do you offer in Pretoria?', a: 'We offer portrait, event, commercial, product, and lifestyle photography in Pretoria.' },
  { q: 'How much does a photography session cost in Pretoria?', a: 'Photography packages in Pretoria start from R2,500, with options for all needs.' },
  { q: 'Are your Pretoria photographers experienced?', a: 'Yes, our Pretoria photographers are highly experienced and creative professionals.' },
  { q: 'Do you offer on-location shoots in Pretoria?', a: 'Yes, we shoot at your chosen Pretoria location or in our professional studio.' },
  { q: 'How many photos will I receive from a Pretoria shoot?', a: 'Depending on your package, you’ll receive 20–80+ professionally edited images.' },
  { q: 'Do you provide commercial photography in Pretoria?', a: 'Yes, we offer commercial, branding, and product photography for Pretoria businesses.' },
  { q: 'Can you provide prints for Pretoria photography sessions?', a: 'Yes, prints and albums are available for all Pretoria photography packages.' },
  { q: 'How long does a Pretoria photo shoot take?', a: 'Sessions range from 1 hour to half-day, depending on your Pretoria package.' },
  { q: 'Is retouching included in Pretoria photography?', a: 'All Pretoria packages include professional editing and retouching.' },
  { q: 'Can you shoot events in Pretoria?', a: 'Yes, we cover corporate, private, and public events across Pretoria.' },
  { q: 'Do you offer headshot photography in Pretoria?', a: 'Yes, business and personal headshots are available in Pretoria.' },
  { q: 'Can you help with posing during Pretoria shoots?', a: 'Our Pretoria photographers guide you for the best poses and results.' },
  { q: 'Do you provide online galleries for Pretoria clients?', a: 'Yes, all Pretoria clients receive a secure online gallery for easy viewing and downloads.' },
  { q: 'Are outfit changes allowed during Pretoria shoots?', a: 'Yes, outfit changes are included in most Pretoria photography packages.' },
  { q: 'Do you offer product photography in Pretoria?', a: 'Yes, we shoot product images for Pretoria e-commerce and marketing.' },
  { q: 'Can you travel outside Pretoria for shoots?', a: 'Yes, our team can travel throughout Gauteng for your photography needs.' },
  { q: 'Do you offer urgent or rush photography in Pretoria?', a: 'Rush and urgent bookings are available for Pretoria clients, subject to availability.' },
  { q: 'Are Pretoria photography services available for businesses?', a: 'Yes, we serve Pretoria businesses of all sizes with custom packages.' },
  { q: 'How do I book a Pretoria photography session?', a: 'Contact us via our website or phone to book your Pretoria shoot.' },
  { q: 'Can you provide makeup and styling for Pretoria shoots?', a: 'Makeup and styling can be arranged for Pretoria photography sessions.' },
  { q: 'Is studio photography available in Pretoria?', a: 'Yes, we have a fully equipped studio in Pretoria for portraits and products.' },
  { q: 'Do you offer family photography in Pretoria?', a: 'Yes, family and children’s photography is available in Pretoria.' },
  { q: 'Can you shoot at Pretoria landmarks?', a: 'We can arrange shoots at popular Pretoria landmarks, parks, and venues.' },
  { q: 'Do you provide digital and print images in Pretoria?', a: 'Both digital and print images are available for all Pretoria clients.' },
  { q: 'Do you offer wedding photography in Pretoria?', a: 'Yes, our Pretoria team specializes in wedding and engagement photography.' },
  { q: 'Can you shoot at multiple Pretoria locations?', a: 'Yes, we can photograph you at several Pretoria locations in one session.' },
  { q: 'Do you offer photography for Pretoria schools and sports?', a: 'Yes, we cover school events, sports, and graduations in Pretoria.' },
  { q: 'Are Pretoria photo sessions suitable for children?', a: 'Yes, we have experience photographing children and families in Pretoria.' },
  { q: 'Can you provide Pretoria photography for marketing?', a: 'We create marketing images for Pretoria brands, products, and services.' },
  { q: 'Do you offer drone photography in Pretoria?', a: 'Yes, aerial and drone photography is available in Pretoria.' },
  { q: 'How are Pretoria photos delivered?', a: 'All Pretoria clients receive digital downloads and optional prints.' },
  { q: 'Do you offer group or team photography in Pretoria?', a: 'Yes, group and team photos are available for Pretoria organizations.' },
  { q: 'Can you photograph Pretoria real estate?', a: 'We offer real estate and property photography throughout Pretoria.' },
  { q: 'Do you offer Pretoria photography gift vouchers?', a: 'Yes, gift vouchers are available for all Pretoria photography services.' },
  { q: 'Is same-day delivery available for Pretoria photos?', a: 'Same-day delivery can be arranged for urgent Pretoria shoots.' },
  { q: 'Can you help with Pretoria photography permits?', a: 'We assist with permits for Pretoria public and private locations.' },
  { q: 'Do you offer Pretoria graduation photography?', a: 'Yes, graduation and matric dance photography is available in Pretoria.' },
  { q: 'Can you shoot Pretoria corporate events?', a: 'Yes, we cover Pretoria conferences, launches, and business events.' },
  { q: 'Do you offer Pretoria maternity and newborn photography?', a: 'Yes, we offer maternity and newborn sessions in Pretoria.' },
  { q: 'Can you provide Pretoria photography for social media?', a: 'Yes, we create content for Pretoria influencers and brands.' },
  { q: 'Do you offer Pretoria pet photography?', a: 'Yes, pet and animal photography is available in Pretoria.' },
  { q: 'Are Pretoria photographers available on weekends?', a: 'Yes, weekend and after-hours shoots are available in Pretoria.' },
  { q: 'Can you help with Pretoria photo styling and props?', a: 'We can arrange props and styling for Pretoria photo shoots.' },
];

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-4 text-center">
        <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]">Photography Services Pretoria</h1>
        <p className="text-lg text-neutral-300 max-w-3xl mx-auto">Professional photography for events, business, products and marketing in Pretoria.</p>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Why Choose Our Photography?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg mb-8">
          <li>Experienced photographers & creative team</li>
          <li>Flexible packages for every need</li>
          <li>High-end editing and retouching</li>
          <li>Quick turnaround, online delivery</li>
          <li>Personal, commercial, and event photography</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-10 mb-8">Photography Packages & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} service="Photography" />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">All packages include:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Pre-shoot consultation</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
            <li>Personal usage rights</li>
          </ul>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/get-in-touch-pretoria" className="px-8 py-3 bg-[#FFD700] text-black rounded-full font-bold text-lg hover:bg-[#FFA500] transition">Book a Session</Link>
        </div>
      </section>
      <RelatedServices currentService="Photography Services" services={relatedServices} />
      {/* Contextual link to homepage with varied phrasing */}
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Learn more about our <Link href="/" className="text-[#FFD700] hover:underline">Pretoria photography studio</Link> on the homepage.
        </p>
      </div>
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
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Browse <Link href="/photography-services-pretoria" className="text-[#FFD700] hover:underline">all our photography services in Pretoria</Link>.
        </p>
      </div>
    
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Photography Pretoria</h3>
        <div><h4>What types of photography do you offer in Pretoria?</h4><p>We offer portrait, event, commercial, product, and lifestyle photography in Pretoria.</p></div>
        <div><h4>How much does a photography session cost in Pretoria?</h4><p>Photography packages in Pretoria start from R2,500, with options for all needs.</p></div>
        <div><h4>Are your Pretoria photographers experienced?</h4><p>Yes, our Pretoria photographers are highly experienced and creative professionals.</p></div>
        <div><h4>Do you offer on-location shoots in Pretoria?</h4><p>Yes, we shoot at your chosen Pretoria location or in our professional studio.</p></div>
        <div><h4>How many photos will I receive from a Pretoria shoot?</h4><p>Depending on your package, you’ll receive 20–80+ professionally edited images.</p></div>
        <div><h4>Do you provide commercial photography in Pretoria?</h4><p>Yes, we offer commercial, branding, and product photography for Pretoria businesses.</p></div>
        <div><h4>Can you provide prints for Pretoria photography sessions?</h4><p>Yes, prints and albums are available for all Pretoria photography packages.</p></div>
        <div><h4>How long does a Pretoria photo shoot take?</h4><p>Sessions range from 1 hour to half-day, depending on your Pretoria package.</p></div>
        <div><h4>Is retouching included in Pretoria photography?</h4><p>All Pretoria packages include professional editing and retouching.</p></div>
        <div><h4>Can you shoot events in Pretoria?</h4><p>Yes, we cover corporate, private, and public events across Pretoria.</p></div>
        <div><h4>Do you offer headshot photography in Pretoria?</h4><p>Yes, business and personal headshots are available in Pretoria.</p></div>
        <div><h4>Can you help with posing during Pretoria shoots?</h4><p>Our Pretoria photographers guide you for the best poses and results.</p></div>
        <div><h4>Do you provide online galleries for Pretoria clients?</h4><p>Yes, all Pretoria clients receive a secure online gallery for easy viewing and downloads.</p></div>
        <div><h4>Are outfit changes allowed during Pretoria shoots?</h4><p>Yes, outfit changes are included in most Pretoria photography packages.</p></div>
        <div><h4>Do you offer product photography in Pretoria?</h4><p>Yes, we shoot product images for Pretoria e-commerce and marketing.</p></div>
        <div><h4>Can you travel outside Pretoria for shoots?</h4><p>Yes, our team can travel throughout Gauteng for your photography needs.</p></div>
        <div><h4>Do you offer urgent or rush photography in Pretoria?</h4><p>Rush and urgent bookings are available for Pretoria clients, subject to availability.</p></div>
        <div><h4>Are Pretoria photography services available for businesses?</h4><p>Yes, we serve Pretoria businesses of all sizes with custom packages.</p></div>
        <div><h4>How do I book a Pretoria photography session?</h4><p>Contact us via our website or phone to book your Pretoria shoot.</p></div>
        <div><h4>Can you provide makeup and styling for Pretoria shoots?</h4><p>Makeup and styling can be arranged for Pretoria photography sessions.</p></div>
        <div><h4>Is studio photography available in Pretoria?</h4><p>Yes, we have a fully equipped studio in Pretoria for portraits and products.</p></div>
        <div><h4>Do you offer family photography in Pretoria?</h4><p>Yes, family and children’s photography is available in Pretoria.</p></div>
        <div><h4>Can you shoot at Pretoria landmarks?</h4><p>We can arrange shoots at popular Pretoria landmarks, parks, and venues.</p></div>
        <div><h4>Do you provide digital and print images in Pretoria?</h4><p>Both digital and print images are available for all Pretoria clients.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <div><h4>Do you offer wedding photography in Pretoria?</h4><p>Yes, our Pretoria team specializes in wedding and engagement photography.</p></div>
        <div><h4>Can you shoot at multiple Pretoria locations?</h4><p>Yes, we can photograph you at several Pretoria locations in one session.</p></div>
        <div><h4>Do you offer photography for Pretoria schools and sports?</h4><p>Yes, we cover school events, sports, and graduations in Pretoria.</p></div>
        <div><h4>Are Pretoria photo sessions suitable for children?</h4><p>Yes, we have experience photographing children and families in Pretoria.</p></div>
        <div><h4>Can you provide Pretoria photography for marketing?</h4><p>We create marketing images for Pretoria brands, products, and services.</p></div>
        <div><h4>Do you offer drone photography in Pretoria?</h4><p>Yes, aerial and drone photography is available in Pretoria.</p></div>
        <div><h4>How are Pretoria photos delivered?</h4><p>All Pretoria clients receive digital downloads and optional prints.</p></div>
        <div><h4>Do you offer group or team photography in Pretoria?</h4><p>Yes, group and team photos are available for Pretoria organizations.</p></div>
        <div><h4>Can you photograph Pretoria real estate?</h4><p>We offer real estate and property photography throughout Pretoria.</p></div>
        <div><h4>Do you offer Pretoria photography gift vouchers?</h4><p>Yes, gift vouchers are available for all Pretoria photography services.</p></div>
        <div><h4>Is same-day delivery available for Pretoria photos?</h4><p>Same-day delivery can be arranged for urgent Pretoria shoots.</p></div>
        <div><h4>Can you help with Pretoria photography permits?</h4><p>We assist with permits for Pretoria public and private locations.</p></div>
        <div><h4>Do you offer Pretoria graduation photography?</h4><p>Yes, graduation and matric dance photography is available in Pretoria.</p></div>
        <div><h4>Can you shoot Pretoria corporate events?</h4><p>Yes, we cover Pretoria conferences, launches, and business events.</p></div>
        <div><h4>Do you offer Pretoria maternity and newborn photography?</h4><p>Yes, we offer maternity and newborn sessions in Pretoria.</p></div>
        <div><h4>Can you provide Pretoria photography for social media?</h4><p>Yes, we create content for Pretoria influencers and brands.</p></div>
        <div><h4>Do you offer Pretoria pet photography?</h4><p>Yes, pet and animal photography is available in Pretoria.</p></div>
        <div><h4>Are Pretoria photographers available on weekends?</h4><p>Yes, weekend and after-hours shoots are available in Pretoria.</p></div>
        <div><h4>Can you help with Pretoria photo styling and props?</h4><p>We can arrange props and styling for Pretoria photo shoots.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Photography Services in Pretoria</h2>
        <p>Our Pretoria photography services cater to individuals, families, and businesses seeking professional images for every occasion. From portraits and events to commercial and product shoots, we deliver high-quality photography tailored to your needs in Pretoria and the surrounding areas.</p>
        <p>With a focus on creativity and technical excellence, our Pretoria photographers capture moments and stories that resonate. We use advanced equipment and editing techniques to ensure every image meets the highest standards for clarity, color, and impact.</p>
        <h3>Why Choose a Pretoria Photographer?</h3>
        <p>Choosing a local Pretoria photographer means working with someone who understands the best locations, lighting, and trends in the area. Our team brings years of experience and a passion for photography, ensuring your Pretoria session is comfortable, enjoyable, and results in stunning images.</p>
        <p>We offer flexible packages for Pretoria clients, including on-location, studio, and event photography. Our personalized approach means we listen to your vision and deliver photos that exceed expectations, whether for personal use or business marketing.</p>
        <h4>Photography Solutions for Every Pretoria Need</h4>
        <p>We provide a wide range of photography services in Pretoria, including family portraits, headshots, product photography, event coverage, and branding imagery. Our Pretoria clients benefit from fast turnaround times, professional editing, and a commitment to customer satisfaction.</p>
        <p>Our portfolio includes work for Pretoria businesses, schools, and private clients, showcasing our versatility and attention to detail. Whatever your photography needs, we have a Pretoria solution for you.</p>
        <h5>Quality, Creativity, and Service in Pretoria Photography</h5>
        <p>Quality is at the heart of our Pretoria photography services. We invest in top-tier cameras, lenses, and lighting to capture every detail. Our creative team collaborates with Pretoria clients to design shoots that reflect their unique style and goals.</p>
        <p>From concept to delivery, we provide guidance and support throughout the photography process. Our Pretoria photographers are dedicated to making your experience seamless and enjoyable, with results you'll love.</p>
        <h6>Book Your Pretoria Photography Session</h6>
        <p>Ready to capture beautiful images in Pretoria? Contact us today to discuss your photography needs, explore our packages, and schedule your session. We look forward to helping you create lasting memories and effective marketing visuals in Pretoria.</p>
        <p>Our Pretoria photography experts are here to answer your questions and provide a customized quote. Let us help you showcase your best self, products, or events with professional photography services in Pretoria.</p>
      </section>
    </main>  );
}
