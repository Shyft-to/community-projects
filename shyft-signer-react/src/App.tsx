import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { FC, useState } from 'react';

import { signAndSendTransaction } from '@shyft-to/js';
import styles from './styles/Home.module.css';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { ContextProvider } from './contexts/ContextProvider';
import { useNetworkConfiguration } from './contexts/NetworkConfigurationProvider';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <ContextProvider>
            <Content />
        </ContextProvider>
    );
};
export default App;

const Content: FC = () => {
    const { networkConfiguration } = useNetworkConfiguration();
    const { connection } = useConnection();
    const wallet = useWallet();
    const [txn, setTxn] = useState('');
    const [signature, setSignature] = useState('');
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isErrorOccured, setErrorOccured] = useState(false);
    const signTxn = async () => {
        try {
            const signature = await signAndSendTransaction(connection, txn, wallet);
            setSignature(signature);
            setSuccess(true);
            setErrorOccured(false);
            console.log(signature);
        } catch (error: any) {
            setSuccess(false);
            setErrorOccured(true);
            setErrorMsg(error?.message ?? 'Some error occured!');
            console.error(error);
        }
    };
    return (
        <div className="App">
            <div className="container pt-4">
            <div className="row">
          <div className="col-12 col-lg-6">
            <div className={styles.walletButtons}>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
          </div>
          <div className="col-12 col-lg-6">
          <div className={styles.walletButtons}>
            <NetworkSwitcher />
            </div>
          </div>
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
                                {errorMsg}
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
                                        href={`https://explorer.solana.com/tx/${signature}?cluster=${networkConfiguration}`}
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
