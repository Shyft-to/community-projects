import { useContext } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connectTheWallet } from "./utility/common";
//import { DomainContext } from "./Context/DomainContext";
import { WalletContext } from "./Context/WalletContext";
//import { NetworkContext } from "./Context/NetworkContext";

const ConnectWalletCreate = () => {
    const navigate = useNavigate();
    const { setWalletId } = useContext(WalletContext);
    const solanaConnect = async () => {
        console.log('clicked solana connect');
        const resp = await connectTheWallet();
        console.log(resp);
        setWalletId(resp.addr);
        navigate('/create');
    }
    return (
        <div>
            <div className="right-al-container mb-2">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h2 className="section-heading" style={{ marginTop: "60px", marginBottom: "20px" }}>Create NFTs and make magic happen</h2>
                            <p className="p-para-light" style={{ marginTop: "30px", marginBottom: "50px", fontSize: "1.2em" }}>Connect your wallet to get superpowers.</p>
                            <button className="btn-solid-grad" onClick={solanaConnect}>Connect Wallet</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectWalletCreate;