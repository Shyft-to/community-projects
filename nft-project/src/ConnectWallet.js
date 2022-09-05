import { useContext } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connectTheWallet } from "./utility/common";
//import { DomainContext } from "./Context/DomainContext";
import { WalletContext } from "./Context/WalletContext";
//import { NetworkContext } from "./Context/NetworkContext";
import { ReactSession } from "react-client-session";

const ConnectWallet = () => {
    const navigate = useNavigate();
    const { setWalletId } = useContext(WalletContext);
    const solanaConnect = async () => {
        ReactSession.set("connected_wallet", '');
        console.log('clicked solana connect');
        const resp = await connectTheWallet();
        //console.log(resp);
        ReactSession.set("connected_wallet", resp.addr);
        setWalletId(resp.addr);
        navigate('/wallet/' + resp.addr);
    }
    return (
        <div>
            <div className="right-al-container mb-2">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <h2 className="section-heading" style={{ marginTop: "60px", marginBottom: "20px" }}>Explore, Create and Update your Nfts</h2>
                            <p className="p-para-light" style={{ marginTop: "30px", marginBottom: "50px", fontSize: "1.2em" }}>Connect, share the link and flaunt your collection.</p>
                            <button className="btn-solid-grad" onClick={solanaConnect}>Connect Wallet</button>
                            {/* <p className="p-para-light" style={{ marginTop: "30px",marginBottom: "50px", fontSize: "1.2em" }}>Or, you can just enter your wallet address.</p> */}
                            {/* <div className="white-form-group">
                        <input
                          type="text"
                          name="privKey"
                          value={privKey}
                          onChange={(e) => setprivKey(e.target.value)}
                          className="form-control"
                          placeholder="Enter Private Key"
                          required
                        />
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;