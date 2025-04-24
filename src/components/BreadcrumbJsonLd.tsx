"use client";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const baseUrl = "https://wlcreationx.co.za";

  // Build breadcrumb items
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl + "/"
    },
    ...segments.map((segment, idx) => ({
      "@type": "ListItem",
      position: idx + 2,
      name: segment
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      item: baseUrl + "/" + segments.slice(0, idx + 1).join("/")
    }))
  ];

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement
          })
        }}
      />
    </Head>
  );
}
