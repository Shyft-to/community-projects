import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
require("@solana/wallet-adapter-react-ui/styles.css");
import Header from "@/components/layout/header";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Footer from "@/components/layout/footer";
import GA from "@/components/GA";
import Providers from "./provider";

const jost = Jost({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airdrop with Shyft",
  description:
    "Unlock the power of compression with Shyft Airdrop – your go-to platform to effortlessly take snapshots of NFT collection holders. Easily collect the addresses of current NFT holders for your airdrops and promotions. Streamline your NFT distribution with Shyft Airdrop today for free!",
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
        <Providers>
          <main className="min-h-[calc(100vh-300px)]">{children}</main>
        </Providers>
        <Footer />
        <GA />
      </body>
    </html>
  );
}
