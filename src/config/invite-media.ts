export const inviteMedia = {
  cover: "/images/storybook/namaste-cover.jpg",
  kolkata: "/images/storybook/kolkata-sunset.jpg",
  taxi: "/images/storybook/taxi-kolkata.jpg",
  ceremony: "/images/storybook/ceremony.jpg",
  moonlit: "/images/storybook/moonlit-palace.jpg",
  balcony: "/images/storybook/balcony-city.jpg",
} as const;

export const momentCards = [
  { id: "cover", src: inviteMedia.cover, tone: "warm" },
  { id: "kolkata", src: inviteMedia.kolkata, tone: "sunset" },
  { id: "taxi", src: inviteMedia.taxi, tone: "festive" },
  { id: "ceremony", src: inviteMedia.ceremony, tone: "ritual" },
  { id: "moonlit", src: inviteMedia.moonlit, tone: "night" },
  { id: "balcony", src: inviteMedia.balcony, tone: "city" },
] as const;
