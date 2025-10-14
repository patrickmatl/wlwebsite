'use client';

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
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-white">
          <path fill="currentColor" d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88a11.7 11.7 0 0 0 1.53 5.82L0 24l6.46-1.67a11.8 11.8 0 0 0 5.6 1.43h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.18-1.24-6.16-3.43-8.4Zm-8.46 18.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.2-3.83 1 1.02-3.73-.23-.38a9.9 9.9 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.03 2.9a9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.47-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.17-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.38.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.43.25-.71.25-1.31.17-1.44-.08-.13-.27-.2-.57-.35Z"/>
        </svg>
        <span className="sr-only">Chat on WhatsApp</span>
      </a>

      {/* Tel fallback icon button */}
      <a
        href={telHref}
        aria-label="Call WL CreationX"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-black/70 border border-white/20 hover:bg-black/85 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-white">
          <path fill="currentColor" d="M2 5a3 3 0 0 1 3-3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-.586 1.414l-1 1A12.954 12.954 0 0 0 15.586 18l1-1A2 2 0 0 1 18 16h2a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3h-1C8.82 23 1 15.18 1 6V5Z" />
        </svg>
        <span className="sr-only">Call WL CreationX</span>
      </a>
    </div>
  );
}