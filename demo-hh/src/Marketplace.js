import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";

import { WalletContext } from "./context/WalletContext";
import { signAndConfirmTransactionFe } from './utilityfunc';

import aster32 from './resources/images/NFT-images/Aster32.png';
import aquacharm from './resources/images/NFT-images/Aquacharm.png';
import SpShip from './resources/images/NFT-images/SpShip31.png';
import Amber from './resources/images/NFT-images/Amber.png';
import ListCard from "./ListCard";
import PlanetLoader from "./loaders/PlanetLoader";
import BuyLoader from "./loaders/BuyLoader";
import FailedLoader2 from "./loaders/FailedLoader2";
import SuccessLoader2 from "./loaders/SuccessLoader2";
import { MoneyContext } from "./context/MoneyContext";

const Marketplace = () => {
    const navigate = useNavigate();
  //const { waddress } = useParams();
  const network = "devnet";
  const [loaded, setLoaded] = useState(false);
  const [nfts, setNfts] = useState(null);
  const [mssg, setMssg] = useState("");

  const { walletId } = useContext(WalletContext);
  const { money,setMoney } = useContext(MoneyContext);
  const plaName = ReactSession.get("nft_name");
  ReactSession.set("from_pass", false);

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
  const [buyComplete,setBuyComplete] = useState(false);

  const [recallMark,setRecallMark] = useState(false);

  const [collect,setCollect] = useState([]);
  const [loadedColl,setLoadedColl] = useState(false);
  const [triggerColl,setTriggerColl] = useState(false);

  useEffect(() => {
        setLoadedColl(false);
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const updtAuth = process.env.REACT_APP_MINTER_UPDT;
        let nftUrl1 = `${endPoint}nft/read_all?network=devnet&address=${walletId}&update_authority=${updtAuth}&refresh=refresh`;

        axios({
            // Endpoint to list
            url: nftUrl1,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xKey,
            },
            
          })
            // Handle the response from backend here
            .then(async (res) => {
              //console.log(res.data);
              if(res.data.success === true)
              {
                setCollect(res.data.result);
                
              }
              else
              {
                setCollect([]);
              }
              
              
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setCollect([]);
            });
  }, [triggerColl])

  useEffect(() => {
    if(collect.length>0)
    {
        setLoadedColl(true);
    }
  }, [collect])
  
  
  

  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    setLoadingConf(false);
    try {
      if(signature.err === null)
      {
        console.log('ok');
        //setLoadingConf(false);
        setBuyComplete(true);
        // setTimeout(() => {
        //   navigate(`/marketplace`);
        // }, 5000);
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
  const afterBuy = () => {
    setMoney(!money);
    setBuyComplete(false);
    setRecallMark(!recallMark);
    setTimeout(() => {
        setTriggerColl(!triggerColl)
    }, 3000);
    //navigate(`/marketplace`);
  }

  const retreat = () => {
    navigate('/landing-pages');
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
        const marketplaceAddress = ReactSession.get("nft_marketplace");
        
        
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
                const ret_result = await signAndConfirmTransactionFe('devnet',transaction,callback);
                console.log(ret_result);
                //setLoadingConf(true);
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
      const marketplaceAddress = ReactSession.get("nft_marketplace");
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
  },[walletId,recallMark]);
    return ( 
        <div className="market-place">
            {!loaded && <PlanetLoader message="Checking out the inventory" />}
            {isBuying && <PlanetLoader message="Buying this NFT..." />}
            {LoadingConf && <PlanetLoader message="Getting confirmation from Blockchain..." message2="Please Wait" />}
            {okModal &&  <PlanetLoader message="Signing Transaction..." message2="" />}
            {failedModal && <FailedLoader2 message="Buy Failed. Try again." closer={setFailedModal} />}
            {sure && <BuyLoader closePopupList={closePopupList} buyNow={buyNow} nfAddr={nfAddr} errorMsgBuy={errorMsgBuy} price={price}/>}
            {buyComplete && <SuccessLoader2 message="Item Bought Successfully. Please check your wallet." navigateHome={afterBuy}/>}
           <div className="content">
           <div className={(plaName==='Ganymede')?"planet-bg-gan-mm":(plaName==='Isonoe')?"planet-bg-iso-mm":"planet-bg-val-mm"}>

           
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 className="main-heading text-start">{plaName} Marketplace</h2>
                            </div>
                        </div>
                    </div>


                    <div className="container-lg">
                        
                        
                        <div className="row">
                            {loaded &&
                            nfts.map((nft) => (
                                <ListCard buyList={buyList} nft={nft} walletId={walletId} key={nft.nft_address}/>
                            ))}
                            
                            
                        </div>
                        <div className="row mt-4">
                            <div className="col-12 text-start">
                                <Link to="/mint" className="btn-solid-grad me-3" >To Space Station</Link>
                                <Link to="/landing-pages" className="btn-solid-grad me-3" >Back To Planet</Link>
                            </div>
                        </div>
                        {mssg}
                </div>

                <div className="container-lg">
                        <div className="row pt-5">
                            <div className="col-sm-12">
                                <h2 className="sub-heading-3 text-start">All Your Collectibles</h2>
                            </div>
                        </div>
                    <div className="row">
                        {loadedColl &&
                            collect.map((nft) => (
                            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4" key={nft.mint}>
                                <div className="dark-cards-mp">
                                    <div className="image-container">
                                        <img src={nft.image_uri} alt="Planets" />
                                    </div>
                                    <div className="text-section-1">
                                        <div>
                                            <p className="p-name-1">{nft.name}</p>
                                        </div>
                                        
                                    </div>
                                    {/* <div className="text-section d-flex flex-wrap justify-content-between">
                                        <div>
                                            <p className="p-name pt-2">2.3 SFK</p>
                                        </div>
                                        <div>
                                            <div className="small-btn-outline">
                                                <button onClick={() => {}}>Buy</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           
           </div>
        </div> 
    </div>
    );
}
 
export default Marketplace;