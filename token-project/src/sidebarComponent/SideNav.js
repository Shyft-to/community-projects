import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate,useLocation  } from "react-router-dom";
import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import axios from "axios";

import { WalletContext } from "../WalletContext";
import { DomainContext } from "../DomainContext";

import NavBarComponent from '../headerComponent/NavBarComponent';
import wallIcon from '../resources/images/sidebar/wallet-icon.svg';
import dashIcon from '../resources/images/sidebar/dashboard-icon.svg';
import createIcon from '../resources/images/sidebar/create-icon.svg';
import airdropIcon from '../resources/images/sidebar/airdrop-icon.svg';
import dashDisc from '../resources/images/sidebar/dashboard-disc.svg';


const SideNav = () => {
  const { walletId, setWalletId } = useContext(WalletContext);
  const { solDomain, setSolDomain } = useContext(DomainContext);
  const navigate = useNavigate();
  const location_get = useLocation();

  const [isOpen, setOpen] = useState(true);
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setOpen(false);
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    setOpen(true);
  };
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

  useEffect(() => {
    const endPoint = process.env.REACT_APP_URL_EP;
    const xKey = process.env.REACT_APP_API_KEY.toString();
    let reqUrl = `${endPoint}wallet/get_domains?network=mainnet-beta&wallet=${walletId}`;
      if(walletId)
      {
        axios({
          url: reqUrl,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
          },
        })
          .then((res) => {
            console.log(res.data);
            if (res.data.result[0]) {
              setSolDomain(res.data.result[0].name);
            }
            else {
              setSolDomain(null);
            }
          })
          .catch((err) => {
            console.warn(err);
            setSolDomain(null);
          });
      }
      
        // console.log(solDomain);
    
  }, [walletId]);

  return (
    <div>
      <div className="w-100 text-end" style={{ height: "60px" }}>
        {(!isOpen) ? (<br />) : (
          <button className="close-sidepanel" onClick={openNav} style={{ marginTop: "60px", zIndex: "1050" }}>
            <div className="custom-hamburg">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        )}
      </div>

      <div id="mySidenav" className="sidenav">

        
          <div className="row sidemenu-wall">
            <div className="col-3 align-self-center">
              <img src={wallIcon} alt="dashboard" />
            </div>
            <div className="col-9 align-self-center wallet-text-side">
                {(solDomain)?(solDomain):
                (
                  (walletId)?(walletId.substring(0, 5)+'.....'+walletId.substring((walletId.length)-5)):(<button onClick={solanaConnect}>Connect Wallet</button>)
                )}
            </div>
          </div>

        <hr className="divider" />
        <a id="cls-button" className="closebtn" onClick={closeNav}>
          Dismiss
        </a>
        <Link className={(walletId==='Failed to connect wallet' || walletId===null)?` `:`active`} to={(walletId==='Failed to connect wallet' || walletId===null)?`/`:`/wallet/${walletId}`}>
          <div className="row sidemenu-anc">
            <div className="col-3">
              <img src={(walletId==='Failed to connect wallet' || walletId===null)?(dashDisc):(dashIcon)} alt="dashboard" />
            </div>
            <div className="col-9">
              <p>All Tokens</p>
            </div>
          </div>
        </Link>
        <Link to="/create" className={(location_get.pathname==='/create')?"active":""}>
          <div className="row sidemenu-anc">
            <div className="col-3">
              <img src={createIcon} alt="Create" />
            </div>
            <div className="col-9">
              <p>Create Token</p>
            </div>
          </div>
        </Link>
        <Link to="/airdrop" className={(location_get.pathname==='/airdrop')?"active":""}>
          <div className="row sidemenu-anc">
            <div className="col-3">
              <img src={airdropIcon} alt="Airdrop" />
            </div>
            <div className="col-9">
              <p>Airdrop Token</p>
            </div>
          </div>
        </Link>

      </div>
      <NavBarComponent openNav={openNav} />
    </div>
  );
};

export default SideNav;
