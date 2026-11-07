import { z } from "zod";

const MAX_GUESTS = 20;
const MAX_ACCOMPANYING = 19;

export const rsvpSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, "Guest name is required")
      .max(150, "Guest name is too long"),
    phone: z
      .string()
      .trim()
      .max(20)
      .optional()
      .or(z.literal(""))
      .transform((value) => {
        if (!value) return undefined;
        const digits = value.replace(/[^\d+]/g, "");
        return digits.length > 0 ? digits : undefined;
      })
      .refine(
        (value) => value === undefined || /^(\+?\d{10,15})$/.test(value),
        "Enter a valid mobile number",
      ),
    attending: z.boolean(),
    guestCount: z.number().int().min(0).max(MAX_GUESTS),
    accompanyingGuests: z
      .array(
        z.object({
          guestName: z.string().trim().min(1).max(150),
        }),
      )
      .max(MAX_ACCOMPANYING)
      .default([]),
    message: z
      .string()
      .trim()
      .max(1000)
      .optional()
      .or(z.literal(""))
      .transform((value) => (value ? value : undefined)),
  })
  .superRefine((data, ctx) => {
    if (data.attending && data.guestCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["guestCount"],
        message: "Guest count must be at least 1 when attending",
      });
    }

    if (!data.attending && data.guestCount !== 0) {
      ctx.addIssue({
        code: "custom",
        path: ["guestCount"],
        message: "Guest count must be 0 when not attending",
      });
    }

    if (data.accompanyingGuests.length > Math.max(data.guestCount - 1, 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["accompanyingGuests"],
        message: "Too many accompanying guests for the stated guest count",
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
