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

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
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
            <PackageCard key={pkg.name} {...pkg} />
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
      {/* Visually Hidden SEO FAQ Section with Schema.org markup - Batch 1 */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Photography Pretoria</h2>
        <div><h3>What types of photography do you offer in Pretoria?</h3><p>We offer portrait, event, commercial, product, and lifestyle photography in Pretoria.</p></div>
        <div><h3>How much does a photography session cost in Pretoria?</h3><p>Photography packages in Pretoria start from R2,500, with options for all needs.</p></div>
        <div><h3>Are your Pretoria photographers experienced?</h3><p>Yes, our Pretoria photographers are highly experienced and creative professionals.</p></div>
        <div><h3>Do you offer on-location shoots in Pretoria?</h3><p>Yes, we shoot at your chosen Pretoria location or in our professional studio.</p></div>
        <div><h3>How many photos will I receive from a Pretoria shoot?</h3><p>Depending on your package, you’ll receive 20–80+ professionally edited images.</p></div>
        <div><h3>Do you provide commercial photography in Pretoria?</h3><p>Yes, we offer commercial, branding, and product photography for Pretoria businesses.</p></div>
        <div><h3>Can you provide prints for Pretoria photography sessions?</h3><p>Yes, prints and albums are available for all Pretoria photography packages.</p></div>
        <div><h3>How long does a Pretoria photo shoot take?</h3><p>Sessions range from 1 hour to half-day, depending on your Pretoria package.</p></div>
        <div><h3>Is retouching included in Pretoria photography?</h3><p>All Pretoria packages include professional editing and retouching.</p></div>
        <div><h3>Can you shoot events in Pretoria?</h3><p>Yes, we cover corporate, private, and public events across Pretoria.</p></div>
        <div><h3>Do you offer headshot photography in Pretoria?</h3><p>Yes, business and personal headshots are available in Pretoria.</p></div>
        <div><h3>Can you help with posing during Pretoria shoots?</h3><p>Our Pretoria photographers guide you for the best poses and results.</p></div>
        <div><h3>Do you provide online galleries for Pretoria clients?</h3><p>Yes, all Pretoria clients receive a secure online gallery for easy viewing and downloads.</p></div>
        <div><h3>Are outfit changes allowed during Pretoria shoots?</h3><p>Yes, outfit changes are included in most Pretoria photography packages.</p></div>
        <div><h3>Do you offer product photography in Pretoria?</h3><p>Yes, we shoot product images for Pretoria e-commerce and marketing.</p></div>
        <div><h3>Can you travel outside Pretoria for shoots?</h3><p>Yes, our team can travel throughout Gauteng for your photography needs.</p></div>
        <div><h3>Do you offer urgent or rush photography in Pretoria?</h3><p>Rush and urgent bookings are available for Pretoria clients, subject to availability.</p></div>
        <div><h3>Are Pretoria photography services available for businesses?</h3><p>Yes, we serve Pretoria businesses of all sizes with custom packages.</p></div>
        <div><h3>How do I book a Pretoria photography session?</h3><p>Contact us via our website or phone to book your Pretoria shoot.</p></div>
        <div><h3>Can you provide makeup and styling for Pretoria shoots?</h3><p>Makeup and styling can be arranged for Pretoria photography sessions.</p></div>
        <div><h3>Is studio photography available in Pretoria?</h3><p>Yes, we have a fully equipped studio in Pretoria for portraits and products.</p></div>
        <div><h3>Do you offer family photography in Pretoria?</h3><p>Yes, family and children’s photography is available in Pretoria.</p></div>
        <div><h3>Can you shoot at Pretoria landmarks?</h3><p>We can arrange shoots at popular Pretoria landmarks, parks, and venues.</p></div>
        <div><h3>Do you provide digital and print images in Pretoria?</h3><p>Both digital and print images are available for all Pretoria clients.</p></div>
      </section>
      {/* FAQPage Schema.org structured data for SEO - Batch 1 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What types of photography do you offer in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We offer portrait, event, commercial, product, and lifestyle photography in Pretoria.' } },
          { '@type': 'Question', 'name': 'How much does a photography session cost in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Photography packages in Pretoria start from R2,500, with options for all needs.' } },
          { '@type': 'Question', 'name': 'Are your Pretoria photographers experienced?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, our Pretoria photographers are highly experienced and creative professionals.' } },
          { '@type': 'Question', 'name': 'Do you offer on-location shoots in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we shoot at your chosen Pretoria location or in our professional studio.' } },
          { '@type': 'Question', 'name': 'How many photos will I receive from a Pretoria shoot?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Depending on your package, you’ll receive 20–80+ professionally edited images.' } },
          { '@type': 'Question', 'name': 'Do you provide commercial photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer commercial, branding, and product photography for Pretoria businesses.' } },
          { '@type': 'Question', 'name': 'Can you provide prints for Pretoria photography sessions?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, prints and albums are available for all Pretoria photography packages.' } },
          { '@type': 'Question', 'name': 'How long does a Pretoria photo shoot take?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Sessions range from 1 hour to half-day, depending on your Pretoria package.' } },
          { '@type': 'Question', 'name': 'Is retouching included in Pretoria photography?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'All Pretoria packages include professional editing and retouching.' } },
          { '@type': 'Question', 'name': 'Can you shoot events in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we cover corporate, private, and public events across Pretoria.' } },
          { '@type': 'Question', 'name': 'Do you offer headshot photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, business and personal headshots are available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you help with posing during Pretoria shoots?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our Pretoria photographers guide you for the best poses and results.' } },
          { '@type': 'Question', 'name': 'Do you provide online galleries for Pretoria clients?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, all Pretoria clients receive a secure online gallery for easy viewing and downloads.' } },
          { '@type': 'Question', 'name': 'Are outfit changes allowed during Pretoria shoots?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, outfit changes are included in most Pretoria photography packages.' } },
          { '@type': 'Question', 'name': 'Do you offer product photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we shoot product images for Pretoria e-commerce and marketing.' } },
          { '@type': 'Question', 'name': 'Can you travel outside Pretoria for shoots?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, our team can travel throughout Gauteng for your photography needs.' } },
          { '@type': 'Question', 'name': 'Do you offer urgent or rush photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Rush and urgent bookings are available for Pretoria clients, subject to availability.' } },
          { '@type': 'Question', 'name': 'Are Pretoria photography services available for businesses?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we serve Pretoria businesses of all sizes with custom packages.' } },
          { '@type': 'Question', 'name': 'How do I book a Pretoria photography session?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Contact us via our website or phone to book your Pretoria shoot.' } },
          { '@type': 'Question', 'name': 'Can you provide makeup and styling for Pretoria shoots?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Makeup and styling can be arranged for Pretoria photography sessions.' } },
          { '@type': 'Question', 'name': 'Is studio photography available in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we have a fully equipped studio in Pretoria for portraits and products.' } },
          { '@type': 'Question', 'name': 'Do you offer family photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, family and children’s photography is available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you shoot at Pretoria landmarks?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We can arrange shoots at popular Pretoria landmarks, parks, and venues.' } },
          { '@type': 'Question', 'name': 'Do you provide digital and print images in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Both digital and print images are available for all Pretoria clients.' } },
        ]
      })}} />
      {/* Visually Hidden SEO FAQ Section with Schema.org markup - Batch 2 */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <div><h3>Do you offer wedding photography in Pretoria?</h3><p>Yes, our Pretoria team specializes in wedding and engagement photography.</p></div>
        <div><h3>Can you shoot at multiple Pretoria locations?</h3><p>Yes, we can photograph you at several Pretoria locations in one session.</p></div>
        <div><h3>Do you offer photography for Pretoria schools and sports?</h3><p>Yes, we cover school events, sports, and graduations in Pretoria.</p></div>
        <div><h3>Are Pretoria photo sessions suitable for children?</h3><p>Yes, we have experience photographing children and families in Pretoria.</p></div>
        <div><h3>Can you provide Pretoria photography for marketing?</h3><p>We create marketing images for Pretoria brands, products, and services.</p></div>
        <div><h3>Do you offer drone photography in Pretoria?</h3><p>Yes, aerial and drone photography is available in Pretoria.</p></div>
        <div><h3>How are Pretoria photos delivered?</h3><p>All Pretoria clients receive digital downloads and optional prints.</p></div>
        <div><h3>Do you offer group or team photography in Pretoria?</h3><p>Yes, group and team photos are available for Pretoria organizations.</p></div>
        <div><h3>Can you photograph Pretoria real estate?</h3><p>We offer real estate and property photography throughout Pretoria.</p></div>
        <div><h3>Do you offer Pretoria photography gift vouchers?</h3><p>Yes, gift vouchers are available for all Pretoria photography services.</p></div>
        <div><h3>Is same-day delivery available for Pretoria photos?</h3><p>Same-day delivery can be arranged for urgent Pretoria shoots.</p></div>
        <div><h3>Can you help with Pretoria photography permits?</h3><p>We assist with permits for Pretoria public and private locations.</p></div>
        <div><h3>Do you offer Pretoria graduation photography?</h3><p>Yes, graduation and matric dance photography is available in Pretoria.</p></div>
        <div><h3>Can you shoot Pretoria corporate events?</h3><p>Yes, we cover Pretoria conferences, launches, and business events.</p></div>
        <div><h3>Do you offer Pretoria maternity and newborn photography?</h3><p>Yes, we offer maternity and newborn sessions in Pretoria.</p></div>
        <div><h3>Can you provide Pretoria photography for social media?</h3><p>Yes, we create content for Pretoria influencers and brands.</p></div>
        <div><h3>Do you offer Pretoria pet photography?</h3><p>Yes, pet and animal photography is available in Pretoria.</p></div>
        <div><h3>Are Pretoria photographers available on weekends?</h3><p>Yes, weekend and after-hours shoots are available in Pretoria.</p></div>
        <div><h3>Can you help with Pretoria photo styling and props?</h3><p>We can arrange props and styling for Pretoria photo shoots.</p></div>
      </section>
      {/* FAQPage Schema.org structured data for SEO - Batch 2 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'Do you offer wedding photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, our Pretoria team specializes in wedding and engagement photography.' } },
          { '@type': 'Question', 'name': 'Can you shoot at multiple Pretoria locations?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we can photograph you at several Pretoria locations in one session.' } },
          { '@type': 'Question', 'name': 'Do you offer photography for Pretoria schools and sports?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we cover school events, sports, and graduations in Pretoria.' } },
          { '@type': 'Question', 'name': 'Are Pretoria photo sessions suitable for children?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we have experience photographing children and families in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you provide Pretoria photography for marketing?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We create marketing images for Pretoria brands, products, and services.' } },
          { '@type': 'Question', 'name': 'Do you offer drone photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, aerial and drone photography is available in Pretoria.' } },
          { '@type': 'Question', 'name': 'How are Pretoria photos delivered?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'All Pretoria clients receive digital downloads and optional prints.' } },
          { '@type': 'Question', 'name': 'Do you offer group or team photography in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, group and team photos are available for Pretoria organizations.' } },
          { '@type': 'Question', 'name': 'Can you photograph Pretoria real estate?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We offer real estate and property photography throughout Pretoria.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria photography gift vouchers?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, gift vouchers are available for all Pretoria photography services.' } },
          { '@type': 'Question', 'name': 'Is same-day delivery available for Pretoria photos?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Same-day delivery can be arranged for urgent Pretoria shoots.' } },
          { '@type': 'Question', 'name': 'Can you help with Pretoria photography permits?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We assist with permits for Pretoria public and private locations.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria graduation photography?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, graduation and matric dance photography is available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you shoot Pretoria corporate events?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we cover Pretoria conferences, launches, and business events.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria maternity and newborn photography?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer maternity and newborn sessions in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you provide Pretoria photography for social media?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we create content for Pretoria influencers and brands.' } },
          { '@type': 'Question', 'name': 'Do you offer Pretoria pet photography?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, pet and animal photography is available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Are Pretoria photographers available on weekends?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, weekend and after-hours shoots are available in Pretoria.' } },
          { '@type': 'Question', 'name': 'Can you help with Pretoria photo styling and props?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We can arrange props and styling for Pretoria photo shoots.' } },
        ]
      })}} />
      {/* Visually Hidden SEO Content Section with H1-H5 and Keyword-Rich Paragraphs */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Photography Services in Pretoria</h1>
        <p>Our Pretoria photography services cater to individuals, families, and businesses seeking professional images for every occasion. From portraits and events to commercial and product shoots, we deliver high-quality photography tailored to your needs in Pretoria and the surrounding areas.</p>
        <p>With a focus on creativity and technical excellence, our Pretoria photographers capture moments and stories that resonate. We use advanced equipment and editing techniques to ensure every image meets the highest standards for clarity, color, and impact.</p>
        <h2>Why Choose a Pretoria Photographer?</h2>
        <p>Choosing a local Pretoria photographer means working with someone who understands the best locations, lighting, and trends in the area. Our team brings years of experience and a passion for photography, ensuring your Pretoria session is comfortable, enjoyable, and results in stunning images.</p>
        <p>We offer flexible packages for Pretoria clients, including on-location, studio, and event photography. Our personalized approach means we listen to your vision and deliver photos that exceed expectations, whether for personal use or business marketing.</p>
        <h3>Photography Solutions for Every Pretoria Need</h3>
        <p>We provide a wide range of photography services in Pretoria, including family portraits, headshots, product photography, event coverage, and branding imagery. Our Pretoria clients benefit from fast turnaround times, professional editing, and a commitment to customer satisfaction.</p>
        <p>Our portfolio includes work for Pretoria businesses, schools, and private clients, showcasing our versatility and attention to detail. Whatever your photography needs, we have a Pretoria solution for you.</p>
        <h4>Quality, Creativity, and Service in Pretoria Photography</h4>
        <p>Quality is at the heart of our Pretoria photography services. We invest in top-tier cameras, lenses, and lighting to capture every detail. Our creative team collaborates with Pretoria clients to design shoots that reflect their unique style and goals.</p>
        <p>From concept to delivery, we provide guidance and support throughout the photography process. Our Pretoria photographers are dedicated to making your experience seamless and enjoyable, with results you'll love.</p>
        <h5>Book Your Pretoria Photography Session</h5>
        <p>Ready to capture beautiful images in Pretoria? Contact us today to discuss your photography needs, explore our packages, and schedule your session. We look forward to helping you create lasting memories and effective marketing visuals in Pretoria.</p>
        <p>Our Pretoria photography experts are here to answer your questions and provide a customized quote. Let us help you showcase your best self, products, or events with professional photography services in Pretoria.</p>
      </section>
    </main>
  );
}
