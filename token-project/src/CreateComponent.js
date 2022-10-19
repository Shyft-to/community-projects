import { useContext } from "react";
import ConnectWalletGen from "./ConnectWalletGen";
import CreateToken from "./Create";
import { WalletContext } from "./WalletContext";

const CreateComponent = () => {
    const { walletId } = useContext(WalletContext);  
    if(!walletId)
    {
        return ( <ConnectWalletGen heading="Create Your Own Custom Tokens with SHYFT" subheading="Connect your wallet and create your tokens" navigateTo="/create" /> );
    } 
    else
    {
        return ( <CreateToken /> );
    }
    

}
 
export default CreateComponent;