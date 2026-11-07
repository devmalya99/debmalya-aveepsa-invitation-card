export type Locale = "bn" | "en";

export type InvitationEvent = {
  id: "wedding" | "reception";
  titleBn: string;
  titleEn: string;
  bengaliDate: string;
  englishDate: string;
  day: string;
  time: string;
  accent: "turmeric" | "burgundy";
};

export type InvitationContent = {
  meta: {
    title: string;
    description: string;
  };
  common: {
    wedding: string;
    openInvite: string;
    skipIntro: string;
    scrollHint: string;
    music: string;
    replay: string;
    languageLabel: string;
  };
  envelope: {
    instruction: string;
    sealLabel: string;
  };
  grandReveal: {
    kicker: string;
    namesBn: string;
    namesEn: string;
    date: string;
    dateEn: string;
    location: string;
    tagline: string;
  };
  identities: {
    groomLabelEn: string;
    brideLabelEn: string;
    groomLabelBn: string;
    brideLabelBn: string;
    groomName: string;
    brideName: string;
    groomRelation: string;
    brideRelation: string;
    groomDetails: Array<{ label: string; value: string }>;
    brideDetails: Array<{ label: string; value: string }>;
    unitedLine: string;
  };
  events: {
    eyebrow: string;
    headingBn: string;
    headingEn: string;
    subtitle: string;
    closingNames: string;
    items: InvitationEvent[];
  };
  letter: {
    eyebrow: string;
    salutation: string;
    bengaliTitle: string;
    subtitle: string;
    paragraphs: string[];
    closing: string;
    families: string;
    date: string;
  };
  venue: {
    greetingBn: string;
    greetingEn: string;
    cordially: string;
    cityBn: string;
    cityEn: string;
    heritageTagline: string;
    lodgeBn: string;
    lodgeEn: string;
    addressBn: string;
    addressEn: string;
    mapsLabel: string;
    mapsUrl: string;
    blessing: string;
    coupleNames: string;
  };
  final: {
    blessing: string;
    closingTitle: string;
    names: string;
    familyLines: string[];
  };
};
