import type { Locale } from "@/types/invitation";

/**
 * Central copy + design tokens for groom/bride family heritage cards.
 * Edit names, labels, type, colour, and motion here — not in JSX.
 */

export type FamilyMemberRow = {
  label: string;
  value: string;
};

export type FamilySideCopy = {
  sectionLabel: string;
  name: string;
  relation: string;
  /** Rows shown on the heritage card (not residence block). */
  members: FamilyMemberRow[];
  /** Full rows kept for invitation identity data. */
  allDetails: FamilyMemberRow[];
};

export type FamilyHeritageCopy = {
  headingEn: string;
  headingBn: string;
  closingLine: string;
  groomLabelEn: string;
  brideLabelEn: string;
  groomLabelBn: string;
  brideLabelBn: string;
  unitedLine: string;
  groom: FamilySideCopy;
  bride: FamilySideCopy;
};

export const FAMILY_HERITAGE_COPY: Record<Locale, FamilyHeritageCopy> = {
  bn: {
    headingEn: "THE UNION OF TWO FAMILIES",
    headingBn: "বাংলার দুই পরিবারের এক শুভ মিলন",
    closingLine: "United in love & blessings",
    groomLabelEn: "The Groom",
    brideLabelEn: "The Bride",
    groomLabelBn: "পাত্র",
    brideLabelBn: "পাত্রী",
    unitedLine: "দেবমাল্য ও অভীপ্সা",
    groom: {
      sectionLabel: "পাত্রের পরিবার",
      name: "দেবমাল্য মজুমদার",
      relation: "বনিষ্ঠ পুত্র",
      members: [
        { label: "পিতা", value: "শ্রী প্রশান্ত কুমার মজুমদার" },
        { label: "মাতা", value: "শ্রীমতী নূতন মজুমদার" },
        { label: "ভাই", value: "নির্মাল্য মজুমদার" },
      ],
      allDetails: [
        { label: "পিতা", value: "শ্রী প্রশান্ত কুমার মজুমদার" },
        { label: "মাতা", value: "শ্রীমতী নূতন মজুমদার" },
        { label: "দাদা", value: "নির্মাল্য মজুমদার" },
        { label: "নিবাস", value: "অরবিন্দপল্লী" },
        { label: "পোঃ ও থানা", value: "রঘুনাথগঞ্জ" },
        { label: "জেলা", value: "মুর্শিদাবাদ" },
      ],
    },
    bride: {
      sectionLabel: "পাত্রীর পরিবার",
      name: "অভীপ্সা চক্রবর্তী",
      relation: "একমাত্র কন্যা",
      members: [
        { label: "পিতা", value: "শ্রী বাসুদেব চক্রবর্তী" },
        { label: "মাতা", value: "শ্রীমতী মধুছন্দা চক্রবর্তী" },
        { label: "দাদা", value: "শ্রী অভিজিৎ চক্রবর্তী" },
        { label: "ভাবী", value: "শ্রীমতী অমৃতা মজুমদার" },
      ],
      allDetails: [
        { label: "পিতা", value: "শ্রী বাসুদেব চক্রবর্তী" },
        { label: "মাতা", value: "শ্রীমতী মধুছন্দা চক্রবর্তী" },
        { label: "ভাই", value: "শ্রী অভিজিৎ চক্রবর্তী" },
        { label: "ভাবী", value: "শ্রীমতী অমৃতা মজুমদার" },
        { label: "নিবাস", value: "ওল্ড হাসপাতাল রোড" },
        { label: "পোঃ ও থানা", value: "রঘুনাথগঞ্জ" },
        { label: "জেলা", value: "মুর্শিদাবাদ" },
      ],
    },
  },
  en: {
    headingEn: "THE UNION OF TWO FAMILIES",
    headingBn: "বাংলার দুই পরিবারের এক শুভ মিলন",
    closingLine: "United in love & blessings",
    groomLabelEn: "The Groom",
    brideLabelEn: "The Bride",
    groomLabelBn: "পাত্র",
    brideLabelBn: "পাত্রী",
    unitedLine: "Debmalya & Aveepsa",
    groom: {
      sectionLabel: "Groom's family",
      name: "Debmalya Mazumdar",
      relation: "Youngest son",
      members: [
        { label: "Father", value: "Sri Prashanta Kumar Mazumdar" },
        { label: "Mother", value: "Srimati Nutan Mazumdar" },
        { label: "Brother", value: "Nirmalya Mazumdar" },
      ],
      allDetails: [
        { label: "Father", value: "Sri Prashanta Kumar Mazumdar" },
        { label: "Mother", value: "Srimati Nutan Mazumdar" },
        { label: "Brother", value: "Nirmalya Mazumdar" },
        { label: "Residence", value: "Aravindapalli" },
        { label: "P.O. & P.S.", value: "Raghunathganj" },
        { label: "District", value: "Murshidabad" },
      ],
    },
    bride: {
      sectionLabel: "Bride's family",
      name: "Aveepsa Chakrabarti",
      relation: "Only daughter",
      members: [
        { label: "Father", value: "Sri Basudeb Chakrabarti" },
        { label: "Mother", value: "Srimati Madhuchhanda Chakraborti" },
        { label: "Brother", value: "Sri Abhijit Chakrabarti" },
        { label: "Sister-in-law", value: "Srimati Amrita Mazumdar" },
      ],
      allDetails: [
        { label: "Father", value: "Sri Basudeb Chakrabarti" },
        { label: "Mother", value: "Srimati Madhuchhanda Chakraborti" },
        { label: "Brother", value: "Sri Abhijit Chakrabarti" },
        { label: "Sister-in-law", value: "Srimati Amrita Mazumdar" },
        { label: "Residence", value: "Old Hospital Road" },
        { label: "P.O. & P.S.", value: "Raghunathganj" },
        { label: "District", value: "Murshidabad" },
      ],
    },
  },
};

