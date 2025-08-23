import { seoConfig } from "@/app/lib/seo-config";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface ArticleStructuredDataProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function ArticleStructuredData({
  url,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  breadcrumbs = [],
}: ArticleStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description,
    image: image ? [image] : [seoConfig.defaultOGImage],
    author: {
      "@type": "Organization",
      name: authorName,
      url: seoConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: `${seoConfig.siteUrl}${seoConfig.logoUrl}`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url,
  };

  const breadcrumbList = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      }
    : null;

  const graph = breadcrumbList ? [articleData, breadcrumbList] : [articleData];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          graph.length === 1
            ? graph[0]
            : { "@graph": graph, "@context": "https://schema.org" }
        ),
      }}
    />
  );
}
