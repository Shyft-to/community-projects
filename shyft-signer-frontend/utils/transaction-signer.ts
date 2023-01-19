import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, Signer, Transaction } from "@solana/web3.js";

export interface ShyftWallet {
  wallet: Wallet;
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions?(txs: Transaction[]): Promise<Transaction[]>;
}

export async function confirmTransactionFromFrontend(connection: Connection, encodedTransaction: string, wallet: ShyftWallet): Promise<string> {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize({ requireAllSignatures: false })
  );
  return confirmTransaction;
}

export async function signTransactionFromFrontend(encodedTransaction: string, signer: Signer[]): Promise<string> {
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, 'base64')
  );
  recoveredTransaction.partialSign(...signer);
  const serializedTransaction = recoveredTransaction.serialize({ requireAllSignatures: false });
  const transactionBase64 = serializedTransaction.toString('base64');
  return transactionBase64;
}