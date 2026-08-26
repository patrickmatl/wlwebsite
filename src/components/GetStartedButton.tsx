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
export default function GetStartedButton({
  packageName,
  packagePrice,
  service,
  className,
  label = 'Get Started',
}: {
  packageName: string;
  packagePrice?: string;
  service: string;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={
          className ??
          'w-full py-3 px-4 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFE44D] transition-colors'
        }
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
