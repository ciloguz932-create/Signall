import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { siteUrl } from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "MENAR — Bilgi, Kültür ve Üretim Platformu",
    template: "%s · MENAR",
  },
  description:
    "MENAR: medya, akademi, çocuk içerikleri, ürünler ve teknoloji için yeni nesil bir kültürel üretim merkezi. Tarih, bilim ve felsefe üzerine düşünceler.",
  keywords: [
    "MENAR",
    "bilgi",
    "kültür",
    "akademi",
    "bilim",
    "tarih",
    "felsefe",
    "çocuk içerikleri",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MENAR — Bilgi, Kültür ve Üretim Platformu",
    description:
      "Medya, akademi, çocuk içerikleri, ürünler ve teknoloji için yeni nesil bir kültürel üretim merkezi.",
    type: "website",
    siteName: "MENAR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MENAR — Bilgi, Kültür ve Üretim Platformu",
    description:
      "Medya, akademi, çocuk içerikleri, ürünler ve teknoloji için yeni nesil bir kültürel üretim merkezi.",
  },
  robots: {
    index: true,
    follow: true,
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
      data-theme="green"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-brand-deep">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('menar-theme');if(t==='green'||t==='mono'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`,
          }}
        />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
