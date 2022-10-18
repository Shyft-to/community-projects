import { useContext } from "react";
import Airdrop from "./Airdrop";
import ConnectWalletGen from "./ConnectWalletGen";
import { WalletContext } from "./WalletContext";

const AirdropComponent = () => {
    const { walletId } = useContext(WalletContext);  
    if(!walletId)
    {
        return ( <ConnectWalletGen heading="Airdrop A Custom Token" subheading="Connect your wallet to airdrop Tokens" navigateTo="/airdrop" /> );
    } 
    else
    {
        return ( <Airdrop /> );
    }
    

}
 
export default AirdropComponent;