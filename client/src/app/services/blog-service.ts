import { BlogPost, BlogCategory, BlogDataResponse } from "../types/blog";
import { getStrapiURL, getStrapiMedia } from "../utlis/get-strapi-url";

// Helper to build Strapi API URLs
function buildUrl(
  endpoint: string,
  params: Record<string, string> = {}
): string {
  const baseUrl = getStrapiURL();
  const url = new URL(`/api/${endpoint}`, baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
}

// Transform Strapi response to our format
function transformPost(data: BlogDataResponse): BlogPost {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content,
    thumbnail: getStrapiMedia(data.thumbnail?.url || ""),
    date: data.publishedAt || data.createdAt,
    category: data.category
      ? {
          id: data.category.id,
          slug: data.category.slug,
          name: data.category.name,
        }
      : null,

    relatedArticles: Array.isArray(data.relatedArticles)
      ? data.relatedArticles.map(transformPost)
      : data.relatedArticles
      ? [transformPost(data.relatedArticles)]
      : [],
  };
}

// Simple fetch function
async function fetchFromStrapi(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Export simple functions
export async function getAllPosts(): Promise<BlogPost[]> {
  const url = buildUrl("blogs", {
    "sort[0]": "publishedAt:desc",
    "populate[category]": "true",
    "populate[thumbnail]": "true",
  });

  const data = await fetchFromStrapi(url);
  return data.data.map(transformPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = buildUrl("blogs", {
    "filters[slug][$eq]": slug,
    "populate[category]": "true",
    "populate[thumbnail]": "true",
    "populate[relatedArticles][populate][category]": "true",
    "populate[relatedArticles][populate][thumbnail]": "true",
  });

  const data = await fetchFromStrapi(url);
  return data.data.length > 0 ? transformPost(data.data[0]) : null;
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  const url = buildUrl("blogs", {
    "filters[category][slug][$eq]": categorySlug,
    "sort[0]": "publishedAt:desc",
    "populate[category]": "true",
    "populate[thumbnail]": "true",
  });

  const data = await fetchFromStrapi(url);
  return data.data.map(transformPost);
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const url = buildUrl("categories", {
    "sort[0]": "name:asc",
  });

  const data = await fetchFromStrapi(url);
  return data.data;
}

export async function getCategoryBySlug(
  slug: string
): Promise<BlogCategory | null> {
  const url = buildUrl("categories", {
    "filters[slug][$eq]": slug,
  });

  const data = await fetchFromStrapi(url);
  return data.data.length > 0 ? data.data[0] : null;
}
