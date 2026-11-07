"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { rsvpSchema } from "@/lib/validations/rsvp";
import type { Dictionary } from "@/i18n/dictionaries/types";

type RsvpFormProps = {
  dictionary: Dictionary;
};

const formSchema = z.object({
  guestName: z.string().trim().min(2).max(150),
  phone: z.string().optional(),
  attending: z.boolean(),
  guestCount: z.number().int().min(0).max(20),
  accompanyingNames: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RsvpForm({ dictionary }: RsvpFormProps) {
  const d = dictionary.rsvp;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      phone: "",
      attending: true,
      guestCount: 1,
      accompanyingNames: "",
      message: "",
    },
  });

  const attending = watch("attending");

  async function onSubmit(values: FormValues) {
    setServerError(null);

    const accompanyingGuests = values.attending
      ? (values.accompanyingNames ?? "")
          .split("\n")
          .map((name) => name.trim())
          .filter(Boolean)
          .map((guestName) => ({ guestName }))
      : [];

    const parsed = rsvpSchema.safeParse({
      guestName: values.guestName,
      phone: values.phone,
      attending: values.attending,
      guestCount: values.attending ? values.guestCount : 0,
      accompanyingGuests,
      message: values.message,
    });

    if (!parsed.success) {
      setStatus("error");
      setServerError(d.errorGeneric);
      return;
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerError(data.error ?? d.errorGeneric);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(d.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="border border-antique-gold/40 bg-soft-white/80 px-6 py-12 text-center">
        <p className="font-display text-3xl text-dark-burgundy">
          {d.successTitle}
        </p>
        <p className="mt-3 font-body text-dark-burgundy/80">{d.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 border border-antique-gold/25 bg-soft-white/80 px-5 py-8 sm:px-8"
      noValidate
    >
      <div>
        <label
          htmlFor="guestName"
          className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold"
        >
          {d.guestName}
        </label>
        <input
          id="guestName"
          className="mt-2 w-full border border-antique-gold/30 bg-warm-ivory px-3 py-3 font-body text-dark-burgundy outline-none focus:border-antique-gold"
          {...register("guestName")}
        />
        {errors.guestName ? (
          <p className="mt-1 text-sm text-deep-wine">{errors.guestName.message}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold"
        >
          {d.phone}
        </label>
        <input
          id="phone"
          className="mt-2 w-full border border-antique-gold/30 bg-warm-ivory px-3 py-3 font-body text-dark-burgundy outline-none focus:border-antique-gold"
          {...register("phone")}
        />
        {errors.phone ? (
          <p className="mt-1 text-sm text-deep-wine">{errors.phone.message}</p>
        ) : null}
      </div>

      <fieldset>
        <legend className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold">
          {d.attending}
        </legend>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setValue("attending", true);
              setValue("guestCount", 1);
            }}
            className={`flex-1 border px-3 py-3 font-body text-sm transition ${
              attending
                ? "border-antique-gold bg-antique-gold/15 text-dark-burgundy"
                : "border-antique-gold/25 text-dark-burgundy/70"
            }`}
          >
            {d.attendingYes}
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("attending", false);
              setValue("guestCount", 0);
            }}
            className={`flex-1 border px-3 py-3 font-body text-sm transition ${
              !attending
                ? "border-antique-gold bg-antique-gold/15 text-dark-burgundy"
                : "border-antique-gold/25 text-dark-burgundy/70"
            }`}
          >
            {d.attendingNo}
          </button>
        </div>
      </fieldset>

      {attending ? (
        <>
          <div>
            <label
              htmlFor="guestCount"
              className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold"
            >
              {d.guestCount}
            </label>
            <input
              id="guestCount"
              type="number"
              min={1}
              max={20}
              className="mt-2 w-full border border-antique-gold/30 bg-warm-ivory px-3 py-3 font-body text-dark-burgundy outline-none focus:border-antique-gold"
              {...register("guestCount", { valueAsNumber: true })}
            />
            {errors.guestCount ? (
              <p className="mt-1 text-sm text-deep-wine">
                {errors.guestCount.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="accompanyingNames"
              className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold"
            >
              {d.accompanying}
            </label>
            <textarea
              id="accompanyingNames"
              rows={3}
              placeholder={d.accompanyingHint}
              className="mt-2 w-full border border-antique-gold/30 bg-warm-ivory px-3 py-3 font-body text-dark-burgundy outline-none focus:border-antique-gold"
              {...register("accompanyingNames")}
            />
          </div>
        </>
      ) : null}

      <div>
        <label
          htmlFor="message"
          className="font-label text-xs uppercase tracking-[0.16em] text-antique-gold"
        >
          {d.message}
        </label>
        <textarea
          id="message"
          rows={4}
          className="mt-2 w-full border border-antique-gold/30 bg-warm-ivory px-3 py-3 font-body text-dark-burgundy outline-none focus:border-antique-gold"
          {...register("message")}
        />
      </div>

      {serverError ? (
        <p className="text-sm text-deep-wine">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-antique-gold bg-deep-wine px-4 py-3 font-label text-xs uppercase tracking-[0.22em] text-soft-white transition hover:bg-dark-burgundy disabled:opacity-60"
      >
        {isSubmitting ? d.submitting : d.submit}
      </button>
    </form>
  );
}
