import { useContext, useState } from "react";
import { WalletContext } from "../WalletContext";
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
import NavBarComponent from '../headerComponent/NavBarComponent';

import wallIcon from '../resources/images/sidebar/wallet-icon.svg';
import dashIcon from '../resources/images/sidebar/dashboard-icon.svg';
import createIcon from '../resources/images/sidebar/create-icon.svg';


const SideNav = () => {
  const {walletId,setWalletId} = useContext(WalletContext);
  const [isOpen, setOpen] = useState(true);
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setOpen(false);
  };
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    setOpen(true);
  };
  
  return (
    <div>
      <div className="w-100 text-end" style={{height: "60px"}}>
        {(!isOpen) ? (<br/>) : (
        <button className="close-sidepanel" onClick={openNav} style={{marginTop: "60px",zIndex: "1050"}}>
          <div className="custom-hamburg">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
        )}
      </div>

      <div id="mySidenav" className="sidenav">
          
        <Link to="/">
            <div className="row sidemenu-wall">
              <div className="col-3 align-self-center">
                <img src={wallIcon} alt="dashboard" />
              </div>
              <div className="col-9 align-self-center">
                <p className="sidemenu-anc wallet-dom">{walletId}</p>
              </div>
            </div>
        </Link>
        
        <hr className="divider" />
        <a id="cls-button" className="closebtn" onClick={closeNav}>
          Dismiss
        </a>
        <Link className="active" to="/">
            <div className="row sidemenu-anc">
              <div className="col-3">
                <img src={dashIcon} alt="dashboard" />
              </div>
              <div className="col-9">
                <p>All NFTs</p>
              </div>
            </div>
        </Link>
        <Link to="/create">
            <div className="row sidemenu-anc">
              <div className="col-3">
                <img src={createIcon} alt="Create" />
              </div>
              <div className="col-9">
                <p>Create Token <small>(coming soon)</small></p>
              </div>
            </div>
        </Link>
        <Link to="/airdrop">
            <div className="row sidemenu-anc">
              <div className="col-3">
                <img src={createIcon} alt="Create" />
              </div>
              <div className="col-9">
                <p>Airdrop Token <small>(coming soon)</small></p>
              </div>
            </div>
        </Link>

      </div>
      <NavBarComponent openNav={openNav} />
    </div>
  );
};

export default SideNav;
