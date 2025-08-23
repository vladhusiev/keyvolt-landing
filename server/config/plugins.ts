export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';
  if (isProduction) {
    return {
      upload: {
        config: {
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
    };
  }

  return {
    upload: {
      config: {
        provider: 'local',
        providerOptions: {
          sizeLimit: 1500000,
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
  };
};
