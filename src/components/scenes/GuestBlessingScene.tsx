"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { SceneWrapper } from "@/components/experience/SceneWrapper";
import { assets } from "@/data/assets";
import { useLanguage } from "@/hooks/useLanguage";

/**
 * Closing guest-name capture — form sits in the maroon arch so it reads as part of the art.
 */
export function GuestBlessingScene() {
  const { content, locale } = useLanguage();
  const copy = content.guestForm;
  const isBengali = locale === "bn";

  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [savedName, setSavedName] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2 || status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/guest-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName: trimmed, locale }),
      });
      const data = (await response.json()) as { ok?: boolean };
      if (!response.ok || !data.ok) {
        setStatus("error");
        return;
      }
      setSavedName(trimmed);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SceneWrapper
      id="guest-blessing"
      tone="burgundy"
      innerClassName="!max-w-none !px-0 !pt-0 !pb-0 justify-stretch"
    >
      <div className="relative h-full min-h-svh w-full overflow-hidden">
        <Image
          src={assets.decorations.namasteFrame}
          alt=""
          fill
          priority={false}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft vignette keeps the arch readable without a hard panel */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(80,10,18,0.15)_0%,rgba(20,6,10,0.35)_70%,rgba(12,4,8,0.55)_100%)]"
          aria-hidden
        />

        {/* Form sits in the empty maroon arch */}
        <div className="absolute inset-x-[14%] top-[22%] bottom-[38%] z-10 flex flex-col items-center justify-center px-2 sm:inset-x-[16%] sm:top-[20%] sm:bottom-[36%]">
          {status === "success" ? (
            <p
              className={`text-center text-[1.15rem] leading-snug text-[#F8E7B0] ${
                isBengali ? "font-bn-display" : "font-display"
              }`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.55)",
              }}
            >
              {copy.thanks.replace("{name}", savedName)}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex w-full max-w-[15.5rem] flex-col items-center gap-3"
            >
              <label
                htmlFor="guest-name"
                className={`text-center text-[0.92rem] leading-snug text-[#F3D98A] ${
                  isBengali ? "font-bn-display" : "font-display"
                }`}
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {copy.prompt}
              </label>

              <input
                id="guest-name"
                name="guestName"
                type="text"
                autoComplete="name"
                maxLength={150}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={copy.placeholder}
                className={`w-full border-0 border-b border-[#E8CD96]/55 bg-transparent px-1 py-2 text-center text-[1.05rem] text-[#FFF4D6] outline-none placeholder:text-[#F3D98A]/45 focus:border-[#F3D98A] ${
                  isBengali ? "font-bn-body" : "font-display"
                }`}
                style={{
                  textShadow: "0 1px 6px rgba(0,0,0,0.45)",
                }}
              />

              <button
                type="submit"
                disabled={status === "loading" || name.trim().length < 2}
                className={`mt-1 min-h-10 px-3 text-[0.78rem] tracking-[0.08em] text-[#F3D98A] transition disabled:opacity-40 ${
                  isBengali
                    ? "font-bn-body"
                    : "font-display uppercase"
                }`}
                style={{
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                }}
              >
                {status === "loading" ? "…" : copy.submit}
              </button>

              {status === "error" ? (
                <p
                  className={`text-center text-[0.72rem] text-[#FFD0D0] ${
                    isBengali ? "font-bn-body" : "font-body"
                  }`}
                >
                  {copy.error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
}
