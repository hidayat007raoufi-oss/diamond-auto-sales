import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyCTABar from "@/components/site/StickyCTABar";
import DiamondAssistant from "@/components/site/DiamondAssistant";

export const metadata: Metadata = {
  metadataBase: new URL("https://diamondauto.com"),
  title: {
    default: "Diamond Auto Sales — Premium Vehicles in Raleigh, NC",
    template: "%s | Diamond Auto Sales",
  },
  description:
    "Premium pre-owned and luxury vehicles for sale in Raleigh, NC. Transparent financing, 27-point inspected inventory, and in-house service.",
  keywords: [
    "used cars Raleigh",
    "luxury cars Raleigh NC",
    "premium vehicles for sale",
    "auto financing Raleigh",
    "Diamond Auto Sales",
  ],
  openGraph: {
    title: "Diamond Auto Sales — Premium Vehicles in Raleigh, NC",
    description:
      "Premium vehicles, transparent financing, and in-house service in Raleigh, North Carolina.",
    type: "website",
    siteName: "Diamond Auto Sales",
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
    <html lang="en" className="antialiased">
      <body className="grain min-h-screen text-text">
        {/* refined static base — deep navy wash + soft top light (no floating shapes) */}
        <div aria-hidden className="fixed inset-0 -z-10 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_-12%,rgba(18,30,54,0.55),transparent_58%)]" />
          <div className="absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent_72%)]" />
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* clearance so the sticky bar never hides footer content on mobile */}
        <div aria-hidden className="h-24 lg:hidden" />
        <StickyCTABar />
        <DiamondAssistant />
      </body>
    </html>
  );
}
