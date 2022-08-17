
import { useState } from 'react';
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
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


// import Wallet from './Wallet';

function App() {
    const [walletId, setWalletId] = useState(null);
    const [solDomainsApp,setSolDomainApp] = useState(null);
    const [network, setNetwork] = useState("mainnet-beta")
    ReactSession.setStoreType("localStorage");
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
                <Route exact path="/connect-wallet" element={<ConnectWalletCreate />} />
                <Route exact path="/get-details" element={<GetDetails />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/update" element={<Update />} />
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