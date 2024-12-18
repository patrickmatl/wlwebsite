'use client';

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FAQAccordion: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="border border-[#FFD700]/20 rounded-lg overflow-hidden bg-zinc-900/50"
        >
          <button
            className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-800/50 transition-all duration-200"
            onClick={() => handleClick(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-xl font-semibold text-[#FFD700] pr-8">{faq.question}</span>
            <FaChevronDown 
              className={`text-[#FFD700] transform transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`transition-all duration-200 ${
              openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 text-gray-300 bg-zinc-800/30">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
