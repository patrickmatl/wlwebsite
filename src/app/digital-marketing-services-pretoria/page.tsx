import { Metadata } from 'next';
import { FaPalette, FaCode, FaMobileAlt, FaShoppingCart, FaSearch, FaPrint, FaMegaport, FaRegLightbulb, FaCamera, FaChartLine, FaComments, FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Marketing Services Pretoria',
  description: 'Digital marketing services in Pretoria: SEO, social media, content strategy, email marketing, PPC and analytics from WL CreationX, established in 2013.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/digital-marketing-services-pretoria',
  },
  openGraph: {
    title: 'Digital Marketing Services Pretoria | WL CreationX',
    description: 'Digital marketing services in Pretoria: SEO, social media, content strategy, email marketing, PPC and analytics from WL CreationX, established in 2013.',
    url: 'https://wlcreationx.co.za/digital-marketing-services-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

const services = [
  {
    icon: FaPalette,
    name: 'Brand Identity Design',
    description: 'Create a memorable brand identity that resonates with your audience. We craft unique logos, color palettes, and brand guidelines that tell your story.',
    features: [
      'Logo Design & Development',
      'Brand Guidelines',
      'Visual Identity Systems',
      'Brand Strategy',
      'Typography Selection',
      'Color Palette Development'
    ],
    image: '/images/services/branding.jpg'
  },
  {
    icon: FaCode,
    name: 'Web Design & Development',
    description: 'Custom website solutions that combine stunning design with powerful functionality. We create responsive, user-friendly websites that drive results.',
    features: [
      'Custom Website Design',
      'E-commerce Solutions',
      'Responsive Development',
      'CMS Integration',
      'Website Maintenance',
      'Performance Optimization'
    ],
    image: '/images/services/web-design.jpg'
  },
  {
    icon: FaMobileAlt,
    name: 'UI/UX Design',
    description: 'Create intuitive and engaging digital experiences. Our UI/UX design services focus on user-centered design principles to maximize engagement.',
    features: [
      'User Interface Design',
      'User Experience Design',
      'Wireframing & Prototyping',
      'Mobile App Design',
      'Usability Testing',
      'Interactive Design'
    ],
    image: '/images/services/ui-ux.jpg'
  },
  {
    icon: FaPrint,
    name: 'Print Design',
    description: 'Professional print design services that make a lasting impression. From business cards to billboards, we ensure your print materials stand out.',
    features: [
      'Business Cards & Stationery',
      'Brochures & Catalogs',
      'Packaging Design',
      'Large Format Printing',
      'Marketing Materials',
      'Publication Design'
    ],
    image: '/images/services/print.jpg'
  },
  {
    icon: FaSearch,
    name: 'Digital Marketing',
    description: 'Strategic digital marketing solutions to boost your online presence. We help you reach and engage your target audience effectively.',
    features: [
      'Social Media Marketing',
      'SEO Optimization',
      'Content Strategy',
      'Email Marketing',
      'PPC Campaigns',
      'Analytics & Reporting'
    ],
    image: '/images/services/digital-marketing.jpg'
  },
  {
    icon: FaMegaport,
    name: 'Motion Design',
    description: 'Bring your brand to life with dynamic motion graphics and animations. Create engaging visual content for all digital platforms.',
    features: [
      'Motion Graphics',
      'Video Production',
      'Animation',
      'Social Media Content',
      'Promotional Videos',
      'Interactive Media'
    ],
    image: '/images/services/motion.jpg'
  },
  {
    icon: FaCamera,
    name: 'Photography & Retouching',
    description: 'Professional photography and photo editing services to showcase your products, services, and brand in the best light possible.',
    features: [
      'Product Photography',
      'Corporate Photography',
      'Photo Retouching',
      'Image Manipulation',
      'Color Correction',
      'Photo Compositing'
    ],
    image: '/images/services/photography.jpg'
  },
  {
    icon: FaChartLine,
    name: 'Business Growth Strategy',
    description: 'Comprehensive business growth solutions combining design, marketing, and strategy to help your business reach its full potential.',
    features: [
      'Market Analysis',
      'Growth Planning',
      'Competitive Analysis',
      'Brand Positioning',
      'Marketing Strategy',
      'Performance Tracking'
    ],
    image: '/images/services/strategy.jpg'
  },
  {
    icon: FaComments,
    name: 'Social Media Management',
    description: 'Full-service social media management to build your brand presence and engage with your audience across all major platforms.',
    features: [
      'Content Creation',
      'Community Management',
      'Social Strategy',
      'Engagement Monitoring',
      'Campaign Management',
      'Analytics Reporting'
    ],
    image: '/images/services/social-media.jpg'
  },
  {
    icon: FaPencilAlt,
    name: 'Content Creation',
    description: 'Professional content creation services to tell your brand story and engage your audience with compelling narratives.',
    features: [
      'Copywriting',
      'Blog Writing',
      'Product Descriptions',
      'Email Newsletters',
      'Social Media Copy',
      'Content Strategy'
    ],
    image: '/images/services/content.jpg'
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/images/services-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#FFD700]">Digital Marketing &amp; Creative Services in Pretoria</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            SEO, Google Ads, social media, email and content marketing — backed by the design services to match
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Digital Marketing from Our Pretoria Studio</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            From our studio in Waterkloof Glen, Pretoria, we help businesses get found and grow online. Our digital marketing work covers{' '}
            <Link href="/pricing/seo-pretoria" className="text-[#FFD700] underline hover:text-[#FFE55C]">SEO</Link>,{' '}
            <Link href="/pricing/google-ads-pretoria" className="text-[#FFD700] underline hover:text-[#FFE55C]">Google Ads</Link>,{' '}
            <Link href="/pricing/social-media-pretoria" className="text-[#FFD700] underline hover:text-[#FFE55C]">social media marketing</Link>,{' '}
            <Link href="/pricing/email-marketing-pretoria" className="text-[#FFD700] underline hover:text-[#FFE55C]">email marketing</Link> and{' '}
            <Link href="/pricing/content-marketing-pretoria" className="text-[#FFD700] underline hover:text-[#FFE55C]">content marketing</Link>{' '}
            — each with clear pricing on its own page.
          </p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Because we are also a design studio, the same team that runs your campaigns can produce the branding, websites and creative assets they depend on. The full range of services is below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaPalette,
                title: 'Creative Excellence',
                description: 'Innovative designs that capture attention and inspire action'
              },
              {
                icon: FaRegLightbulb,
                title: 'Strategic Approach',
                description: 'Data-driven solutions aligned with your business goals'
              },
              {
                icon: FaShoppingCart,
                title: 'Results Driven',
                description: 'Focus on delivering measurable business outcomes'
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-all duration-300">
                <item.icon className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 gap-20">
            {services.map((service, index) => (
              <div key={service.name} className={`flex flex-col md:flex-row gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className="md:w-1/2">
                  <service.icon className="w-12 h-12 text-[#FFD700] mb-6" />
                  <h2 className="text-3xl font-bold mb-4 text-[#FFD700]">{service.name}</h2>
                  <p className="text-gray-300 text-lg mb-8">{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-[#FFD700]">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/get-in-touch-pretoria?service=${encodeURIComponent(service.name)}`}
                    className="inline-block mt-8 bg-[#FFD700] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#FFE55C] transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </div>
                
                <div className="md:w-1/2 relative">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20" />
                    <div 
                      className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#FFD700]">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something amazing together. Contact us to discuss your project and discover how we can help bring your vision to life.
          </p>
          <Link
            href="/get-in-touch-pretoria"
            className="inline-block bg-[#FFD700] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#FFE55C] transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Discovery',
                description: 'We start by understanding your goals, target audience, and project requirements.'
              },
              {
                number: '02',
                title: 'Strategy',
                description: 'Develop a comprehensive plan aligned with your business objectives.'
              },
              {
                number: '03',
                title: 'Creation',
                description: 'Our team brings your vision to life with attention to every detail.'
              },
              {
                number: '04',
                title: 'Delivery',
                description: 'Launch your project and ensure everything meets our high standards.'
              }
            ].map((step, index) => (
              <div key={index} className="relative p-6 bg-zinc-900 rounded-lg group hover:bg-zinc-800 transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FFD700] text-black rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
