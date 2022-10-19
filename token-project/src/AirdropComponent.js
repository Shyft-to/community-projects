import { useContext } from "react";
import Airdrop from "./Airdrop";
import ConnectWalletGen from "./ConnectWalletGen";
import { WalletContext } from "./WalletContext";

const AirdropComponent = () => {
    const { walletId } = useContext(WalletContext);  
    if(!walletId)
    {
        return ( <ConnectWalletGen heading="Airdrop Custom Tokens with SHYFT" subheading="Connect your wallet and start minting custom tokens" navigateTo="/airdrop" /> );
    } 
    else
    {
        return ( <Airdrop /> );
    }
    

}
 
export default AirdropComponent;