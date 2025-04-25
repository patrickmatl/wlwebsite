// Copywriting Services Pricing Page for Pretoria & Johannesburg
"use client";
import { motion } from "framer-motion";
import RelatedServices from "@/components/RelatedServices";

const copywritingPricing = [
  {
    city: "Pretoria",
    plans: [
      { name: "Standard Copy", price: "R 1.80 / word", features: ["Web, blogs, ads", "SEO optimized", "2 revisions"] },
      { name: "Premium Copy", price: "R 2.50 / word", features: ["Conversion-focused", "Includes research", "3 revisions"] }
    ]
  },
  {
    city: "Johannesburg",
    plans: [
      { name: "Standard Copy", price: "R 2.00 / word", features: ["Web, blogs, ads", "SEO optimized", "2 revisions"] },
      { name: "Premium Copy", price: "R 2.80 / word", features: ["Conversion-focused", "Includes research", "3 revisions"] }
    ]
  }
];

const faqs = [
  { q: "What types of copywriting do you offer?", a: "Websites, blogs, ads, product descriptions, and more." },
  { q: "How is pricing calculated?", a: "Pricing is per word, with discounts for large projects." },
  { q: "Can I request revisions?", a: "Yes, all packages include at least 2 revisions." }
];

export default function CopywritingServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Copywriting Services Pricing (Pretoria & Johannesburg)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {copywritingPricing.map((location) => (
          <div key={location.city} className="bg-zinc-900 border border-zinc-700 rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-4 text-center">{location.city}</h2>
            <div className="space-y-6">
              {location.plans.map((plan) => (
                <div key={plan.name} className="bg-zinc-800 rounded-xl p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-extrabold mb-2">{plan.price}</div>
                  <ul className="list-disc list-inside text-neutral-200 mb-2">
                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-neutral-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <RelatedServices currentService="Copywriting Services" services={[
        { title: "Transcription Services", description: "Audio and video to text.", href: "/pricing/transcription-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copy Editing Services", description: "Proofreading and editing for clarity.", href: "/pricing/copy-editing-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
