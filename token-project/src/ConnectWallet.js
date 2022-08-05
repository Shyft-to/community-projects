import { useState,useContext } from "react";
//import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

import { WalletContext } from "./WalletContext";
//import { ReactSession } from 'react-client-session';

const ConnectWallet = () => {
    const navigate = useNavigate();
    const {setWalletId} = useContext(WalletContext);
    //setWalletId('Connect Wallet'); //try this with use Effect
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
                //await phantom.disconnect();
                await phantom.connect();
                const rpcUrl = clusterApiUrl(network);
                const connection = new Connection(rpcUrl,"confirmed");
                const wallet = {
                    address: phantom.publicKey.toString(),
                };
    
                if(wallet.address)
                {
                    console.log(wallet.address);
                    setWalletId(wallet.address);
                    const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
                    navigate('/wallet/'+wallet.address);
                }
            }
            catch(err)
            {
                console.log(err);
                setWalletId('Failed to connect wallet');
            }
    
      }
    return (
    <div>
        <div className="right-al-container">
            <div className="container-lg">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h2 className="section-heading" style={{ marginTop: "60px", marginBottom: "20px" }}>Showcase Your Fungible Tokens with SHYFT</h2>
                        <p className="p-para-light" style={{ marginTop: "30px",marginBottom: "50px", fontSize: "1.2em" }}>Connect, your wallet to get started.</p>
                        <button className="btn-solid-grad" onClick={solanaConnect}>Connect Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ConnectWallet;