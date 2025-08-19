import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/#solutions`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#principles`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#calculator`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#cases`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contacts`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vacancies`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
} 