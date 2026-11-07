import { StoryScene } from "@/components/storybook/StoryScene";
import { storyChapters } from "@/config/storybook";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type LoveStorybookProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function LoveStorybook({ locale, dictionary }: LoveStorybookProps) {
  return (
    <div className="relative bg-dark-burgundy">
      {storyChapters.map((chapter, index) => (
        <StoryScene
          key={chapter.id}
          chapter={chapter}
          index={index}
          locale={locale}
          dictionary={dictionary}
        />
      ))}
    </div>
  );
}
