import { toInvitationIdentities } from "@/config/familyHeritage";
import { WEDDING_CARD_COPY } from "@/config/weddingCard";
import type { InvitationContent } from "@/types/invitation";

/**
 * Bengali invitation copy.
 * Unverified OCR-sensitive lines are marked in CONTENT_REVIEW.md.
 * Celebrations → `weddingCard.ts`. Family heritage → `familyHeritage.ts`.
 */
export const invitationBN: InvitationContent = {
  meta: {
    title: "শুভ বিবাহ — দেবমাল্য ও অভীপ্সা",
    description:
      "দেবমাল্য ও অভীপ্সার শুভ বিবাহের ডিজিটাল আমন্ত্রণ — ২৫ নভেম্বর ২০২৬।",
  },
  common: {
    wedding: "শুভ বিবাহ",
    openInvite: "আমন্ত্রণ খুলুন",
    skipIntro: "এড়িয়ে যান",
    scrollHint: "নিচে স্ক্রল করুন",
    music: "সঙ্গীত",
    replay: "আবার দেখুন",
    languageLabel: "ভাষা",
  },
  envelope: {
    instruction: "সিল স্পর্শ করে আমন্ত্রণ খুলুন",
    sealLabel: "মোমের সিল",
  },
  grandReveal: {
    kicker: "শুভ বিবাহ",
    blessing: "দুই পরিবারের আশীর্বাদে",
    monogram: "D & A",
    nameOne: "দেবমাল্য",
    nameTwo: "অভীপ্সা",
    ampersand: "ও",
    namesBn: "দেবমাল্য ও অভীপ্সা",
    namesEn: "DEBMALYA & AVEEPSA",
    date: "২৫ নভেম্বর ২০২৬",
    dateEn: "25 NOVEMBER 2026",
    location: "Murshidabad, West Bengal",
    tagline: "দুই হৃদয়, দুই পরিবার, এক সুন্দর সূচনা।",
    exploreLabel: "আমাদের বিবাহ দেখুন",
  },
  identities: toInvitationIdentities("bn"),
  events: WEDDING_CARD_COPY.bn,
  letter: {
    eyebrow: "দুই পরিবারের পক্ষ থেকে আমন্ত্রণ",
    salutation: "সবিনয় নিবেদন",
    bengaliTitle: "শুভ বিবাহ",
    subtitle: "ভালোবাসা ও একসঙ্গে থাকার উৎসব",
    paragraphs: [
      "আনন্দের সঙ্গে জানাই, আমাদের দুই পরিবারের মিলনে দেবমাল্য ও অভীপ্সার শুভ বিবাহ অনুষ্ঠিত হবে।",
      "আপনাদের উপস্থিতি ও আশীর্বাদ এই উৎসবকে সত্যিই বিশেষ করে তুলবে।",
    ],
    closing: "ভালোবাসা ও আশীর্বাদসহ",
    families: "মজুমদার ও চক্রবর্তী পরিবার",
    date: "২৫ নভেম্বর ২০২৬",
  },
  venue: {
    eyebrow: "উদযাপন",
    heading: "একত্রিত হওয়ার স্থান",
    subtitle: "যেখানে সুন্দর স্মৃতির শুরু।",
    photoCaption: "বাংলার এক মুহূর্ত",
    storyHeading: "ভালোবাসা ও একসঙ্গে থাকার উৎসব",
    storyBody:
      "পরিবারের উষ্ণতার মাঝে, আমরা এই সুন্দর সূচনা উদযাপন করতে চাই সেই সকলের সঙ্গে যাঁরা আমাদের হৃদয়ে বিশেষ স্থান দখল করে আছেন।",
    closing: "আপনাদের উপস্থিতি ও আশীর্বাদই আমাদের পরম প্রাপ্তি।",
  },
  final: {
    blessing: "আপনাদের উপস্থিতি ও আশীর্বাদই আমাদের পরম প্রাপ্তি।",
    closingTitle: "শুভ পরিণয়",
    names: "দেবমাল্য ♥ অভীপ্সা",
    familyLines: [
      "মজুমদার পরিবার",
      "চক্রবর্তী পরিবার",
    ],
    weekdayEvening: "বুধবার · সন্ধ্যা",
    signatureSub: "এক সুন্দর শুরু",
    familiesBn: "মজুমদার ও চক্রবর্তী পরিবার",
    familiesEn: "Mazumdar & Chakrabarti Families",
  },
  guestForm: {
    prompt: "আপনার নামে আশীর্বাদ দিন",
    placeholder: "আপনার নাম",
    submit: "আশীর্বাদ পাঠান",
    thanks: "ধন্যবাদ, {name}",
    error: "সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।",
  },
};
