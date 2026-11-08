import type { Metadata } from "next";
import { fontVariables } from "@/app/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "শুভ বিবাহ — Debmalya & Aveepsa",
  description:
    "A celebration of Bengali heritage, love and togetherness — Debmalya & Aveepsa, 25 November 2026.",
  other: {
    "color-scheme": "light only",
    "supported-color-schemes": "light",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${fontVariables} h-full`}
      style={{ colorScheme: "light" }}
    >
      <body
        className="min-h-full bg-[#f6ebd6] text-deep-burgundy antialiased"
        style={{ colorScheme: "light" }}
      >
        {children}
      </body>
    </html>
  );
}
