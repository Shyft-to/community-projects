import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate,useParams,Link } from "react-router-dom";


import { WalletContext } from "./Context/WalletContext";
import { NetworkContext } from "./Context/NetworkContext";

import FetchLoader from "./Loaders/FetchComponent";
import FetchLoaderGen from "./Loaders/FetchLoaderGen";
// import ListLoader from "./Loaders/ListLoader";

import { signAndConfirmTransactions } from "./utility/common";
import SuccessLoaderWithClose from "./Loaders/SuccessLoaderWithClose";
import FailedLoader from "./Loaders/FailedLoader";
import TransferLoader from "./Loaders/TransferLoader";
import TransitLoader from "./Loaders/TransitLoader";


const Transfer = () => {

    const navigate = useNavigate();
    // const {waddress} = useParams();
    const { walletId, setWalletId } = useContext(WalletContext);
    const {network, setNetwork} = useContext(NetworkContext);
    const [nfts, setNfts] = useState(null);
    const [loaded,setLoaded] = useState(false);

    const [transferArr,setTransferArr] = useState([]);
    const [transAddr,setTransAddr] = useState('');
    const [transPop,setTransPop] = useState(false);
    const [recErr,setRecErr] = useState('');

    const [transit,setTransit] = useState(false);
    const [complete,setComplete] = useState(false);
    
    const [mssg,setMssg] = useState("");
    const [LoadingConf,setLoadingConf] = useState(false);

    //Required Code
    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY.toString();
        const endPoint = process.env.REACT_APP_URL_EP;
        setMssg("");
        
        let nftUrl = `${endPoint}nft/read_all?network=${network}&address=${walletId}`;

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


    const addToList = (item) => {
        setTransferArr((currentAttribs) => [
          ...currentAttribs,
          item
        ]);
      
      
    }

    const remFromList = (value) => {
      var tempArr = transferArr;
      tempArr = tempArr.filter(item => item !== value);
      setTransferArr(tempArr);
    }

  
    const callback = (signature,result) => {
      console.log("Signature ",signature);
      console.log("result ",result);
      try {
        if(signature.err === null)
        {
          console.log('ok');
          setTimeout(() => {
            setComplete(false);
            navigate(`/wallet/${walletId}`);
          }, 4000);
        }
        else
        {
          console.log('failed');
          setComplete(false);
        }
       
      } catch (error) {
        console.log('failed');
        setComplete(false);
      }
      
    }

    
    const startListing = () => {
      
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      
      if(transAddr === '')
      {
        setRecErr("Wallet Address cannot be empty");
      }
      else
      {
        setTransit(true);
        setTransPop(false);
        let nftUrl = `${endPoint}nft/transfer_many`;

        axios({
            // Endpoint to list
            url: nftUrl,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xKey,
            },
            data: {
                network: network,
                token_addresses: transferArr,
                from_address: walletId,
                to_address: transAddr
                
            }
          })
            // Handle the response from backend here
            .then(async (res) => {
              console.log(res.data);
              setTransit(false);
              
              if(res.data.success === true)
              {
                setComplete(true);
                
                const transactions = res.data.result.encoded_transactions;
                const ret_result = await signAndConfirmTransactions(network,transactions,callback);
                console.log(ret_result);
                
              }
              else
              {
                //setShowLister(false);
                setMssg("The API request failed");
              }
              
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setMssg(err.message);
              setTransit(false);
            });
      }
    }
    
    
    return (
      <div>
        {!loaded && <FetchLoader />}
        {LoadingConf && <FetchLoaderGen message="Loading" />}
        {transPop && <TransferLoader setTransPop={setTransPop} setTransAddr={setTransAddr} transAddr={transAddr} startListing={startListing} recErr={recErr}/>}
        {transit && <TransitLoader />}
        {complete && <SuccessLoaderWithClose closer={setComplete} />}
        {/* {isListing && <FetchLoaderGen message="Listing NFT"/>} */}
        {/* {showLister && <ListLoader listingNFT={listingNFT} listingName={listingName} listingURI={listingURI} listingPrice={listingPrice} setListingPrice={setListingPrice} listNFT={listNFT} closePopupList={closePopupList} errMessg={errMessg} setErrMessg={setErrMessg} />} */}
        {/* {failedModal && <FailedLoader closer={setFailedModal} />} */}
        <div className="right-al-container">
          <div className="container-lg pt-4">

            <div className="row">
              <div className="col-12 col-md-8">
                <h2 className="section-heading">
                  {/* {loaded && `${nfts.length} NFT(s) Found`} */}
                  Transfer Multiple NFTs
                </h2>
                {(transferArr.length > 0)?<p className="p-para text-success">{transferArr.length} NFT(s) Selected for TRANSFER</p>:<p className="p-para">Select the NFTs you want to transfer from your wallet to someone else's</p>}
              </div>
              <div className="col-12 col-md-2">
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
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-2">
                <div className="white-form-group">
                    {(transferArr.length > 0)?<button className="btn-solid-grad px-5" onClick={() => {setTransPop(true)}}>Transfer <span className="badge rounded-pill bg-light text-dark pill-badges">{transferArr.length}</span></button>:<button className="btn-solid-grad disabled px-5">Transfer</button>}
                    
                </div>
              </div>
            </div>
            {mssg && (
              <div className="pt-5 text-center">
                <p className="p-para">{mssg}</p>
              </div>
            )}
            <div className="row">

              {loaded &&
                nfts.map((nft) => (
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
                    key={nft.mint}
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        {/* <Link
                          to={`/get-details?token_address=${nft.mint}&network=${network}`}
                          style={{ textDecoration: "none" }}
                        > */}
                          <div className="inner-box-img-container">
                            <img src={nft.cached_image_uri} alt="NftImage" />
                          </div>
                        {/* </Link> */}
                        <div className="row pt-3 pb-2">
                          <div className="col-12 col-xl-6">
                            <p
                              className="port-para-2 text-center text-xl-start"
                              style={{ wordWrap: "break-word" }}
                            >
                              {(nft.name.length>8)?nft.name.substring(0, 8)+'...':nft.name}
                            </p>
                          </div>
                          
                          <div className="col-12 col-xl-6 pt-1 px-3">
                            {(transferArr.includes(nft.mint))?<div className="white-button-container-selected"><button onClick={() => {remFromList(nft.mint)}}> - </button></div>:<div className="white-button-container-select"><button onClick={() => {addToList(nft.mint)}}> + </button></div>}
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
 
export default Transfer;