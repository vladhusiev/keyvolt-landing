import { getStrapiURL, getStrapiMedia } from '../utlis/get-strapi-url';

// Simple types for blog data
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  date: string;
  category: BlogCategory; 
}

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

// Helper to build Strapi API URLs
function buildUrl(endpoint: string, params: Record<string, string> = {}): string {
  const baseUrl = getStrapiURL();
  const url = new URL(`/api/${endpoint}`, baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

// Transform Strapi response to our format
function transformPost(data: any): BlogPost {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    content: data.content,
    coverImage: getStrapiMedia(data.coverImage?.data?.attributes?.url) || '/images/hero.png',
    date: data.publishedAt || data.createdAt,
    category: {
      id: data.category.id,
      slug: data.category.slug,
      name: data.category.name,
    }
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
  const url = buildUrl('blogs', {
    'sort[0]': 'publishedAt:desc',
    'populate[category]': 'true'
  });

  console.log('url', url);
  
  const data = await fetchFromStrapi(url);
  console.log('data', data);
  return data.data.map(transformPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = buildUrl('blogs', {
    'filters[slug][$eq]': slug,
    'populate[category]': 'true'
  });
  
  const data = await fetchFromStrapi(url);
  return data.data.length > 0 ? transformPost(data.data[0]) : null;
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const url = buildUrl('blogs', {
    'filters[category][slug][$eq]': categorySlug,
    'populate[category]': 'true',
    'sort[0]': 'publishedAt:desc'
  });
  
  const data = await fetchFromStrapi(url);
  return data.data.map(transformPost);
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const url = buildUrl('categories', {
    'sort[0]': 'name:asc'
  });
  
  const data = await fetchFromStrapi(url);
  return data.data;
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const url = buildUrl('categories', {
    'filters[slug][$eq]': slug
  });
  
  const data = await fetchFromStrapi(url);
  console.log('data', data.data);
  return data.data.length > 0 ? data.data[0] : null;
}
