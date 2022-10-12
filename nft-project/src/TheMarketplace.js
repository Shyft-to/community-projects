import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

import { WalletContext } from "./Context/WalletContext";
import NftOne from "./NftOne";
import { signAndConfirmTransaction } from "./utility/common";
import BuyLoader from "./Loaders/BuyLoader";
import SuccessLoaderWithClose from "./Loaders/SuccessLoaderWithClose";
import FailedLoader from "./Loaders/FailedLoader";
import FetchLoaderGen from "./Loaders/FetchLoaderGen";

const TheMarketplace = () => {
  const navigate = useNavigate();
  //const { waddress } = useParams();
  const network = "devnet";
  const [loaded, setLoaded] = useState(false);
  const [nfts, setNfts] = useState(null);
  const [mssg, setMssg] = useState("");

  const { walletId, setWalletId } = useContext(WalletContext);


  //code for buy
  const net = "devnet";
  const [selWall,setSelWall] = useState();
  const [price,setPrice] = useState(0);
  const [nfAddr,setNfAddr] = useState('');

  const [sure,setSure] = useState(false);
  const [okModal,setOkModal] = useState(false);
  const [failedModal,setFailedModal] = useState(false);
  const [isBuying,setIsBuying] = useState(false);
  const [LoadingConf,setLoadingConf] = useState(false);

  const[errorMsgBuy,setErrorMsgBuy] = useState('');

  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    setLoadingConf(true);
    try {
      if(signature.err === null)
      {
        console.log('ok');
        setTimeout(() => {
          navigate(`/wallet/${walletId}`);
        }, 5000);
        //navigate(`/wallet/${walletId}`);
      }
      else
      {
        console.log('failed');
        //navigate(`/wallet/${walletId}`);
        setFailedModal(true);
        setLoadingConf(false);
      }
      setOkModal(false);
    } catch (error) {
      console.log('failed');
      setOkModal(false);
      setFailedModal(true);
      setLoadingConf(false);
      //navigate(`/wallet/${walletId}`);
    }
    
  }


  const buyList = (nftAddr,seller_wallet,price) => {
    setSelWall(seller_wallet);
    setPrice(price);
    setNfAddr(nftAddr);
    setErrorMsgBuy("");
    setSure(true);
  }

  const buyNow = (nftAddr) => {
    setIsBuying(true);
    setSure(false);
    const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const marketplaceAddress = process.env.REACT_APP_MARKPLACE;
        
        
        let nftUrl = `${endPoint}marketplace/buy`;

        axios({
            // Endpoint to list
            url: nftUrl,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xKey,
            },
            data: {
                network:'devnet',
                marketplace_address: marketplaceAddress,
                nft_address: nftAddr,
                price: Number(price),
                seller_address: selWall,
                buyer_wallet: walletId
                
            }
          })
            // Handle the response from backend here
            .then(async (res) => {
              console.log(res.data);
              setIsBuying(false);
              if(res.data.success === true)
              {
                setOkModal(true);
                const transaction = res.data.result.encoded_transaction;
                const ret_result = await signAndConfirmTransaction('devnet',transaction,callback);
                console.log(ret_result);
              }
              else
              {
                setErrorMsgBuy('Failed! Error Occured!');
              }
              
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setErrorMsgBuy(err.message);
              setIsBuying(false);
              setOkModal(false);
              setFailedModal(true);
              // setSure(false);
            });
  }

  const closePopupList = () => {
    setSure(false);
  }

  // useEffect(() => {
  //     if (!walletId) {
  //         console.log('Wallet Not connected')
  //         navigate('/');
  //     }
  //     // else {
  //     //     setWalletId(waddress);
  //     // }
  // }, []);

  //Required Code to fetch data from the marketplace
  useEffect(() => {
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const marketplaceAddress = process.env.REACT_APP_MARKPLACE; 
      setMssg("");

      let nftUrl = `${endPoint}marketplace/active_listings?network=${net}&marketplace_address=${marketplaceAddress}`;

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
            {
              setNfts(res.data.result);
              //ReactSession.set("NumberNfts", res.data.result.length);
            }
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
  },[walletId]);

  return (
    <div>
      {isBuying && <FetchLoaderGen message="Buying NFT" />}
      {LoadingConf && <FetchLoaderGen message="Loading" />}
     {sure && <BuyLoader closePopupList={closePopupList} buyNow={buyNow} nfAddr={nfAddr} errorMsgBuy={errorMsgBuy} />}
      {okModal && <SuccessLoaderWithClose />}
      {failedModal && <FailedLoader closer={setFailedModal} />}
      <div className="right-al-container mb-2">
        <div className="container-lg">
          <div className="marketplace-lp">
            <h2 className="section-heading">NFT Marketplace</h2>
            {mssg && (
              <div className="pt-5 text-center">
                <p className="p-para">{mssg}</p>
              </div>
            )}
            
            <div className="row mt-4">
              {/* {loaded &&
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
                            {nft.update_authority === walletId ? (
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
                
                {loaded &&
                nfts.map((nft) => (
                  (nft)?<NftOne buyList={buyList} nft={nft} walletId={walletId} key={nft.nft_address}/>:""
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheMarketplace;
