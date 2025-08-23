export default ({ env }) => ({
  upload: {
    config: {
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
      allowedFormats: ['jpeg', 'png', 'webp', 'avif', 'gif', 'svg'],
      provider: 'local',
      providerOptions: {
        sizeLimit: 1500000, // 1.5MB limit
      },
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
        thumbnail: 150,
      },
    },
  },
});
