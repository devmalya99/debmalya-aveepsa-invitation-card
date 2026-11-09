import { toInvitationIdentities } from "@/config/familyHeritage";
import { WEDDING_CARD_COPY } from "@/config/weddingCard";
import type { InvitationContent } from "@/types/invitation";

/**
 * English invitation copy — English only (no Bengali script in EN locale).
 * Celebrations → `weddingCard.ts`. Family heritage → `familyHeritage.ts`.
 */
export const invitationEN: InvitationContent = {
  meta: {
    title: "Our Wedding — Debmalya & Aveepsa",
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
    blessing: "WITH THE BLESSINGS OF OUR FAMILIES",
    monogram: "D & A",
    nameOne: "Debmalya",
    nameTwo: "Aveepsa",
    ampersand: "&",
    namesBn: "Debmalya & Aveepsa",
    namesEn: "DEBMALYA & AVEEPSA",
    date: "25 NOVEMBER 2026",
    dateEn: "25 NOVEMBER 2026",
    location: "Murshidabad, West Bengal",
    tagline: "Two hearts, two families, one beautiful beginning.",
    exploreLabel: "EXPLORE OUR WEDDING",
  },
  identities: toInvitationIdentities("en"),
  events: WEDDING_CARD_COPY.en,
  letter: {
    eyebrow: "An invitation from our families",
    salutation: "With warm regards",
    bengaliTitle: "Our Wedding",
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
    eyebrow: "THE CELEBRATION",
    heading: "A Place to Gather",
    subtitle: "Where beautiful memories begin.",
    photoCaption: "A MOMENT IN BENGAL",
    storyHeading: "A Celebration of Love & Togetherness",
    storyBody:
      "Surrounded by the warmth of our families, we look forward to celebrating this beautiful beginning with everyone who holds a special place in our hearts.",
    closing: "Your presence and blessings are our greatest gift.",
  },
  final: {
    blessing: "Your presence and blessings are our greatest gift.",
    closingTitle: "A Blessed Union",
    names: "DEBMALYA ♥ AVEEPSA",
    familyLines: ["Mazumdar Family", "Chakrabarti Family"],
    weekdayEvening: "Wednesday · Evening",
    signatureSub: "A beautiful beginning",
    familiesBn: "Mazumdar & Chakrabarti Families",
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
