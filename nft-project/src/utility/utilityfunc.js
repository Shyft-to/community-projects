import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
const endpoint = {
    http: {
      devnet: 'http://api.devnet.solana.com',
      testnet: 'http://api.testnet.solana.com',
      'mainnet-beta': 'http://api.mainnet-beta.solana.com/',
    },
    https: {
      devnet: process.env.REACT_APP_SOL_DEVNET ?? 'https://api.devnet.solana.com',
      testnet: 'https://api.testnet.solana.com',
      'mainnet-beta': process.env.REACT_APP_SOL_MAINNET_BETA ?? 'https://api.mainnet-beta.solana.com/',
    },
  };

export function clusterUrl(network){
    try {
      switch (network) {
        case WalletAdapterNetwork.Devnet:
          return endpoint.https.devnet;
        case WalletAdapterNetwork.Mainnet:
          return endpoint.https['mainnet-beta'];
        default:
          return clusterApiUrl(network);
      }
    } catch (error) {
      throw error;
    }
  }