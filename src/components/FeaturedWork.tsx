'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const featuredProjects = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'Branding',
    image: '/images/portfolio/brand-identity.jpg',
    link: '/portfolio/brand-identity'
  },
  {
    id: 2,
    title: 'E-commerce Website',
    category: 'Web Development',
    image: '/images/portfolio/ecommerce.jpg',
    link: '/portfolio/ecommerce'
  },
  {
    id: 3,
    title: 'Digital Marketing Campaign',
    category: 'Marketing',
    image: '/images/portfolio/digital-marketing.jpg',
    link: '/portfolio/digital-marketing'
  }
];

export default function FeaturedWork() {
  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-syne font-bold text-white mb-4">
            Featured Work
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore our latest projects and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={project.link} className="block group">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[#FFD700] text-sm mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-syne font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300">
                      {project.title}
                    </h3>
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
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
