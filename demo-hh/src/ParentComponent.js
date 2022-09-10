import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';


import { WalletContext } from "./context/WalletContext";
import { MoneyContext } from "./context/MoneyContext";

import Footer from './common/FooterComponent';
import Header from './common/HeaderComponent';
import ConnectWallet from './ConnectWallet';
import LandingPage from './LandingPage';
import Mintnfts from './Mintnfts';
import LandingPages from './LandingPage2';
import './resources/css/home.css';
import Marketplace from './Marketplace';

const ParentComponent = () => {
    const [walletId, setWalletId] = useState(null);
    const [money,setMoney] = useState(false);
    return (
        <div>
            <WalletContext.Provider value={{walletId, setWalletId}}>
                <MoneyContext.Provider value={{money,setMoney}} >
                    <Router>
                        <Header />
                        <Routes>
                            <Route exact path="/" element={<ConnectWallet />} />
                            <Route exact path="/mint" element={<Mintnfts />} />
                            <Route exact path="/landing-pages" element={<LandingPage />} />
                            <Route exact path="/landing-page" element={<LandingPages />} />
                            <Route exact path="/marketplace" element={<Marketplace />} />
                            <Route exact path="*" element={<ConnectWallet />} />
                        </Routes>
                        <Footer />
                    </Router>
                </MoneyContext.Provider>
            </WalletContext.Provider>
        </div>
    );
}

export default ParentComponent;