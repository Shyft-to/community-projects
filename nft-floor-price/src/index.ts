import { Network, ShyftSdk } from '@shyft-to/js';
import 'dotenv/config';
import { gql, GraphQLClient } from 'graphql-request';

const endpoint = `https://programs.shyft.to/v0/graphql/?api_key=${process.env.SHYFT_API_KEY}`;

const graphQLClient = new GraphQLClient(endpoint, {
  method: `POST`,
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});

const shyft = new ShyftSdk({ apiKey: process.env.SHYFT_API_KEY, network: Network.Mainnet });

async function start() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('No command-line arguments provided.');
    return;
  }
  console.log('Collection address', args[0]);

  try {
    let page = 1;
    let assets = [];

    while (page > 0) {
      const assetsByGroup = await shyft.rpc.getAssetsByGroup({
        groupKey: 'collection',
        groupValue: args[0],
        page,
        limit: 1000,
      });

      assets.push(...assetsByGroup.items);
      page = assetsByGroup.total !== 1000 ? -1 : page + 1;
    }

    console.log('Total NFT ', assets.length);
    const nftAddresses = assets.map((nft) => nft.id);

    const [magicEden, tensor, sniper] = await Promise.all([
      queryMagicEdenListingState(nftAddresses),
      queryTensorListingState(nftAddresses),
      querySniperListingState(nftAddresses),
    ]);

    const smallestOne = findSmallestItem(magicEden, 'buyerPrice');
    const smallestTwo = findSmallestItem(tensor, 'price');
    const smallestThree = findSmallestItem(sniper, 'price');

    const smallest = findSmallestItem(
      [
        smallestOne
          ? {
              price: smallestOne.buyerPrice,
              owner: smallestOne.seller,
              mint: smallestOne.tokenMint,
            }
          : null,
        smallestTwo
          ? {
              price: smallestOne.price,
              owner: smallestOne.owner,
              mint: smallestOne.nftMint,
            }
          : null,
        smallestThree
          ? {
              price: smallestOne.price,
              owner: smallestOne.owner,
              mint: smallestOne.nftMint,
            }
          : null,
      ].filter(Boolean),
      'price',
    );

    if (smallest) {
      console.log(`The floor price: ${smallest.price / 10 ** 9} (No fees yet)`);
      console.log('The NFT: ', smallest.mint);
    } else {
      console.log('Cannot find the floor price of this collection');
    }
  } catch (error) {
    console.error(error);
  }
}

async function queryMagicEdenListingState(nftAddress: string[]) {
  const query = gql`
    query MAGIC_EDEN_V2_SellerTradeStateV2($where: MAGIC_EDEN_V2_SellerTradeStateV2_bool_exp) {
      MAGIC_EDEN_V2_SellerTradeStateV2(where: $where) {
        seller
        tokenMint
        tokenAccount
        sellerReferral
        tokenSize
        pubkey
        paymentMint
        expiry
        buyerPrice
        bump
        auctionHouseKey
      }
    }
  `;

  const variables = {
    where: {
      tokenMint: {
        _in: nftAddress,
      },
    },
  };

  const response: any = await graphQLClient.request(query, variables);

  return response.MAGIC_EDEN_V2_SellerTradeStateV2;
}

async function queryTensorListingState(nftAddresses: string[]) {
  const query = gql`
    query Tensor_SingleListing($where: Tensor_SingleListing_bool_exp) {
      Tensor_SingleListing(where: $where) {
        bump
        lamports
        nftMint
        owner
        price
        pubkey
        reserved
      }
    }
  `;

  const variables = {
    where: {
      nftMint: {
        _in: nftAddresses,
      },
    },
  };

  const response: any = await graphQLClient.request(query, variables);
  return response.Tensor_SingleListing;
}

async function querySniperListingState(nftAddresses: string[]) {
  const query = gql`
    query SNIPER_MARKET_SOLNFTOrderV1($where: SNIPER_MARKET_SOLNFTOrderV1_bool_exp) {
      SNIPER_MARKET_SOLNFTOrderV1(where: $where) {
        _lamports
        bump
        expireAt
        flags
        fulfilledSize
        honoredRoyaltyBps
        market
        nftMint
        nftValidation
        orderLock
        orderNonce
        orderValidation
        owner
        price
        pubkey
        size
        vaultBump
      }
    }
  `;

  const variables = {
    where: {
      nftMint: {
        _in: nftAddresses,
      },
    },
  };

  const response: any = await graphQLClient.request(query, variables);
  return response.SNIPER_MARKET_SOLNFTOrderV1;
}

function findSmallestItem<T extends { [key: string]: number }>(items: T[], property: string): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return items.reduce((smallest, item) => {
    return item[property] < smallest[property] ? item : smallest;
  }, items[0]);
}

start();
