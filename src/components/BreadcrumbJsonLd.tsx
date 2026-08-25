"use client";
import { usePathname } from "next/navigation";

/**
 * BreadcrumbList JSON-LD.
 *
 * Previously this rendered through next/head, which is a no-op in the App
 * Router — the schema never reached the HTML at all. It now renders as an
 * inline script tag, which Google reads from anywhere in the DOM.
 */
export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const baseUrl = "https://wlcreationx.co.za";

  // No breadcrumb schema needed on the homepage.
  if (segments.length === 0) return null;

  // Only real routes may carry an `item` URL — intermediate path segments that
  // are not pages themselves (e.g. the bare city in /pretoria/graphic-design)
  // must be name-only ListItems, otherwise the schema points crawlers at 404s.
  const LINKABLE_INTERMEDIATE = new Set([
    "/pricing",
    "/service-areas-pretoria",
    "/creative-industry-blog-pretoria",
    "/digital-marketing-services-pretoria",
  ]);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl + "/",
    },
    ...segments.map((segment, idx) => {
      const path = "/" + segments.slice(0, idx + 1).join("/");
      const isLast = idx === segments.length - 1;
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: idx + 2,
        name: segment
          .split("-")
          .map((w) => (w === 'seo' ? 'SEO' : w === 'faq' ? 'FAQ' : w.charAt(0).toUpperCase() + w.slice(1)))
          .join(" "),
      };
      if (isLast || LINKABLE_INTERMEDIATE.has(path)) {
        entry.item = baseUrl + path;
      }
      return entry;
    }),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
