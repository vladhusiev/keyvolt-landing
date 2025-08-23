export default ({ env }) => ({
  upload: {
    config: {
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
