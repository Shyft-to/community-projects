import { useContext } from "react";
import ConnectWalletCreate from "./ConnectWalletCreate";
import { WalletContext } from "./Context/WalletContext";
import Transfer from "./Transfer";

const TransferMaster = () => {
    const { walletId } = useContext(WalletContext); 
       
    if(!walletId)
        return (<ConnectWalletCreate heading="Transfer NFTs between Wallets" subHeading="Connect your wallet to transfer one or more NFTs" navigateTo="/transfer" /> );
    else
        return (<Transfer />);
}
 
export default TransferMaster;