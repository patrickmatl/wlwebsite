// Transcription Services Pricing Page for Pretoria & Johannesburg
"use client";
import { motion } from "framer-motion";
import RelatedServices from "@/components/RelatedServices";

const transcriptionPricing = [
  {
    city: "Pretoria",
    plans: [
      { name: "Standard Audio", price: "R 18 / audio minute", features: ["Verbatim or Clean", "Turnaround: 24-48h", "Speaker Identification"] },
      { name: "Premium Audio", price: "R 25 / audio minute", features: ["Includes timestamps", "Technical/Medical", "Turnaround: 24-48h"] }
    ]
  },
  {
    city: "Johannesburg",
    plans: [
      { name: "Standard Audio", price: "R 20 / audio minute", features: ["Verbatim or Clean", "Turnaround: 24-48h", "Speaker Identification"] },
      { name: "Premium Audio", price: "R 28 / audio minute", features: ["Includes timestamps", "Technical/Medical", "Turnaround: 24-48h"] }
    ]
  }
];

const faqs = [
  { q: "What types of transcription do you offer?", a: "Verbatim, clean, technical, medical, and more." },
  { q: "How fast is delivery?", a: "Most files delivered within 24-48 hours." },
  { q: "Are files confidential?", a: "Yes, all files are handled securely and confidentially." }
];

export default function TranscriptionServices() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Transcription Services Pricing (Pretoria & Johannesburg)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {transcriptionPricing.map((location) => (
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
      <RelatedServices currentService="Transcription Services" services={[
        { title: "Copywriting Services", description: "Professional copy for web, ads, and more.", href: "/pricing/copywriting-services-pretoria-johannesburg", anchor: "View Service" },
        { title: "Copy Editing Services", description: "Ensure clarity and correctness.", href: "/pricing/copy-editing-services-pretoria-johannesburg", anchor: "View Service" }
      ]} />
    </div>
  );
}
