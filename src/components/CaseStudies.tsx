import Image from 'next/image';
import { caseStudiesFor, type CaseStudyService } from '@/data/case-studies';

/**
 * Real client case studies for a service page. Renders nothing until
 * src/data/case-studies.ts has an entry for this service — an empty
 * "case studies" heading would be worse than no section at all.
 */
export default function CaseStudies({ service, heading = 'Recent projects' }: { service: CaseStudyService; heading?: string }) {
  const studies = caseStudiesFor(service);
  if (studies.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 py-16" aria-labelledby={`case-studies-${service}`}>
      <h2 id={`case-studies-${service}`} className="font-syne text-3xl font-bold text-[#FFD700] mb-8">
        {heading}
      </h2>
      <div className="space-y-10">
        {studies.map((c) => (
          <article key={c.client} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-neutral-400">
              {c.industry}
              {c.location ? ` · ${c.location}` : ''}
            </p>
            <h3 className="font-syne text-2xl font-bold text-white mt-1 mb-4">{c.client}</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">{c.brief}</p>
            <ul className="list-disc pl-5 text-neutral-300 space-y-1 mb-4">
              {c.delivered.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="text-neutral-200 leading-relaxed">{c.outcome}</p>
            {c.images && c.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {c.images.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
