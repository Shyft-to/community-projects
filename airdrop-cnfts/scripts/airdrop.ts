import { createCollection, createTree, mintCompressedNFT } from "@/utils/compression";
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from "@metaplex-foundation/mpl-bubblegum";
import { CreateMetadataAccountArgsV3 } from "@metaplex-foundation/mpl-token-metadata";
import {
  ValidDepthSizePair,
  getConcurrentMerkleTreeAccountSize,
} from "@solana/spl-account-compression";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
import {
  getConnection,
  initKeysDirectory,
  loadKeypairFromFile,
  loadWallets,
  numberFormatter,
  savePublicKeyToFile,
} from "@/utils/helper";

dotenv.config();

let initBalance: number, balance: number;

(async () => {
  initKeysDirectory();

  const validWallets = await loadWallets();
  if (validWallets.length === 0) throw new Error("No valid wallets found");
  console.log(`Start Airdrop to ${validWallets.length} wallets`);

  if (!process.env?.LOCAL_PAYER_JSON_ABSPATH) throw new Error("Missing payer");

  const payer = loadKeypairFromFile(process.env?.LOCAL_PAYER_JSON_ABSPATH);
  console.log("Payer address:", payer.publicKey.toBase58());

  // locally save the addresses
  savePublicKeyToFile("payer", payer.publicKey);

  const connection = getConnection();

  // get the payer's starting balance
  initBalance = await connection.getBalance(payer.publicKey);
  console.log(
    "Starting account balance:",
    numberFormatter(initBalance / LAMPORTS_PER_SOL),
    "SOL\n",
  );

  /*
    Define our tree size parameters
  */
  const maxDepthSizePair: ValidDepthSizePair = {
    // max=8 nodes
    maxDepth: 3,
    maxBufferSize: 8,

    // max=16,384 nodes
    // maxDepth: 14,
    // maxBufferSize: 64,

    // max=131,072 nodes
    // maxDepth: 17,
    // maxBufferSize: 64,

    // max=1,048,576 nodes
    // maxDepth: 20,
    // maxBufferSize: 256,

    // max=1,073,741,824 nodes
    // maxDepth: 30,
    // maxBufferSize: 2048,
  };

  const canopyDepth = maxDepthSizePair.maxDepth - 5;

  const requiredSpace = getConcurrentMerkleTreeAccountSize(
    maxDepthSizePair.maxDepth,
    maxDepthSizePair.maxBufferSize,
    canopyDepth,
  );

  const storageCost = await connection.getMinimumBalanceForRentExemption(requiredSpace);

  // demonstrate data points for compressed NFTs
  console.log("Space to allocate:", numberFormatter(requiredSpace), "bytes");
  console.log("Estimated cost to allocate space:", numberFormatter(storageCost / LAMPORTS_PER_SOL));
  console.log(
    "Max compressed NFTs for tree:",
    numberFormatter(Math.pow(2, maxDepthSizePair.maxDepth)),
    "\n",
  );

  // ensure the payer has enough balance to create the allocate the Merkle tree
  if (initBalance < storageCost) return console.error("Not enough SOL to allocate the merkle tree");

  // define the address the tree will live at
  const treeKeypair = Keypair.generate();

  // create and send the transaction to create the tree on chain
  const tree = await createTree(connection, payer, treeKeypair, maxDepthSizePair, canopyDepth);

  savePublicKeyToFile("treeAddress", tree.treeAddress);
  savePublicKeyToFile("treeAuthority", tree.treeAuthority);

  // define the metadata to be used for creating the NFT collection
  const collectionMetadata: CreateMetadataAccountArgsV3 = {
    data: {
      name: "Super Sweet NFT Collection",
      symbol: "SSNC",
      uri: "https://supersweetcollection.notarealurl/collection.json",
      sellerFeeBasisPoints: 100,
      creators: [
        {
          address: payer.publicKey,
          verified: false,
          share: 100,
        },
      ], // or set to `null`
      collection: null,
      uses: null,
    },
    isMutable: false,
    collectionDetails: null,
  };

  // create a full token mint and initialize the collection (with the `payer` as the authority)
  const collection = await createCollection(connection, payer, collectionMetadata);
  // locally save the addresses for the demo
  savePublicKeyToFile("collectionMint", collection.mint);
  savePublicKeyToFile("collectionMetadataAccount", collection.metadataAccount);
  savePublicKeyToFile("collectionMasterEditionAccount", collection.masterEditionAccount);

  /*
    Mint a single compressed NFT
  */

  const compressedNFTMetadata: MetadataArgs = {
    name: "NFT Name",
    symbol: "NFT",
    uri: "https://supersweetcollection.notarealurl/token.json",
    creators: [
      {
        address: payer.publicKey,
        verified: false,
        share: 100,
      },
    ], // or set to null
    editionNonce: 0,
    uses: null,
    collection: null,
    primarySaleHappened: false,
    sellerFeeBasisPoints: 0,
    isMutable: false,
    // these values are taken from the Bubblegum package
    tokenProgramVersion: TokenProgramVersion.Original,
    tokenStandard: TokenStandard.NonFungible,
  };

  for (const wallet of validWallets) {
    await mintCompressedNFT(
      connection,
      payer,
      treeKeypair.publicKey,
      collection.mint,
      collection.metadataAccount,
      collection.masterEditionAccount,
      compressedNFTMetadata,
      // mint to this specific wallet (in this case, the tree owner aka `payer`)
      new PublicKey(wallet),
    );
  }

  // fetch the payer's final balance
  balance = await connection.getBalance(payer.publicKey);

  console.log(`===============================`);
  console.log(
    "Total cost:",
    numberFormatter((initBalance - balance) / LAMPORTS_PER_SOL, true),
    "SOL\n",
  );
})();
