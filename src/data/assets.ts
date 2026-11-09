/**
 * Asset manifest for the cinematic invitation.
 * Couple photos are original. Decorative files are approved references.
 */
export const assets = {
  couple: {
    grandReveal: "/images/couple/couple-grand-reveal-v3.jpg",
    finalBlessing: "/images/couple/couple-02.jpg",
  },
  decorations: {
    alpana: "/decorations/alpana/alpana-lotus.png",
    headingMandala: "/decorations/alpana/heading-mandala-circle-v2.png",
    festivityLotus: "/decorations/alpana/festivity-lotus.jpg",
    festivityMandala: "/decorations/alpana/festivity-mandala.jpg",
    unionMandala: "/decorations/alpana/union-mandala-sm.jpg",
    shiuli: "/decorations/floral/shiuli.jpg",
    shankha: "/decorations/ornaments/shankha.jpg",
    topor: "/decorations/ornaments/topor.jpg",
    envelope: "/decorations/envelope/wax-seal-envelope.png",
    kolkataCover: "/decorations/invitation/kolkata-cover.jpg",
    botanicalPetal: "/decorations/botanicals/shiuli-petal.svg",
    botanicalLeaf: "/decorations/botanicals/gold-leaf.svg",
    botanicalFlower: "/decorations/botanicals/lotus-bloom.svg",
    scrollSuite: "/decorations/invitation/scroll-suite.jpg",
    cardSuite: "/decorations/invitation/card-suite.jpg",
    trifold: "/decorations/invitation/trifold-red-gold.png",
    kolkataHeritage: "/decorations/invitation/kolkata-heritage.jpg",
    balconyFrame: "/decorations/invitation/balcony-frame.jpg",
    namasteFrame: "/decorations/invitation/namaste-couple-frame.jpg",
    royalCoverFrame: "/decorations/invitation/royal-cover-frame.jpg",
    mandapCeremony: "/decorations/invitation/mandap-ceremony.jpg",
    murshidabadSketch: "/decorations/venue/murshidabad-heritage-sketch.png",
    hazarduari: "/decorations/venue/hazarduari-palace.jpg",
    bhagirathiRiver: "/decorations/venue/bhagirathi-river-sunset.jpg",
    bhagirathiBoat: "/decorations/venue/bhagirathi-boat-v2.jpg",
    moorshedabadPrint: "/decorations/venue/moorshedabad-print.png",
    venueAlpana: "/decorations/venue/alpana-panel.jpg",
    shiuliHeritage: "/decorations/venue/shiuli-heritage.jpg",
  },
  audio: {
    ambient: "/audio/sitar-bansuri-milaap.mp3",
  },
} as const;

export type CoupleAssetKey = keyof typeof assets.couple;
export type DecorationAssetKey = keyof typeof assets.decorations;
