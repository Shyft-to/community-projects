import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletContext } from './WalletContext';
import ListAll from './ListAll';
import CreateToken from './Create';
import SideNav from './sidebarComponent/SideNav';
import Airdrop from './Airdrop';
import ViewToken from './ViewToken';

const ParentComponent = () => {
    const [walletId, setWalletId] = useState(null);
    //const [solDomain, setSolDomain] = useState(null);

    // useEffect(() => {

    // }, [walletId]);

    return (
        <div>
            <WalletContext.Provider value={{ walletId, setWalletId }} >
                <Router>
                    <SideNav />
                    <Routes>
                        <Route exact path="/" element={<CreateToken />} />
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