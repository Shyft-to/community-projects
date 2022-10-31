import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { signAndConfirmTransaction } from './utilityfunc.js';

import planetVal from './resources/images/NFT-images/Valetudo.png';
import planetIso from './resources/images/NFT-images/Isonoe.png';
import planetGan from './resources/images/NFT-images/ganemede.png';
import { WalletContext } from './context/WalletContext';
import lockImage from './resources/images/lock.png';

import PassPopup from './PassPopupGan.js';

import PlanetLoader from "./loaders/PlanetLoader";
import SuccessLoader2 from "./loaders/SuccessLoader2";
import CoinsLoader from './loaders/CoinsLoader.js';

const Mintnfts = () => {
    const navigate = useNavigate();
    const { walletId,setWalletId } = useContext(WalletContext);
    const [mssg,setMssg] = useState("");
    const [loading,setLoading] = useState(false);
    const [getting,setGetting] = useState(false);

    //const [currMint,setCurrMint] = useState('');
    var currMint = '';

    const [success,setSuccess] = useState(false);

    const [present,setPresent] = useState(['Valetudo']);
    
    const descVal = useState('Valetudo is a planet in the SHYFT solar system. It was discovered by a team of shyfters working hard providing services. There are a lot of planets such as Minter, Tokenizer, Walloter, Destroyer, Metamine which revolve around the central star, which is known as SHYFT solar. Valetudo is an important part of the SHYFT solar system.');
    const descIso = useState('Isonoe is a planet in the SHYFT solar system. It was discovered by a team of shyfters working on Natural Falling Transobjects. There are a lot of planets such as Minter, Tokenizer, Walloter, Destroyer, Metamine which revolve around the central star, which is known as SHYFT solar. Isonoe is an important part of the SHYFT solar system.');
    const descGan = useState('Ganymede is a planet in the SHYFT solar system. It was discovered by a team of shyfters working on Natural Falling Transobjects. There are a lot of planets such as Minter, Tokenizer, Walloter, Destroyer, Metamine which revolve around the central star, which is known as SHYFT solar. Ganymede is an important part of the SHYFT solar system.');

    const [viewPass,setViewPass] = useState(false);
    const [nam,setNam] = useState('');
    const [desc,setDesc] = useState('');
    const [mAddr,setmAddr] = useState('');
    const [popImg,setPopImg] = useState('');


    const [coinsMinted,setCoinsMinted] = useState(false);
    const[recall,setRecall] = useState(false);

    // useEffect(() => {
    //     const auth_checker = ReactSession.get("auth") ?? false;
    //     if(auth_checker === true)
    //         navigate('/landing-page');
    //     if(walletId === null)
    //         navigate('/');
    // }, []);

    useEffect(() => {
        
        if(walletId === null)
    {
        const get_wall = ReactSession.get("user_wallet_addr");
        if(get_wall!==null)
          setWalletId(get_wall);
        else
          navigate('/');
    }
            
    }, []);

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
                      {
                        //   if(element.name === 'Valetudo')
                        //     setDescVal(element.description); 
                        //   if(element.name === 'Ganymede')
                        //     setDescGan(element.description); 
                        //   if(element.name === 'Isonoe')
                        //     setDescIso(element.description); 
                          arrNames.push(element.name);
                      }
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
        
    
      
    }, [walletId,recall])

    const setPassDetails = (name, mintId, imgs) => {
        setNam(name);
        if(name === 'Valetudo')
            setDesc(descVal);
        if(name === 'Ganymede')
            setDesc(descGan);
        if(name === 'Isonoe')
            setDesc(descIso);
        setmAddr(mintId);
        setPopImg(imgs);
        setViewPass(true);
    }
    

    const navigateHome = () => {
        setSuccess(false);
        //navigate('/mint');
        //setRecall(!recall);
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
            console.log("Minting:", currMint);
            setPresent(arr);
            
            console.log("Minted:", present);
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
      }
    

    const MintNow = (mint_addr,name) => {
        setViewPass(false);
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = process.env.REACT_APP_PUBLIC_KEY;
        let nftUrl = `${endPoint}nft/mint_detach`;
        setLoading(true);
        //setCurrMint(name);
        currMint = name;
        console.log("assigning Name: ",currMint);
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
        ReactSession.set("from_pass", true);

        setTimeout(() => {
            navigate('/landing-pages');
        }, 1000);
        
    }
    return ( 
        <div>
            <div className="all-nft">
                <div className="content">
                    {getting && <PlanetLoader message="Checking your wallet for Planet VISAs" />}
                    {loading && <PlanetLoader message="Minting Planet VISA to your wallet" />}
                    {/* {coinsMinted && <CoinsLoader message="Yay! Congratulations you received 100 SHYFT coins" closer={setCoinsMinted}/>} */}
                    {success && <SuccessLoader2 message="Yayy! Planet VISA added to your wallet" navigateHome={navigateHome} />}
                    {viewPass && <PassPopup name={nam} desc={desc} MintNow={MintNow} mAddr={mAddr} popImg={popImg} closer={setViewPass}/>}
                    <div className="container-lg">
                        <div className="row pt-5">
                            {/* <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                SHYFT Space Station
                                </h2>
                            </div> */}
                            
                        </div>
                        <div className="row pt-5 mt-5">
                            {/* <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                SHYFT Space Station
                                </h2>
                            </div> */}
                            <div className="col-sm-12 col-md-11">
                                <h2 className="sub-heading-3">all Your landing passes to travel around shyft planets</h2>
                                <p className="p-para mt-3">all Your landing passes to travel around shyft planets.</p>
                            </div>
                        </div>
                        {/* {(present.length>0)?(<div className="row px-2">
                            <div className="col-sm-12 col-md-11">
                                <h2 className="sub-heading-3">all Your landing passes to travel around shyft planets</h2>
                                <p className="p-para mt-3">all Your landing passes to travel around shyft planets.</p>
                            </div>
                        </div>):""} */}
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
                            </div>):(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-deactv">
                                    <div className='lock-container'>
                                        <img src={lockImage} alt="" />
                                    </div>
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
                                            {/* <button className='full-blue-btn' onClick={() => MintNow('CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34','Valetudo')}>Get Travel VISA</button> */}
                                            <button className='full-blue-btn' onClick={() => setPassDetails('Valetudo','CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34',planetVal)}>Get Travel VISA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                                
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
                            </div>):(<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-deactv">
                                    <div className='lock-container'>
                                        <img src={lockImage} alt="" />
                                    </div>
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
                                            {/* <button onClick={() => MintNow('FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh','Ganymede')}>Get VISA</button> */}
                                            <button className='full-blue-btn' onClick={() => setPassDetails('Ganymede','FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh',planetGan)}>Get Travel VISA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                                
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
                            </div>):
                            (<div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
                                <div className="dark-cards-deactv">
                                    <div className='lock-container'>
                                        <img src={lockImage} alt="" />
                                    </div>
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
                                            {/* <button className='full-blue-btn' onClick={() => MintNow('Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd','Isonoe')}>Get Travel Visa</button> */}
                                            <button className='full-blue-btn' onClick={() => setPassDetails('Isonoe','Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd',planetIso)}>Get Travel VISA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                                
                            }
                            
                        </div>
                        {/* <div className="row pt-3">
                            <div className="col-sm-12 col-md-10">
                                <h2 className="main-heading">
                                 
                                </h2>
                            </div>
                        </div>
                        {(!(present.includes('Valetudo')&&present.includes('Ganymede')&&present.includes('Isonoe')))?<div className="row px-2">
                            <div className="col-sm-12 col-md-12">
                                <h2 className="sub-heading-3">Get more Planet VISAs</h2>
                                <p className="p-para mt-3">Grab your planet visa and embrace exploration. Get a planet Visa for the planet you want to travel to.</p>
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
                                                <button onClick={() => MintNow('CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34','Valetudo')}>Get VISA</button>
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
                                                <button onClick={() => MintNow('FKV3spQLfp4SZj14atVomA9X7HCcCrEMmrDJF5ENVfwh','Ganymede')}>Get VISA</button>
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
                                                <button onClick={() => MintNow('Gj9awCwtCqTAq77SMXeHH434jc3DSoweeZHEmqynMLSd','Isonoe')}>Get VISA</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                            
                        </div> */}
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