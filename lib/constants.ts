export const APP_NAME = "Marketplace";
export const APP_TAGLINE = "Buy Premium Digital Assets";
export const APP_DESCRIPTION = "A digital asset marketplace built with Next.js";

export const IMAGE_VARIANTS = {
    SQUARE: {
        type: "SQUARE",
        dimensions: { width: 1200, height: 1200 },
        label: "Square (1:1)",
        aspectRatio: "1:1",
    },
    WIDE: {
        type: "WIDE",
        dimensions: { width: 1920, height: 1080 },
        label: "Widescreen (16:9)",
        aspectRatio: "16:9",
    },
    PORTRAIT: {
        type: "PORTRAIT",
        dimensions: { width: 1080, height: 1440 },
        label: "Portrait (3:4)",
        aspectRatio: "3:4",
    },
} as const;

export const VALID_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
