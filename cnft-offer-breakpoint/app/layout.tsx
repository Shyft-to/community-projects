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
  title: "Unlock Shyft Credits",
  description:
    "Mint Shyft Credit NFTs to supercharge your DevEx",
  openGraph: {
    images: [
      {
        url: "https://shyft.to/website_cover.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: [{ rel: "icon", url: "https://shyft.to/logo192.png" }, { rel: "apple-touch-icon", url: "https://shyft.to/logo192.png" }]
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
