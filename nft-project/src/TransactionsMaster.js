import { useContext } from "react";
import { WalletContext } from "./Context/WalletContext";
import ConnectWalletCreate from "./ConnectWalletCreate";
import Transactions from "./Transactions";
const TransactionsMaster = () => {
    const { walletId } = useContext(WalletContext);    
    if(!walletId)
        return ( <ConnectWalletCreate heading="Your Marketplace Transactions" subHeading="Connect your wallet to get details of your listings and transactions" navigateTo="/transactions" /> );
    else
        return ( <Transactions />);
}
 
export default TransactionsMaster;