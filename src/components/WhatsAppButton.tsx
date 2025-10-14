'use client';

import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumberIntl = '27623693789'; // +27 62 369 3789 without symbols for wa.me
  const message = encodeURIComponent("Hi WL CreationX, I'd like to chat about a project.");
  const whatsappHref = `https://wa.me/${phoneNumberIntl}?text=${message}`;
  const telHref = `tel:+${phoneNumberIntl}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-3">
      {/* WhatsApp icon button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-[#25D366] hover:bg-[#1ebe57] transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <FaWhatsapp size={24} className="text-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>

      {/* Tel fallback icon button */}
      <a
        href={telHref}
        aria-label="Call WL CreationX"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-black/70 border border-white/20 hover:bg-black/85 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <FaPhone size={20} className="text-white" />
        <span className="sr-only">Call WL CreationX</span>
      </a>
    </div>
  );
}