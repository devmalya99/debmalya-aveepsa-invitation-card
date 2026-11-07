import type { Metadata } from "next";
import { fontVariables } from "@/app/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "শুভ বিবাহ — Debmalya & Aveepsa",
  description:
    "A celebration of Bengali heritage, love and togetherness — Debmalya & Aveepsa, 25 November 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-antique-ivory antialiased">{children}</body>
    </html>
  );
}
