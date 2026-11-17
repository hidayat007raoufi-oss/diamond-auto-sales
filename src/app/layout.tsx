import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyCTABar from "@/components/site/StickyCTABar";
import ChromeGate from "@/components/site/ChromeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://diamondauto.com"),
  title: {
    default: "Diamond Auto Sales — Auto Repair & Customization in Raleigh, NC",
    template: "%s | Diamond Auto Sales",
  },
  description:
    "Auto repair, maintenance, detailing, wraps, tint, and body and paint in Raleigh, NC.",
  keywords: [
    "auto repair Raleigh",
    "vehicle customization Raleigh",
    "Diamond Auto Sales",
  ],
  openGraph: {
    title: "Diamond Auto Sales — Auto Repair & Customization in Raleigh, NC",
    description:
      "Explore automotive services and pricing at Diamond Auto in Raleigh, North Carolina.",
    type: "website",
    siteName: "Diamond Auto Sales",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-white text-[#1d1d1f]">
        <ChromeGate>
          <Header />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate>
          <Footer />
          {/* clearance so the sticky bar never hides footer content on mobile */}
          <div aria-hidden className="h-24 lg:hidden" />
          <StickyCTABar />
        </ChromeGate>
      </body>
    </html>
  );
}
