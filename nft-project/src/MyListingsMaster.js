import { useContext } from "react";
import { WalletContext } from "./Context/WalletContext";
import ConnectWalletCreate from "./ConnectWalletCreate";
import ListedNFTs from "./ListedNfts";
const MyListingsMaster = () => {
    const { walletId } = useContext(WalletContext); 
    if(!walletId)
        return ( <ConnectWalletCreate heading="Your Marketplace Listings" subHeading="Connect your wallet to view all your listings in the marketplace" navigateTo="/my-listings" /> );
    else
        return ( <ListedNFTs />);
}
 
export default MyListingsMaster;