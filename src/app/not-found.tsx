import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <p className="font-syne font-bold text-7xl text-[#FFD700]">404</p>
          <h1 className="mt-4 text-3xl font-syne font-bold text-white">
            Page Not Found
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#FFD700] text-black hover:bg-[#FFA500] rounded-full transition-all duration-300 font-medium"
          >
            Return Home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700] rounded-full transition-all duration-300"
          >
            View Pricing
          </Link>
          <Link
            href="/get-in-touch-pretoria"
            className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700] rounded-full transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
