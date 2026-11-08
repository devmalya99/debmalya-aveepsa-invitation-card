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
    namesBn: "দেবমাল্য ও অভীপ্সা",
    namesEn: "DEBMALYA & AVEEPSA",
    date: "২৫ নভেম্বর ২০২৬",
    dateEn: "25 November 2026",
    location: "Murshidabad, West Bengal",
    tagline: "ঐতিহ্য, ভালোবাসা ও একসঙ্গে থাকার উৎসব",
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
    greetingBn: "সাদর আমন্ত্রণ",
    greetingEn: "With warm regards",
    cordially: "You are cordially invited",
    destinationEyebrow: "আমাদের শুভ বিবাহের স্থান",
    cityBn: "রঘুনাথগঞ্জ, মুর্শিদাবাদ",
    cityEn: "Raghunathganj, Murshidabad",
    heritageTagline: "পশ্চিমবঙ্গ, ভারত",
    lodgeBn: "ভাগীরথী লজ",
    lodgeEn: "Bhagirathi Lodge",
    addressBn: "রঘুনাথগঞ্জ, মুর্শিদাবাদ",
    addressEn: "Raghunathganj, Murshidabad, West Bengal, India",
    mapsLabel: "Google Maps-এ খুলুন",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bhagirathi%20Lodge%20Raghunathganj%20Murshidabad",
    blessing: "আপনাদের উপস্থিতি ও আশীর্বাদই আমাদের পরম প্রাপ্তি।",
    coupleNames: "DEBMALYA ♥ AVEEPSA",
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
