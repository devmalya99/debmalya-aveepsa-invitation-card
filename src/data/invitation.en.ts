import type { InvitationContent } from "@/types/invitation";

/**
 * English invitation copy.
 * Bengali names stay in original script where that better preserves identity.
 */
export const invitationEN: InvitationContent = {
  meta: {
    title: "শুভ বিবাহ — Debmalya & Aveepsa",
    description:
      "A digital Bengali wedding invitation for Debmalya & Aveepsa — 25 November 2026.",
  },
  common: {
    wedding: "শুভ বিবাহ",
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
    kicker: "শুভ বিবাহ",
    namesBn: "দেবমাল্য ও অভীপ্সা",
    namesEn: "DEBMALYA & AVEEPSA",
    date: "২৫ নভেম্বর ২০২৬",
    dateEn: "25 November 2026",
    location: "Murshidabad, West Bengal",
    tagline: "A celebration of Bengali heritage, love and togetherness",
  },
  identities: {
    groomLabelEn: "The Groom",
    brideLabelEn: "The Bride",
    groomLabelBn: "পাত্র",
    brideLabelBn: "পাত্রী",
    groomName: "Debmalya Mazumdar",
    brideName: "Aveepsa Chakrabarti",
    groomRelation: "Youngest son",
    brideRelation: "Only daughter",
    groomDetails: [
      { label: "Father", value: "Sri Prashanta Kumar Mazumdar" },
      { label: "Mother", value: "Srimati Nutan Mazumdar" },
      { label: "Residence", value: "Aravindapalli" },
      { label: "P.O. & P.S.", value: "Raghunathganj" },
      { label: "District", value: "Murshidabad" },
    ],
    brideDetails: [
      { label: "Father", value: "Sri Basudeb Chakrabarti" },
      { label: "Mother", value: "Srimati Madhuchhanda Chakraborti" },
      { label: "Brother", value: "Sri Abhijit Chakrabarti" },
      { label: "Sister-in-law", value: "Srimati Amrita Mazumdar" },
      { label: "Residence", value: "Old Hospital Road" },
      { label: "P.O. & P.S.", value: "Raghunathganj" },
      { label: "District", value: "Murshidabad" },
    ],
    unitedLine: "Debmalya & Aveepsa",
  },
  events: {
    eyebrow: "The Wedding Festivities",
    headingBn: "শুভ অনুষ্ঠান সূচী",
    headingEn: "Wedding Celebrations",
    subtitle: "Two special days · One beautiful beginning",
    closingNames: "Debmalya & Aveepsa",
    items: [
      {
        id: "wedding",
        titleBn: "গাত্রহরিদ্রা ও শুভবিবাহ",
        titleEn: "Gaye Holud & Wedding",
        bengaliDate: "৮ই অগ্রহায়ণ, ১৪৩৩",
        englishDate: "25 November 2026",
        day: "Wednesday",
        time: "Evening",
        accent: "turmeric",
      },
      {
        id: "reception",
        titleBn: "প্রীতিভোজ",
        titleEn: "Wedding Reception",
        bengaliDate: "১০ই অগ্রহায়ণ, ১৪৩৩",
        englishDate: "27 November 2026",
        day: "Friday",
        time: "Evening",
        accent: "burgundy",
      },
    ],
  },
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
    addressBn: "সদরঘাট, রঘুনাথগঞ্জ, মুর্শিদাবাদ",
    addressEn: "Sadarghat, Raghunathganj, Murshidabad, West Bengal, India",
    mapsLabel: "Open in Google Maps",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bhagirathi%20Lodge%20Sadarghat%20Raghunathganj%20Murshidabad",
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
};
