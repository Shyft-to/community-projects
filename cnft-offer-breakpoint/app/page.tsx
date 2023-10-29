"use client";

import MintButton from "@/components/mint-button";
import Marquee from "react-fast-marquee";
import NFTCard from "@/components/nft-card";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("success");

  if (Boolean(search)) {
    return <SuccessView />;
  }

  return (
    <main>
      <div className="bg-black w-full flex flex-col gap-1 -rotate-2 mt-20">
        <div
          style={{
            backgroundImage: "linear-gradient(90deg,#fff 50%,transparent 0)",
            backgroundPosition: "0 0",
            backgroundSize: "24px 2px",
          }}
          className="w-full bg-repeat-x py-1.5"
        />
        <div className="w-[103vw] lg:w-[101vw] -ml-1 mb-1.5">
          <div className="bg-red-500 pt-10 pb-6">
            <div className="mb-3 lg:mb-6 text-center">
              <p className="text-xs lg:text-base text-white">
                Build Faster and Smarter
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold leading-normal text-white mt-2">
                Complete Development Suite
              </h2>
            </div>
            <Marquee speed={100}>
              <p className="text-xl font-bold text-white mx-5">
                Making Solana Queryable
              </p>
              <p className="text-xl font-bold text-white mx-5">
                Real-time infrastructure on solana
              </p>
              <p className="text-xl font-bold text-white mx-5">GraphQL APIs</p>
            </Marquee>
          </div>
        </div>

        <div
          style={{
            backgroundImage: "linear-gradient(90deg,#fff 50%,transparent 0)",
            backgroundPosition: "0 0",
            backgroundSize: "24px 2px",
          }}
          className="w-full bg-repeat-x py-1.5"
        />
      </div>
      <div className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20 gap-5">
        <NFTCard />
        <MintButton />
      </div>
    </main>
  );
}

const SuccessView = () => {
  const searchParams = useSearchParams();
  const tx = searchParams.get("tx");

  return (
    <div className="container px-4 md:px-8 flex mx-auto flex-col items-center py-20 gap-5">
      <h2 className="text-2xl lg:text-4xl text-center font-bold leading-normal text-white mt-2">
        You have supercharged your Wallet with 50M Shyft Credits
      </h2>

      <div className="max-w-md mx-4 flex justify-center items-center gap-6 mt-10">
        <a
          target="_blank"
          href="https://shyft.to/get-api-key"
          className="rounded-full text-sm font-medium px-4 disabled:cursor-not-allowed disabled:bg-gray-500 py-2 focus:outline-none focus:enabled:ring bg-amber-400 hover:enabled:bg-amber-400/80 text-black focus:enabled:ring-amber-400"
        >
          Redeem Credits
        </a>
        <a
          href={`https://translator.shyft.to/tx/${tx}?cluster=${process.env.NEXT_PUBLIC_SOLANA_CLUSTER}`}
          target="_blank"
          className="rounded-full text-sm font-medium px-4 disabled:cursor-not-allowed disabled:bg-gray-500 py-2 focus:outline-none focus:enabled:ring bg-amber-400 hover:enabled:bg-amber-400/80 text-black focus:enabled:ring-amber-400"
        >
          See in Translator
        </a>
      </div>
    </div>
  );
};
