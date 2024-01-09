import Header from "@/components/layout/header";
import { Analytics } from "@vercel/analytics/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Footer from "@/components/layout/footer";
import GA from "@/components/GA";

const jost = Jost({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IDL TO SQL",
  description:
    "IDL TO SQL BY SHYFT",
  openGraph: {
    images: [
      {
        url: "https://shyft.to/website_cover.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Header />
        <main className="min-h-[calc(100vh-300px)]">{children}</main>
        <Footer />
        <Analytics />
        <GA />
      </body>
    </html>
  );
}
