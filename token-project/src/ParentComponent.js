import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { WalletContext } from './WalletContext';
import { DomainContext } from './DomainContext';
import { NetworkContext } from './NetworkContext';

import ListAll from './ListAll';
import CreateToken from './Create';
import SideNav from './sidebarComponent/SideNav';
import Airdrop from './Airdrop';
import ViewToken from './ViewToken';
import ConnectWallet from './ConnectWallet';
import Footer from './footerComponent/footer';

const ParentComponent = () => {
    const [walletId, setWalletId] = useState(null);
    const [solDomain, setSolDomain] = useState(null);
    const [network,setNetwork] = useState('mainnet-beta');

    return (
        <div className='red-sphere-back'>
            <WalletContext.Provider value={{ walletId, setWalletId }} >
                <NetworkContext.Provider value={{ network,setNetwork }}>
                    <Router>
                        <DomainContext.Provider value={{solDomain, setSolDomain}}>
                            <SideNav />
                        </DomainContext.Provider>
                        <Routes>
                            <Route exact path="/" element={<ConnectWallet />} />
                            <Route exact path="/create" element={<CreateToken />} />
                            <Route exact path="/airdrop" element={<Airdrop />} />
                            <Route exact path="/view-details" element={<ViewToken />} />
                            <Route exact path="/wallet/:waddress" element={<ListAll />} />
                            <Route exact path="*" element={<ConnectWallet />} />
                        </Routes>
                        <Footer />
                    </Router>
                </NetworkContext.Provider>
            </WalletContext.Provider>
        </div>

    );
}

export default ParentComponent;