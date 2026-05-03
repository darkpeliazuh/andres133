import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Italiana } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Navigation } from "@/components/navigation";
import { LoaderCurtain } from "@/components/loader-curtain";

const display = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Noir — Three Michelin Stars · Paris",
  description:
    "An evening at Maison Noir is an act of theatre. Tasting menus by Chef Élise Marchand. Three Michelin stars. By reservation only.",
  keywords: [
    "michelin restaurant",
    "fine dining paris",
    "tasting menu",
    "luxury restaurant",
    "maison noir",
  ],
  openGraph: {
    title: "Maison Noir — Three Michelin Stars",
    description:
      "An evening at Maison Noir is an act of theatre. By reservation only.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#050402",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="bg-noir-950 text-ivory antialiased selection:bg-gold-400/30 selection:text-ivory">
        <LoaderCurtain />
        <Cursor />
        <SmoothScroll>
          <Navigation />
          <main className="relative">{children}</main>
        </SmoothScroll>
        <div className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay opacity-[0.06] bg-grain" />
      </body>
    </html>
  );
}
