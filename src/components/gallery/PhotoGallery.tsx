"use client";

import { useMemo, useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { galleryItems } from "@/config/gallery";
import type { Dictionary } from "@/i18n/dictionaries/types";

type PhotoGalleryProps = {
  dictionary: Dictionary;
};

type Category = "all" | "prewedding" | "traditional" | "wedding";

export function PhotoGallery({ dictionary }: PhotoGalleryProps) {
  const [category, setCategory] = useState<Category>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const d = dictionary.gallery;

  const filtered = useMemo(() => {
    if (category === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === category);
  }, [category]);

  const filters: Array<{ id: Category; label: string }> = [
    { id: "all", label: d.title },
    { id: "prewedding", label: d.categories.prewedding },
    { id: "traditional", label: d.categories.traditional },
    { id: "wedding", label: d.categories.wedding },
  ];

  const active = activeIndex === null ? null : filtered[activeIndex];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => {
              setCategory(filter.id);
              setActiveIndex(null);
            }}
            className={`font-label px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] transition ${
              category === filter.id
                ? "border border-antique-gold text-antique-gold"
                : "border border-transparent text-dark-burgundy/60 hover:text-dark-burgundy"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center font-body text-dark-burgundy/70">
          {d.empty}
        </p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="mb-4 block w-full break-inside-avoid text-left"
              onClick={() => setActiveIndex(index)}
            >
              <PhotoPlaceholder
                label={dictionary.common.placeholderPhoto}
                caption={dictionary.story.captions[item.captionKey]}
                aspect={item.aspect}
              />
            </button>
          ))}
        </div>
      )}

      <GalleryLightbox
        open={activeIndex !== null && Boolean(active)}
        title={
          active
            ? dictionary.story.captions[active.captionKey]
            : dictionary.common.placeholderPhoto
        }
        placeholderLabel={dictionary.common.placeholderPhoto}
        onClose={() => setActiveIndex(null)}
        onPrev={() =>
          setActiveIndex((current) => {
            if (current === null || filtered.length === 0) return current;
            return (current - 1 + filtered.length) % filtered.length;
          })
        }
        onNext={() =>
          setActiveIndex((current) => {
            if (current === null || filtered.length === 0) return current;
            return (current + 1) % filtered.length;
          })
        }
      />
    </div>
  );
}
