import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CoffeeMasiha by Mohnish",
  description:
    "A cosy minimal coffee shop for black coffee, cold brew, AeroPress, and water-led brewing.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "CoffeeMasiha by Mohnish",
    description:
      "Black coffee, cold brew, and AeroPress brewed with water, patience, and nothing to hide.",
    images: ["/coffee-ritual.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoffeeMasiha by Mohnish",
    description:
      "A cosy minimal coffee shop for clean, water-led cups.",
    images: ["/coffee-ritual.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
