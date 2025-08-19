// Simple blog types
export interface BlogCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  category: BlogCategory; 
}
