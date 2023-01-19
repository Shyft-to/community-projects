import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import React, { useState } from "react";
import { Keypair, Signer } from "@solana/web3.js";
import { decode } from "bs58";
import {
  confirmTransactionFromFrontend,
  signTransactionFromFrontend,
} from "../utils/transaction-signer";
import ErrorComponent from "./ErrorComponent";
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";

const TransactionSigner: NextPage = () => {
  const [privateKeys, setPrivateKeys] = useState([{ id: 1, privateKey: "" }]);

  const [response, setResponse] = useState<string | any>();
  const [isErrorOccured, setError] = useState<boolean | any>();
  const [isSuccess, setSuccess] = useState<boolean | any>();
  const { connection } = useConnection();

  const { publicKey, wallet, signTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const addField = (event: any) => {
    setPrivateKeys([
      ...privateKeys,
      { id: Math.floor(Math.random() * 100 + 1), privateKey: "" },
    ]);
  };

  const handleSubmit = async (event: any) => {
    try {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault();
      const encodedTransaction = event.target.encoded_transaction
        .value as string;
      let transaction: string;

      if (privateKeys[0].privateKey !== "") {
        const signer = privateKeys.map((key) => {
          const signer = Keypair.fromSecretKey(
            decode(key.privateKey)
          ) as Signer;
          return signer;
        });
        transaction = await signTransactionFromFrontend(
          encodedTransaction,
          signer
        );
      } else {
        transaction = encodedTransaction;
      }

      if (wallet !== null && typeof signTransaction !== "undefined") {
        const shyftWallet = {
          wallet,
          signTransaction,
        };
        const completedTransaction = await confirmTransactionFromFrontend(
          connection,
          transaction,
          shyftWallet
        );
        setResponse(completedTransaction);
        setError(false);
        setSuccess(true);
      } else {
        setResponse("Some error occured");
        setError(true);
        setSuccess(false);
      }
    } catch (err: any) {
      console.log(err);
      setResponse(JSON.stringify(err.stack));
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h3 className="mt-2">
        Wallet Address: <code>{publicKey?.toBase58()}</code>
      </h3>
      <form onSubmit={handleSubmit}>
        {privateKeys.map((key, index) => (
          <div key={index} className="form-group mt-4">
            <label>Private key of other signer</label>
            <textarea
              name="private_keys"
              className="form-control"
              id="private_keys"
              placeholder="Enter Private Key (Optional)"
              value={key.privateKey}
              onChange={(e) => {
                const privateKey = e.target.value;
                setPrivateKeys((currentField) =>
                  currentField.map((x) =>
                    x.id === key.id
                      ? {
                          ...x,
                          privateKey,
                        }
                      : x
                  )
                );
              }}
            />
          </div>
        ))}
        <button
          className="btn bg-warning mt-2"
          type="button"
          onClick={addField}
        >
          Add more
        </button>
        <div className="form-group mt-4">
          <label>Encoded Transaction</label>
          <textarea
            rows={5}
            name="encoded_transaction"
            className="form-control"
            id="encoded_transaction"
            placeholder="Enter transaction"
          />
        </div>
        <button type="submit" className="btn btn-warning mt-2">
          Submit
        </button>
      </form>
      {isErrorOccured ? (
        <>
          <hr />
          <ErrorComponent err={response} />
        </>
      ) : (
        <></>
      )}

      {isSuccess ? (
        <>
          <hr />
          <div className="alert alert-success" role="alert">
            Transaction signature: {""}
            <a style={{ wordWrap: "break-word" }}
              href={`https://explorer.solana.com/tx/${response}?cluster=${networkConfiguration}`}
							target="_blank"
							rel="noreferrer"
            >
              { response }
            </a>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TransactionSigner;
