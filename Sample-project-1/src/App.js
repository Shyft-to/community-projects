
import { useState } from 'react';
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
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
import NavBarComponent from './headerComponent/NavBarComponent';
import Footer from './footerComponent/footer';


// import Wallet from './Wallet';

function App() {
    const [walletId, setWalletId] = useState('Connect Wallet');
    const [solDomainsApp,setSolDomainApp] = useState(null);
    ReactSession.setStoreType("localStorage");
    // console.log("Rendering this state super page");
    return (
      <div className="App">
        <div className='red-sphere-back'>

          <NavBarComponent />
          <SideNav walletid={walletId} solDomainsApp={solDomainsApp} />
          <Router>
            <Routes>
              <Route exact path="/" element={<ConnectWallet walletid={walletId} setWalletId={setWalletId} />} />
              <Route path="/wallet/:waddress" element={<ListAll walletid={walletId} setWalletId={setWalletId} setSolDomainApp={setSolDomainApp} />} />
              <Route exact path="/connect-wallet" element={<ConnectWallet walletid={walletId} setWalletId={setWalletId} />} />
              <Route exact path="/get-details" element={<GetDetails />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </div>
    );
  }
  
  export default App;