export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  language: {
    welcomeEyebrow: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    chooseEnglish: string;
    chooseBengali: string;
    switcherLabel: string;
    switchToEnglish: string;
    switchToBengali: string;
  };
  nav: {
    home: string;
    blessings: string;
    story: string;
    heritage: string;
    rajbari: string;
    events: string;
    countdown: string;
    venue: string;
    gallery: string;
    rsvp: string;
    closing: string;
    cover: string;
    kolkata: string;
    winds: string;
    taxi: string;
    ceremony: string;
    moonlit: string;
    invite: string;
  };
  hero: {
    shubhoBibaho: string;
    partnerOne: string;
    ampersand: string;
    partnerTwo: string;
    date: string;
    tagline: string;
    scrollHint: string;
  };
  blessings: {
    eyebrow: string;
    title: string;
    body: string;
  };
  story: {
    eyebrow: string;
    title: string;
    body: string;
    captions: {
      cinematic: string;
      playful: string;
      editorial: string;
      traditional: string;
      cultural: string;
    };
  };
  loveStory: {
    chapterLabel: string;
    scrollHint: string;
    chapters: {
      cover: { kicker: string; title: string; lines: string[] };
      kolkata: { kicker: string; title: string; lines: string[] };
      winds: { kicker: string; title: string; lines: string[] };
      taxi: { kicker: string; title: string; lines: string[] };
      ceremony: { kicker: string; title: string; lines: string[] };
      moonlit: { kicker: string; title: string; lines: string[] };
      invite: { kicker: string; title: string; lines: string[] };
    };
  };
  heritage: {
    eyebrow: string;
    title: string;
    body: string;
  };
  rajbari: {
    eyebrow: string;
    title: string;
    body: string;
  };
  events: {
    eyebrow: string;
    title: string;
    body: string;
    timeTbd: string;
    directions: string;
  };
  countdown: {
    eyebrow: string;
    title: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    celebrated: string;
  };
  venue: {
    eyebrow: string;
    title: string;
    body: string;
    openMaps: string;
    parking: string;
    landmarks: string;
    contact: string;
    detailsSoon: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    body: string;
    categories: {
      prewedding: string;
      traditional: string;
      wedding: string;
    };
    empty: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    body: string;
    guestName: string;
    phone: string;
    attending: string;
    attendingYes: string;
    attendingNo: string;
    guestCount: string;
    accompanying: string;
    accompanyingHint: string;
    message: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorGeneric: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    blessing: string;
    thanks: string;
  };
  share: {
    invite: string;
    copied: string;
  };
  common: {
    loading: string;
    placeholderPhoto: string;
    decorativePending: string;
  };
  mobileOnly: {
    title: string;
    body: string;
  };
  pocket: {
    tapCover: string;
    momentsHint: string;
    charmsHint: string;
    openCard: string;
    swipeHint: string;
    detailsCta: string;
    detailsHint: string;
    backToCards: string;
  };
  formalInvite: {
    eyebrow: string;
    weds: string;
    dateLine: string;
  };
};
