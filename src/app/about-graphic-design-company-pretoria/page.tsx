import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About WL CreationX | Creative Design Agency Since 2013',
  description: 'Discover WL CreationX\' journey from 2013 to today. A creative powerhouse delivering innovative design solutions across South Africa.',
};

export default function AboutPage() {
  const milestones = [
    {
      year: '2013',
      title: 'The Beginning',
      description: 'Started as a passionate creative venture, offering design solutions to local businesses.'
    },
    {
      year: '2016',
      title: 'Official Registration',
      description: 'Formally registered as WL CreationX, marking our commitment to professional excellence.'
    },
    {
      year: '2018',
      title: 'Digital Expansion',
      description: 'Expanded our services to include comprehensive digital solutions and web development.'
    },
    {
      year: '2020',
      title: 'Remote Evolution',
      description: 'Adapted to serve clients nationwide through innovative remote collaboration.'
    },
    {
      year: '2023',
      title: 'Creative Innovation',
      description: 'Celebrating 10 years of creative excellence and continuous innovation.'
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#FFD700]">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A decade of turning creative visions into reality
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Journey</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Since our inception in 2013, WL CreationX has been at the forefront of creative innovation in South Africa. What started as a passionate venture has evolved into a full-service creative powerhouse, formally established in 2016.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey has been marked by continuous growth, adaptation, and an unwavering commitment to creative excellence. From brand identity to digital solutions, we've helped countless businesses transform their visual presence.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <Image
                src="/images/journey.jpg"
                alt="WL CreationX journey through the years"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing creative boundaries and embracing new technologies to deliver cutting-edge solutions.'
              },
              {
                title: 'Excellence',
                description: 'Maintaining the highest standards in every project, from concept to execution.'
              },
              {
                title: 'Partnership',
                description: 'Building lasting relationships with our clients through collaboration and trust.'
              }
            ].map((value, index) => (
              <div key={index} className="p-6 bg-black rounded-lg hover:bg-zinc-800 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Milestones</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-32">
                  <span className="text-2xl font-bold text-[#FFD700]">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 border-b border-zinc-800">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFD700]">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Creative Process</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Our creative process is built on understanding, innovation, and execution. We dive deep into each project, ensuring every detail aligns with our clients' vision while pushing creative boundaries.
              </p>
              <ul className="space-y-4">
                {[
                  'Deep client collaboration',
                  'Strategic creative planning',
                  'Innovative design solutions',
                  'Meticulous execution',
                  'Continuous refinement'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Since 2013, we've been committed to delivering excellence in every project. Our formal registration in 2016 strengthened this commitment, establishing us as a trusted partner in the creative industry.
              </p>
              <ul className="space-y-4">
                {[
                  'Client-focused approach',
                  'Quality-driven results',
                  'Innovative solutions',
                  'Timely delivery',
                  'Long-term partnerships'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-[#FFD700]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#FFD700]">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8">
            Let's create something amazing together. With a decade of experience and countless successful projects, we're ready to bring your vision to life.
          </p>
          <button className="bg-[#FFD700] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFE55C] transition-colors">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
