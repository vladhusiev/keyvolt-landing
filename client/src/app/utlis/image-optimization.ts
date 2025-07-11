/**
 * Image optimization utilities for Strapi CMS
 * Provides functions to generate optimized image URLs with various parameters
 */

export interface ImageOptimizationParams {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  crop?: string
  blur?: number
  sharpen?: number
  grayscale?: boolean
  flip?: 'horizontal' | 'vertical'
  rotate?: number
}

/**
 * Generates an optimized image URL for Strapi images
 * @param imageUrl - Original image URL from Strapi
 * @param params - Optimization parameters
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imageUrl: string | null | undefined,
  params: ImageOptimizationParams = {}
): string {
  if (!imageUrl) {
    return ''
  }

  // If this is a local image (starts with /)
  if (imageUrl.startsWith('/')) {
    return imageUrl // Return as is for local files
  }

  // If this is already a full URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Base Strapi URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

  // If there are optimization parameters
  const queryParams = new URLSearchParams()

  // Add optimization parameters
  if (params.width) queryParams.append('width', params.width.toString())
  if (params.height) queryParams.append('height', params.height.toString())
  if (params.quality) queryParams.append('quality', params.quality.toString())
  if (params.format) queryParams.append('format', params.format)
  if (params.fit) queryParams.append('fit', params.fit)
  if (params.crop) queryParams.append('crop', params.crop)
  if (params.blur) queryParams.append('blur', params.blur.toString())
  if (params.sharpen) queryParams.append('sharpen', params.sharpen.toString())
  if (params.grayscale) queryParams.append('grayscale', 'true')
  if (params.flip) queryParams.append('flip', params.flip)
  if (params.rotate) queryParams.append('rotate', params.rotate.toString())

  const queryString = queryParams.toString()
  const separator = imageUrl.includes('?') ? '&' : '?'
  
  return `${strapiUrl}${imageUrl}${queryString ? separator + queryString : ''}`
}

/**
 * Generates optimized image URLs for different screen sizes
 * @param imageUrl - Original image URL
 * @param sizes - Object with breakpoint names and parameters
 * @returns Object with optimized URLs for each breakpoint
 */
export function getResponsiveImageUrls(
  imageUrl: string | null | undefined,
  sizes: Record<string, ImageOptimizationParams>
): Record<string, string> {
  const urls: Record<string, string> = {}
  
  for (const [breakpoint, params] of Object.entries(sizes)) {
    urls[breakpoint] = getOptimizedImageUrl(imageUrl, params)
  }
  
  return urls
}

/**
 * Generates srcset string for responsive images
 * @param imageUrl - Original image URL
 * @param sizes - Array of size objects with width and parameters
 * @returns srcset string
 */
export function getImageSrcSet(
  imageUrl: string | null | undefined,
  sizes: Array<{ width: number } & ImageOptimizationParams>
): string {
  return sizes
    .map(({ width, ...params }) => {
      const url = getOptimizedImageUrl(imageUrl, { width, ...params })
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Simple optimized image URL for local images
 * @param imageUrl - Image URL
 * @returns Optimized URL or original for local images
 */
export function getSimpleOptimizedUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return ''
  
  // For local images return as is
  if (imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  return getOptimizedImageUrl(imageUrl, { format: 'webp', quality: 85 })
} 