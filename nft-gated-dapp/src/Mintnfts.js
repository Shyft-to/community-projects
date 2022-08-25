import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { signAndConfirmTransaction } from './utilityfunc.js';

import planetVal from './resources/images/NFT-images/Valetudo.png';
import planetIso from './resources/images/NFT-images/Isonoe.png';
import planetGan from './resources/images/NFT-images/ganemede.png';
import { WalletContext } from './context/WalletContext';

import PlanetLoader from "./loaders/PlanetLoader";
import SuccessLoader2 from "./loaders/SuccessLoader2";

const Mintnfts = () => {
    const navigate = useNavigate();
    const { walletId } = useContext(WalletContext);
    const [mssg,setMssg] = useState("");
    const [loading,setLoading] = useState(false);

    const [success,setSuccess] = useState(false);

    useEffect(() => {
        const auth_checker = ReactSession.get("auth") ?? false;
        if(auth_checker === true)
            navigate('/landing-page');
        if(walletId === null)
            navigate('/');
    }, []);

    const navigateHome = () => {
        navigate('/');
    }
    const callback = (signature,result) => {
        console.log("Signature ",signature);
        console.log("result ",result);
        
        try {
          if(signature.err === null)
          {
            //setComMinted(true);
            setLoading(false);
            setSuccess(true);
          }
          else
          {
            setMssg("Signature Failed");
            //setSuccessful(false);
            setLoading(false);
            setSuccess(false);
          }
        } catch (error) {
            setMssg("Signature Failed, but check your wallet");
        //   setSuccessful(false);
          setLoading(false);
          setSuccess(false);
        }
    
        
          
        //console.log("minted: ",minted);
        //setComMinted(true);
       
    
      }
    

    const MintNow = (mint_addr) => {
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;
        let nftUrl = `${endPoint}nft/mint_detach`;
        setLoading(true);
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                wallet: publicKey,
                master_nft_address: mint_addr,
                receiver: walletId,
                transfer_authority: false
            }
        })
        // Handle the response from backend here
        .then(async (res) => {
        console.log(res.data);
        if(res.data.success === true)
        {
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransaction('devnet',transaction,callback,prvKey); //flow from here goes to utility func
            console.log(ret_result);
            //ReactSession.set("auth", true);
            //ReactSession.set("nft_key", mint_addr);
            // setLoading(false);
            // setSuccess(true);
            //navigate('/');

        }
        else
        {
            setMssg("Some Error Occured");
            setLoading(false);
        }
        })
        // Catch errors if any
        .catch((err) => {
            console.warn(err);
            setMssg("Failed! Could not mint to wallet");
            setLoading(false);
        });

    }
    return ( 
        <div>
            <div className="all-nft">
                <div className="content">
                    {loading && <PlanetLoader message="Adding the Landing pass to your wallet" />}
                    {success && <SuccessLoader2 message="Yayy! Landing pass added to your wallet" navigateHome={navigateHome} />}
                    <div className="container-lg">
                        <div className="row pt-3">
                            <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                
                                </h2>
                            </div>
                        </div>
                        <div className="row px-2">
                            <div className="col-12">
                                <h2 className="sub-heading-1">All Landing Passes</h2>
                                <p className="p-para p-para-emphasis">Get a landing pass for the planet you want to land on.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards">
                                    <div className="image-container">
                                        <img src={planetVal} alt="Planet-1" />
                                    </div>
                                    <div className="text-section d-flex flex-wrap justify-content-between">
                                        <div>
                                            <p className="p-name pt-1">Valetudo</p>
                                        </div>
                                        <div>
                                            <div className="small-btn-outline">
                                                <button onClick={() => MintNow('CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards">
                                    <div className="image-container">
                                        <img src={planetGan} alt="Planet-1" />
                                    </div>
                                    <div className="text-section d-flex flex-wrap justify-content-between">
                                        <div>
                                            <p className="p-name pt-1">Ganymede</p>
                                        </div>
                                        <div>
                                            <div className="small-btn-outline">
                                                <button onClick={() => MintNow('FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards">
                                    <div className="image-container">
                                        <img src={planetIso} alt="Planet-1" />
                                    </div>
                                    <div className="text-section d-flex flex-wrap justify-content-between">
                                        <div>
                                            <p className="p-name pt-1">Isonoe</p>
                                        </div>
                                        <div>
                                            <div className="small-btn-outline">
                                                <button onClick={() => MintNow('Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="text-center text-warning pt-5">
                           <span>{mssg}</span>
                        </div>
                        {/* <p className="p-para p-para-emphasis text-center">Want to know more about our APIs, try out our postman collection, or reach us.</p>
                        <div className="d-flex justify-content-center mt-3 mb-3">
                            <div className="px-2">
                                <a className="btn-solid-grad-xs-2" href="https://www.getpostman.com/collections/eb766924a309c10d6d7e" target="_blank" rel="noreferrer">Import Postman</a>

                            </div>
                            <div className="px-2">
                                <a className="btn-solid-grad-xs-2" href="https://shyft.to/" target="_blank" rel="noreferrer">Visit Website</a>

                            </div>
                            <div className="px-2">
                                <a className="btn-solid-grad-xs-2" href="https://docs.shyft.to/" target="_blank" rel="noreferrer">Read Docs</a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Mintnfts;