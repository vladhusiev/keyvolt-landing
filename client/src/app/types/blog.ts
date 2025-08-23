// Simple types for blog data
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  date: string;
  category: BlogCategory | null;
  relatedArticles: BlogPost[];
}

export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export interface BlogDataResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: { url?: string };
  publishedAt?: string;
  createdAt: string;
  category?: {
    id: number;
    slug: string;
    name: string;
  };
  relatedArticles?: BlogDataResponse[];
}
