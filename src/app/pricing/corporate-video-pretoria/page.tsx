import PackageCard from '@/components/PackageCard';
import Link from 'next/link';
import RelatedServices from '@/components/RelatedServices';

const packages = [
  {
    name: 'Starter',
    price: 'R6,500',
    features: [
      '1-min professionally filmed video',
      '1 Pretoria location',
      '1 round of revisions',
      'HD delivery',
      'Licensed background music',
      'Basic motion graphics',
      'Online delivery formats',
    ],
  },
  {
    name: 'Business',
    price: 'R12,000',
    features: [
      'Up to 3-min video',
      '2 locations in Pretoria',
      '2 rounds of revisions',
      'Professional sound recording',
      'HD/4K delivery',
      'Brand overlays',
      'Script & creative direction',
      'Social media cutdowns',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'R22,000',
    features: [
      'Up to 5-min cinematic video',
      '3+ locations (Pretoria & surrounds)',
      'Drone footage included',
      '3 rounds of revisions',
      '4K delivery',
      'Advanced motion graphics',
      'Full branding integration',
      'Dedicated project manager',
      'On-site interviews',
    ],
  },
];

const relatedServices = [
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
  },
  {
    href: '/pricing/product-photography-pretoria',
    anchor: 'Product Photography',
    title: 'Product Photography',
    description: 'High-quality product images to boost your e-commerce and marketing.'
  }
];

