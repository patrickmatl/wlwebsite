import { Metadata } from 'next';
import { FaBriefcase, FaGraduationCap, FaHandshake, FaRocket, FaUsers, FaLightbulb } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Design & Development Careers Pretoria',
  description: 'Join the WL CreationX team in Pretoria. We hire talented graphic designers, developers and creative professionals who want to shape great design work.',
  alternates: {
    canonical: 'https://wlcreationx.co.za/join-our-team-pretoria',
  },
  openGraph: {
    title: 'Design & Development Careers Pretoria',
    description: 'Join the WL CreationX team in Pretoria. We hire talented graphic designers, developers and creative professionals who want to shape great design work.',
    url: 'https://wlcreationx.co.za/join-our-team-pretoria',
    siteName: 'WL CreationX',
    locale: 'en_ZA',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
};

const positions = [
  {
    title: 'Graphic Designer',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'We\'re seeking talented graphic designers who can create stunning visual solutions across various mediums.',
    requirements: [
      'Bachelor\'s degree in Graphic Design or related field',
      'Minimum 2-3 years of professional design experience',
      'Strong portfolio demonstrating versatility and creativity',
      'Expert knowledge of Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Experience with Figma and other modern design tools',
      'Understanding of typography, color theory, and layout principles',
      'Strong attention to detail and ability to meet deadlines',
      'Excellent communication and collaboration skills'
    ],
    responsibilities: [
      'Create compelling visual designs for print and digital media',
      'Develop brand identities and guidelines',
      'Design marketing materials and social media content',
      'Collaborate with clients and team members',
      'Ensure brand consistency across all deliverables',
      'Stay current with design trends and best practices'
    ]
  },
  {
    title: 'Video Editor',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Looking for a creative video editor to produce high-quality content for our clients.',
    requirements: [
      'Proven experience in video editing and post-production',
      'Expert knowledge of Adobe Premiere Pro and After Effects',
      'Experience with DaVinci Resolve is a plus',
      'Understanding of video production workflows',
      'Strong storytelling abilities',
      'Knowledge of audio editing and sound design',
      'Ability to work with various video formats and codecs',
      'Eye for detail and timing'
    ],
    responsibilities: [
      'Edit and assemble raw footage into compelling final products',
      'Create motion graphics and visual effects',
      'Color correction and grading',
      'Sound editing and mixing',
      'Collaborate with creative team on video concepts',
      'Maintain project organization and file management'
    ]
  },
  {
    title: 'Web Designer/Developer',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Seeking a talented web designer/developer who can create beautiful, functional websites.',
    requirements: [
      'Strong proficiency in HTML5, CSS3, and JavaScript',
      'Experience with React.js and Next.js',
      'WordPress development expertise',
      'Understanding of responsive design principles',
      'Knowledge of UI/UX best practices',
      'Experience with version control (Git)',
      'Familiarity with SEO principles',
      'Portfolio demonstrating web projects'
    ],
    responsibilities: [
      'Design and develop responsive websites',
      'Create interactive user interfaces',
      'Implement WordPress themes and plugins',
      'Optimize websites for performance',
      'Maintain and update existing websites',
      'Collaborate with designers and developers'
    ]
  },
  {
    title: 'Motion Designer',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Looking for a creative motion designer to bring designs to life through animation.',
    requirements: [
      'Strong background in motion design and animation',
      'Expert knowledge of After Effects and Cinema 4D',
      'Experience with character animation',
      'Understanding of timing and movement principles',
      'Knowledge of current motion design trends',
      'Strong portfolio showing motion work',
      'Ability to work within brand guidelines'
    ],
    responsibilities: [
      'Create engaging motion graphics and animations',
      'Develop animated brand elements',
      'Design UI animations for websites and apps',
      'Create social media animations',
      'Collaborate with the creative team',
      'Maintain consistency in animated content'
    ]
  },
  {
    title: 'UI/UX Designer',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Seeking a UI/UX designer to create intuitive and engaging digital experiences.',
    requirements: [
      'Proven experience in UI/UX design',
      'Expert knowledge of Figma and other design tools',
      'Understanding of user-centered design principles',
      'Experience with prototyping tools',
      'Knowledge of accessibility standards',
      'Strong portfolio showing UI/UX projects',
      'Excellent problem-solving skills'
    ],
    responsibilities: [
      'Design user interfaces for web and mobile',
      'Create user flows and wireframes',
      'Conduct user research and testing',
      'Develop interactive prototypes',
      'Create design systems and guidelines',
      'Collaborate with developers and stakeholders'
    ]
  },
  {
    title: 'Digital Marketing Specialist',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Looking for a digital marketing specialist to drive online presence and growth.',
    requirements: [
      'Experience in digital marketing strategies',
      'Knowledge of SEO/SEM principles',
      'Social media marketing expertise',
      'Analytics and reporting skills',
      'Content creation abilities',
      'Understanding of email marketing',
      'Experience with marketing tools and platforms'
    ],
    responsibilities: [
      'Develop digital marketing strategies',
      'Manage social media presence',
      'Create and optimize content',
      'Monitor and analyze campaign performance',
      'Coordinate with design team for assets',
      'Stay current with digital marketing trends'
    ]
  },
  {
    title: 'Office Administrator',
    type: 'Full-time',
    location: 'Pretoria',
    description: 'Seeking an organized and efficient office administrator to support our growing creative agency.',
    requirements: [
      'Relevant administrative qualification or equivalent experience',
      'Minimum 2 years of office administration experience',
      'Excellent organizational and time management skills',
      'Proficiency in Microsoft Office Suite',
      'Strong communication skills in English',
      'Experience with CRM systems',
      'Ability to multitask and prioritize effectively',
      'Professional phone manner and email etiquette'
    ],
    responsibilities: [
      'Manage office operations and administrative tasks',
      'Handle client inquiries and correspondence',
      'Coordinate meetings and maintain calendars',
      'Process invoices and manage basic bookkeeping',
      'Organize and maintain digital and physical files',
      'Support project management and team coordination',
      'Assist with HR administrative tasks',
      'Manage office supplies and equipment'
    ]
  },
  {
    title: 'Professional Photographer',
    type: 'Full-time',
    location: 'Pretoria / On-Location',
    description: 'Looking for a talented photographer to capture stunning images for our clients across various industries.',
    requirements: [
      'Professional photography qualification or equivalent experience',
      'Minimum 3 years of commercial photography experience',
      'Expert knowledge of professional camera equipment',
      'Proficiency in Adobe Lightroom and Photoshop',
      'Strong portfolio demonstrating versatility',
      'Experience with studio and location lighting',
      'Knowledge of product and portrait photography',
      'Ability to work flexible hours when needed'
    ],
    responsibilities: [
      'Conduct professional photo shoots for clients',
      'Execute product photography sessions',
      'Capture corporate events and portraits',
      'Edit and retouch photographs',
      'Maintain photography equipment',
      'Collaborate with creative team on concepts',
      'Meet tight deadlines and quality standards',
      'Archive and organize photo libraries'
    ]
  },
  {
    title: 'Videographer',
    type: 'Full-time',
    location: 'Pretoria / On-Location',
    description: 'Seeking a creative videographer to produce high-quality video content for our clients.',
    requirements: [
      'Proven experience in videography and film production',
      'Expert knowledge of professional video equipment',
      'Experience with different camera systems and gimbals',
      'Understanding of lighting and audio recording',
      'Proficiency in video editing software',
      'Strong portfolio of video work',
      'Ability to work independently and in teams',
      'Valid driver\'s license and own transport'
    ],
    responsibilities: [
      'Plan and execute video shoots',
      'Set up lighting and audio equipment',
      'Capture high-quality footage',
      'Direct subjects during filming',
      'Coordinate with clients and team members',
      'Ensure proper equipment maintenance',
      'Travel to various shooting locations',
      'Maintain project timelines and quality'
    ]
  },
  {
    title: 'Senior Video Editor',
    type: 'Full-time',
    location: 'Pretoria / Hybrid',
    description: 'Looking for an experienced video editor to create compelling visual stories and manage post-production.',
    requirements: [
      'Minimum 5 years of professional video editing experience',
      'Advanced knowledge of Adobe Premiere Pro and After Effects',
      'Experience with DaVinci Resolve',
      'Strong understanding of color grading',
      'Expertise in motion graphics',
      'Sound editing and mixing skills',
      'Project management experience',
      'Portfolio demonstrating diverse editing styles'
    ],
    responsibilities: [
      'Lead post-production projects',
      'Edit complex video content',
      'Create advanced motion graphics',
      'Perform color grading and correction',
      'Mix and master audio',
      'Train and mentor junior editors',
      'Manage post-production workflows',
      'Ensure quality control of deliverables'
    ]
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 to-black opacity-30" />
        <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            Join Our Creative Team
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Be part of a dynamic team that pushes creative boundaries and delivers exceptional digital experiences.
          </p>
          <button className="bg-[#FFD700] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFA500] transition-colors duration-300">
            View Open Positions
          </button>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            Why Join WL CreationX?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FaRocket,
                title: 'Innovation First',
                description: 'Work with cutting-edge technologies and push creative boundaries in a forward-thinking environment.'
              },
              {
                icon: FaUsers,
                title: 'Collaborative Culture',
                description: 'Join a diverse team that values creativity, mutual growth, and innovative thinking.'
              },
              {
                icon: FaGraduationCap,
                title: 'Growth Opportunities',
                description: 'Access continuous learning, professional development, and career advancement opportunities.'
              },
              {
                icon: FaHandshake,
                title: 'Work-Life Balance',
                description: 'Enjoy flexible working arrangements and a supportive environment that values your wellbeing.'
              },
              {
                icon: FaBriefcase,
                title: 'Competitive Benefits',
                description: 'Receive attractive compensation, health benefits, and performance incentives.'
              },
              {
                icon: FaRocket,
                title: 'Creative Freedom',
                description: 'Express your creativity and contribute to meaningful projects that make an impact.'
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="p-8 bg-zinc-900 rounded-xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
              >
                <benefit.icon className="w-12 h-12 text-[#FFD700] mb-6" />
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              Open Positions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our talented team and help shape the future of digital design. We're always looking for exceptional individuals who share our passion for creativity and innovation.
            </p>
          </div>

          <div className="grid gap-8">
            {positions.map((position, index) => (
              <div 
                key={index}
                className="bg-zinc-900 rounded-xl p-8 border border-[#FFD700]/20"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-[#FFD700]">{position.title}</h3>
                </div>

                {/* Job Meta Info */}
                <div className="flex gap-4 mb-6">
                  <span className="flex items-center text-gray-400">
                    <FaBriefcase className="w-5 h-5 mr-2 text-[#FFD700]" />
                    {position.type}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <FaUsers className="w-5 h-5 mr-2 text-[#FFD700]" />
                    {position.location}
                  </span>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-4 text-[#FFD700]">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-lg font-bold mb-4 text-[#FFD700]">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {position.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
            How to Apply
          </h2>

          {/* Email Application Box */}
          <div className="bg-zinc-900 rounded-xl border border-[#FFD700]/20 p-8 mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Send Your Application To:</h3>
              <a 
                href="mailto:careers@wlcreationx.co.za" 
                className="text-2xl text-[#FFD700] hover:text-[#FFA500] transition-colors duration-300"
              >
                careers@wlcreationx.co.za
              </a>
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-lg mb-8">
              <h4 className="text-[#FFD700] font-bold text-lg mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span> Important Email Requirements
              </h4>
              <p className="text-red-400 mb-4 font-bold">
                Applications without the correct subject line will not be considered.
              </p>
              <p className="text-gray-300 mb-4">Email subject line must be in the format:</p>
              <div className="bg-black/50 p-4 rounded-lg font-mono text-[#FFD700] text-center mb-2">
                Application: [Position Title]
              </div>
              <p className="text-sm text-gray-400 text-center">
                Example: "Application: Graphic Designer"
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold mb-4 text-[#FFD700]">Required Documents</h4>
                <ul className="space-y-3">
                  {[
                    'Detailed CV/Resume',
                    'Professional Cover Letter',
                    'Portfolio or Work Samples (where applicable)',
                    'References (minimum 2)',
                    'Position-specific requirements (as listed in job description)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-[#FFD700] mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Application Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Prepare Documents',
                description: 'Gather your CV, cover letter, and portfolio following our requirements.'
              },
              {
                step: '02',
                title: 'Send Email',
                description: 'Email your application with the correct subject line format.'
              },
              {
                step: '03',
                title: 'Initial Review',
                description: 'Our team will review your application and assess your qualifications.'
              },
              {
                step: '04',
                title: 'Interview Process',
                description: 'Selected candidates will be contacted for interviews and assessments.'
              }
            ].map((step, index) => (
              <div key={index} className="relative p-8 bg-zinc-900 rounded-xl border border-[#FFD700]/20">
                <div className="text-4xl font-bold text-[#FFD700]/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-4 text-[#FFD700]">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Final Note */}
          <div className="mt-12 text-center text-gray-400 max-w-3xl mx-auto">
            <p className="text-sm">
              <span className="text-[#FFD700]">Note:</span> Only shortlisted candidates will be contacted. 
              If you haven't heard from us within 14 days, please consider your application unsuccessful.
            </p>
          </div>
        </div>
      </section>

      {/* Internship & Learning Opportunities Section */}
      <section className="py-24 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              Start Your Creative Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Are you passionate about creative media but just starting out? We believe in nurturing fresh talent!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Internship Box */}
            <div className="bg-zinc-900/50 rounded-xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#FFD700]/10 p-3 rounded-full mr-4">
                  <FaGraduationCap className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-bold text-[#FFD700]">Internships</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Get hands-on experience in photography, videography, or content creation. Our internships offer real-world projects and mentorship from industry professionals.
              </p>
              <ul className="space-y-3">
                {[
                  'Learn industry-standard tools and techniques',
                  'Work on actual client projects',
                  'Receive guidance from experienced professionals',
                  'Build your professional portfolio',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <span className="text-[#FFD700] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiential Learning Box */}
            <div className="bg-zinc-900/50 rounded-xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-[#FFD700]/10 p-3 rounded-full mr-4">
                  <FaLightbulb className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-bold text-[#FFD700]">Experiential Learning</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Whether you're a student or career-changer, we offer practical learning opportunities to help you gain experience in creative media.
              </p>
              <ul className="space-y-3">
                {[
                  'Flexible learning arrangements',
                  'Practical skills development',
                  'Experience various aspects of media production',
                  'Network with industry professionals',
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <span className="text-[#FFD700] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to Apply Box */}
          <div className="bg-zinc-900 rounded-xl p-8 border border-[#FFD700]/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#FFD700]">Interested in Learning with Us?</h3>
            <p className="text-gray-300 mb-6 text-center">
              We're always excited to meet enthusiastic learners! Send us an email with:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'A brief introduction about yourself',
                'What area of creative media interests you most',
                'Your availability and preferred learning arrangement',
                'Any relevant coursework or projects (if available)',
              ].map((item, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <span className="text-[#FFD700] mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-center">
              <p className="text-gray-400 mb-4">Email us at:</p>
              <a 
                href="mailto:careers@wlcreationx.co.za" 
                className="text-xl text-[#FFD700] hover:text-[#FFA500] transition-colors duration-300"
              >
                careers@wlcreationx.co.za
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Subject Line: "Learning Opportunity: [Your Area of Interest]"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
