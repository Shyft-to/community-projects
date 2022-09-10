import logo from '../resources/images/shyft-logo.svg';
import github from '../resources/images/footer/github.svg'
import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import { WalletContext } from "../context/WalletContext";
import { MoneyContext } from '../context/MoneyContext';
// import linkedIn from '../resources/images/footer/lnkedin.svg'
// import twitter from '../resources/images/footer/twitter.svg'
const Header = () => {
    const [balanc,setBalanc] = useState(0);
    const { walletId } = useContext(WalletContext);
    const { money } = useContext(MoneyContext);
    useEffect(() => {
        const endPoint = process.env.REACT_APP_URL_EP;
        const xKey = process.env.REACT_APP_API_KEY;
        const tokAddr = process.env.REACT_APP_TOKEN_ADDRESS;

        

        let reqUrl = `${endPoint}wallet/token_balance?network=devnet&wallet=${walletId}&token=${tokAddr}`;

        if (walletId !== null) {
          setTimeout(() => {
            console.log("Trying to get token balance from your wallet");

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

                if (res.data.success) {
                  setBalanc(res.data.result.balance);
                } else {
                  setBalanc(0);
                }
              })
              .catch((err) => {
                console.warn(err);
                setBalanc(0);
              });
          }, 4000);
        }
    }, [money,walletId]);
    return ( 
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top our-navbar">
                <div className="container-fluid">
                    <a id="hide-on-lg" className="navbar-brand" href="/"><img src={logo} style={{ width: "80px" }} alt="Shyft" /></a>
                    
                    
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                    <div className='container-lg'>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav w-100">
                                <li className="nav-item">
                                    <a id="hide-on-md" className="navbar-brand" href="/"><img src={logo} style={{ width: "80px" }} alt="Shyft" /></a>
                                </li>
                                
                                <li className="nav-item icons-menu">
                                    <a className="mx-3 pt-1" href="https://docs.shyft.to/" target="_blank" rel="noreferrer">Read Docs</a>
                                    {/* <a className="btn-solid-grad-xs-2 mx-3" href="https://shyft.to/" target="_blank" rel="noreferrer">Get API key</a> */}
                                    <span className="btn-solid-coin-xs-2 mx-3">{balanc} SFC</span>
                                    <a type="button" className="btn btn-link px-2" href="https://github.com/Shyft-to/community-projects/tree/main/nft-gated-dapp" target="_blank" rel="noreferrer"> <img src={github} alt="Connect to Discord" /> </a>
                                    {/*<a type="button" className="btn btn-link px-1 me-2" href="https://www.linkedin.com/company/shyft-to/" target="_blank" rel="noreferrer"> <img src={linkedIn} alt="Connect on LinkedIn" /> </a>
                                    <a type="button" className="btn btn-link px-1 me-2" href="https://twitter.com/shyft_to" target="_blank" rel="noreferrer"> <img src={twitter} alt="Tweet about Us" /> </a> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
          </nav>
    </div> 
    );
}
 
export default Header;