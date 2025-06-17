import { seoConfig } from "@/app/lib/seo-config";

interface JsonLd {
  "@context": string;
  "@graph": Array<Record<string, unknown>>;
}

export function StructuredData() {
  const organizationData = {
    "@type": "Organization",
    "@id": `${seoConfig.siteUrl}/#about`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${seoConfig.siteUrl}${seoConfig.logoUrl}`,
      width: "300",
      height: "100",
    },
    description: seoConfig.organizationSchema.description,
    contactPoint: seoConfig.organizationSchema.contactPoint,
    address: seoConfig.organizationSchema.address,
    areaServed: seoConfig.organizationSchema.areaServed,
    serviceType: seoConfig.organizationSchema.serviceType,
  };

  const websiteData = {
    "@type": "WebSite",
    "@id": `${seoConfig.siteUrl}/#website`,
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    publisher: {
      "@id": `${seoConfig.siteUrl}/#about`,
    },
  };

  const structuredData: JsonLd = {
    "@context": "https://schema.org",
    "@graph": [organizationData, websiteData],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
