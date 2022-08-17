import axios from "axios";
import { useEffect, useState,useContext } from "react";
//import { ReactSession } from "react-client-session";
import { useNavigate,useParams,Link } from "react-router-dom";

import { WalletContext } from "./Context/WalletContext";
import { NetworkContext } from "./Context/NetworkContext";

import FetchLoader from "./Loaders/FetchComponent";


const ListAll = () => {
    const navigate = useNavigate();
    const {waddress} = useParams();
    const { walletId, setWalletId } = useContext(WalletContext);
    const {network, setNetwork} = useContext(NetworkContext);
    
    const [nfts, setNfts] = useState(null);
    const [loaded,setLoaded] = useState(false);

    const [mssg,setMssg] = useState("");

    useEffect(() => {
        if (!waddress) {
            console.log('Wallet Not connected')
            navigate('/');
        }
        else {
            setWalletId(waddress);
        }
    }, []);
    
    //Required Code
    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY.toString();
        const endPoint = process.env.REACT_APP_URL_EP;
        setMssg("");
        
        let nftUrl = `${endPoint}nft/read_all?network=${network}&address=${waddress}`;

        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xKey,
            },
          })
            // Handle the response from backend here
            .then((res) => {
              console.log(res.data);
              if(res.data.success === true)
                setNfts(res.data.result);
              else
              {
                  setMssg("Some Error Occured");
                  setNfts([]);
              }
              setLoaded(true);
              //ReactSession.set("nfts", res.data.result);
              //setLoaded(true);
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setMssg(err.message);
              setNfts([]);
              setLoaded(true);
            });
    },[walletId,network]);
    
    return (
      <div>
        {!loaded && <FetchLoader />}
        <div className="right-al-container">
          <div className="container-lg">
            {/* {loaded && 

                        } */}

            <div className="row">
              <div className="col-9">
                <h2 className="section-heading">
                  {loaded && `${nfts.length} NFT(s) Found`}
                </h2>
              </div>
              <div className="col-3">
                <div className="white-form-group">
                  <select
                    name="network"
                    className="form-control form-select"
                    id=""
                    onChange={(e) => {
                      setLoaded(false);
                      setNfts(null);
                      setNetwork(e.target.value);
                    }}
                    value={network}
                  >
                    <option value="mainnet-beta">Mainnet</option>
                    <option value="devnet">Devnet</option>
                    <option value="testnet">Testnet</option>

                    {/* <option value="testnet">Testnet</option>
                                <option value="mainnet">Mainnet</option> */}
                  </select>
                </div>
              </div>
            </div>
            {mssg && (
              <div className="pt-5 text-center">
                <p className="p-para">{mssg}</p>
              </div>
            )}
            <div className="row">
              {/* <div className="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 port-cust-padding">
                                <div className="cards-outer-port">
                                    <a href="" style={{textDecoration: "none"}}>
                                        <div className="inner-box">
                                            <div className="inner-box-img-container">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgOEqtH-wzp3LS_mInNtYSseUvJGg85fubvIAJQPaWAmflkObvFghL5V8YclM-zh2Fzc&usqp=CAU" alt="NftImage" />
                                            </div>
                                            <div className="d-flex justify-content-between px-1 py-2">
                                                <div>
                                                    <p className="port-para-2">Name</p>

                                                </div>
                                                <div>
                                                    <a href="/" className="no-decor" disabled>
                                                        <div className="btn-link-sm">
                                                            <div>Update</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                
                            </div> */}

              {/* <div className="text-center loading-state my-5">
                                    Loading <i className="fas fa-circle-notch fa-spin"></i>
                            </div> */}

              {loaded &&
                nfts.map((nft) => (
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
                    key={nft.mint}
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <Link
                          to={`/get-details?token_address=${nft.mint}&network=${network}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="inner-box-img-container">
                            <img src={nft.image_uri} alt="NftImage" />
                          </div>
                        </Link>
                        <div className="row pt-3 pb-2">
                          <div className="col-12 col-xl-6">
                            <p
                              className="port-para-2 text-center text-xl-start"
                              style={{ wordWrap: "break-word" }}
                            >
                              {nft.name}
                            </p>
                          </div>
                          <div className="col-12 col-xl-6 pt-1">
                            {nft.update_authority === waddress ? (
                              <div className="white-sm-btn-upd">
                                <Link
                                  className="btn linker"
                                  to={`/update?token_address=${nft.mint}&network=${network}`}
                                >
                                  Update
                                </Link>
                              </div>
                            ) : (
                              <div
                                className="white-sm-btn-upd disabled"
                                data-bs-toggle="tooltip"
                                title="You do not have update authority for this NFT"
                              >
                                <Link className="btn linker" to={`#`}>
                                  Update
                                </Link>
                              </div>
                            )}
                            {/* <div className={(nft.update_authority === waddress)?"white-sm-btn-upd":"white-sm-btn-upd disabled"} data-bs-toggle={(nft.update_authority === waddress)?"":"tooltip"} title="You do not have update authority for this NFT">
                              
                              <Link
                                className="btn linker"
                                to={(nft.update_authority === waddress)?`/update?token_address=${nft.mint}&network=${network}`:`#`}
                                
                              >
                                Update
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ListAll;