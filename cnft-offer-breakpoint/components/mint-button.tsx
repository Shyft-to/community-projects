"use client";

import Button from "./ui/button";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "./connect-wallet-button";
import { useState } from "react";
import { handleMint } from "@/lib/shyft";

export default function MintButton() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const mintcNFT = async () => {
    try {
      setLoading(true);
      const { success, error, data } = await handleMint(publicKey?.toBase58()!);
      if (!success) throw new Error(error);
      toast.success(
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            height="20"
            width="20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>
            Your NFT has been minted.{" "}
            <a
              className="underline"
              target="_blank"
              href={`https://translator.shyft.to/tx/${data}?cluster=${process
                .env.NEXT_PUBLIC_SOLANA_CLUSTER!}`}
            >
              View transaction
            </a>
          </span>
        </>
      );
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected || !publicKey) return <ConnectWalletButton />;

  return (
    <Button disabled={loading} onClick={() => mintcNFT()}>
      {loading ? "Minting your cNFT..." : "Mint your cNFT"}
    </Button>
  );
}
