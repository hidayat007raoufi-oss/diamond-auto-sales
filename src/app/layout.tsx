import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://diamondautonc.com"),
  title: {
    default: "Diamond Auto Sales | Auto Repair & Customization in Raleigh",
    template: "%s | Diamond Auto Sales",
  },
  description: "Explore auto repair, maintenance, tint, wraps, bodywork and detailing services in Raleigh, NC.",
  openGraph: {
    title: "Diamond Auto Sales | Auto Repair & Customization in Raleigh",
    description: "Auto repair, maintenance, tint, wraps, bodywork and detailing in Raleigh, NC.",
    type: "website",
    siteName: "Diamond Auto Sales",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080c16",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-white text-[#1d1d1f]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
