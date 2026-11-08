import { z } from "zod";

export const guestNameSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(150, "Name is too long"),
  locale: z.enum(["bn", "en"]).optional(),
});

export type GuestNameInput = z.infer<typeof guestNameSchema>;
