import { ShyftSdk, Network } from "@shyft-to/js";

const shyft = new ShyftSdk({
  apiKey: process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
  network: Network.Devnet,
});

// Use this function to create the relayer wallet
async function createRelayerWaller() {
  const response = await fetch(
    "https://api.shyft.to/sol/v1/txn_relayer/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
      },
    }
  );

  const data = await response.json();

  console.log(data);
}

// Use this function to setup the Merkle tree
async function createMerkleTree() {
  const result = await shyft.nft.compressed.createMerkleTree({
    network: Network.Devnet,
    walletAddress: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
    maxDepthSizePair: {
      maxDepth: 14,
      maxBufferSize: 64,
    },
    canopyDepth: 0,
    feePayer: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
  });

  console.log(result);

  const response = await fetch("https://api.shyft.to/sol/v1/txn_relayer/sign", {
    method: "POST",
    body: JSON.stringify({
      network: "devnet",
      encoded_transaction: result.encoded_transaction,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
    },
  });

  const data = await response.json();

  console.log(data);
}

export async function handleMint(receiver: string): Promise<{
  success: boolean;
  error?: string;
  data?: string;
}> {
  try {
    const result = await shyft.nft.compressed.mint({
      creatorWallet: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
      metadataUri: process.env.NEXT_PUBLIC_NFT_METADATA!,
      merkleTree: process.env.NEXT_PUBLIC_MERKLE_TREE!,
      receiver,
      feePayer: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
    });

    const response = await fetch(
      "https://api.shyft.to/sol/v1/txn_relayer/sign",
      {
        method: "POST",
        body: JSON.stringify({
          network: "devnet",
          encoded_transaction: result.encoded_transaction,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
        },
      }
    );

    const data = await response.json();

    return {
      success: true,
      data: data.result.tx,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: error?.message,
    };
  }
}
