export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
}

/**
 * Helper function to get full URL for Strapi assets
 * @param path - Asset path from Strapi (can be relative or absolute)
 * @returns Full URL for the asset
 */
export function getStrapiMedia(path: string | null | undefined): string {
  if (!path) return '';
  
  // If already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If it's a relative path, prepend Strapi URL
  const baseUrl = getStrapiURL();
  // Ensure we don't double up on slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
}

