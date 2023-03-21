import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    AvanaWalletAdapter,
    BackpackWalletAdapter,
    BitKeepWalletAdapter,
    BitpieWalletAdapter,
    BraveWalletAdapter,
    CoinbaseWalletAdapter,
    ExodusWalletAdapter,
    HyperPayWalletAdapter,
    KeystoneWalletAdapter,
    LedgerWalletAdapter,
    MathWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { NetworkConfigurationProvider, useNetworkConfiguration } from './NetworkConfigurationProvider';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { networkConfiguration } = useNetworkConfiguration();
    const network = networkConfiguration as WalletAdapterNetwork;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new SlopeWalletAdapter(),
            new BackpackWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new LedgerWalletAdapter(),
            new BitKeepWalletAdapter(),
            new BraveWalletAdapter(),
            new AvanaWalletAdapter(),
            new BitpieWalletAdapter(),
            new ExodusWalletAdapter(),
            new HyperPayWalletAdapter(),
            new KeystoneWalletAdapter(),
            new MathWalletAdapter(),
            new KeystoneWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={autoConnect}>
                <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <NetworkConfigurationProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>{children}</WalletContextProvider>
                </AutoConnectProvider>
            </NetworkConfigurationProvider>
        </>
    );
};
