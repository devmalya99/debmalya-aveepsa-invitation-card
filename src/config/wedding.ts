/**
 * Shared wedding facts.
 * Exact venue is intentionally omitted (owner decision).
 * Family lines remain draft until CONTENT_REVIEW.md is cleared.
 */
export const WEDDING = {
  couple: {
    partnerOne: "Debmalya Mazumdar",
    partnerTwo: "Aveepsa Chakrabarty",
    shortNames: {
      en: "Debmalya & Aveepsa",
      bn: "দেবমাল্য ও অভীপ্সা",
    },
    parents: {
      partnerOne: {
        en: {
          line1: "son of Prashanta Kumar Mazumdar",
          line2: "and Nutan Mazumdar",
        },
        bn: {
          line1: "প্রশান্ত কুমার মজুমদার",
          line2: "ও নূতন মজুমদারের পুত্র",
        },
      },
      partnerTwo: {
        en: {
          line1: "Daughter of Basudeb Chakrabarti",
          line2: "and Madhuchhanda Chakraborti",
        },
        bn: {
          line1: "বাসুদেব চক্রবর্তী",
          line2: "ও মধুছন্দা চক্রবর্তীর কন্যা",
        },
      },
    },
  },
  timezone: "Asia/Kolkata",
  ceremonyStartsAt: "2026-11-25T00:00:00+05:30",
  venue: {
    name: {
      en: "Bhagirathi Lodge",
      bn: "ভাগীরথী লজ",
    },
    city: "Raghunathganj",
    district: "Murshidabad",
    state: "West Bengal",
    country: "India",
    address: {
      en: "Sadarghat, Raghunathganj, Murshidabad, West Bengal, India",
      bn: "সদরঘাট, রঘুনাথগঞ্জ, মুর্শিদাবাদ, পশ্চিমবঙ্গ, ভারত",
    },
    mapsQuery: "Bhagirathi Lodge Sadarghat Raghunathganj Murshidabad",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bhagirathi%20Lodge%20Sadarghat%20Raghunathganj%20Murshidabad",
    parking: null as string | null,
    landmarks: null as string | null,
    contact: null as string | null,
  },
  events: [
    {
      id: "wedding-ceremony",
      name: {
        en: "Gaye Holud & Wedding",
        bn: "গাত্রহরিদ্রা ও শুভবিবাহ",
      },
      date: "2026-11-25",
      startTime: null as string | null,
      venueKey: "primary" as const,
      description: {
        en: "Join us as we begin our new journey together.",
        bn: "আমাদের নতুন জীবনযাত্রার শুভ সূচনায় আপনাদের সাদর আমন্ত্রণ।",
      },
      mapsUrl: null as string | null,
      image: null as string | null,
    },
    {
      id: "reception",
      name: {
        en: "Reception",
        bn: "প্রীতিভোজ",
      },
      date: "2026-11-27",
      startTime: null as string | null,
      venueKey: "primary" as const,
      description: {
        en: "An evening of joy, blessings, and celebration with our loved ones.",
        bn: "প্রিয়জনদের সঙ্গে আনন্দ ও আশীর্বাদের সন্ধ্যা।",
      },
      mapsUrl: null as string | null,
      image: null as string | null,
    },
  ],
} as const;

export type WeddingEvent = (typeof WEDDING.events)[number];
