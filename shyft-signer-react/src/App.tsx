import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { confirmTransactionFromFrontend, Network, ShyftWallet } from '@shyft-to/js';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const { connection } = useConnection();
    const { signTransaction, signAllTransactions } = useWallet();

    const [txn, setTxn] = useState('');
    const [signature, setSignature] = useState('');
    const [success, setSuccess] = useState(false);
    const [isErrorOccured, setErrorOccured] = useState(false);
    const signTxn = async () => {
        const wallet: ShyftWallet = {
            signTransaction: signTransaction!,
            signAllTransactions: signAllTransactions!,
        };
        try {
            const signature = await confirmTransactionFromFrontend(connection, txn, wallet);
            setSignature(signature);
            setSuccess(true);
            setErrorOccured(false);
            console.log(signature);
        } catch (error) {
            setSuccess(false);
            setErrorOccured(true);
            console.error(error);
        }
    };
    return (
        <div className="App">
            <div className="container pt-4">
                <div className="row pt-1">
                    <div className="col-6">
                        <WalletMultiButton />
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row pt-4">
                    <div className="col-6">
                        <div style={{ paddingTop: '10px' }}>
                            <textarea
                                className="form-control bg-dark text-light"
                                value={txn}
                                onChange={(e) => setTxn(e.target.value)}
                            ></textarea>
                            <div className="pt-3">
                                <button onClick={signTxn} className="btn btn-warning">
                                    Sign Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-danger">
                        {isErrorOccured ? (
                            <>
                                <hr />
                                Could not Sign
                            </>
                        ) : (
                            <></>
                        )}

                        {success ? (
                            <>
                                <hr />
                                <div className="alert alert-success" role="alert">
                                    Transaction signature: {''}
                                    <a
                                        style={{ wordWrap: 'break-word' }}
                                        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {signature}
                                    </a>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
