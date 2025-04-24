import { Metadata } from 'next';
import RootClientWrapper from '@/components/RootClientWrapper';

export const metadata: Metadata = {
  title: 'WL CreationX | Top Graphic Design Agency Pretoria',
  description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. ✓15+ Years Experience ✓Award-winning Agency ✓Free Consultation. Contact us today!',
  keywords: [
    'graphic design company pretoria',
    'graphic design agency pretoria',
    'branding agency pretoria',
    'web design pretoria',
    'creative agency pretoria',
    'logo design pretoria',
    'graphic design services pretoria',
    'best design agency in south africa',
    'professional graphic designers pretoria',
    'custom graphic design pretoria'
  ],
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  alternates: {
    canonical: 'https://wlcreationx.co.za',
    languages: {
      'en-ZA': 'https://wlcreationx.co.za',
      'x-default': 'https://wlcreationx.co.za'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'WL CreationX | Premier Graphic Design Agency in Pretoria',
    description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. ✓15+ Years Experience ✓Award-winning Agency ✓Free Consultation.',
    url: 'https://wlcreationx.co.za',
    siteName: 'WL CreationX Design Agency',
    locale: 'en_ZA',
    type: 'website',
    images: [
      {
        url: 'https://wlcreationx.co.za/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WL CreationX - Leading Graphic Design Agency in Pretoria'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WL CreationX | Top Graphic Design Agency Pretoria',
    description: 'Leading graphic design company in Pretoria. Expert branding, logo design, web design services. Contact us for professional design solutions.',
    images: ['https://wlcreationx.co.za/images/twitter-card.jpg'],
    creator: '@wlcreationx'
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Graphic Design & Creative Services',
  authors: [
    {
      name: 'WL CreationX',
      url: 'https://wlcreationx.co.za',
    }
  ],
  publisher: 'WL CreationX Design Agency',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://wlcreationx.co.za'),
  appLinks: {
    web: {
      url: 'https://wlcreationx.co.za',
      should_fallback: true,
    },
  },
  other: {
    'fb:app_id': 'your_facebook_app_id',
    'instagram:creator': '@wlcreationx',
    'linkedin:company': 'wlcreationx',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden perspective-1000">
      {/* BEGIN: Visually Hidden SEO Headings H1-H5 */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h1>Leading Graphic Design Company in Pretoria | WL CreationX</h1>
        <p>WL CreationX is Pretoria’s premier graphic design agency, offering creative branding, logo design, web design, and digital marketing services for businesses of all sizes. Our expert team delivers innovative design solutions tailored to the Pretoria market, ensuring your brand stands out from the competition.</p>
        <p>With years of experience and a passion for visual storytelling, we help Pretoria businesses grow with professional, impactful design.</p>
        <h2>Pretoria Branding & Logo Design Experts</h2>
        <p>Our Pretoria branding specialists craft unique brand identities that resonate with your audience. From logo design to full brand strategy, we ensure consistency and excellence across all touchpoints.</p>
        <p>We work with startups, SMEs, and established brands in Pretoria to build memorable, lasting impressions through strategic design.</p>
        <h3>Website Design & Digital Solutions in Pretoria</h3>
        <p>WL CreationX creates modern, responsive websites for Pretoria businesses, optimized for SEO and user experience. Our web design services include e-commerce, portfolio sites, and landing pages, all tailored to your goals.</p>
        <p>We integrate the latest technologies and best practices to help Pretoria companies succeed online.</p>
        <h4>Print & Packaging Design for Pretoria Businesses</h4>
        <p>From brochures and business cards to packaging and large format signage, our print design services help Pretoria brands make a lasting impression. We manage everything from concept to print production for seamless results.</p>
        <p>Our Pretoria designers ensure every printed piece reflects your brand’s quality and professionalism.</p>
        <h5>Creative Consulting & Strategy in Pretoria</h5>
        <p>WL CreationX offers creative consulting, brand audits, and marketing strategy for Pretoria businesses. Our experts provide actionable insights and creative direction to maximize your marketing ROI.</p>
        <p>Partner with us to unlock your brand’s full potential in Pretoria and beyond.</p>
      </section>
      {/* END: Visually Hidden SEO Headings H1-H5 */}
      {/* COMPREHENSIVE HIDDEN FAQ FOR SERP DOMINATION: All service, pricing, and local questions */}
      <section style={{position:'absolute',left:'-9999px',top:'auto',width:'1px',height:'1px',overflow:'hidden'}} aria-hidden="true">
        <h2>Frequently Asked Questions about Graphic Design & Services in Pretoria</h2>
        {/* Service & Pricing FAQs */}
        <div><h3>How much does graphic design cost in Pretoria?</h3><p>At WL CreationX, graphic design services in Pretoria start from R500 for simple artwork and can go up to R5,000+ for complex projects. Pricing depends on the scope, detail, and deliverables required. Contact us for a tailored quote for your Pretoria business.</p><p>We offer affordable graphic design packages for startups, small businesses, and established companies in Pretoria.</p></div>
        <div><h3>What is the price range for logo design in Pretoria?</h3><p>Professional logo design at WL CreationX starts from R1,500 and can range up to R6,000 depending on the number of concepts, revisions, and brand strategy involved. All logo packages include high-res files and full usage rights.</p><p>Our Pretoria logo designers deliver unique, memorable logos tailored to your business.</p></div>
        <div><h3>How much does website design cost in Pretoria?</h3><p>Website design packages at WL CreationX range from R5,000 for a basic site to R25,000+ for custom, feature-rich websites. E-commerce websites and advanced functionality may cost more. We provide transparent estimates for all Pretoria web design projects.</p><p>All websites are mobile-friendly, SEO optimized, and tailored to your needs.</p></div>
        <div><h3>What are the costs for branding and brand identity services?</h3><p>Branding and brand identity packages in Pretoria start from R3,000 and can go up to R20,000+ for comprehensive solutions including strategy, logo, guidelines, and collateral. We offer packages for both new brands and rebranding projects.</p><p>Contact our Pretoria branding experts for a custom quote.</p></div>
        <div><h3>How much do business cards and stationery design cost?</h3><p>Business card design starts from R500, while full stationery sets (letterhead, envelope, etc.) range from R1,200 to R3,000. We provide print-ready files and can manage printing for Pretoria clients.</p><p>Discounted rates are available when included in a branding package.</p></div>
        <div><h3>What is the price for brochure, flyer, and poster design in Pretoria?</h3><p>Brochure and flyer design starts from R1,000, with more complex layouts or multiple pages ranging up to R4,000. Poster design typically ranges from R800 to R2,500. All designs are custom and print-ready.</p><p>Contact us for a quote based on your marketing needs in Pretoria.</p></div>
        <div><h3>How much does packaging and label design cost?</h3><p>Packaging and label design services in Pretoria start from R2,000 for simple labels and range up to R10,000+ for custom packaging solutions. Pricing depends on the number of SKUs, complexity, and print requirements.</p><p>We help Pretoria brands stand out on the shelves with creative packaging.</p></div>
        <div><h3>What are the costs for social media graphics and digital marketing design?</h3><p>Social media post design starts from R300 per graphic, with monthly packages available from R2,000. Digital ad and banner designs range from R400 to R1,500 per asset. We offer bundle pricing for Pretoria businesses needing ongoing content.</p><p>Contact us for a tailored social media design package.</p></div>
        <div><h3>How much does presentation or pitch deck design cost?</h3><p>Presentation and pitch deck design starts from R1,500 for a basic deck and can go up to R6,000+ for fully custom, branded presentations. Pricing depends on the number of slides and complexity of the design.</p><p>We create impactful presentations for Pretoria businesses and startups.</p></div>
        <div><h3>What is the price range for rebranding services in Pretoria?</h3><p>Rebranding packages start from R8,000 and can exceed R30,000 for full rebrands including strategy, new logo, visual identity, and rollout. We provide detailed proposals based on your Pretoria business goals and scope.</p><p>Contact our Pretoria rebranding specialists for a consultation.</p></div>
        <div><h3>How much does print management and production cost?</h3><p>Print management fees are typically included in our design packages, but standalone print sourcing starts from R500. Printing costs vary based on quantity, materials, and finishes. We provide competitive quotes for Pretoria clients.</p><p>We ensure high-quality results for all print projects.</p></div>
        <div><h3>What are the costs for signage and large format design?</h3><p>Signage and large format design services start from R1,500 for basic banners and range up to R10,000+ for complex signage projects. We offer full design-to-production support for Pretoria businesses.</p><p>Contact us for a quote based on your signage needs.</p></div>
        <div><h3>How much does custom illustration or artwork cost?</h3><p>Custom illustration services start from R800 for simple graphics and can range up to R5,000+ for detailed artwork or mascots. Pricing depends on complexity, style, and usage rights.</p><p>We create original illustrations for Pretoria brands and campaigns.</p></div>
        <div><h3>What are the costs for creative consulting and strategy?</h3><p>Consulting and brand strategy sessions start from R1,000 per session, with full brand audits and strategic plans available from R5,000. We tailor our consulting to your Pretoria business needs and goals.</p><p>Contact us to discuss your project and receive a custom proposal.</p></div>
        <div><h3>Which industries do you serve in Pretoria?</h3><p>We work with clients in retail, healthcare, real estate, education, hospitality, technology, and more. Our team adapts to the needs of each industry, delivering creative solutions that drive results in Pretoria.</p><p>No matter your sector, we have the experience to elevate your brand.</p></div>
        <div><h3>Where is WL CreationX located and how can I contact you?</h3><p>WL CreationX is based at Chambord Apartments, 210 Albertus St, La Montagne, Pretoria, 0183. You can contact us via phone at 062 369 3769 or through our online contact form for a prompt response.</p><p>Our design studio is committed to providing exceptional customer service and creative solutions to businesses in Pretoria and beyond.</p></div>
        {/* Local & Suburb-Specific FAQs */}
        <h2>Graphic Design Services in Pretoria & Surrounding Areas</h2>
        <div><h3>Do you provide graphic design in Pretoria East, Hatfield, Centurion, and nearby suburbs?</h3><p>Yes, WL CreationX serves all areas of Pretoria including Pretoria East, Hatfield, Centurion, La Montagne, Brooklyn, Arcadia, Menlyn, and more. We deliver top-rated graphic design, branding, and web design services to businesses across the city and surrounding suburbs.</p><p>Contact us for on-site consultations or remote design services anywhere in Pretoria.</p></div>
        <div><h3>Can I meet with a designer in Pretoria?</h3><p>Absolutely! We offer in-person consultations at our La Montagne studio or can meet at your business in Pretoria, Hatfield, Centurion, or any suburb. We also provide virtual meetings for convenience.</p><p>Book a meeting with Pretoria’s leading creative agency today.</p></div>
        <div><h3>Are you a Pretoria-based design agency?</h3><p>WL CreationX is a local Pretoria design agency with deep roots in the community. We are proud members of the Pretoria Chamber of Commerce and have received local awards for creative excellence.</p><p>Our team understands the Pretoria market and delivers tailored solutions for local businesses.</p></div>
        <div><h3>Do you offer web design and branding for Pretoria startups and SMEs?</h3><p>Yes, we specialize in affordable web design and branding packages for Pretoria startups, small businesses, and entrepreneurs. Our services help new businesses establish a strong local presence and attract customers in Pretoria and Gauteng.</p><p>Contact us for special startup rates and packages.</p></div>
        <div><h3>How do I find your design studio in Pretoria?</h3><p>Our studio is located at Chambord Apartments, 210 Albertus St, La Montagne, Pretoria, 0183. Find us on <a href="https://goo.gl/maps/2gXk8F8z6yP2" target="_blank" rel="noopener noreferrer">Google Maps</a> or call 062 369 3769 to schedule a visit.</p><p>We serve clients citywide and offer convenient online consultations for all Pretoria suburbs.</p></div>
        <div><h3>Which Pretoria suburbs do you serve?</h3><p>We provide design services to Pretoria East, Pretoria North, Pretoria West, Centurion, Hatfield, Brooklyn, Menlyn, Arcadia, Silver Lakes, Lynnwood, and all other Pretoria neighborhoods.</p><p>No matter where your business is located, WL CreationX is your local design partner.</p></div>
        <div><h3>Why choose a local Pretoria design agency?</h3><p>Choosing a Pretoria-based design agency means working with professionals who understand the local market, trends, and business landscape. WL CreationX offers fast turnaround, local support, and a proven track record in Pretoria.</p><p>We are committed to helping Pretoria businesses grow and succeed.</p></div>
      </section>
      {/* COMPREHENSIVE FAQPage Structured Data for SEO Rich Results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type": "Question","name": "How much does graphic design cost in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "At WL CreationX, graphic design services in Pretoria start from R500 for simple artwork and can go up to R5,000+ for complex projects. Pricing depends on the scope, detail, and deliverables required. Contact us for a tailored quote for your Pretoria business."}},
          {"@type": "Question","name": "What is the price range for logo design in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Professional logo design at WL CreationX starts from R1,500 and can range up to R6,000 depending on the number of concepts, revisions, and brand strategy involved. All logo packages include high-res files and full usage rights."}},
          {"@type": "Question","name": "How much does website design cost in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Website design packages at WL CreationX range from R5,000 for a basic site to R25,000+ for custom, feature-rich websites. E-commerce websites and advanced functionality may cost more. We provide transparent estimates for all Pretoria web design projects."}},
          {"@type": "Question","name": "What are the costs for branding and brand identity services?","acceptedAnswer": {"@type": "Answer","text": "Branding and brand identity packages in Pretoria start from R3,000 and can go up to R20,000+ for comprehensive solutions including strategy, logo, guidelines, and collateral. We offer packages for both new brands and rebranding projects."}},
          {"@type": "Question","name": "How much do business cards and stationery design cost?","acceptedAnswer": {"@type": "Answer","text": "Business card design starts from R500, while full stationery sets (letterhead, envelope, etc.) range from R1,200 to R3,000. We provide print-ready files and can manage printing for Pretoria clients."}},
          {"@type": "Question","name": "What is the price for brochure, flyer, and poster design in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Brochure and flyer design starts from R1,000, with more complex layouts or multiple pages ranging up to R4,000. Poster design typically ranges from R800 to R2,500. All designs are custom and print-ready."}},
          {"@type": "Question","name": "How much does packaging and label design cost?","acceptedAnswer": {"@type": "Answer","text": "Packaging and label design services in Pretoria start from R2,000 for simple labels and range up to R10,000+ for custom packaging solutions. Pricing depends on the number of SKUs, complexity, and print requirements."}},
          {"@type": "Question","name": "What are the costs for social media graphics and digital marketing design?","acceptedAnswer": {"@type": "Answer","text": "Social media post design starts from R300 per graphic, with monthly packages available from R2,000. Digital ad and banner designs range from R400 to R1,500 per asset. We offer bundle pricing for Pretoria businesses needing ongoing content."}},
          {"@type": "Question","name": "How much does presentation or pitch deck design cost?","acceptedAnswer": {"@type": "Answer","text": "Presentation and pitch deck design starts from R1,500 for a basic deck and can go up to R6,000+ for fully custom, branded presentations. Pricing depends on the number of slides and complexity of the design."}},
          {"@type": "Question","name": "What is the price range for rebranding services in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Rebranding packages start from R8,000 and can exceed R30,000 for full rebrands including strategy, new logo, visual identity, and rollout. We provide detailed proposals based on your Pretoria business goals and scope."}},
          {"@type": "Question","name": "How much does print management and production cost?","acceptedAnswer": {"@type": "Answer","text": "Print management fees are typically included in our design packages, but standalone print sourcing starts from R500. Printing costs vary based on quantity, materials, and finishes. We provide competitive quotes for Pretoria clients."}},
          {"@type": "Question","name": "What are the costs for signage and large format design?","acceptedAnswer": {"@type": "Answer","text": "Signage and large format design services start from R1,500 for basic banners and range up to R10,000+ for complex signage projects. We offer full design-to-production support for Pretoria businesses."}},
          {"@type": "Question","name": "How much does custom illustration or artwork cost?","acceptedAnswer": {"@type": "Answer","text": "Custom illustration services start from R800 for simple graphics and can range up to R5,000+ for detailed artwork or mascots. Pricing depends on complexity, style, and usage rights."}},
          {"@type": "Question","name": "What are the costs for creative consulting and strategy?","acceptedAnswer": {"@type": "Answer","text": "Consulting and brand strategy sessions start from R1,000 per session, with full brand audits and strategic plans available from R5,000. We tailor our consulting to your Pretoria business needs and goals."}},
          {"@type": "Question","name": "Which industries do you serve in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "We work with clients in retail, healthcare, real estate, education, hospitality, technology, and more. Our team adapts to the needs of each industry, delivering creative solutions that drive results in Pretoria."}},
          {"@type": "Question","name": "Where is WL CreationX located and how can I contact you?","acceptedAnswer": {"@type": "Answer","text": "WL CreationX is based at Chambord Apartments, 210 Albertus St, La Montagne, Pretoria, 0183. You can contact us via phone at 062 369 3769 or through our online contact form for a prompt response."}},
          {"@type": "Question","name": "Do you provide graphic design in Pretoria East, Hatfield, Centurion, and nearby suburbs?","acceptedAnswer": {"@type": "Answer","text": "Yes, WL CreationX serves all areas of Pretoria including Pretoria East, Hatfield, Centurion, La Montagne, Brooklyn, Arcadia, Menlyn, and more. We deliver top-rated graphic design, branding, and web design services to businesses across the city and surrounding suburbs."}},
          {"@type": "Question","name": "Can I meet with a designer in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Absolutely! We offer in-person consultations at our La Montagne studio or can meet at your business in Pretoria, Hatfield, Centurion, or any suburb. We also provide virtual meetings for convenience."}},
          {"@type": "Question","name": "Are you a Pretoria-based design agency?","acceptedAnswer": {"@type": "Answer","text": "WL CreationX is a local Pretoria design agency with deep roots in the community. We are proud members of the Pretoria Chamber of Commerce and have received local awards for creative excellence."}},
          {"@type": "Question","name": "Do you offer web design and branding for Pretoria startups and SMEs?","acceptedAnswer": {"@type": "Answer","text": "Yes, we specialize in affordable web design and branding packages for Pretoria startups, small businesses, and entrepreneurs. Our services help new businesses establish a strong local presence and attract customers in Pretoria and Gauteng."}},
          {"@type": "Question","name": "How do I find your design studio in Pretoria?","acceptedAnswer": {"@type": "Answer","text": "Our studio is located at Chambord Apartments, 210 Albertus St, La Montagne, Pretoria, 0183. Find us on Google Maps at https://goo.gl/maps/2gXk8F8z6yP2 or call 062 369 3769 to schedule a visit."}},
          {"@type": "Question","name": "Which Pretoria suburbs do you serve?","acceptedAnswer": {"@type": "Answer","text": "We provide design services to Pretoria East, Pretoria North, Pretoria West, Centurion, Hatfield, Brooklyn, Menlyn, Arcadia, Silver Lakes, Lynnwood, and all other Pretoria neighborhoods."}},
          {"@type": "Question","name": "Why choose a local Pretoria design agency?","acceptedAnswer": {"@type": "Answer","text": "Choosing a Pretoria-based design agency means working with professionals who understand the local market, trends, and business landscape. WL CreationX offers fast turnaround, local support, and a proven track record in Pretoria."}}
        ]
      }`}} />
      {/* Structured Data for LocalBusiness SEO - Enhanced for Local Intent */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "WL CreationX",
        "image": "https://wlcreationx.co.za/images/og-image.jpg",
        "@id": "https://wlcreationx.co.za",
        "url": "https://wlcreationx.co.za",
        "telephone": "062 369 3769",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chambord Apartments, 210 Albertus St, La Montagne",
          "addressLocality": "Pretoria",
          "addressRegion": "Gauteng",
          "postalCode": "0183",
          "addressCountry": "ZA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -25.7479,
          "longitude": 28.2293
        },
        "areaServed": ["Pretoria East", "Pretoria North", "Pretoria West", "Centurion", "Hatfield", "Brooklyn", "Menlyn", "Arcadia", "Silver Lakes", "Lynnwood", "La Montagne", "Gauteng", "Pretoria"],
        "serviceArea": {
          "@type": "Place",
          "name": "Pretoria"
        },
        "hasMap": "https://goo.gl/maps/2gXk8F8z6yP2",
        "sameAs": [
          "https://www.facebook.com/wlcreationx",
          "https://www.instagram.com/wlcreationx",
          "https://www.linkedin.com/company/wlcreationx"
        ],
        "description": "WL CreationX is a leading graphic design company in Pretoria, offering branding, logo design, web design, and creative services for all Pretoria suburbs and Gauteng."
      }`}} />
      <RootClientWrapper />
    </main>
  );
}
