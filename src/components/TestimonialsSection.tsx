'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    content: "WL CreationX transformed our online presence completely. Their attention to detail and creative approach helped us stand out in a competitive market.",
    author: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Solutions"
  },
  {
    id: 2,
    content: "Working with WL CreationX was a game-changer for our business. Their digital marketing strategy increased our leads by 200% in just three months.",
    author: "Michael Chen",
    position: "Marketing Director",
    company: "Global Innovations"
  },
  {
    id: 3,
    content: "The team at WL CreationX is exceptional. They not only delivered a stunning website but also provided valuable insights to improve our digital strategy.",
    author: "Emma Williams",
    position: "Founder",
    company: "Creative Minds"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Client Testimonials
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 rounded-xl p-8 md:p-12"
          >
            {/* Quote Icon */}
            <svg
              className="w-12 h-12 text-[#FFD700]/20 mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Testimonial Content */}
            <blockquote className="text-xl md:text-2xl text-white mb-8">
              "{testimonials[activeIndex].content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[#FFD700] font-bold">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-neutral-400 text-sm">
                  {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 text-white hover:text-[#FFD700] transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 text-white hover:text-[#FFD700] transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-xl" />
        </div>
      </div>
    </section>
  );
}
