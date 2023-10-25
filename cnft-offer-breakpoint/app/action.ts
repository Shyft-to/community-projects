"use server";
import { ShyftSdk, Network } from "@shyft-to/js";
import {
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export async function handleMint(receiver: string): Promise<{
  success: boolean;
  error?: string;
  data?: string;
}> {
  try {
    const shyft = new ShyftSdk({
      apiKey: process.env.SHYFT_API_KEY!,
      network: Network.Devnet,
    });

    const keypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(process.env.MASTER_WALLET!))
    );

    const result = await shyft.nft.compressed.mint({
      creatorWallet: keypair.publicKey.toBase58(),
      metadataUri: process.env.NEXT_PUBLIC_NFT_METADATA!,
      merkleTree: process.env.NEXT_PUBLIC_MERKLE_TREE!,
      receiver: receiver,
      feePayer: keypair.publicKey.toBase58(),
    });


    const tx = Transaction.from(
      Buffer.from(result.encoded_transaction, "base64")
    );

    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!, {
      commitment: "confirmed",
    });
    const signature = await sendAndConfirmTransaction(connection, tx, [
      keypair,
    ]);

    console.log({ signature });

    return {
      success: true,
      data: signature
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: error?.message,
    };
  }
}
