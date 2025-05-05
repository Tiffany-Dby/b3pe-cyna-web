const MAX_IMAGE_MB = 5;

const FILES = {
  MAX_IMAGE_SIZE: 1024 * 1024 * MAX_IMAGE_MB,
  ACCEPTED_IMAGE_MIMETYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ],
  ACCEPTED_IMAGE_EXTENSIONS: ["jpeg", "jpg", "png", "webp"],
};

export { MAX_IMAGE_MB, FILES };
