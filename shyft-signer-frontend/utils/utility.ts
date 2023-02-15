import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

const endpoint = {
  http: {
    devnet: "https://api.devnet.solana.com",
    testnet: "https://api.testnet.solana.com",
    "mainnet-beta": "https://api.mainnet-beta.solana.com",
  },
  https: {
    devnet: process.env.NEXT_PUBLIC_SOL_DEVNET!,
    testnet: "https://api.testnet.solana.com",
    "mainnet-beta": process.env.NEXT_PUBLIC_SOL_MAINNET_BETA!,
  },
};

export const Utility = {
  clusterUrl: function (network: WalletAdapterNetwork): string {
    try {
      switch (network) {
        case WalletAdapterNetwork.Devnet:
          return endpoint.https.devnet;
        case WalletAdapterNetwork.Mainnet:
          return endpoint.https["mainnet-beta"];
        default:
          return clusterApiUrl(network);
      }
    } catch (error) {
      throw error;
    }
  },
};
