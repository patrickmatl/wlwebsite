import PackageCard from '@/components/PackageCard';
import Link from 'next/link';
import RelatedServices from '@/components/RelatedServices';

const packages = [
  {
    name: 'Starter',
    price: 'R4,500',
    features: [
      'Up to 60 seconds aerial video',
      '1 Pretoria location',
      'Licensed drone pilot',
      'HD video delivery',
      '1 round of editing',
      'Basic color grading',
      'Online delivery',
    ],
  },
  {
    name: 'Business',
    price: 'R7,900',
    features: [
      'Up to 3-min aerial video',
      '2 locations in Pretoria',
      'Licensed drone pilot & assistant',
      '4K video delivery',
      '2 rounds of editing',
      'Advanced color grading',
      'Licensed music',
      'Social media formats',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'R13,500',
    features: [
      'Up to 5-min cinematic aerial video',
      '3+ Pretoria/Gauteng locations',
      'Licensed drone pilot & crew',
      '4K/RAW video delivery',
      '3 rounds of editing',
      'Custom graphics & overlays',
      'On-site direction',
      'Full branding integration',
      'All usage rights',
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
    href: '/pricing/photography-pretoria',
    anchor: 'Photography',
    title: 'Photography Services',
    description: 'Professional photography for events, brands, and businesses in Pretoria.'
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
  { q: 'What is drone video production in Pretoria?', a: 'Drone video production in Pretoria involves capturing aerial footage for marketing, real estate, events, and more.' },
  { q: 'Are your Pretoria drone pilots licensed?', a: 'Yes, all our Pretoria drone pilots are fully licensed and insured for commercial operations.' },
  { q: 'How much does drone video cost in Pretoria?', a: 'Drone video packages in Pretoria start from R4,500, with pricing based on duration, locations, and editing needs.' },
  { q: 'Can you film at multiple locations in Pretoria?', a: 'Yes, we offer multi-location drone shoots across Pretoria and Gauteng.' },
  { q: 'Is drone video legal in Pretoria?', a: 'Yes, we comply with all Pretoria and South African drone regulations to ensure safe and legal flights.' },
  { q: 'What industries use drone video in Pretoria?', a: 'Real estate, construction, tourism, events, agriculture, and more in Pretoria benefit from drone video.' },
  { q: 'Do you offer drone video for real estate in Pretoria?', a: 'Yes, we specialize in real estate drone videos for Pretoria agents and developers.' },
  { q: 'Can you provide raw footage from drone shoots in Pretoria?', a: 'Yes, we can deliver both raw and edited drone footage for Pretoria clients.' },
  { q: 'Do you offer 4K drone video in Pretoria?', a: 'Yes, all Pretoria drone video packages include HD or 4K options.' },
  { q: 'Is drone video suitable for events in Pretoria?', a: 'Absolutely, drone video adds a unique perspective to Pretoria events and launches.' },
  { q: 'How long does a drone video shoot take in Pretoria?', a: 'Most Pretoria drone shoots take 1–3 hours, depending on the scope and locations.' },
  { q: 'Can you add music and graphics to Pretoria drone videos?', a: 'Yes, we offer licensed music and custom graphics for all Pretoria drone video projects.' },
  { q: 'Do you offer live drone streaming in Pretoria?', a: 'Live drone streaming is available for Pretoria events and inspections upon request.' },
  { q: 'Can you film construction progress in Pretoria with drones?', a: 'Yes, we provide regular drone progress videos for Pretoria construction sites.' },
  { q: 'What weather is best for drone video in Pretoria?', a: 'Clear, calm weather is ideal for Pretoria drone shoots, but we monitor all conditions for safety.' },
  { q: 'Do you offer drone photography in Pretoria?', a: 'Yes, we also provide high-resolution drone photography in Pretoria.' },
  { q: 'Are permits required for Pretoria drone shoots?', a: 'We handle all necessary permits and permissions for Pretoria drone operations.' },
  { q: 'Can you film indoors with drones in Pretoria?', a: 'Indoor drone filming is possible in Pretoria locations with sufficient space and safety measures.' },
  { q: 'Do you edit Pretoria drone videos?', a: 'Yes, all Pretoria drone video packages include professional editing and color grading.' },
  { q: 'Is drone video safe for Pretoria crowds?', a: 'We follow strict safety protocols for all Pretoria drone flights, especially around people.' },
  { q: 'Can you provide drone video for Pretoria tourism?', a: 'Yes, we create promotional drone videos for Pretoria tourism and hospitality businesses.' },
  { q: 'Do you offer monthly drone video packages in Pretoria?', a: 'Yes, ongoing drone content packages are available for Pretoria businesses.' },
  { q: 'Can you shoot time-lapse drone videos in Pretoria?', a: 'We offer time-lapse and hyperlapse drone video production in Pretoria.' },
  { q: 'What equipment do you use for Pretoria drone video?', a: 'We use professional drones with HD/4K/RAW capabilities for Pretoria shoots.' },
  { q: 'Do you offer drone video for Pretoria schools and sports?', a: 'Yes, we film school events, sports, and more with drones in Pretoria.' },
  { q: 'How do I book a Pretoria drone video shoot?', a: 'Contact us via our website or phone to book your Pretoria drone shoot.' },
  { q: 'Can you film live property tours with drones in Pretoria?', a: 'Yes, live or pre-recorded property tours are available for Pretoria real estate.' },
  { q: 'Do you offer drone mapping in Pretoria?', a: 'We provide aerial mapping and surveys for Pretoria construction and agriculture.' },
  { q: 'Is drone video suitable for Pretoria marketing campaigns?', a: 'Drone video makes Pretoria marketing more engaging and memorable.' },
  { q: 'Can you add voiceover to Pretoria drone videos?', a: 'Yes, voiceover and narration can be included for Pretoria drone video projects.' },
  { q: 'Do you offer drone inspections in Pretoria?', a: 'We provide drone inspections for Pretoria infrastructure, roofs, and more.' },
  { q: 'Can you film at sunrise or sunset in Pretoria?', a: 'Yes, golden hour drone shoots are available in Pretoria for dramatic visuals.' },
  { q: 'Are Pretoria drone videos delivered online?', a: 'All Pretoria drone videos are delivered via online gallery or download link.' },
  { q: 'Do you offer drone video for Pretoria hotels and lodges?', a: 'Yes, we create promotional drone videos for Pretoria hospitality venues.' },
  { q: 'Can you film drone videos in Pretoria nature reserves?', a: 'We can film in Pretoria reserves with the necessary permissions and safety measures.' },
  { q: 'Do you offer bilingual drone video services in Pretoria?', a: 'Yes, we can produce Pretoria drone videos in multiple languages.' },
  { q: 'How do you ensure safety during Pretoria drone shoots?', a: 'We follow all CAA regulations and safety protocols for Pretoria drone operations.' },
  { q: 'Can you help with drone video marketing in Pretoria?', a: 'We assist Pretoria businesses with drone video marketing strategy and distribution.' },
  { q: 'Do you provide drone video analytics for Pretoria clients?', a: 'Yes, we offer video analytics and performance tracking for Pretoria drone campaigns.' },
  { q: 'Are your Pretoria drone video services available for small businesses?', a: 'Yes, we work with Pretoria businesses of all sizes for drone video production.' },
  { q: 'Can you help with YouTube drone videos for Pretoria?', a: 'We produce and optimize YouTube drone videos for Pretoria companies.' },
  { q: 'What makes your Pretoria drone video services unique?', a: 'Our Pretoria team combines creativity, technology, and local expertise for standout aerial videos.' },
];

export default function DroneVideoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-4 text-center">
        <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC000] to-[#FFB000]">Drone Video Services Pretoria</h1>
        <p className="text-lg text-neutral-300 max-w-3xl mx-auto">Licensed aerial filming for property, construction, events and marketing across Pretoria and Gauteng.</p>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Why Choose Our Drone Video Services?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg mb-8">
          <li>Licensed and insured drone pilots</li>
          <li>Cinematic aerial footage for any industry</li>
          <li>Flexible packages for all budgets</li>
          <li>Fast turnaround and expert editing</li>
          <li>Legal compliance and all airspace clearances</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-10 mb-8">Drone Video Packages & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} service="Drone video" />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">All packages include:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Pre-shoot consultation</li>
            <li>CAA-compliant drone operations</li>
            <li>Professional editing</li>
            <li>Online delivery & social media formats</li>
          </ul>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/get-in-touch-pretoria" className="px-8 py-3 bg-[#FFD700] text-black rounded-full font-bold text-lg hover:bg-[#FFA500] transition">Get a Quote</Link>
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
      <RelatedServices currentService="Drone Video Services" services={relatedServices} />
      <div className="mt-10 text-center">
        <p className="text-neutral-400 text-sm">
          Discover more from our
          {" "}
          <Link href="/" className="text-[#FFD700] hover:underline">Pretoria aerial video company</Link>
          {" "}
          on the homepage.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center mt-6">
        <p className="text-neutral-400 text-sm">
          Browse <Link href="/videography-services-pretoria" className="text-[#FFD700] hover:underline">all our videography services in Pretoria</Link>.
        </p>
      </div>
    
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h3>Frequently Asked Questions about Drone Video Pretoria</h3>
        <div><h4>What is drone video production in Pretoria?</h4><p>Drone video production in Pretoria involves capturing aerial footage for marketing, real estate, events, and more.</p></div>
        <div><h4>Are your Pretoria drone pilots licensed?</h4><p>Yes, all our Pretoria drone pilots are fully licensed and insured for commercial operations.</p></div>
        <div><h4>How much does drone video cost in Pretoria?</h4><p>Drone video packages in Pretoria start from R4,500, with pricing based on duration, locations, and editing needs.</p></div>
        <div><h4>Can you film at multiple locations in Pretoria?</h4><p>Yes, we offer multi-location drone shoots across Pretoria and Gauteng.</p></div>
        <div><h4>Is drone video legal in Pretoria?</h4><p>Yes, we comply with all Pretoria and South African drone regulations to ensure safe and legal flights.</p></div>
        <div><h4>What industries use drone video in Pretoria?</h4><p>Real estate, construction, tourism, events, agriculture, and more in Pretoria benefit from drone video.</p></div>
        <div><h4>Do you offer drone video for real estate in Pretoria?</h4><p>Yes, we specialize in real estate drone videos for Pretoria agents and developers.</p></div>
        <div><h4>Can you provide raw footage from drone shoots in Pretoria?</h4><p>Yes, we can deliver both raw and edited drone footage for Pretoria clients.</p></div>
        <div><h4>Do you offer 4K drone video in Pretoria?</h4><p>Yes, all Pretoria drone video packages include HD or 4K options.</p></div>
        <div><h4>Is drone video suitable for events in Pretoria?</h4><p>Absolutely, drone video adds a unique perspective to Pretoria events and launches.</p></div>
        <div><h4>How long does a drone video shoot take in Pretoria?</h4><p>Most Pretoria drone shoots take 1–3 hours, depending on the scope and locations.</p></div>
        <div><h4>Can you add music and graphics to Pretoria drone videos?</h4><p>Yes, we offer licensed music and custom graphics for all Pretoria drone video projects.</p></div>
        <div><h4>Do you offer live drone streaming in Pretoria?</h4><p>Live drone streaming is available for Pretoria events and inspections upon request.</p></div>
        <div><h4>Can you film construction progress in Pretoria with drones?</h4><p>Yes, we provide regular drone progress videos for Pretoria construction sites.</p></div>
        <div><h4>What weather is best for drone video in Pretoria?</h4><p>Clear, calm weather is ideal for Pretoria drone shoots, but we monitor all conditions for safety.</p></div>
        <div><h4>Do you offer drone photography in Pretoria?</h4><p>Yes, we also provide high-resolution drone photography in Pretoria.</p></div>
        <div><h4>Are permits required for Pretoria drone shoots?</h4><p>We handle all necessary permits and permissions for Pretoria drone operations.</p></div>
        <div><h4>Can you film indoors with drones in Pretoria?</h4><p>Indoor drone filming is possible in Pretoria locations with sufficient space and safety measures.</p></div>
        <div><h4>Do you edit Pretoria drone videos?</h4><p>Yes, all Pretoria drone video packages include professional editing and color grading.</p></div>
        <div><h4>Is drone video safe for Pretoria crowds?</h4><p>We follow strict safety protocols for all Pretoria drone flights, especially around people.</p></div>
        <div><h4>Can you provide drone video for Pretoria tourism?</h4><p>Yes, we create promotional drone videos for Pretoria tourism and hospitality businesses.</p></div>
        <div><h4>Do you offer monthly drone video packages in Pretoria?</h4><p>Yes, ongoing drone content packages are available for Pretoria businesses.</p></div>
        <div><h4>Can you shoot time-lapse drone videos in Pretoria?</h4><p>We offer time-lapse and hyperlapse drone video production in Pretoria.</p></div>
        <div><h4>What equipment do you use for Pretoria drone video?</h4><p>We use professional drones with HD/4K/RAW capabilities for Pretoria shoots.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <div><h4>Do you offer drone video for Pretoria schools and sports?</h4><p>Yes, we film school events, sports, and more with drones in Pretoria.</p></div>
        <div><h4>How do I book a Pretoria drone video shoot?</h4><p>Contact us via our website or phone to book your Pretoria drone shoot.</p></div>
        <div><h4>Can you film live property tours with drones in Pretoria?</h4><p>Yes, live or pre-recorded property tours are available for Pretoria real estate.</p></div>
        <div><h4>Do you offer drone mapping in Pretoria?</h4><p>We provide aerial mapping and surveys for Pretoria construction and agriculture.</p></div>
        <div><h4>Is drone video suitable for Pretoria marketing campaigns?</h4><p>Drone video makes Pretoria marketing more engaging and memorable.</p></div>
        <div><h4>Can you add voiceover to Pretoria drone videos?</h4><p>Yes, voiceover and narration can be included for Pretoria drone video projects.</p></div>
        <div><h4>Do you offer drone inspections in Pretoria?</h4><p>We provide drone inspections for Pretoria infrastructure, roofs, and more.</p></div>
        <div><h4>Can you film at sunrise or sunset in Pretoria?</h4><p>Yes, golden hour drone shoots are available in Pretoria for dramatic visuals.</p></div>
        <div><h4>Are Pretoria drone videos delivered online?</h4><p>All Pretoria drone videos are delivered via online gallery or download link.</p></div>
        <div><h4>Do you offer drone video for Pretoria hotels and lodges?</h4><p>Yes, we create promotional drone videos for Pretoria hospitality venues.</p></div>
        <div><h4>Can you film drone videos in Pretoria nature reserves?</h4><p>We can film in Pretoria reserves with the necessary permissions and safety measures.</p></div>
        <div><h4>Do you offer bilingual drone video services in Pretoria?</h4><p>Yes, we can produce Pretoria drone videos in multiple languages.</p></div>
        <div><h4>How do you ensure safety during Pretoria drone shoots?</h4><p>We follow all CAA regulations and safety protocols for Pretoria drone operations.</p></div>
        <div><h4>Can you help with drone video marketing in Pretoria?</h4><p>We assist Pretoria businesses with drone video marketing strategy and distribution.</p></div>
        <div><h4>Do you provide drone video analytics for Pretoria clients?</h4><p>Yes, we offer video analytics and performance tracking for Pretoria drone campaigns.</p></div>
        <div><h4>Are your Pretoria drone video services available for small businesses?</h4><p>Yes, we work with Pretoria businesses of all sizes for drone video production.</p></div>
        <div><h4>Can you help with YouTube drone videos for Pretoria?</h4><p>We produce and optimize YouTube drone videos for Pretoria companies.</p></div>
        <div><h4>What makes your Pretoria drone video services unique?</h4><p>Our Pretoria team combines creativity, technology, and local expertise for standout aerial videos.</p></div>
      </section>
      {/* Previously hidden off-screen; now visible to every visitor */}
      <section className="mx-auto max-w-4xl px-4 py-12 prose prose-invert prose-headings:font-syne prose-headings:text-[#FFD700] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
        <h2>Drone Video Services in Pretoria</h2>
        <p>Our Pretoria drone video services provide stunning aerial footage for a variety of industries, including real estate, construction, tourism, and events. Using the latest drone technology, we capture breathtaking perspectives that showcase properties, projects, and experiences in Pretoria like never before.</p>
        <p>Whether you need promotional videos, progress documentation, or creative content for social media, our Pretoria drone video team delivers professional results tailored to your needs. We understand the local landscape and regulatory requirements, ensuring safe and legal operations throughout Pretoria and Gauteng.</p>
        <h3>Why Choose Professional Drone Videography in Pretoria?</h3>
        <p>Professional drone videography in Pretoria elevates your marketing and storytelling by offering unique aerial views that traditional cameras cannot achieve. Our licensed drone pilots combine technical skill with creative vision to produce cinematic footage for Pretoria businesses and individuals.</p>
        <p>With years of experience in the Pretoria market, we know how to highlight the best features of your property or event. Our team manages all aspects of the shoot, from planning and permits to editing and delivery, ensuring a seamless experience from start to finish.</p>
        <h4>Applications of Drone Video in Pretoria</h4>
        <p>Drone video is widely used in Pretoria for real estate listings, construction site monitoring, tourism promotion, event coverage, and agricultural surveys. Aerial footage helps Pretoria clients stand out in competitive markets by providing dynamic visuals that capture attention and drive engagement.</p>
        <p>Our services are customized for each Pretoria client, whether you need regular progress updates for a building project or a one-time promotional video for your business. We also offer live drone streaming for events and inspections across Pretoria.</p>
        <h5>Compliance and Safety for Pretoria Drone Operations</h5>
        <p>Safety and legal compliance are top priorities for our Pretoria drone video services. We adhere to all South African Civil Aviation Authority (SACAA) regulations and secure the necessary permits for each Pretoria drone shoot. Our pilots are fully licensed and insured, giving you peace of mind for every project.</p>
        <p>We conduct thorough risk assessments and follow strict safety protocols to protect people, property, and airspace in Pretoria. This commitment to safety ensures that your drone video project is completed efficiently and without incident.</p>
        <h6>Get Started with Drone Video in Pretoria</h6>
        <p>Ready to elevate your visual content with expert drone video production in Pretoria? Contact our team today to discuss your project requirements, receive a custom quote, and schedule your Pretoria drone shoot. Experience the difference that professional aerial videography can make for your business or event.</p>
        <p>Our Pretoria drone video experts are here to guide you through every step, from concept development to final delivery. Let us help you capture Pretoria from a whole new perspective.</p>
      </section>
    </main>  );
}
