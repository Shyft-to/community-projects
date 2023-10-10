import { PublicKey } from "@solana/web3.js";

export default function isValidPublicKey(address: string) {
  try {
    return !!new PublicKey(address);
  } catch (error) {
    return false;
  }
}
