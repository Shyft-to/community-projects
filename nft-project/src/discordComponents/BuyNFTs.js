import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

import NftDiscordOne from "../NftDiscordOne";
import { signAndConfirmTransactionDiscord } from "../utility/common";
import BuyLoader from "../Loaders/BuyLoader";
import SuccessLoaderWithClose from "../Loaders/SuccessLoaderWithClose";
import FailedLoader from "../Loaders/FailedLoader";
import FetchLoaderGen from "../Loaders/FetchLoaderGen";
import { connectTheWallet } from "../utility/common";

const BuyNFTs = () => {
    const navigate = useNavigate();

    const [walletId, setWalletId] = useState("");
    const [net, setNet] = useState("devnet");
    const [marketplaceAddress, setMarketplaceAddress] = useState("");

    const { mpaddress, network } = useParams();
    console.log(net);
    console.log(marketplaceAddress);
    // const network = "devnet";
    const [loaded, setLoaded] = useState(false);
    const [nfts, setNfts] = useState(null);
    const [mssg, setMssg] = useState("");

    //assignment of params to be done here
    useEffect(() => {
        document.getElementById("mySidenav").style.display = "none";
        if (!mpaddress) {
            setMssg("Could not load data. Please supply the command in proper format.");
            setNfts([]);
            setLoaded(true);
        }
        else {
            
            const networkGot = network ?? 'mainnet-beta';
            setNet(networkGot);
            setMarketplaceAddress(mpaddress);
        }
    }, []);

    const solanaConnect = async () => {
    console.log('clicked solana connect');
    const resp = await connectTheWallet();
        console.log(resp);
        setWalletId(resp.addr);
    }

    //code for buy
    // const net = "devnet";
    const [selWall, setSelWall] = useState();
    const [price, setPrice] = useState(0);
    const [nfAddr, setNfAddr] = useState('');

    const [sure, setSure] = useState(false);
    const [okModal, setOkModal] = useState(false);
    const [failedModal, setFailedModal] = useState(false);
    const [isBuying, setIsBuying] = useState(false);
    const [LoadingConf, setLoadingConf] = useState(false);

    const [errorMsgBuy, setErrorMsgBuy] = useState('');

    const callback = (signature, result) => {
        console.log("Signature ", signature);
        console.log("result ", result);
        setLoadingConf(true);
        try {
            if (signature.err === null) {
                console.log('ok');
                setTimeout(() => {
                    navigate(`/yourwallet/${walletId}/${net}`);
                }, 5000);
                //navigate(`/wallet/${walletId}`);
            }
            else {
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


    const buyList = (nftAddr, seller_wallet, price) => {
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
        // const marketplaceAddress = process.env.REACT_APP_MARKPLACE;

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
                network: net,
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
                if (res.data.success === true) {
                    setOkModal(true);
                    const transaction = res.data.result.encoded_transaction;
                    const ret_result = await signAndConfirmTransactionDiscord(net, transaction, callback);
                    console.log(ret_result);
                }
                else {
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



    //Required Code to fetch data from the marketplace
    useEffect(() => {
        if(marketplaceAddress !== "")
        {
            const xKey = process.env.REACT_APP_API_KEY;
            const endPoint = process.env.REACT_APP_URL_EP;
            // const marketplaceAddress = process.env.REACT_APP_MARKPLACE;
            setMssg("");

            let nftUrl = `${endPoint}marketplace/active_listings?network=${net}&marketplace_address=${marketplaceAddress}`;

            axios({
                // Endpoint to get data
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
                if (res.data.success === true) {
                    setNfts(res.data.result);
                    //ReactSession.set("NumberNfts", res.data.result.length);
                }
                else {
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
        }
    }, [walletId,marketplaceAddress]);

    return (
        <div>
            {isBuying && <FetchLoaderGen message="Buying NFT" />}
            {LoadingConf && <FetchLoaderGen message="Loading" />}
            {sure && <BuyLoader closePopupList={closePopupList} buyNow={buyNow} nfAddr={nfAddr} errorMsgBuy={errorMsgBuy} />}
            {okModal && <SuccessLoaderWithClose />}
            {failedModal && <FailedLoader closer={setFailedModal} />}
            <div className="mb-2 mt-4">
                <div className="container-lg">
                    <div className="marketplace-lp">
                        <div className="row">
                            <div className="col-12 col-md-7">
                                <h2 className="section-heading">NFT Marketplace</h2>
                            </div>
                            <div className="col-12 col-md-5 pt-2 text-center text-lg-end">
                                {(walletId === "")?<button className="btn-solid-grad" onClick={solanaConnect}>Connect</button>:
                                    <div className="p-para text-success">
                                        <span className="mb-2">Wallet Connected</span><br />
                                        <span>{network}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        {mssg && (
                            <div className="pt-5 text-center">
                                <p className="p-para">{mssg}</p>
                            </div>
                        )}

                        <div className="row mt-4">

                            {loaded &&
                                nfts.map((nft) => (
                                    (nft) ? <NftDiscordOne buyList={buyList} nft={nft} walletId={walletId} key={nft.nft_address} /> : ""
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyNFTs;