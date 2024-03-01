import { NFTActivity } from "@/types";
import { gql, GraphQLClient } from "graphql-request";

const endpoint = `https://programs.shyft.to/v0/graphql/?api_key=${process.env
  .NEXT_PUBLIC_SHYFT_API_KEY!}`;

const graphQLClient = new GraphQLClient(endpoint, {
  method: `POST`,
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

export async function getAllListingsByWallet(walletAddr: string) {
  const query = gql`
  query MyQuery {
    MAGIC_EDEN_V2_SellerTradeStateV2(
      where: {seller: {_eq: ${JSON.stringify(walletAddr)}}}
    ) {
      tokenMint
      pubkey
      seller
      buyerPrice
    }
    Tensor_SingleListing(
      where: {owner: {_eq: ${JSON.stringify(walletAddr)}}}
    ) {
      pubkey
      owner
      nftMint
      price
    }
    SNIPER_MARKET_SOLNFTOrderV1(
      where: {owner: {_eq: ${JSON.stringify(walletAddr)}}}
    ) {
      pubkey
      nftMint
      price
      owner
    }
  }
    `;

  const response = (await graphQLClient.request(query)) as any;

  const {
    MAGIC_EDEN_V2_SellerTradeStateV2: magicEdenResult,
    SNIPER_MARKET_SOLNFTOrderV1: sniperResult,
    Tensor_SingleListing: tensorResult,
  } = response;

  const activities: NFTActivity[] = [];

  if (
    magicEdenResult &&
    Array.isArray(magicEdenResult) &&
    magicEdenResult.length > 0
  ) {
    magicEdenResult.forEach((activity) => {
      activities.push({
        program: "magic_eden",
        activity: "LIST",
        date: "",
        nft: activity.tokenMint,
        hash: activity.pubkey,
      });
    });
  }

  if (sniperResult && Array.isArray(sniperResult) && sniperResult.length > 0) {
    sniperResult.forEach((activity) => {
      activities.push({
        program: "sniper",
        activity: "LIST",
        date: "",
        nft: activity.nftMint,
        hash: activity.pubkey,
      });
    });
  }

  if (tensorResult && Array.isArray(tensorResult) && tensorResult.length > 0) {
    tensorResult.forEach((activity) => {
      activities.push({
        program: "tensor",
        activity: "LIST",
        date: "",
        nft: activity.nftMint,
        hash: activity.pubkey,
      });
    });
  }

  return activities;
}
