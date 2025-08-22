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
