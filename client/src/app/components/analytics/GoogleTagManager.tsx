"use client";

import { ANALYTICS_CONFIG } from "@/app/lib/analytics";
import Script from "next/script";

export default function GoogleTagManager() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_CONFIG.GTM_ID}');
        `}
      </Script>
    </>
  );
}
