import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menar — Dünyayı Anla, Geleceği Keşfet",
  description:
    "Menar: tarih, bilim ve felsefe üzerine düşünceler. Understand the world, design the future.",
  openGraph: {
    title: "Menar",
    description:
      "Tarih, bilim ve felsefe üzerine düşünceler. Understand the world, design the future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-deep">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
