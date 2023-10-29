import { ShyftSdk, Network } from "@shyft-to/js";

const shyft = new ShyftSdk({
  apiKey: process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
  network: process.env.NEXT_PUBLIC_SOLANA_CLUSTER! as Network,
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
      network: process.env.NEXT_PUBLIC_SOLANA_CLUSTER! as Network,
      collectionAddress: process.env.NEXT_PUBLIC_COLLECTION_ADDRESS!,
    });

    const response = await fetch(
      "https://api.shyft.to/sol/v1/txn_relayer/sign",
      {
        method: "POST",
        body: JSON.stringify({
          network: process.env.NEXT_PUBLIC_SOLANA_CLUSTER! as Network,
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

// export async function createCollecition(): Promise<{
//   success: boolean;
//   error?: string;
//   data?: string;
// }> {
//   try {
//     // const result = await shyft.nft.createV2({
//     //   network: Network.Mainnet,
//     //   creatorWallet: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
//     //   name: "Shyft Supercharges",
//     //   symbol: "SUP",
//     //   description:
//     //     "A collection of supercharges from Shyft to empower developers with real-time infrastructure.",
//     //   attributes: [
//     //     {
//     //       trait_type: "Type",
//     //       value: "Shyft OGs",
//     //     },
//     //     {
//     //       trait_type: "Credits",
//     //       value: "50000000",
//     //     },
//     //     {
//     //       trait_type: "Campaign",
//     //       value: "Breakpoint",
//     //     },
//     //     {
//     //       trait_type: "Drop",
//     //       value: "1",
//     //     },
//     //   ],
//     //   externalUrl: "https://shyft.to/get-api-key",
//     //   royalty: 0,
//     //   feePayer: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
//     //   image: value,
//     // });

//     const result = await shyft.nft.compressed.createMerkleTree({
//       network: Network.Mainnet,
//       walletAddress: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
//       maxDepthSizePair: {
//         maxDepth: 17,
//         maxBufferSize: 64,
//       },
//       canopyDepth: 5,
//       feePayer: process.env.NEXT_PUBLIC_RELAYER_WALLET!,
//     });

//     console.log(result);

//     const response = await fetch(
//       "https://api.shyft.to/sol/v1/txn_relayer/sign",
//       {
//         method: "POST",
//         body: JSON.stringify({
//           network: Network.Mainnet,
//           encoded_transaction: result.encoded_transaction,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY!,
//         },
//       }
//     );

//     const data = await response.json();

//     console.log("data", data);

//     return {
//       success: true,
//       data: data.result.tx,
//     };
//   } catch (error: any) {
//     console.error(error);
//     return {
//       success: false,
//       error: error?.message,
//     };
//   }
// }

const collectionImage =
  "https://nftstorage.link/ipfs/bafybeidsfsgpy42p6o3vdghh3rle5cfad5gjl7zizkvdyw2jebp4vanm64";
const collectionUri =
  "https://nftstorage.link/ipfs/bafkreicjhwjyuet6u36pejdbw474xhasdc5pqcnmgbmrzrddwt4ukh7hzq";

const collectionNft = "Puv1rd7i6cDFPESqPagaMtoo1F6eJttKbEPBdENhWeK";

const nftImage =
  "https://nftstorage.link/ipfs/bafybeib7ge3ooifn4shz6pkxpw3ht6na4c5sxfpg4pzrtq4giz4cuxlvp4";
const nftMeta =
  "https://nftstorage.link/ipfs/bafkreiavsj7z4jaj36v4beafyggg5zwtqrndizgtotu3oxhbgmkgdeet2q";
