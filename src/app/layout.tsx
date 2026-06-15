import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Diamond Auto Sales | Quality Pre-Owned Vehicles",
    template: "%s | Diamond Auto Sales",
  },
  description:
    "Browse quality pre-owned cars, trucks, and SUVs at Diamond Auto Sales. Honest pricing, flexible financing for all credit, and a no-pressure buying experience.",
  keywords: [
    "used cars",
    "pre-owned vehicles",
    "auto financing",
    "used trucks",
    "used SUVs",
    "Diamond Auto Sales",
  ],
  openGraph: {
    title: "Diamond Auto Sales | Quality Pre-Owned Vehicles",
    description:
      "Quality pre-owned vehicles, honest pricing, and financing for every credit situation.",
    type: "website",
    siteName: "Diamond Auto Sales",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
