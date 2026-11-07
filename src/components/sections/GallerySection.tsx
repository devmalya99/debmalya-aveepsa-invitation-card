import { Reveal } from "@/components/animations/Reveal";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type GallerySectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function GallerySection({ locale, dictionary }: GallerySectionProps) {
  const d = dictionary.gallery;

  return (
    <section
      id="gallery"
      className="section-shell relative px-5 py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal from="top">
          <div className="rounded-sm bg-soft-white/88 px-4 py-8 backdrop-blur-sm sm:px-8">
            <SectionHeading
              locale={locale}
              eyebrow={d.eyebrow}
              title={d.title}
              body={d.body}
            />
          </div>
        </Reveal>
        <Reveal from="bottom" delay={0.1} className="mt-12">
          <PhotoGallery dictionary={dictionary} />
        </Reveal>
      </div>
    </section>
  );
}
