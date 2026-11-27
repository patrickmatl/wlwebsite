/**
 * Case studies shown on the service pages (logo, branding, web, packaging,
 * annual report) through <CaseStudies service="..." />.
 *
 * RULES: real projects only, with the client's permission to be named. Never
 * invent a client, a quote, a number or a result. Until an entry exists for a
 * service, the section on that page does not render at all.
 *
 * To add one: copy the shape below, set `permission: true` only once the
 * client has agreed in writing, and use images that are already in /public.
 */

export type CaseStudyService = 'logo' | 'branding' | 'web' | 'packaging' | 'annual-report';

export type CaseStudy = {
  service: CaseStudyService;
  client: string;
  industry: string;
  /** Suburb or city, only if true. */
  location?: string;
  brief: string;
  delivered: string[];
  /** What changed for the client. Facts the client has confirmed, no invented figures. */
  outcome: string;
  images?: { src: string; alt: string }[];
  /** Must be true: the client agreed to be named. */
  permission: true;
};

export const CASE_STUDIES: CaseStudy[] = [];

export function caseStudiesFor(service: CaseStudyService): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.service === service && c.permission === true);
}
