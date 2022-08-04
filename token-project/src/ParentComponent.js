import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { WalletContext } from './WalletContext';
import { DomainContext } from './DomainContext';

import ListAll from './ListAll';
import CreateToken from './Create';
import SideNav from './sidebarComponent/SideNav';
import Airdrop from './Airdrop';
import ViewToken from './ViewToken';
import ConnectWallet from './ConnectWallet';

const ParentComponent = () => {
    const [walletId, setWalletId] = useState(null);
    const [solDomain, setSolDomain] = useState(null);

    return (
        <div>
            <WalletContext.Provider value={{ walletId, setWalletId }} >
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
                    </Routes>

                </Router>
            </WalletContext.Provider>
        </div>

    );
}

export default ParentComponent;