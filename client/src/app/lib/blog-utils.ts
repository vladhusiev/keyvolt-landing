import { BlogPost } from "../types/blog";

export const sortPostsByDateDesc = (posts: BlogPost[]): BlogPost[] =>
  [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

export const filterPosts = (posts: BlogPost[], query?: string): BlogPost[] => {
  if (!query?.trim()) return posts;
  const q = normalize(query);

  if (q.length < 2) return posts;

  return posts.filter((p) => {
    const titleMatch = normalize(p.title).includes(q);
    const descriptionMatch = normalize(p.description).includes(q);

    return titleMatch || descriptionMatch;
  });
};

export const paginate = <T>(items: T[], page: number, perPage: number) => {
  // Validate inputs
  if (perPage <= 0) perPage = 1;
  if (page < 1) page = 1;

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    totalItems,
    totalPages,
    page: currentPage,
    perPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export const buildQueryString = (
  params: Record<string, string | number | undefined>
) => {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && String(value).length > 0)
      usp.set(key, String(value));
  });
  const query = usp.toString();
  return query ? `?${query}` : "";
};
