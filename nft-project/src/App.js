
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";

import { DomainContext } from "./Context/DomainContext";
import { WalletContext } from "./Context/WalletContext";
import { NetworkContext } from "./Context/NetworkContext";

// import './resources/css/styles.css';
// import './resources/css/responsive-medium.css';
// import './resources/css/responsive-small.css';
// import './resources/css/responsive-xsmall.css';
import './resources/css/Home.css';
import './resources/css/Home-responsive.css';

import ListAll from './ListComponent';
import SideNav from "./sidebarComponent/SideNav";
import ConnectWallet from './ConnectWallet';
import GetDetails from './DetailsComponent';
import Create from './Create';
import Update from './UpdateComponent';
import NavBarComponent from './headerComponent/NavBarComponent';
import Footer from './footerComponent/footer';
import ConnectWalletCreate from './ConnectWalletCreate';
// import MarketplaceCreator from './MarketplaceCreator';
import TheMarketplace from './TheMarketplace';
// import Transactions from './Transactions';
// import ListedNFTs from './ListedNfts';
import TransactionsMaster from './TransactionsMaster';
import StatsMaster from './StatsMaster';
import MyListingsMaster from './MyListingsMaster';
import Statistics from './Statistics';
import TransferMaster from './TransferMaster';

// import Wallet from './Wallet';

function App() {
    const [walletId, setWalletId] = useState(null);
    const [solDomainsApp,setSolDomainApp] = useState(null);
    const [network, setNetwork] = useState("mainnet-beta")
    ReactSession.setStoreType("sessionStorage");
    // console.log("Rendering this state super page");
    return (
      <div className="App">
        
        <div className='red-sphere-back'>
        <WalletContext.Provider value={{walletId, setWalletId}}>
          <NetworkContext.Provider value={{network, setNetwork}}>
            <Router>
              <NavBarComponent />
              <DomainContext.Provider value={{solDomainsApp,setSolDomainApp}}>
                <SideNav />
              </DomainContext.Provider>
              <Routes>
                <Route exact path="/" element={<ConnectWallet  />} />
                <Route path="/wallet/:waddress" element={<ListAll />} />
                <Route exact path="/connect-wallet" element={<ConnectWalletCreate heading="Create NFTs and make magic happen" subHeading="Connect your wallet to get superpowers." navigateTo="/create" />} />
                <Route exact path="/get-details" element={<GetDetails />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/update" element={<Update />} />
                {/* <Route exact path="/mark" element={<MarketplaceCreator />} /> */}
                <Route exact path="/marketplace" element={<TheMarketplace />} />
                <Route exact path="/transactions" element={<TransactionsMaster />} />
                <Route exact path="/my-listings" element={<MyListingsMaster />} />
                {/* <Route exact path="/statistics" element={<StatsMaster />} /> */}
                <Route exact path="/statistics" element={<Statistics />} />
                <Route exact path="/transfer" element={<TransferMaster />} />
        
                <Route exact path="*" element={<ConnectWallet />} />
              </Routes>
              <Footer />
            </Router>
          </NetworkContext.Provider>
        </WalletContext.Provider>
        </div>
      </div>
    );
  }
  
  export default App;