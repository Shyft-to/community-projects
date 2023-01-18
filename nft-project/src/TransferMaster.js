import { useContext } from "react";
import {ReactSession} from 'react-client-session';
import ConnectWalletCreate from "./ConnectWalletCreate";
import { WalletContext } from "./Context/WalletContext";
import Transfer from "./Transfer";

const TransferMaster = () => {
    const { walletId } = useContext(WalletContext); 
    const connWall = ReactSession.get("connected_wallet") ?? false;
    // console.log("conn", connWall);
    if(!walletId || connWall === false)
        return (<ConnectWalletCreate heading="Transfer NFTs between Wallets" subHeading="Connect your wallet to transfer one or more NFTs" navigateTo="/transfer" /> );
    else
        return (<Transfer />);
}
 
export default TransferMaster;