export default ({ env }) => ({
  upload: {
    config: {
      provider: env("UPLOAD_PROVIDER", "local"),
      providerOptions: {
        sizeLimit: env.int("UPLOAD_SIZE_LIMIT", 25 * 1024 * 1024),
      },
      breakpoints: {
        large: 1000,
        medium: 750,
        small: 500,
      },
      allowedMimeTypes: env.bool("STRICT_IMAGE_INPUTS", true)
        ? ["image/jpeg", "image/png", "image/webp"]
        : [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
            "image/gif",
            "image/svg+xml",
          ],
      allowedFormats: ["jpeg", "png", "webp"],
    },
  },
});
