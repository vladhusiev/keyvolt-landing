export const seoConfig = {
  defaultTitle: "KeyVolt Energy - Ваш партнер з енергетичної незалежності",
  defaultDescription:
    "Ми не продаємо – ми будуємо енергетичне партнерство. Встановлення за наш кошт. Результати – вже з першого дня",
  defaultKeywords: [
    "сонячна енергетика",
    "сонячні панелі", 
    "відновлювальна енергія",
    "встановлення сонячних панелей",
    "сонячні рішення",
    "зелена енергія",
    "стійка енергетика",
    "сонячні енергосистеми",
    "KeyVolt",
    "енергетична незалежність",
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  siteName: "KeyVolt Energy",
  author: "KeyVolt Team",
  defaultOGImage: "/images/og-image.png",
  defaultTwitterImage: "/images/og-image.png",
  logoUrl: "/images/logo.svg",
  organizationSchema: {
    "@type": "Organization",
    name: "KeyVolt Energy",
    description: "Ваш партнер з енергетичної незалежності",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/images/logo.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+38 (097) 300 90 00",
      availableLanguage: ["Ukrainian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Волоська 2",
      addressLocality: "Київ",
      addressRegion: "Київ",
      postalCode: "02000",
      addressCountry: "UA",
    },
    areaServed: "Ukraine",
    serviceType: [
      "Встановлення сонячних панелей",
      "Консультації з енергетики",
      "Підтримка сонячних систем",
      "Рішення для енергетичної незалежності",
    ],
  },
};

export function generatePageTitle(pageTitle?: string): string {
  if (!pageTitle) return seoConfig.defaultTitle;
  return `${pageTitle} | ${seoConfig.siteName}`;
}

export function generateCanonicalUrl(path?: string): string {
  return `${seoConfig.siteUrl}${path || ""}`;
}

export function generateOGUrl(path?: string): string {
  return generateCanonicalUrl(path);
}

export function generateStructuredData(additionalData?: Record<string, unknown>) {
  const baseData = {
    "@context": "https://schema.org",
    ...seoConfig.organizationSchema,
  };

  return additionalData ? { ...baseData, ...additionalData } : baseData;
}
