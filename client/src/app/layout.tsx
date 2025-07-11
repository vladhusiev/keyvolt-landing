import GoogleTagManager from "@/app/components/analytics/GoogleTagManager";
import { seoConfig } from "@/app/lib/seo-config";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: seoConfig.defaultOGImage,
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} - ${seoConfig.defaultDescription}`,
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  category: "technology",
  classification: "Сонячна енергетика",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="https://maps.googleapis.com" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="AE4eRsoV3GDKC3dSWd3bDyGiSlnkMfac9rW2TWEHEQQ" />

        <meta name="theme-color" content="#eebd00" />
        <meta name="msapplication-TileColor" content="#eebd00" />

        <GoogleTagManager />
      </head>
      <body>{children}</body>
    </html>
  );
}
