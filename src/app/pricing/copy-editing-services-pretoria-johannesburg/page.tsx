// Copy Editing Services Pricing Page for Pretoria & Johannesburg
"use client";
import { motion } from "framer-motion";
import RelatedServices from "@/components/RelatedServices";

const copyEditingPricing = [
  {
    city: "Pretoria",
    plans: [
      { name: "Standard Editing", price: "R 1.20 / word", features: ["Grammar & spelling", "Consistency checks", "2 revisions"] },
      { name: "Premium Editing", price: "R 1.80 / word", features: ["In-depth style & clarity", "Fact-checking", "3 revisions"] }
    ]
  },
  {
    city: "Johannesburg",
    plans: [
      { name: "Standard Editing", price: "R 1.40 / word", features: ["Grammar & spelling", "Consistency checks", "2 revisions"] },
      { name: "Premium Editing", price: "R 2.00 / word", features: ["In-depth style & clarity", "Fact-checking", "3 revisions"] }
    ]
  }
];

const faqs = [
  { q: "What is copy editing?", a: "Copy editing improves grammar, clarity, and style in your documents." },
  { q: "What types of documents do you edit?", a: "We edit articles, reports, web content, academic papers, and more." },
  { q: "How is pricing calculated?", a: "Pricing is per word, with discounts for larger projects." }
];

export default function CopyEditingServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Copy Editing Services Pricing (Pretoria & Johannesburg)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {copyEditingPricing.map((location) => (
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
      <RelatedServices currentService="Copy Editing Services" services={[
        { title: "Transcription Services", description: "Accurate audio/video to text.", href: "/pricing/transcription-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copywriting Services", description: "Professional writing for all needs.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
