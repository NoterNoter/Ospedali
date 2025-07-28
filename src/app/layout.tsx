import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VerticalLines from "@/components/VerticalLines";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});   

export const metadata: Metadata = {
  title: "I Migliori Ospedali d'Italia 2025 | Classifica Ufficiale",
  description: "Scopri la classifica ufficiale dei migliori ospedali italiani 2025. Valutazioni per specialità: policlinici, cardiologia, oncologia, ortopedia. Analisi completa e dati aggiornati.",
  keywords: "ospedali italia, classifica ospedali, migliori ospedali, sanità italiana, policlinici, cardiologia, oncologia, ortopedia",
  authors: [{ name: "Italian Hospital" }],
  openGraph: {
    title: "I Migliori Ospedali d'Italia 2025",
    description: "La classifica ufficiale degli ospedali di eccellenza italiani per categoria specialistica",
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Migliori Ospedali d'Italia 2025",
    description: "La classifica ufficiale degli ospedali di eccellenza italiani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VerticalLines />
        <div className="max-w-[1440px] mx-auto">
          
          {children}
        </div>
      </body>
    </html>
  );
}
