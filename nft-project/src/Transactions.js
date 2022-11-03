import axios from "axios";
import { useEffect, useState,useContext } from "react";

import { WalletContext } from "./Context/WalletContext";
import FetchLoaderGen from "./Loaders/FetchLoaderGen";

const Transactions = () => {
    const { walletId } = useContext(WalletContext);
    const [sellLoaded,setSellLoaded] = useState(false);
    const [sells,setSells] = useState(null);
    const [loadSell,setLoadSell] = useState(false);

    const [buyLoaded,setBuyLoaded] = useState(false);
    const [buys,setBuys] = useState(null);
    const [loadBuy,setLoadBuy] = useState(false);

    const [mssg,setMssg] = useState('');

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
              setLoadSell(true);
              if(res.data.success === true)
              {
                setSells(res.data.result);
                setMssg("");
              }
              else
              {
                  setMssg("Some Error Occured");   
              }
              
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setMssg(err.message);
              setLoadSell(true);
            });
    },[walletId]);
    
    useEffect(() => {
      if(sells !== null)
        setSellLoaded(true);
    }, [sells])



    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const marketplaceAddress = process.env.REACT_APP_MARKPLACE; 
        setMssg("");
        
        let nftUrl = `${endPoint}marketplace/buy_history?network=devnet&marketplace_address=${marketplaceAddress}&buyer_address=${walletId}`;

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
                setLoadBuy(true);
              console.log(res.data);
              if(res.data.success === true)
              {
                setBuys(res.data.result);
                setMssg("");
              }
              else
              {
                  setMssg("Some Error Occured");   
              }
              
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setMssg(err.message);
              setLoadBuy(true);
            });
    },[walletId]);
    
    useEffect(() => {
      if(buys !== null)
        setBuyLoaded(true);
    }, [buys])
    

    return ( 
        <div>
            {!loadSell && !loadBuy && <FetchLoaderGen message="Loading" />}
            <div className="right-al-container mb-2">
                <div className="container-lg p-4">
                    <div className="transaction-lp mt-4">
                        <h2 className="section-mid-heading mb-4">Your Listings in the marketplace</h2>
                        <div className="row dark-head-table">
                            <div className="col-12 col-sm-8 content">NFT</div>
                            {/* <div className="col-12 col-sm-5 content"></div> */}
                            <div className="col-12 col-sm-4 content">Price</div>
                        </div>
                        {sellLoaded && sells.filter(sell => sell !== null).map(sell => (
                            <div className="row light-table-body" key={Math.random()}>
                                <div className="col-12 col-sm-8 content">{sell.nft_address.substring(0)}</div>
                                {/* <div className="col-12 col-sm-5 content">{sell.seller_address}</div> */}
                                <div className="col-12 col-sm-4 content"> {sell.price} {sell.currency_symbol}</div>
                            </div>
                        )

                        )}
                        {
                            sellLoaded && ((sells.length === 0)?(<div className="row light-table-body"><div className="col-12 col-sm-12 content">No History Found</div></div>):(<span></span>))
                        }


                        <div className="p-para-2 text-danger text-center my-5">{mssg}</div>
                        
                        
                        <h2 className="section-mid-heading mt-4 mb-4">Your Buy History</h2>
                        <div className="row dark-head-table">
                            <div className="col-12 col-sm-2 content">Price</div>
                            <div className="col-12 col-sm-3 content text-center">NFT Address</div>
                            <div className="col-12 col-sm-4 content text-center">Bought From</div>
                            <div className="col-12 col-sm-3 content text-center">Time</div>
                        </div>
                        {buyLoaded && buys.filter(buy => buy !== null).map((buy) => (
                            <div className="row light-table-body" key={Math.random()}>
                                <div className="col-12 col-sm-2 content ps-4"> {buy.price} SOL</div>
                                <div className="col-12 col-sm-3 content text-center">{buy.nft_address.substring(0, 22)}...</div>
                                <div className="col-12 col-sm-4 content text-center">{buy.seller_address.substring(0, 22)}...</div>
                                <div className="col-12 col-sm-3 content">{new Date(buy.created_at).toString().substring(3, 15)}</div>
                            </div>
                        )

                        )}
                        {
                            buyLoaded && ((buys.length === 0)?(<div className="row light-table-body"><div className="col-12 col-sm-12 content text-center">No History Found</div></div>):(<span></span>))
                        }
                        
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default Transactions;