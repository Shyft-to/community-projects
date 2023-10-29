export default function NFTCard() {
  return (
    <div className="rounded-2xl shadow-2xl p-6 bg-grey-darker space-y-4 w-[408px]">
      <div className="relative aspect-square">
        <img
          className="rounded-xl w-full h-auto"
          src="/shyft-nft.png"
          alt="nft"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-white text-xl font-bold leading-normal">
          Breakpoint Supercharge 2023
        </h3>
        <p className="text-grey text-sm">
          This NFT will supercharge your Solana DevEx above 9000. . Holder of
          this will get 50M free credits, only if redeemed before 1 Dec 2023.
          Hurry up! Only 100 of a kind is going to be minted.
        </p>
      </div>
    </div>
  );
}
