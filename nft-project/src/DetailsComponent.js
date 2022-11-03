import { useState, useEffect,useContext } from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import { signAndConfirmTransaction } from "./utility/common";
import SuccessLoader from "./Loaders/SuccessLoader";
import BurnLoader from "./Loaders/BurnLoader";
import ListLoader from "./Loaders/ListLoader";
//import { ReactSession } from "react-client-session";

import { WalletContext } from "./Context/WalletContext";
const GetDetails = () => {
    const navigate = useNavigate();
    const { walletId } = useContext(WalletContext);
    const xKey = process.env.REACT_APP_API_KEY.toString();
    const endPoint = process.env.REACT_APP_URL_EP;
    
    useEffect(() => {
        const urlParams11 = new URLSearchParams(window.location.search);
        console.log(urlParams11.has('network'));
        if(urlParams11.has('token_address') === false)
            navigate('/');
        if(urlParams11.has('network') === false)
            navigate('/');
    }, [])
    let Params = window.location.search.substring(1);
    //console.log("Params",Params);
    let getParams = Params.split("&");
    let token_params = getParams[0].split("=");
    //console.log(getParams);
    let networkParams = getParams[1].split("=");
    //console.log("network: ",networkParams[1]);
    //ReactSession.set("networkSel", networkParams[1]);
    // const [apiResponse, setApiResponse] = useState();
    useEffect(() => {
        if(!Params || networkParams[0]!=='network' || token_params[0] !== 'token_address')
            navigate('/');
    }, [])
    
    
    const [name, setName] = useState("Loading");
    const [desc, setDesc] = useState("");
    const [sym, setSym] = useState("");
    const [imgs, setImgs] = useState(
        "https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
    );
    const [mintAddr, setMintAddr] = useState("");
    const [ownAddr, setOwnAddr] = useState("");
    const [roy, setRoy] = useState();
    const [attrib, setAttrib] = useState("");
    const [updAuth,setUpdAuth] = useState("");
    // const[ownerAddr,setOwnerAddr] = useState("");

    const [success,setSuccess] = useState(false);
    const [burning,setBurning] = useState(false);
    const [errorOcc,setErrorOcc] = useState("");
    // const [tokenParams, setTokenparams] = useState(
    //     window.location.search.substring(1)
    // );

    let nftUrl =
    `${endPoint}nft/read?` + window.location.search.substring(1);
  useEffect(() => {
    fetch(nftUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      //   body: JSON.stringify({ network: "devnet", token_address: "" }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the NFT data from server");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetch Status: ",data.success);
        //console.log(data);
        // setApiResponse(JSON.stringify(data.result));
        setName(data.result.name);
        setDesc(data.result.description);
        setImgs(data.result.cached_image_uri);
        setSym(data.result.symbol);
        setSym(data.result.symbol);
        setOwnAddr(data.result.owner);
        setMintAddr(data.result.mint);
        setRoy(data.result.royalty);
        //setAttrib(data.result.attributes);
        setUpdAuth(data.result.update_authority);
        if(Object.keys(data.result.attributes).length !== 0)
        {
          let i = 0;
          const attribArr = [];
            for (const [key, value] of Object.entries(data.result.attributes)) 
            {
                //console.log("checks: ",key,value);
                const attribute = Object.create(null);
                attribute.id = Math.random();
                attribute.trait_type = (typeof key === 'object')?JSON.stringify(key):key;
                //attribute.trait_type = key;
                attribute.value = (typeof value === 'object')?JSON.stringify(value):value;
                //attribute.value = value;
                attribArr[i] = attribute;
                i++;
            }
          //console.log(attribArr);
          setAttrib(attribArr);
        }
        //console.log(data.result);
      })
      .catch((errs) => {
        console.log(errs.message);
        // setErrorOcc(true);
      });
  }, [nftUrl]);

  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    
    try {
      if(signature.err === null)
      {
        navigate(`/wallet/${walletId}`);
      }
      else
      {
        console.log("Signature Failed");
        setErrorOcc("Signature Failed!");
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setErrorOcc("Signature Failed!");
      setSuccess(false);
    }
}
  const handleBurn = () => {
    setBurning(true);
    axios({
        // Endpoint to send files
        url: `${endPoint}nft/burn_detach`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        // Attaching the form data
        data: {
            network: networkParams[1],
            token_address: mintAddr,
            wallet: walletId,
            close: true
        },
      })
        // Handle the response from backend here
        .then(async (res) => {
            
          console.log(res);
          if(res.data.success === true)
          {
            
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransaction(networkParams[1],transaction,callback);
            setBurning(false);
            setSuccess(true);
          }
          else
          {
            setErrorOcc("Failed! Could not Burn NFT");
          }
        //console.log(ret_result);
            
           
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message)
          setErrorOcc(err.message);
          setSuccess(false);
          setBurning(false);
          
        });
  }


  //all functions required for listing
  const [listingNFT,setListingNFT] = useState(null);
  const [listingName,setListingName] = useState(null);
  const [listingURI,setListingURI] = useState(null);
  const [listingPrice,setListingPrice] = useState();
  const [showLister,setShowLister] = useState(false);
  const [okModal,setOkModal] = useState(false);

  const [errMessg,setErrMessg] = useState('');
  
  const lister = (nft_addr,nftname,nfturi) => {
    setListingNFT(nft_addr);
    setListingName(nftname);
    setListingURI(nfturi);
    setShowLister(true);
  }
  const callbackList = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    try {
      if(signature.err === null)
      {
        console.log('ok');
        navigate(`/my-listings`);
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

  const listNFT = (nft_addr) => {
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const marketplaceAddress = process.env.REACT_APP_MARKPLACE;
      
      
      let nftUrl = `${endPoint}marketplace/list`;

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
              nft_address: nft_addr,
              price: Number(listingPrice),
              seller_wallet: walletId
              
          }
        })
          // Handle the response from backend here
          .then(async (res) => {
            console.log(res.data);
            if(res.data.success === true)
            {
              setOkModal(true);
              setShowLister(false);
              const transaction = res.data.result.encoded_transaction;
              const ret_result = await signAndConfirmTransaction('devnet',transaction,callbackList);
              console.log(ret_result);
            }
            
          })
          // Catch errors if any
          .catch((err) => {
            console.warn(err);
            setErrMessg(err.message);
            navigate(`/my-listings`);
            //setShowLister(false);
          });
  }
  const closePopupList = () => {
    setShowLister(false);
  }

    return (
        
        <div>
            
            {
                success && <SuccessLoader />
            }
            {
                burning && <BurnLoader />
            }
            {showLister && <ListLoader listingNFT={listingNFT} listingName={listingName} listingURI={listingURI} listingPrice={listingPrice} setListingPrice={setListingPrice} listNFT={listNFT} closePopupList={closePopupList} errMessg={errMessg} />}
            {okModal && <SuccessLoader />}
            <div className="fixed-price-page generic-ball-background right-al-container">
                <div className="container-xl">
                    <div className="row title-container" style={{marginTop: "5px"}}>
                        <div className="col-md-12">
                            <h2 className="section-heading-nft">{name}</h2>
                        </div>
                    </div>
                </div>
                <div className="container-xl">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="image-sub-section">

                                <div className="image-container">
                                    <img className="image-nft" src={imgs} alt="NFT" />
                                </div>
                                <div className="img-subtext text-center">
                                    <a href={imgs} target="_blank" className="no-decor" rel="noreferrer">
                                        <h6>View Original</h6>
                                    </a>
                                </div>
                                <div className="text-center">
                                    {
                                        (updAuth === walletId)? 
                                            (<Link className="btn-solid-grad px-5 mx-1 my-1" to={`/update?token_address=${mintAddr}&network=${networkParams[1]}`}>Update NFT</Link>):
                                            (<a className={"btn-solid-grad disabled px-5 mx-4"} data-bs-toggle="tooltip" title="You do not have update authority for this NFT">Update NFT</a>
                                            
                                            )
                                            
                                            
                                    }
                                    {
                                        (ownAddr === walletId)? 
                                            (<button className="btn-solid-grad px-5 mx-1 my-1 " onClick={handleBurn}>&nbsp;&nbsp;Burn NFT&nbsp;&nbsp;</button>):
                                            ("")  
                                    }
                                    {/* {
                                        (updAuth === walletId)? 
                                            (<button className="btn-solid-grad px-5 mx-4 mt-3" onClick={()=>lister(mintAddr,name,imgs)}>List On Marketplace</button>):
                                            ("")  
                                    } */}
                                    
                                    {/* <Link className={(updAuth === walletId)?"btn-solid-grad px-5":"btn-solid-grad disabled px-5"} to={(updAuth === walletId)?`/update?token_address=${mintAddr}&network=${networkParams[1]}`:`#`}>Update NFT</Link> */}
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="text-section px-3">
                                <h6 className="p-para-headings">{networkParams[1]}</h6>
                                
                                <h6 className="p-para-headings">Description</h6>
                                <p className="p-para-light">
                                    {desc}
                                </p>

                                <h6 className="p-para-headings">Symbol</h6>
                                <p className="p-para-light">
                                    {sym}
                                </p>
                                
                                <h6 className="p-para-headings">Details</h6>
                                <div className="details-table">
                                    <div className="row">
                                        <div className="col-8">Royalty</div>
                                        <div className="col-4 text-end">{roy}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Mint Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/${mintAddr}?cluster=${networkParams[1]}`} target="_blank" className="no-decor" rel="noreferrer">{mintAddr}</a></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Owner Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/${ownAddr}?cluster=${networkParams[1]}`} target="_blank" className="no-decor" rel="noreferrer">{ownAddr}</a></div>
                                    </div>
                                </div>

                                <h6 className="p-para-headings">Attributes</h6>
                                <div id="attr" className="details-table">
                                    {
                                        (attrib.length>0) && attrib.map((att) => (
                                            <div className="row" key={att.id}>
                                                <div className="col-8" style={{wordWrap: "break-word"}}>{att.trait_type}</div>
                                                <div className="col-4 text-end" style={{wordWrap: "break-word"}}>{att.value}</div>
                                            </div>
                                        ))
                                    }
                                    {
                                        (attrib.length<1) && (
                                            <div className="row">
                                                <div className="col-12">No Attributes Found</div>
                                            </div>
                                            )
                                    }
                                    
                                </div>
                                
                                
                                {/* {
                                    (Object.entries(attrib).length > 0) && Object.entries(attrib).forEach(([key, value]) => {
                                    document.getElementById("attr").innerHTML +=  (`<div class="row">
                                        <div class="col-8" style="word-wrap: break-word;">${key}</div>
                                        <div class="col-4 text-end" style="word-wrap: break-word;">${value}</div>
                                    </div>`)
                                    })
                                    
                                } */}
                            </div>
                            <div className="p-para text-danger text-center mt-3">{errorOcc}</div>
                        </div>
                    </div>
                    
                    

                </div>
                

            </div>
        </div>);
}

export default GetDetails;