'use client';

import { useState } from 'react';
import PackageEnquiryModal from './PackageEnquiryModal';

/**
 * The "Get Started" button on a pricing package, with the form behind it.
 *
 * Kept as its own component so each pricing page swaps one dead <button> for
 * one working one and nothing else has to change — the pages differ in markup
 * far more than they differ in behaviour.
 */
/**
 * Styles mirror GetInTouchButton, which this replaces on pricing cards: the
 * className is merged onto the base rather than replacing it, so a card
 * passing "mt-auto w-full" for layout keeps the button's appearance.
 */
const BASE =
  'inline-flex items-center justify-center px-6 py-3 rounded font-semibold transition-all duration-300';

const VARIANTS = {
  primary: 'bg-[#FFD700] text-black hover:bg-[#FFE44D]',
  secondary: 'bg-black text-[#FFD700] hover:bg-neutral-900',
  outline: 'border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black',
};

export default function GetStartedButton({
  packageName,
  packagePrice,
  service,
  // Full width by default: every current caller is a pricing card, where a
  // button narrower than the card it sits in looks like a mistake.
  className = 'w-full',
  label = 'Get Started',
  variant = 'primary',
}: {
  packageName: string;
  packagePrice?: string;
  service: string;
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${BASE} ${VARIANTS[variant]} ${className}`}
      >
        {label}
      </button>

      <PackageEnquiryModal
        packageName={packageName}
        packagePrice={packagePrice}
        service={service}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
