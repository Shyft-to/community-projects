import MintButton from "@/components/mint-button";
import NFTCard from "@/components/nft-card";

export default function Home() {
  return (
    <main className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20 gap-5">
      <h2 className="text-2xl lg:text-4xl text-white font-extrabold text-center mb-5">
        cNFT Offer
      </h2>
      <NFTCard />
      <MintButton />
    </main>
  );
}
