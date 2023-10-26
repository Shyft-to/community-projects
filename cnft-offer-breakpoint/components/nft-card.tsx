export default function NFTCard() {
  return (
    <div className="rounded-2xl shadow-2xl p-6 bg-grey-darker space-y-4 w-[408px]">
      <div className="relative aspect-square">
        <img
          className="rounded-xl w-full h-auto"
          src="/shyft-nft.webp"
          alt="nft"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-white text-xl font-bold leading-normal">
          Shyft Offer NFT
        </h3>
        <p className="text-grey text-sm">
          We are building the infrastucture layer of Solana to provide the best
          DevEx. Get started with our detailed documentation and 24/7 support.
        </p>
      </div>
    </div>
  );
}
