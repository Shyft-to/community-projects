import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

import { WalletContext } from "./Context/WalletContext";
import NftTwo from "./NFTtwo";
import { signAndConfirmTransaction } from "./utility/common";
import BuyLoader from "./Loaders/BuyLoader";
import SuccessLoader from "./Loaders/SuccessLoader";


const ListedNFTs = () => {
    const navigate = useNavigate();
    //const { waddress } = useParams();
    const network = "devnet";
    const [loaded, setLoaded] = useState(false);
    const [nfts, setNfts] = useState([
      {
        network: "devnet",
        marketplace_address: "8svcgCzGTT12h3uvDNR3BUY27hJvKtYdxcMKjEQzh14q",
        seller_address: "AaYFExyZuMHbJHzjimKyQBAH1yfA9sKTxSzBc6Nr5X4s",
        price: 100,
        currency_symbol: "SD",
        nft_address: "GpLzvmQYcQM3USH7RGehoriEzmJLJ8AfKVdLFZRoVBsz",
        list_state: "9xPa5TQyctvZ4vGkKcgEzT316JankshomR13dPLVN2nD",
        created_at: "2022-08-22T17:16:06.000Z",
        receipt: "FwEG6zTfM4mT9SaCMS61nswuJcfNDLEi2xn7T7gs4qRs",
      },
      {
        network: "devnet",
        marketplace_address: "8svcgCzGTT12h3uvDNR3BUY27hJvKtYdxcMKjEQzh14q",
        seller_address: "GE4kh5FsCDWeJfqLsKx7zC9ijkqKpCuYQxh8FYBiTJe",
        price: 300,
        currency_symbol: "SD",
        nft_address: "5r2rJ37qUGYCqqHzvjBTjMBh4Pu2VD9wSiUnsky8UzYS",
        list_state: "8WM1Etk7fWraMshaAgYc6jBBKVAGsPwwRnNWyke9o5yN",
        created_at: "2022-08-22T17:20:17.000Z",
        receipt: "D9qHwezut8c7rmLkaGE1h1Yo3fVTp9EKYnLRDFjupyA3",
      },
    ]);
    const [mssg, setMssg] = useState("");
  
    const { walletId, setWalletId } = useContext(WalletContext);
  
  
    //code for buy
    const net = "devnet";
    const [selWall,setSelWall] = useState();
    const [price,setPrice] = useState(0);
    const [nfAddr,setNfAddr] = useState('');
  
    const [sure,setSure] = useState(false);
    const [okModal,setOkModal] = useState(false);
  
    const[errorMsgBuy,setErrorMsgBuy] = useState('');
  
    const callback = (signature,result) => {
      console.log("Signature ",signature);
      console.log("result ",result);
      try {
        if(signature.err === null)
        {
          console.log('ok');
        }
        else
        {
          console.log('failed');
        }
        setOkModal(false);
      } catch (error) {
        console.log('failed');
        setOkModal(false);
      }
      
    }
  
  
    const buyList = (nftAddr,seller_wallet,price) => {
      setSelWall(seller_wallet);
      setPrice(price);
      setNfAddr(nftAddr);
      setSure(true);
    }
  
    const buyNow = (nftAddr) => {
      const xKey = process.env.REACT_APP_API_KEY;
          const endPoint = process.env.REACT_APP_URL_EP;
          const marketplaceAddress = process.env.REACT_APP_MARKPLACE;
          setErrorMsgBuy("");
          
          let nftUrl = `123${endPoint}marketplace/buy`;
  
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
                  seller_wallet: selWall,
                  buyer_wallet: walletId
                  
              }
            })
              // Handle the response from backend here
              .then(async (res) => {
                console.log(res.data);
                if(res.data.success === true)
                {
                  setSure(false);
                  setOkModal(true);
                  const transaction = res.data.result.encoded_transaction;
                  const ret_result = await signAndConfirmTransaction(network,transaction,callback);
                  console.log(ret_result);
                }
                
              })
              // Catch errors if any
              .catch((err) => {
                console.warn(err);
                setErrorMsgBuy(err.message);
                //setSure(false);
              });
    }
  
    const closePopupList = () => {
      setSure(false);
    }
  
    useEffect(() => {
        if (!walletId) {
            console.log('Wallet Not connected')
            navigate('/');
        }
    }, []);
  
    //Required Code to fetch data from the marketplace
    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const marketplaceAddress = process.env.REACT_APP_MARKPLACE; 
        setMssg("");
  
        let nftUrl = `${endPoint}marketplace/seller_listings?network=devnet&marketplace_address=${marketplaceAddress}&seller_address=${walletId}`;
  
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
    },[walletId]);
    
    return (
      <div>
        <div className="right-al-container mb-2">
          <div className="container-lg">
            <div className="your-listings">
              <h2 className="section-heading">Your Marketplace Listings</h2>
              <p className="p-para px-2">You can also view these listings on the marketplace.</p>
              {mssg && (
                <div className="pt-5 text-center">
                  <p className="p-para">{mssg}</p>
                </div>
              )}
              {sure && <BuyLoader closePopupList={closePopupList} buyNow={buyNow} nfAddr={nfAddr} errorMsgBuy={errorMsgBuy} />}
              {okModal && <SuccessLoader />}
              <div className="row mt-4">
                  
                  {loaded &&
                  nfts.filter(nft => nft !== null).filter(nft => nft.seller_address === walletId).map((nft) => (
                      <NftTwo buyList={buyList} nft={nft} key={nft.nft_address} />
                  ))}
                  {
                    loaded && ((nfts.filter(nft => nft !== null).filter(nft=>nft.seller_address === walletId).length <=0)?<div className="p-para text-center">You have not Listed any NFTs</div>:"")
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListedNFTs;