import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://diamondauto.com"),
  title: {
    default: "Diamond Auto — Automotive Ownership, Reimagined | Raleigh, NC",
    template: "%s | Diamond Auto",
  },
  description:
    "A premium automotive ownership platform in Raleigh, NC. Luxury vehicle sales, detailing, window tint, mechanic, tire, customization, and fleet protection programs.",
  keywords: [
    "luxury cars Raleigh",
    "premium vehicle sales",
    "auto detailing Raleigh",
    "window tint",
    "fleet maintenance",
    "vehicle protection plans",
    "Diamond Auto",
  ],
  openGraph: {
    title: "Diamond Auto — Automotive Ownership, Reimagined",
    description:
      "Luxury vehicle sales and premium automotive services in Raleigh, North Carolina.",
    type: "website",
    siteName: "Diamond Auto",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="grain min-h-screen bg-bg text-text">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
