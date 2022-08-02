import { useState } from "react";
//import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ReactSession } from 'react-client-session';

const ConnectWallet = ({walletId,setWalletId}) => {
    const navigate = useNavigate();
    ReactSession.set("userw", null);
    ReactSession.set("nfts", null);
    ReactSession.set("soldom",null);
    ReactSession.set("solDomain",null);
    const solanaConnect = async () => {
        console.log('clicked solana connect');
        const { solana } = window;
            if(!solana)
            {
                alert("Please Install Phantom");
            }
            try{  
                const network = "devnet";
                const phantom = new PhantomWalletAdapter();
                await phantom.disconnect();
                //ReactSession.set("userw", null);
                await phantom.connect();
                const rpcUrl = clusterApiUrl(network);
                const connection = new Connection(rpcUrl,"confirmed");
                // setTimeout(3000);
                const wallet = {
                    address: phantom.publicKey.toString(),
                };
    
                if(wallet.address)
                {
                    console.log(wallet.address);
                    setWalletId(wallet.address);
                    const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
                    console.log(accountInfo);
                    ReactSession.set("userw", wallet.address);
                    // window.location.replace("/list-all");
                    navigate('/wallet/'+wallet.address);
                    //setConnStatus(true);  
                }
            }
            catch(err)
            {
                console.log(err);
            }
    
      }
    return (
    <div>
        <div className="right-al-container">
            <div className="container-lg">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h2 className="section-heading" style={{ marginTop: "60px", marginBottom: "20px" }}>Explore, Create and Update your Nfts</h2>
                        <p className="p-para-light" style={{ marginTop: "30px",marginBottom: "50px", fontSize: "1.2em" }}>Connect, share the link and flaunt your collection.</p>
                        <button className="btn-solid-grad" onClick={solanaConnect}>Connect Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ConnectWallet;