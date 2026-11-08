import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "শুভ বিবাহ — Debmalya & Aveepsa",
  description:
    "A celebration of Bengali heritage, love and togetherness — Debmalya & Aveepsa, 25 November 2026.",
  other: {
    /* Chrome Auto Dark Theme opt-out — keyword order must be "only light". */
    "color-scheme": "only light",
    "supported-color-schemes": "light",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6ebd6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${fontVariables} h-full`}
      style={{ colorScheme: "only light" }}
    >
      <body
        className="min-h-full bg-[#f6ebd6] text-deep-burgundy antialiased"
        style={{ colorScheme: "only light", backgroundColor: "#f6ebd6" }}
      >
        {children}
      </body>
    </html>
  );
}
