import { useState,useEffect } from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';

import wallIcon from '../resources/images/sidebar/wallet-icon.svg';
import dashIcon from '../resources/images/sidebar/dashboard-icon.svg';
import createIcon from '../resources/images/sidebar/create-icon.svg';


const SideNav = ({walletid,solDomainsApp}) => {
  const [isOpen, setOpen] = useState(true);
  const [wallId,setWallId] = useState("Connect Wallet");
  const [domain,setDomain] = useState(null);
  const [solfetched, setSolFetched] = useState(0);
  // const [pic,setPic] = useState(null);
  // const [uname,setuname] = useState("Loading");
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setOpen(false);
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    setOpen(true);
  };
  
  useEffect(() => {
    // console.log("useEffect ran");
    const wal_id = ReactSession.get("userw");
    const solDMem = ReactSession.get("solDomain");
    
    
    // console.log(wal_id);
    if(wal_id)
    {
      setWallId(wal_id);
    }
    else
    {
      setWallId(walletid);
      
    }
    
    if(solDMem)
    {
      setDomain(solDMem);
    }
    else
    {
      setDomain(solDMem);
      
    }
    // console.log("I am being rendered from: ",window.location.href);
    // const endPoint = process.env.REACT_APP_URL_EP;
    //   const xKey = process.env.REACT_APP_API_KEY.toString();
    //   let reqUrl = `${endPoint}wallet/get_domains?network=mainnet-beta&wallet=${wallId}`;
      
    //     axios({
    //     // Endpoint to send files
    //     url: reqUrl,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-api-key": xKey,
    //     },
    //   })
    //     // Handle the response from backend here
    //     .then((res) => {
    //       console.log(res.data);
    //       if(res.data.result[0])
    //       {
    //         setDomain(res.data.result[0].name);
    //         setSolFetched(1);
    //       }
    //       else
    //       {
    //         setDomain(null);
    //       }
    //       //ReactSession.set("nfts", res.data.result);
    //       //setLoaded(true);
    //     })
    //     // Catch errors if any
    //     .catch((err) => {
    //       console.warn(err);
    //       setDomain(null);
    //     });

  }, [walletid,solDomainsApp]);
  
  return (
    <div>
      <div className="w-100 text-end" style={{height: "60px"}}>
        {(!isOpen) ? (<br/>) : (
        <button className="close-sidepanel" onClick={openNav} style={{marginTop: "60px",zIndex: "9"}}>
          <div className="custom-hamburg">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        )}
      </div>
      <div id="mySidenav" className="sidenav">
      
        <a>
            <div className="row sidemenu-wall">
              <div className="col-3 align-self-center">
                <img src={wallIcon} alt="dashboard" />
              </div>
              <div className="col-9 align-self-center">
                <p className="sidemenu-anc wallet-dom">{domain || ((wallId==='Connect Wallet')?wallId:wallId.substring(0, 4)+'.....'+wallId.substring((wallId.length)-4))}</p>
              </div>
            </div>
        </a>
        
        <hr className="divider" />
        <a id="cls-button" className="closebtn" onClick={closeNav}>
          Dismiss
        </a>
        <a className="active" href={(wallId==='Connect Wallet')?`/`:`/wallet/${wallId}`}>
            <div className="row sidemenu-anc">
              <div className="col-3">
                <img src={dashIcon} alt="dashboard" />
              </div>
              <div className="col-9">
                <p>All NFTs</p>
              </div>
            </div>
        </a>
        <a>
            <div className="row sidemenu-anc">
              <div className="col-3">
                <img src={createIcon} alt="Create" />
              </div>
              <div className="col-9">
                <p>Create NFT <small>(coming soon)</small></p>
              </div>
            </div>
        </a>
      </div>
    </div>
  );
};

export default SideNav;
