"use client";

import GetInTouchButton from "@/components/GetInTouchButton";

export default function InternalCommunicationsPretoria() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Internal Communications</h1>
        <p className="text-lg text-gray-300 mb-6">Branded internal documents, onboarding kits, and employee handbooks for effective communication.</p>
        <GetInTouchButton className="mx-auto" />
      </section>
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center">How We Help</h2>
        <ul className="text-gray-300 space-y-3 text-lg">
          <li>Employee handbooks and onboarding kits</li>
          <li>Internal newsletters and communications</li>
          <li>Branded templates and guides</li>
        </ul>
      </section>
    </div>
  );
}
