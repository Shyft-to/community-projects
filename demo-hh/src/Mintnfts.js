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
import CoinsLoader from './loaders/CoinsLoader.js';

const Mintnfts = () => {
    const navigate = useNavigate();
    const { walletId } = useContext(WalletContext);
    const [mssg,setMssg] = useState("");
    const [loading,setLoading] = useState(false);
    const [getting,setGetting] = useState(false);

    const [currMint,setCurrMint] = useState('');

    const [success,setSuccess] = useState(false);

    const [present,setPresent] = useState(['Valetudo']);

    const [coinsMinted,setCoinsMinted] = useState(false);

    // useEffect(() => {
    //     const auth_checker = ReactSession.get("auth") ?? false;
    //     if(auth_checker === true)
    //         navigate('/landing-page');
    //     if(walletId === null)
    //         navigate('/');
    // }, []);

    // useEffect(() => {
    //     const auth_checker = ReactSession.get("from_wallet") ?? false;
    //     if(auth_checker === true)
    //     {
    //         ReactSession.set("from_wallet", true);
    //         setCoinsMinted(true);
    //     } 
            
    // }, []);

    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY;
          const endPoint = process.env.REACT_APP_URL_EP;
          const updAuth = process.env.REACT_APP_PUBLIC_KEY;
    
          setGetting(true);
    
          let nftUrl = `${endPoint}nft/read_all?network=devnet&address=${walletId}&update_authority=${updAuth}&refresh=refresh`;
    
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
            //   console.log(res.data);
              if(res.data.success === true)
              {
                let arrNames=[];
                res.data.result.forEach(element => {
                      if(element.name === 'Valetudo' || element.name === 'Ganymede' || element.name === 'Isonoe')
                        arrNames.push(element.name);
                    });
                setPresent(arrNames);
                console.log("Passes Found: ",arrNames)
              }
              else
              {
                setPresent([]);
              }
              setGetting(false);
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setMssg("Failed! Could not get NFTs");
              setPresent([]);
              setGetting(false);
            });
        
    
      
    }, [walletId])
    

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
            const arr = present;
            arr.push(currMint);
            setPresent(arr);
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
    

    const MintNow = (mint_addr,name) => {
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;
        let nftUrl = `${endPoint}nft/mint_detach`;
        setLoading(true);
        setCurrMint(name);
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

    //Navigators
    const letsNavigate = (nft_key,nft_name) => {
        let markaddr = '';
        if(nft_name === 'Valetudo')
            markaddr = process.env.REACT_APP_TOKEN_MARKVAL;
        else if(nft_name === 'Isonoe')
            markaddr = process.env.REACT_APP_TOKEN_MARKISO;
        else if(nft_name === 'Ganymede')
            markaddr = process.env.REACT_APP_TOKEN_MARKGAN;
        else
            markaddr = process.env.REACT_APP_TOKEN_MARKVAL;
        
        ReactSession.set("nft_key", nft_key);
        ReactSession.set("nft_name", nft_name);
        ReactSession.set("nft_marketplace", markaddr);

        setTimeout(() => {
            navigate('/landing-pages');
        }, 1000);
        
    }
    return ( 
        <div>
            <div className="all-nft">
                <div className="content">
                    {getting && <PlanetLoader message="Checking your wallet for Landing Passes" />}
                    {loading && <PlanetLoader message="Adding the Landing pass to your wallet" />}
                    {/* {coinsMinted && <CoinsLoader message="Yay! Congratulations you received 100 SHYFT coins" closer={setCoinsMinted}/>} */}
                    {success && <SuccessLoader2 message="Yayy! Landing pass added to your wallet" navigateHome={navigateHome} />}
                    <div className="container-lg">
                        <div className="row pt-3">
                            <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                
                                </h2>
                            </div>
                        </div>
                        {(present.length>0)?(<div className="row px-2">
                            <div className="col-sm-12 col-md-9">
                                <h2 className="sub-heading-2">All your planet VISAs to traverse the SHYFT metaverse.</h2>
                                <p className="p-para mt-3">Travel around the planets with these VISAs and buy SHYFT collectibles.</p>
                            </div>
                        </div>):""}
                        <div className="row">
                            {
                                (present.includes('Valetudo'))?(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-mp">
                                    <div className="image-container">
                                        <img src={planetVal} alt="Planet-1" />
                                    </div>
                                    <div className="text-section-1 ">
                                        <div>
                                            <p className="p-name-1">Valetudo</p>
                                        </div>
                                        
                                    </div>
                                    <div className="text-section pt-1">
                                        <div>
                                            <button className='full-blue-btn' onClick={() => {letsNavigate('CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34','Valetudo')}}>Travel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>):""
                                
                            }
                            {
                                (present.includes('Ganymede'))?(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-mp">
                                    <div className="image-container">
                                        <img src={planetGan} alt="Planet-1" />
                                    </div>
                                    <div className="text-section-1 ">
                                        <div>
                                            <p className="p-name-1">Ganymede</p>
                                        </div>
                                        
                                    </div>
                                    <div className="text-section pt-1">
                                        <div>
                                            <button className='full-blue-btn' onClick={() => {letsNavigate('FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh','Ganymede')}}>Travel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>):""
                                
                            }
                            {
                                (present.includes('Isonoe'))?(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-mp">
                                    <div className="image-container">
                                        <img src={planetIso} alt="Planet-1" />
                                    </div>
                                    <div className="text-section-1 ">
                                        <div>
                                            <p className="p-name-1">Isonoe</p>
                                        </div>
                                        
                                    </div>
                                    <div className="text-section pt-1">
                                        <div>
                                            <button className='full-blue-btn' onClick={() => {letsNavigate('Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd','Isonoe')}}>Travel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>):""
                                
                            }
                            
                        </div>
                        <div className="row pt-3">
                            <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                
                                </h2>
                            </div>
                        </div>
                        {(!(present.includes('Valetudo')&&present.includes('Ganymede')&&present.includes('Isonoe')))?<div className="row px-2">
                            <div className="col-sm-12 col-md-10">
                                <h2 className="sub-heading-2">Grab your planet visa and Embrace exploration</h2>
                                <p className="p-para mt-3">Get a planet Visa for the planet you want to travel to.</p>
                            </div>
                        </div>:""}
                        
                        <div className="row">
                            {(present.includes('Valetudo'))?"":(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
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
                                                <button onClick={() => MintNow('CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34','Valetudo')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            {(present.includes('Ganymede'))?"":(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
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
                                                <button onClick={() => MintNow('FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh','Ganymede')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            {(present.includes('Isonoe'))?"":(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
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
                                                <button onClick={() => MintNow('Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd','Isonoe')}>Get Pass</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            
                        </div>
                        <div className="text-center text-warning pt-5">
                           <span>{mssg}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Mintnfts;