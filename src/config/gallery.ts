import { assets } from "@/data/assets";

export type GalleryCategory = "prewedding" | "traditional" | "wedding";

export type GalleryCaptionKey =
  | "cinematic"
  | "playful"
  | "editorial"
  | "traditional"
  | "cultural";

export type GalleryItem = {
  id: string;
  src: string;
  category: GalleryCategory;
  captionKey: GalleryCaptionKey;
  aspect?: string;
  alt: {
    en: string;
    bn: string;
  };
};

/**
 * Phase 1 gallery uses the two approved couple photographs only.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "couple-01",
    src: assets.couple.grandReveal,
    category: "traditional",
    captionKey: "traditional",
    aspect: "3/4",
    alt: {
      en: "Debmalya and Aveepsa at the temple steps",
      bn: "মন্দিরের সিঁড়িতে দেবমাল্য ও অভীপ্সা",
    },
  },
  {
    id: "couple-02",
    src: assets.couple.finalBlessing,
    category: "prewedding",
    captionKey: "cinematic",
    aspect: "3/4",
    alt: {
      en: "Debmalya and Aveepsa in soft daylight",
      bn: "নরম আলোয় দেবমাল্য ও অভীপ্সা",
    },
  },
];

export const GALLERY = galleryItems;
