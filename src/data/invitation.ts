import { invitationBN } from "@/data/invitation.bn";
import { invitationEN } from "@/data/invitation.en";
import type { InvitationContent, Locale } from "@/types/invitation";

export const invitations: Record<Locale, InvitationContent> = {
  bn: invitationBN,
  en: invitationEN,
};

export function getInvitation(locale: Locale): InvitationContent {
  return invitations[locale];
}
