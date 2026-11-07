export const storybookImages = {
  cover: "/images/storybook/namaste-cover.jpg",
  kolkata: "/images/storybook/kolkata-sunset.jpg",
  birds: "/images/storybook/birds-clean.png",
  petals: "/images/storybook/petals.png",
  taxi: "/images/storybook/taxi-kolkata.jpg",
  ceremony: "/images/storybook/ceremony.jpg",
  moonlit: "/images/storybook/moonlit-palace.jpg",
  balcony: "/images/storybook/balcony-city.jpg",
} as const;

export type StoryChapterId =
  | "cover"
  | "kolkata"
  | "winds"
  | "taxi"
  | "ceremony"
  | "moonlit"
  | "invite";

export type StoryChapter = {
  id: StoryChapterId;
  image: string;
  effects: Array<"petals" | "birds" | "stars" | "drapes" | "leaves">;
  textPosition: "center" | "top" | "bottom";
  overlay: "none" | "edge" | "night";
  textStyle: "open" | "panel";
  /** Illustrated pages use contain so art is not stretched. */
  fit: "contain" | "cover";
};

export const storyChapters: StoryChapter[] = [
  {
    id: "cover",
    image: storybookImages.cover,
    effects: ["petals"],
    textPosition: "center",
    overlay: "none",
    textStyle: "open",
    fit: "contain",
  },
  {
    id: "kolkata",
    image: storybookImages.kolkata,
    effects: ["birds", "leaves"],
    textPosition: "bottom",
    overlay: "edge",
    textStyle: "open",
    fit: "cover",
  },
  {
    id: "winds",
    image: storybookImages.kolkata,
    effects: ["birds", "petals"],
    textPosition: "center",
    overlay: "none",
    textStyle: "open",
    fit: "cover",
  },
  {
    id: "taxi",
    image: storybookImages.taxi,
    effects: ["petals"],
    textPosition: "top",
    overlay: "none",
    textStyle: "open",
    fit: "contain",
  },
  {
    id: "ceremony",
    image: storybookImages.ceremony,
    effects: ["petals", "leaves"],
    textPosition: "center",
    overlay: "edge",
    textStyle: "panel",
    fit: "contain",
  },
  {
    id: "moonlit",
    image: storybookImages.moonlit,
    effects: ["stars", "petals"],
    textPosition: "top",
    overlay: "night",
    textStyle: "open",
    fit: "contain",
  },
  {
    id: "invite",
    image: storybookImages.balcony,
    effects: ["birds", "petals", "drapes"],
    textPosition: "center",
    overlay: "none",
    textStyle: "open",
    fit: "contain",
  },
];