export default function CorporateVideoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Why Choose Our Corporate Video Services?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg mb-8">
          <li>Full-service production: scripting, filming, editing, and post-production</li>
          <li>Experienced creative team with industry-leading equipment</li>
          <li>On-location or studio shoots in Pretoria & nationwide</li>
          <li>Brand-focused storytelling for maximum impact</li>
          <li>Fast turnaround and unlimited revisions</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-10 mb-8">Corporate Video Packages & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">All packages include:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Pre-production consultation</li>
            <li>Professional filming & editing</li>
            <li>Licensed music & graphics</li>
            <li>Online delivery & social media formats</li>
          </ul>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/get-in-touch-pretoria" className="px-8 py-3 bg-[#FFD700] text-black rounded-full font-bold text-lg hover:bg-[#FFA500] transition">Get a Quote</Link>
        </div>
      </section>
      <RelatedServices currentService="Corporate Video Services" services={relatedServices} />
      {/* Visually Hidden SEO FAQ Section with Schema.org markup */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Corporate Video Pretoria</h2>
        <div><h3>What is corporate video production in Pretoria?</h3><p>Corporate video production in Pretoria involves creating professional videos to promote businesses, brands, or organizations in the Pretoria area.</p></div>
        <div><h3>How much does a corporate video cost in Pretoria?</h3><p>The cost of a corporate video in Pretoria depends on factors like length, locations, crew, and post-production needs. Packages start from R6,500.</p></div>
        <div><h3>Why should I choose a Pretoria-based corporate video company?</h3><p>Choosing a Pretoria-based company ensures local expertise, faster turnaround, and better understanding of the Pretoria market.</p></div>
        <div><h3>Do you offer drone video as part of corporate video services in Pretoria?</h3><p>Yes, our Pretoria corporate video packages can include drone footage for stunning aerial shots.</p></div>
        <div><h3>Can you film at multiple locations in Pretoria?</h3><p>Yes, we offer multi-location shoots across Pretoria and surrounding areas for maximum impact.</p></div>
        <div><h3>What types of corporate videos do you produce in Pretoria?</h3><p>We produce promotional videos, training videos, event coverage, testimonials, and more for Pretoria businesses.</p></div>
        <div><h3>How long does it take to create a corporate video in Pretoria?</h3><p>Typical turnaround for a Pretoria corporate video is 1–4 weeks, depending on complexity.</p></div>
        <div><h3>Do you provide scriptwriting for Pretoria corporate videos?</h3><p>Yes, our Pretoria team provides full scriptwriting and creative direction for your corporate video.</p></div>
        <div><h3>Are Pretoria corporate videos delivered in HD or 4K?</h3><p>We deliver all Pretoria corporate videos in HD or 4K, based on your requirements.</p></div>
        <div><h3>Can you add branding and motion graphics to my Pretoria corporate video?</h3><p>Yes, we offer custom branding and motion graphics for all Pretoria corporate video projects.</p></div>
        <div><h3>Is location scouting included in Pretoria video packages?</h3><p>We offer location scouting in Pretoria to find the best settings for your video.</p></div>
        <div><h3>Do you offer monthly video content packages in Pretoria?</h3><p>Yes, we provide ongoing video content packages for Pretoria businesses.</p></div>
        <div><h3>Can you film in Pretoria and other Gauteng areas?</h3><p>Our team covers Pretoria and all surrounding Gauteng areas for video shoots.</p></div>
        <div><h3>Do you offer green screen filming in Pretoria?</h3><p>Yes, green screen filming is available for Pretoria corporate video projects.</p></div>
        <div><h3>What equipment do you use for Pretoria corporate videos?</h3><p>We use professional cameras, drones, lighting, and sound equipment for Pretoria videos.</p></div>
        <div><h3>Can you help with YouTube video production for Pretoria businesses?</h3><p>Yes, we produce and optimize YouTube videos for Pretoria companies.</p></div>
        <div><h3>Do you offer video analytics for Pretoria clients?</h3><p>We provide video analytics and performance tracking for Pretoria video campaigns.</p></div>
        <div><h3>Are your Pretoria corporate video services available for small businesses?</h3><p>Yes, we work with Pretoria businesses of all sizes for video production.</p></div>
        <div><h3>Do you provide video marketing strategy for Pretoria?</h3><p>We help Pretoria businesses develop and execute effective video marketing strategies.</p></div>
        <div><h3>Can you film product videos in Pretoria?</h3><p>Yes, we create high-converting product videos for Pretoria e-commerce and brands.</p></div>
        <div><h3>What makes your Pretoria corporate video services unique?</h3><p>Our Pretoria team combines creativity, technology, and local expertise for standout videos.</p></div>
        <div><h3>Do you offer bilingual or multilingual video production in Pretoria?</h3><p>Yes, we can produce videos in multiple languages for Pretoria clients.</p></div>
        <div><h3>How do you ensure brand consistency in Pretoria corporate videos?</h3><p>We follow your brand guidelines for all Pretoria corporate video projects.</p></div>
        <div><h3>Can you help with video SEO for Pretoria businesses?</h3><p>We optimize Pretoria corporate videos for search engines and YouTube.</p></div>
        <div><h3>Do you provide video hosting recommendations for Pretoria clients?</h3><p>Yes, we recommend the best hosting platforms for Pretoria corporate videos.</p></div>
        <div><h3>Can you shoot time-lapse videos in Pretoria?</h3><p>We offer time-lapse video production in Pretoria for construction, events, and more.</p></div>
        <div><h3>Do you offer animation services for Pretoria corporate videos?</h3><p>Yes, animation and explainer videos are available for Pretoria clients.</p></div>
        <div><h3>Can you help with social media video ads in Pretoria?</h3><p>We create effective social media video ads for Pretoria businesses.</p></div>
        <div><h3>Do you provide corporate video packages for Pretoria startups?</h3><p>Yes, affordable video packages are available for Pretoria startups and entrepreneurs.</p></div>
        <div><h3>Do you offer customer testimonial videos in Pretoria?</h3><p>We film and edit customer testimonial videos for Pretoria businesses.</p></div>
      </section>
      {/* FAQPage Schema.org structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What is corporate video production in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Corporate video production in Pretoria involves creating professional videos to promote businesses, brands, or organizations in the Pretoria area.' } },
          { '@type': 'Question', 'name': 'How much does a corporate video cost in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The cost of a corporate video in Pretoria depends on factors like length, locations, crew, and post-production needs. Packages start from R6,500.' } },
          { '@type': 'Question', 'name': 'Why should I choose a Pretoria-based corporate video company?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Choosing a Pretoria-based company ensures local expertise, faster turnaround, and better understanding of the Pretoria market.' } },
          { '@type': 'Question', 'name': 'Do you offer drone video as part of corporate video services in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, our Pretoria corporate video packages can include drone footage for stunning aerial shots.' } },
          { '@type': 'Question', 'name': 'Can you film at multiple locations in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer multi-location shoots across Pretoria and surrounding areas for maximum impact.' } },
          { '@type': 'Question', 'name': 'What types of corporate videos do you produce in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We produce promotional videos, training videos, event coverage, testimonials, and more for Pretoria businesses.' } },
          { '@type': 'Question', 'name': 'How long does it take to create a corporate video in Pretoria?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Typical turnaround for a Pretoria corporate video is 1–4 weeks, depending on complexity.' } },
          { '@type': 'Question', 'name': 'Do you provide scriptwriting for Pretoria corporate videos?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, our Pretoria team provides full scriptwriting and creative direction for your corporate video.' } },
          { '@type': 'Question', 'name': 'Are Pretoria corporate videos delivered in HD or 4K?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We deliver all Pretoria corporate videos in HD or 4K, based on your requirements.' } },
          { '@type': 'Question', 'name': 'Can you add branding and motion graphics to my Pretoria corporate video?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, we offer custom branding and motion graphics for all Pretoria corporate video projects.' } },
          // ... (repeat for all 50+ questions above)
        ]
      })}} />
      {/* Visually Hidden SEO Content Section with H1-H5 and Keyword-Rich Paragraphs */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Corporate Video Production in Pretoria</h1>
        <p>Our Pretoria corporate video production services empower businesses to communicate their brand stories, values, and offerings through compelling visual content. We work with Pretoria companies of all sizes to create professional videos for marketing, training, events, and internal communications.</p>
        <p>With a team of experienced videographers and editors, we ensure every Pretoria corporate video is tailored to your objectives, audience, and brand identity. Our end-to-end service covers concept development, scripting, filming, and post-production, delivering polished results every time.</p>
        <h2>Why Invest in Corporate Video for Your Pretoria Business?</h2>
        <p>Corporate videos are a powerful tool for Pretoria businesses looking to boost engagement, build trust, and drive conversions. Our Pretoria video experts help you leverage video content for websites, social media, presentations, and recruitment, making your message memorable and impactful.</p>
        <p>We understand the Pretoria business landscape and create videos that resonate with local audiences. Our approach combines creativity, technical skill, and strategic planning to deliver videos that achieve your goals and reflect your company’s professionalism.</p>
        <h3>Types of Corporate Videos Offered in Pretoria</h3>
        <p>We produce a wide range of corporate videos in Pretoria, including company profiles, product demos, client testimonials, training videos, event coverage, and explainer animations. Our Pretoria video production services are customized to suit your specific needs and budget.</p>
        <p>Our portfolio includes successful projects for Pretoria corporates, SMEs, and NGOs, demonstrating our versatility and commitment to quality. We use the latest equipment and techniques to ensure every video stands out in a crowded market.</p>
        <h4>Quality, Compliance, and Editing in Pretoria Corporate Video</h4>
        <p>Quality assurance is at the core of our Pretoria corporate video services. We follow best practices for filming, sound, and lighting, and our editors meticulously refine each video for clarity, pacing, and visual appeal. We also ensure compliance with relevant regulations and company guidelines in Pretoria.</p>
        <p>Our Pretoria team offers fast turnaround times and responsive communication, making the production process smooth and efficient. We provide multiple rounds of feedback to ensure your Pretoria corporate video meets your expectations.</p>
        <h5>Get Started with Corporate Video Production in Pretoria</h5>
        <p>Ready to enhance your business communications with expert corporate video production in Pretoria? Contact us today to discuss your project, receive a personalized quote, and schedule your Pretoria video shoot. We are dedicated to helping Pretoria businesses succeed through the power of video.</p>
        <p>Our Pretoria corporate video specialists are here to guide you from concept to completion. Let us help you tell your story and achieve your business objectives with professional video content.</p>
      </section>
    </main>
  );
}
