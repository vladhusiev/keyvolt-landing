export function getStrapiURL() {
  // return process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  // Priority: Environment variable > Cloud URL > Local development
  return process.env.NEXT_PUBLIC_STRAPI_URL || 
         process.env.NODE_ENV === 'production' 
           ? 'https://your-project-name.strapi.app'
           : 'http://localhost:1337';
}
}

