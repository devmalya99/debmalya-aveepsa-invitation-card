import { inviteMedia } from "@/config/invite-media";

export type InviteDeckCardId =
  | "cover"
  | "formal"
  | "kolkata"
  | "taxi"
  | "ceremony"
  | "moonlit";

export type InviteDeckCard = {
  id: InviteDeckCardId;
  src: string;
  fit: "contain" | "cover";
  wash: "none" | "warm" | "night" | "center";
  storyKey?: "kolkata" | "taxi" | "ceremony" | "moonlit";
};

/** Vertical invitation scenes: cover → formal family invite → story beats. */
export const inviteDeckCards: InviteDeckCard[] = [
  {
    id: "cover",
    src: inviteMedia.cover,
    fit: "contain",
    wash: "warm",
  },
  {
    id: "formal",
    src: inviteMedia.cover,
    fit: "contain",
    wash: "center",
  },
  {
    id: "kolkata",
    src: inviteMedia.kolkata,
    fit: "cover",
    wash: "warm",
    storyKey: "kolkata",
  },
  {
    id: "taxi",
    src: inviteMedia.taxi,
    fit: "contain",
    wash: "warm",
    storyKey: "taxi",
  },
  {
    id: "ceremony",
    src: inviteMedia.ceremony,
    fit: "contain",
    wash: "warm",
    storyKey: "ceremony",
  },
  {
    id: "moonlit",
    src: inviteMedia.moonlit,
    fit: "contain",
    wash: "night",
    storyKey: "moonlit",
  },
];
