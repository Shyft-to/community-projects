import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

import { WalletContext } from "./WalletContext";
import { NetworkContext } from "./NetworkContext";
import coinLogo from './resources/images/coins-icon.svg';

const ListAll = () => {
    const { walletId, setWalletId } = useContext(WalletContext);
    const { network, setNetwork } = useContext(NetworkContext);
    const [coins, setCoins] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const navigate = useNavigate();
    //const [isLoaded,setLoaded] = useState(false);

    const { waddress } = useParams();
    useEffect(() => {
        if (!waddress) {
            console.log('Wallet Not connected')
            navigate('/');
        }
        else {
            setWalletId(waddress);
        }
    }, [])


    useEffect(() => {
        const endPoint = process.env.REACT_APP_URL_EP;
        const xKey = process.env.REACT_APP_API_KEY.toString();

        let reqUrl = `${endPoint}wallet/all_tokens?network=${network}&wallet=${waddress}`;
        setLoading(true);
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
                    setCoins(res.data.result);
                }
                else {
                    setCoins(null);
                }
                setLoading(false);

            })
            .catch((err) => {
                console.warn(err);
                setCoins(null);
                setLoading(false);

            });

    }, [walletId, network]);


    return (
        <div>
            <div className="right-al-container">
                <div className="container-lg">
                    <div className="p-1">
                        <div className="row" style={{ padding: "40px 0px 40px" }}>
                            <div className="col-md-9">
                                <h2 className="section-heading">All Your Tokens</h2>
                            </div>
                            <div className="col-md-3">
                                <div className="white-form-group">
                                    <select
                                        name="network"
                                        className="form-control form-select"
                                        id=""
                                        onChange={
                                            (e) => {
                                                setCoins(null);
                                                setNetwork(e.target.value)
                                            }
                                        }
                                        value={network}
                                    >
                                        <option value="mainnet-beta">Mainnet</option>
                                        <option value="devnet">Devnet</option>
                                        <option value="testnet">Testnet</option>

                                    </select>
                                </div>
                                {/* currently on: {network} */}
                            </div>
                        </div>

                        <div className="row dark-head-table">
                            <div className="col-12 col-sm-10 content">Token Details</div>
                            <div className="col-12 col-sm-2 content">Balance</div>
                        </div>
                        
                        {
                            isLoading && 
                                (<div className="row light-table-body">
                                    <div className="col-12">
                                        <div className="text-center loading-state">
                                            Loading <i className="fas fa-circle-notch fa-spin"></i>
                                        </div>
                                    </div>
                                    
                                </div>)
                        }
                        {
                            ((!coins || (coins.length === 0)) && !isLoading) && (
                                <div className="text-center loading-state">
                                    No Tokens Available
                                </div>
                            )
                        }
                        {
                            coins && coins.map((coin) => (
                                <Link to={`/view-details?token_address=${coin.address}&network=${network}`} className="no-decor text-dark" key={coin.address}>
                                    {/* <div className="row light-table-body">
                                        <div className="col-12 col-sm-10 content"><span className="me-2"><img src={coinLogo} alt="token" /></span> {coin.address}</div>
                                        <div className="col-12 col-sm-2 content">{coin.balance}</div>
                                    </div> */}
                                    <div className="row g-0 py-4">
                                        <div className="col-12 col-md-1">
                                            <div className="tok-img-container">
                                                <img src={coin.info.image} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <div className="tok-name-cont">
                                                <h3>{coin.info.name}</h3>
                                                <h5>{coin.address}</h5>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-2">
                                            <div className="tok-balance">
                                                {coin.balance} {coin.info.symbol}
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            ))
                        }

                        {/* <div className="row light-table-body">
                            <div className="col-12 col-sm-10 content"><span className="me-2"><img src={coinLogo} alt="token" /></span>asdaAvS3avds0asd1123123assad41d1e1</div>
                            <div className="col-12 col-sm-2 content">12.1 ETH</div>
                        </div> */}
                        {/* <div className="row g-0">
                            <div className="col-12 col-md-1">
                                <div className="tok-img-container">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="tok-name-cont">
                                    <h3>SHYFT COIns</h3>
                                    <h5>123123213123132131</h5>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="tok-balance">
                                    485 Coins
                                </div>
                            </div>
                        </div> */}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ListAll;