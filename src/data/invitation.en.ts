import { toInvitationIdentities } from "@/config/familyHeritage";
import { WEDDING_CARD_COPY } from "@/config/weddingCard";
import type { InvitationContent } from "@/types/invitation";

/**
 * English invitation copy.
 * Bengali names stay in original script where that better preserves identity.
 * Celebrations → `weddingCard.ts`. Family heritage → `familyHeritage.ts`.
 */
export const invitationEN: InvitationContent = {
  meta: {
    title: "শুভ বিবাহ — Debmalya & Aveepsa",
    description:
      "A digital Bengali wedding invitation for Debmalya & Aveepsa — 25 November 2026.",
  },
  common: {
    wedding: "Our Wedding",
    openInvite: "Open invitation",
    skipIntro: "Skip",
    scrollHint: "Scroll to continue",
    music: "Music",
    replay: "Replay",
    languageLabel: "Language",
  },
  envelope: {
    instruction: "Tap the seal to open the invitation",
    sealLabel: "Wax seal",
  },
  grandReveal: {
    kicker: "Our Wedding",
    namesBn: "দেবমাল্য ও অভীপ্সা",
    namesEn: "DEBMALYA & AVEEPSA",
    date: "২৫ নভেম্বর ২০২৬",
    dateEn: "25 November 2026",
    location: "Murshidabad, West Bengal",
    tagline: "A celebration of Bengali heritage, love and togetherness",
  },
  identities: toInvitationIdentities("en"),
  events: WEDDING_CARD_COPY.en,
  letter: {
    eyebrow: "An invitation from our families",
    salutation: "With warm regards",
    bengaliTitle: "শুভ বিবাহ",
    subtitle: "A celebration of love & togetherness",
    paragraphs: [
      "With joy in our hearts, our families invite you to celebrate the beautiful union of Debmalya and Aveepsa.",
      "Your presence and blessings will make this celebration truly special.",
    ],
    closing: "With love and blessings",
    families: "Mazumdar & Chakrabarti Families",
    date: "25 November 2026",
  },
  venue: {
    greetingBn: "সাদর আমন্ত্রণ",
    greetingEn: "With warm regards",
    cordially: "You are cordially invited",
    destinationEyebrow: "Our wedding destination",
    cityBn: "রঘুনাথগঞ্জ, মুর্শিদাবাদ",
    cityEn: "Raghunathganj, Murshidabad",
    heritageTagline: "West Bengal, India",
    lodgeBn: "ভাগীরথী লজ",
    lodgeEn: "Bhagirathi Lodge",
    addressBn: "রঘুনাথগঞ্জ, মুর্শিদাবাদ",
    addressEn: "Raghunathganj, Murshidabad, West Bengal, India",
    mapsLabel: "Open in Google Maps",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bhagirathi%20Lodge%20Raghunathganj%20Murshidabad",
    blessing: "Your presence and blessings are our greatest gift.",
    coupleNames: "DEBMALYA ♥ AVEEPSA",
  },
  final: {
    blessing:
      "Your presence and blessings are our greatest gift.",
    closingTitle: "শুভ পরিণয়",
    names: "DEBMALYA ♥ AVEEPSA",
    familyLines: ["Mazumdar Family", "Chakrabarti Family"],
    weekdayEvening: "Wednesday · Evening",
    signatureSub: "A beautiful beginning",
    familiesBn: "মজুমদার ও চক্রবর্তী পরিবার",
    familiesEn: "Mazumdar & Chakrabarti Families",
  },
  guestForm: {
    prompt: "Bless us with your name",
    placeholder: "Your name",
    submit: "Send blessings",
    thanks: "Thank you, {name}",
    error: "Could not save. Please try again.",
  },
};
