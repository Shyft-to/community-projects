import { useContext } from "react";
import ConnectWalletGen from "./ConnectWalletGen";
import CreateToken from "./Create";
import { WalletContext } from "./WalletContext";

const CreateComponent = () => {
    const { walletId } = useContext(WalletContext);  
    if(!walletId)
    {
        return ( <ConnectWalletGen heading="Create Your Own Tokens" subheading="Connect your wallet to create Tokens" navigateTo="/create" /> );
    } 
    else
    {
        return ( <CreateToken /> );
    }
    

}
 
export default CreateComponent;