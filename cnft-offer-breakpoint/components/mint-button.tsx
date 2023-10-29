"use client";

import Button from "./ui/button";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "./connect-wallet-button";
import { useState } from "react";
import { handleMint } from "@/lib/shyft";
import { useRouter } from "next/navigation";

export default function MintButton() {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();

  const mintcNFT = async () => {
    try {
      setLoading(true);
      const { success, error, data } = await handleMint(publicKey?.toBase58()!);
      if (!success) throw new Error(error);

      replace(`/?success=true&tx=${data}`);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected || !publicKey) return <ConnectWalletButton />;

  return (
    <Button disabled={loading} onClick={() => mintcNFT()}>
      {loading ? "Minting your cNFT..." : "Get Free Credits"}
    </Button>
  );
}
