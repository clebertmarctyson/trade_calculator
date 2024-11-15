import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Providers from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Crypto Trade Calculator | Position Size & P&L Tracker",
  description:
    "Professional crypto trading calculator for tracking positions, analyzing profit/loss, and managing trade fees. Calculate precise unit sizes and monitor your trading performance.",
  keywords: [
    "crypto trading calculator",
    "position size calculator",
    "crypto P&L tracker",
    "trading fee calculator",
    "cryptocurrency trading tool",
    "bitcoin position calculator",
    "trading performance tracker",
  ],
  authors: [
    {
      name: "Your Name",
      url: "your-website-url",
    },
  ],
  openGraph: {
    title: "Crypto Trade Calculator | Position Size & P&L Tracker",
    description:
      "Professional crypto trading calculator for position sizing and P&L tracking",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
