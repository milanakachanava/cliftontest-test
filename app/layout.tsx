import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Human Operating System — beta-тест",
  description: "48 ситуаций и 12 авторских шкал, чтобы увидеть свой естественный способ думать, действовать и быть с людьми.",
  openGraph: {
    title: "Human Operating System — beta-тест",
    description: "Узнайте свой ведущий профиль: 48 жизненных ситуаций, 12 авторских шкал и персональная расшифровка.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title: "Human Operating System — beta-тест",
    description: "48 ситуаций. 12 шкал. Ваша персональная карта сильных сторон.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f2ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
