import { useContext } from "react";
import { WalletContext } from "./Context/WalletContext";
import ConnectWalletCreate from "./ConnectWalletCreate";
import Statistics from "./Statistics";
const StatsMaster = () => {
    const { walletId } = useContext(WalletContext);    
    if(!walletId)
        return (<ConnectWalletCreate heading="Marketplace Statistics" subHeading="Connect your wallet to get the marketplace statistics" navigateTo="/statistics" /> );
    else
        return (<Statistics />);
}
 
export default StatsMaster;