"use client";

import React,{ useEffect } from "react";
import Button from "./ui/button";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletButton from "./connect-wallet-button";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from "react";
import { handleMint } from "@/lib/shyft";
import { useRouter } from "next/navigation";

export default function MintButton() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [loading, setLoading] = useState(false);
  const [clickedConnectWallet,setConnectWallet] = useState(false);
  const [currentPubKey,setCurrentPubKey] = useState("");
  const { replace } = useRouter();

  const mintcNFT = async () => {
    try {
      setLoading(true);
      const { success, error, data } = await handleMint(currentPubKey);
      if (!success) throw new Error(error);

      replace(`/?success=true&tx=${data}`);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(clickedConnectWallet && publicKey)
      setCurrentPubKey(publicKey?.toBase58());
  }, [publicKey])
  
  // useEffect(() => {
  //   //this will continuously run untill user has clicked connect wallet
  //   //setvisible has been used to connect wallet
  //   if(clickedConnectWallet === false && publicKey)
  //   {
  //     const pKey = publicKey?.toBase58();
  //     console.log(pKey);
  //     //console.log(connected,publicKey?.toBase58())
  //     if(pKey)
  //       disconnectWallet()
  //   }
  // }, [publicKey])
  // const disconnectWallet = () => {

  //   let content = document.getElementsByClassName("keys")[0];
  //   let kbButtons = content.getElementsByTagName("button")[0];

  //   if(kbButtons)
  //     kbButtons.click();
  // }
  const connectWalletOnClick = () => {
    setConnectWallet(true);
    // setVisible(true);
  }
  

  // if (!connected || !publicKey) return <div onClick={connectWalletOnClick}><ConnectWalletButton /></div>;
  if (currentPubKey === "") return <div onClick={connectWalletOnClick}><ConnectWalletButton /></div>;
  // if (!connected || !publicKey) return <>
  //   <button onClick={connectWalletOnClick}>Click</button>
  // </>;

  return (
    <>
      {/* <div className="text-light">{publicKey?.toBase58()}</div> */}
      <Button disabled={loading} onClick={() => mintcNFT()}>
        {loading ? "Minting your cNFT..." : "Get Free Credits"}
      </Button>
    </>
    
  );
}
