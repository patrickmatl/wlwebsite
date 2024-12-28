'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'Modern E-commerce Platform',
    description: 'A fully responsive e-commerce solution with advanced features',
    image: '/images/projects/ecommerce-platform.jpg',
    category: 'Web Development',
    link: '/portfolio/ecommerce-platform'
  },
  {
    id: 2,
    title: 'Brand Identity System',
    description: 'Complete brand identity design for a tech startup',
    image: '/images/projects/brand-identity.jpg',
    category: 'Branding',
    link: '/portfolio/brand-identity'
  },
  {
    id: 3,
    title: 'Digital Marketing Campaign',
    description: 'Successful marketing campaign with measurable results',
    image: '/images/projects/marketing-campaign.jpg',
    category: 'Marketing',
    link: '/portfolio/marketing-campaign'
  },
  {
    id: 4,
    title: 'Mobile App Design',
    description: 'User-centric mobile app design for a fitness platform',
    image: '/images/projects/mobile-app.jpg',
    category: 'UI/UX Design',
    link: '/portfolio/mobile-app'
  }
];

export default function LatestProjects() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mb-4">
            Latest Projects
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore our most recent work and see how we help businesses achieve their digital goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={project.link} className="block group">
                <div className="relative overflow-hidden rounded-xl">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                  </div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[#FFD700] text-sm mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-syne font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-neutral-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black rounded-full transition-all duration-300"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
