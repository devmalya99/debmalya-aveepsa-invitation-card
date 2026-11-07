import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { ShareInviteButton } from "@/components/navigation/ShareInviteButton";
import { WEDDING } from "@/config/wedding";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-2 px-3 py-3 min-[400px]:px-4 sm:gap-3 sm:px-6 sm:py-4">
      <a
        href={`/${locale}`}
        className="pointer-events-auto max-w-[42vw] truncate rounded-sm bg-dark-burgundy/55 px-2.5 py-1.5 font-display text-base text-soft-white backdrop-blur-sm min-[400px]:max-w-none min-[400px]:text-lg sm:px-3 sm:text-xl"
      >
        {WEDDING.couple.shortNames[locale]}
      </a>
      <div className="pointer-events-auto flex max-w-[55vw] flex-wrap items-center justify-end gap-1.5 sm:max-w-none sm:gap-2">
        <div className="hidden min-[420px]:block">
          <ShareInviteButton dictionary={dictionary} />
        </div>
        <LanguageSwitcher
          locale={locale}
          label={dictionary.language.switcherLabel}
          englishLabel={dictionary.language.switchToEnglish}
          bengaliLabel={dictionary.language.switchToBengali}
        />
      </div>
    </header>
  );
}
