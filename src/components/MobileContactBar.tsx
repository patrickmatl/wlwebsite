'use client';

import React from 'react';
import { BUSINESS } from '@/data/business';

const PHONE_DISPLAY = BUSINESS.phoneDisplay;
const PHONE_E164 = BUSINESS.whatsappNumber;

export default function MobileContactBar() {
  const waUrl = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent('Hi WL CreationX 👋, I’d like to chat about design services.')}`;
  const telUrl = `tel:${BUSINESS.phoneE164}`;

  return (
    <div className="fixed inset-x-0 bottom-2 z-50 md:hidden">
      <div className="bg-black/85 backdrop-blur border-t border-neutral-800 px-3 pb-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-3 shadow-[0_-6px_20px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-black bg-[#25D366] hover:bg-[#1ebe5a] active:scale-[0.99] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M16.793 16.793a8 8 0 1 0-9.586 0L4 20l3.207-1.207Z" fill="#25D366" />
              <path d="M9.5 8.75c-.414 0-.75.336-.75.75 0 2.485 2.015 4.5 4.5 4.5.414 0 .75-.336.75-.75 0-.414-.336-.75-.75-.75-.966 0-1.75-.784-1.75-1.75 0-.414-.336-.75-.75-.75Z" fill="#0b3d2b" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <a
            href={telUrl}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-black bg-[#FFD700] hover:bg-[#FFC000] active:scale-[0.99] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M2 5a3 3 0 0 1 3-3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-.586 1.414l-1 1A12.954 12.954 0 0 0 15.586 18l1-1A2 2 0 0 1 18 16h2a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3h-1C8.82 23 1 15.18 1 6V5Z" />
            </svg>
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}