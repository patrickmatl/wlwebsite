'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  description: string;
}

const PortfolioModal = ({ isOpen, onClose, src, alt, description }: PortfolioModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-7xl mx-auto px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <span className="sr-only">Close modal</span>
              <FaTimes size={24} />
            </button>
            <div className="p-8">
              <div className="relative aspect-square">
                <Image
                  src={src}
                  alt={alt}
                  width={1028}
                  height={1024}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-[#FFD700]">{alt}</h3>
                <p className="mt-2 text-gray-300">{description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;