export const FAMILY_HERITAGE_DESIGN = {
  colors: {
    background: "#F7EEDC",
    primary: "#702632",
    secondary: "#54232C",
    accent: "#B58A50",
    mutedGold: "#D9BD8C",
    body: "#80634B",
    border: "#B58A50",
  },
  fonts: {
    bengali: "var(--font-noto-serif-bengali), serif",
    english: "var(--font-cormorant), Georgia, serif",
  },
  type: {
    headingEnSize: "clamp(0.58rem, 1.7vw, 0.7rem)",
    headingEnTracking: "0.2em",
    headingBnSize: "clamp(0.82rem, 2.6vw, 0.98rem)",
    sectionSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
    sectionTracking: "0.18em",
    nameSize: "clamp(1.2rem, 4.2vw, 1.55rem)",
    nameLineHeight: "1.28",
    labelSize: "clamp(0.58rem, 1.6vw, 0.68rem)",
    valueSize: "clamp(0.82rem, 2.5vw, 0.95rem)",
    closingSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
  },
  layout: {
    contentMaxWidth: "21.5rem",
    mandalaSize: "min(42vw, 9.75rem)",
    mandalaMaxHeight: "16svh",
    cardPaddingX: "1.15rem",
    cardPaddingY: "1.05rem",
    borderInsetOuter: "0.45rem",
    borderInsetInner: "0.7rem",
  },
} as const;

export const FAMILY_HERITAGE_MOTION = {
  ease: [0.22, 1, 0.36, 1] as const,
  sequenceStartMs: 180,
  mandalaDuration: 0.85,
  headingDuration: 0.55,
  nameDuration: 0.55,
  rowDuration: 0.45,
  rowStagger: 0.16,
  closingDuration: 0.5,
} as const;

export function getFamilyHeritageCopy(locale: Locale): FamilyHeritageCopy {
  return FAMILY_HERITAGE_COPY[locale];
}

/** Maps heritage config into the invitation `identities` shape. */
export function toInvitationIdentities(locale: Locale) {
  const copy = FAMILY_HERITAGE_COPY[locale];
  return {
    groomLabelEn: copy.groomLabelEn,
    brideLabelEn: copy.brideLabelEn,
    groomLabelBn: copy.groomLabelBn,
    brideLabelBn: copy.brideLabelBn,
    groomName: copy.groom.name,
    brideName: copy.bride.name,
    groomRelation: copy.groom.relation,
    brideRelation: copy.bride.relation,
    groomDetails: copy.groom.allDetails,
    brideDetails: copy.bride.allDetails,
    unitedLine: copy.unitedLine,
  };
}
