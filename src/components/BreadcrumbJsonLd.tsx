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

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl + "/",
    },
    ...segments.map((segment, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: segment
        .split("-")
        .map((w) => (w === 'seo' ? 'SEO' : w === 'faq' ? 'FAQ' : w.charAt(0).toUpperCase() + w.slice(1)))
        .join(" "),
      item: baseUrl + "/" + segments.slice(0, idx + 1).join("/"),
    })),
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
