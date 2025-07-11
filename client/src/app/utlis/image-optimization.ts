/**
 * Утилита для оптимизации изображений с Strapi бекенда
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Получает оптимизированное изображение с Strapi
 * @param imageUrl - URL изображения с бекенда
 * @param width - желаемая ширина
 * @param height - желаемая высота
 * @param quality - качество (1-100)
 * @returns оптимизированный URL
 */
export function getOptimizedImageUrl(
  imageUrl: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  if (!imageUrl) return '';
  
  // Если это локальное изображение (начинается с /)
  if (imageUrl.startsWith('/')) {
    return imageUrl; // Возвращаем как есть для локальных файлов
  }
  
  // Если это уже полный URL
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Базовый URL Strapi
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Если есть параметры для оптимизации
  if (width || height || quality !== 80) {
    const params = new URLSearchParams();
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    if (quality !== 80) params.append('quality', quality.toString());
    
    return `${baseUrl}${imageUrl}?${params.toString()}`;
  }
  
  return `${baseUrl}${imageUrl}`;
}

/**
 * Получает разные размеры изображения для responsive
 */
export function getResponsiveImageSizes(
  imageUrl: string,
  sizes: { [key: string]: { width: number; height?: number } }
): { [key: string]: string } {
  const result: { [key: string]: string } = {};
  
  Object.entries(sizes).forEach(([breakpoint, dimensions]) => {
    result[breakpoint] = getOptimizedImageUrl(
      imageUrl,
      dimensions.width,
      dimensions.height
    );
  });
  
  return result;
}

/**
 * Получает WebP версию изображения
 */
export function getWebPImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  
  // Для локальных изображений возвращаем как есть
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const params = new URLSearchParams();
  params.append('format', 'webp');
  
  return `${baseUrl}${imageUrl}?${params.toString()}`;
}

/**
 * Получает thumbnail версию изображения
 */
export function getThumbnailUrl(imageUrl: string, size: number = 150): string {
  return getOptimizedImageUrl(imageUrl, size, size, 70);
} 