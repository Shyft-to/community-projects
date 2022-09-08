import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

import { WalletContext } from "./Context/WalletContext";

// import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

// import { confirmTransactionFromFrontend } from './utility/shyft';
// import { clusterUrl } from "./utility/utilityfunc";

import file1 from "./resources/images/inner-box.png";
import UpdateLoader from "./Loaders/UpdateLoader";
import SuccessLoader from "./Loaders/SuccessLoader";

import { signAndConfirmTransaction } from "./utility/common";

const Update = () => {
  const navigate = useNavigate();
  const {walletId} = useContext(WalletContext);
  const xKey = process.env.REACT_APP_API_KEY.toString();
  const endPoint = process.env.REACT_APP_URL_EP;
  //const network = "";
  let tokenParams = ""
  
    let Params = window.location.search.substring(1);
    let getParams = Params.split("&");
    tokenParams = getParams[0].split("=");
  let networkParams = getParams[1].split("=");
  //console.log("network: ",networkParams[1]);
  //network = networkParams[1];
  useEffect(() => {
    if(!walletId || !Params || networkParams[0]!=='network' || tokenParams[0] !== 'token_address')
        navigate('/');
  }, [])
  
  const [isLoading, setloading] = useState(false);
  //const [network, setNetwork] = useState("devnet");
  const [privKey, setprivKey] = useState("");
  //const [tokAddr,setTokAddr] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [desc, setDesc] = useState("");
  //const [share, setShare] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  //const [maxSupply, setMaxSupply] = useState(1);
  const [royalty, setRoyalty] = useState("");
  const [file, setFile] = useState(null);
  const [dispFile, setDispFile] = useState(file1);

  //const [errShare, setErrorShare] = useState("");
  const [errRoy, setErrorRoy] = useState("");


  const [status,setStatus] = useState();
  const [txHash,setTxHash] = useState();
  const [updated,setUpdated] = useState(false);

  const [privErr,setPrivErr] = useState("");
  const [mainErr,setMainErr] = useState("");

  const [completeMinted,setCompleteMinted] = useState('false');


 //Placeholder variables
//  const [pname,setPname] = useState();
//  const [pdesc,setPdesc] = useState();
//  const [psym,setPsym] = useState();
//  const [proy,setPRoy] = useState();

 //The update selector Params
 const [actvName,setActvName] = useState(false);
 const [actvSym,setActvSym] = useState(false);
 const [actvDesc,setActvDesc] = useState(false);
 const [actvLink,setActvLink] = useState(false);
 const [actvRoy,setActvRoy] = useState(false);
 const [actvAttrib,setActivAttrib] = useState(false);
 

  const [attribs, setAttribs] = useState([
    { id: "5", trait_type: "edification", value: "100" },
  ]);

  let nftUrl =`${endPoint}nft/read?` + window.location.search.substring(1);
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
        console.log(data);
        setName(data.result.name);
        setDesc(data.result.description);
        //setFile(data.result.image_uri);
        setDispFile(data.result.image_uri);
        setSymbol(data.result.symbol);
        setRoyalty(data.result.royalty);
        if(walletId !== data.result.update_authority)
        {
          navigate('/');
        }
        //setAttribs(data.result.attributes);
        //console.warn(typeof data.result.attributes);
        if(Object.keys(data.result.attributes).length !== 0)
        {
          let i = 0;
          const attribArr = [];
            for (const [key, value] of Object.entries(data.result.attributes)) 
          {
            const attribute = Object.create(null);
            attribute.id = Math.random();
            attribute.trait_type = key;
            attribute.value = value;
            attribArr[i] = attribute;
            i++;
          }
          //console.log(attribArr);
          setAttribs(attribArr);
        }
        
        
      })
      .catch((errs) => {
        console.log(errs.message);
      });

    

  },[nftUrl]);
  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    try {
      if(signature.err === null)
      {
        setCompleteMinted(true);
      }
      else
      {
        setMainErr("Signing transaction failed");
        setUpdated(false);
      }
      
    } catch (error) {
        setMainErr("Signing transaction failed");
        setUpdated(false);
    }
    
      
    //console.log("minted: ",minted);
    //setComMinted(true);
   

  }
  useEffect(() => {
    if(completeMinted === true)
      navigate(`/get-details?token_address=${tokenParams[1]}&network=${networkParams[1]}&refresh`); 
  }, [completeMinted]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMainErr("");
    let privateKey_error = 0;
    // if(!privKey)
    // {
    //   privateKey_error = 1;
    //   setPrivErr("This field cannot be empty");
    // }
    if(privateKey_error === 1)
    {
      setMainErr("Some fields cannot be empty");
    }
    else
    {
      setloading(true);

      let my_obj = attribs.reduce(function (obj, elem) {
        obj[elem.trait_type] = elem.value;
        return obj;
      }, {});
      console.warn(my_obj);
      console.error(typeof my_obj);
      console.log(typeof JSON.stringify(my_obj));
      let formData = new FormData();
      formData.append("network", networkParams[1]);
      formData.append("wallet",walletId);
      //formData.append("private_key", privKey);
      formData.append("token_address", tokenParams[1]);
      if(actvName && name !== "")
          formData.append("name", name);
      if(actvSym && symbol !== "")
          formData.append("symbol", symbol);
      if(actvDesc && desc !== "")
          formData.append("description", desc);
      
      if(actvAttrib)
        formData.append("attributes", JSON.stringify(my_obj));
      
      if(actvRoy && royalty !== "" && (royalty>=0 && royalty<=100))
          formData.append("royalty", Number(royalty));
      if(actvLink )
        formData.append("external_url", externalUrl);
      if(file)
          formData.append("file", file);
      

      // const network = networkParams[1];
      // const phantom = new PhantomWalletAdapter();
      // //await phantom.disconnect();
      // await phantom.connect();
      // const rpcUrl = clusterUrl(network);
      // const connection = new Connection(rpcUrl,"confirmed");

      
    axios({
        // Endpoint to send files
        url: `${endPoint}nft/update_detach`,
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": xKey,
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },

        // Attaching the form data
        data: formData,
    })
        // Handle the response from backend here
        .then(async (res) => {
            console.log(res);
            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransaction(networkParams[1],transaction,callback);
            console.log(ret_result);
            //console.log("trans: ",transaction);
            //console.log(ret_result);
            setloading(false);
            //const minted = res.data.result.mint;
            setUpdated(true);
            // setTimeout((()=>{
            //   if(tokenParams[1])
            //     navigate(`/get-details?token_address=${tokenParams[1]}&network=${networkParams[1]}`); 
            //   else
            //     navigate('/'); 
            // }),15000);
            
            
            //console.log(connection.rpcEndpoint);
            // const transaction = res.data.result.encoded_transaction;
            // const ret = await confirmTransactionFromFrontend(connection,transaction,phantom);
            // const checks = await connection.confirmTransaction({
            //   blockhash: transaction.blockhash,
            //   lastValidBlockHeight: transaction.lastValidBlockHeight,
            //   signature: ret,
            // });

            
            //console.log(ret);
            //console.log(checks);
            // setUpdated(true); 
            // setloading(false);
            // setTimeout((()=>navigate(`/wallet/${walletId}`)),3000);

            // setStatus('Success:'+JSON.stringify(res.data.success));
            // setTxHash(res.data.result.txtId);
            // if(res.data.success === true)
            // {
            //     setUpdated(true); 
            // }
            // setloading(false);
            // setTimeout((()=>navigate(`/wallet/${walletId}`)),3000);
            
        })
        // Catch errors if any
        .catch((err) => {
            console.warn(err);
            setMainErr(err.message);
            setloading(false);
        });
    }
    
    
  };

  const remField = (index) => {
    
    const list = [...attribs];
    list.splice(index, 1);
    setAttribs(list);
  }
  return (
    <div>
      {isLoading && <UpdateLoader />}
        {updated && (<SuccessLoader />)}
      <div className="right-al-container">

        <div className="container-lg mint-single">
          <div className="row page-heading-container">
            <div className="col-sm-12 col-md-10">
              <h2 className="section-heading">Update NFT</h2>
              <p className="p-para text-danger">
                Enter the values of the fields which you want to update. The previous values have been prefilled.
              </p>               
            </div>
            <div className="col-sm-12 col-md-2">
              <div className="net-box mx-auto" style={
                (networkParams[1] === 'devnet')?{backgroundColor: "#112f4a",boxShadow: "#112f4a99 0px 4px 12px"}:(networkParams[1] === 'mainnet-beta')?{backgroundColor: "#f857a6 ",boxShadow: "#f857a6 0px 4px 12px"}:{backgroundColor: "#5965f3",boxShadow: "#5965f399 0px 4px 12px"}
              }>
                {networkParams[1]}
              </div>
              {/* <p className="net-box-subtext">For best results, please make sure your wallet is connected to the same network</p> */}
            </div>
          </div>
          
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}

          <form>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="image-section">
                  <div className="image-container">
                    <div className="inner">
                      <img className="img-fluid" src={dispFile} alt="" />
                    </div>
                  </div>
                  <div className="button-container">
                      <input
                      type="file"
                      id="testFile"
                      // {...register("file")}
                      className="custom-file-input-2"
                      onChange={(e) => {
                        const [fileDisp] = e.target.files;
                        //setFile(e.target.files[0]);
                        console.log(e.target.files[0]);
                        setFile(e.target.files[0]);
                        setDispFile(URL.createObjectURL(fileDisp));
                        console.log(typeof file);
                      }}
                    />
                  </div>
                </div>
                
              </div>

              <div className="col-sm-12 col-md-7">
                <div className="form-section">
                  <div className="form-elements-container">
                    {/* <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Network
                      </label>
                      <select
                        name="network"
                        className="form-control form-select"
                        id=""
                        onChange={(e) => setNetwork(e.target.value)}
                      >
                        <option value="devnet">Devnet</option>
                        <option value="testnet">Testnet</option>
                      </select>
                    </div> */}
                    
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          placeholder="Enter NFT Name"
                          maxLength={32}
                          disabled={(actvName)?"":"disabled"}
                        />
                        <div className="px-2 pt-1">
                          {!actvName && (<button className="xs-black-btn-2" onClick={(e) => {
                            e.preventDefault();
                            setActvName(true);
                          }}><i className='fas fa-edit'></i></button>)}
                        </div>
                        
                      </div>
                      
                      
                    </div>
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="symbol">
                        Symbol
                      </label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="text"
                          name="symbol"
                          value={symbol}
                          onChange={(e) => setSymbol(e.target.value)}
                          className="form-control"
                          placeholder="Enter NFT Symbol"
                          maxLength={10}
                          disabled={(actvSym)?"":"disabled"}
                        />
                        <div className="px-2 pt-1">
                          {!actvSym && (<button className="xs-black-btn-2" onClick={(e) => {
                            e.preventDefault();
                            setActvSym(true);
                          }}><i className='fas fa-edit'></i></button>)}
                        </div>
                      </div>
                    </div>
                    {/* <div className="white-form-group">
                      <label className="form-label" htmlFor="name">
                        Private Key*
                      </label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="text"
                          name="privKey"
                          value={privKey}
                          onChange={(e) => {
                            if(!e.target.value)
                            {
                              setPrivErr("This field cannot be empty");
                            }
                            else
                            {
                              setPrivErr("");
                            }
                            setprivKey(e.target.value);
                          }}
                          className="form-control"
                          placeholder="Enter Private Key"
                          required
                        />
                        <div className="px-2 pt-1">
                        </div>
                      </div>
                      <small className="error-msg">{privErr}</small>
                    </div> */}
                    {/* <div className="white-form-group">
                      <label className="form-label" htmlFor="maxSupply">
                        Max Supply Value
                      </label>
                      <input
                        type="text"
                        name="maxValue"
                        value={maxSupply}
                        onChange={(e) => setMaxSupply(e.target.value)}
                        className="form-control"
                        placeholder="Enter Max Supply Value"
                        required
                      />
                    </div> */}
                    <div className="white-form-group">
                      <label htmlFor="bio" className="form-label">
                        Description
                      </label>
                      <span className="ms-2">{!actvDesc && (<button className="xs-black-btn-2" style={{height: "30px", paddingTop: "0px"}} onClick={(e) => {
                              e.preventDefault();
                              setActvDesc(true);
                            }}><i className='fas fa-edit'></i></button>)}
                          </span>
                      <br />
                      <label className="form-label sub-label" htmlFor="name">
                        The description will be included on the item's detail
                        page underneath its image.
                      </label>
                      <div className="d-flex justify-content-between">
                        <textarea
                          name="desc"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          className="form-control"
                          placeholder="Tell us a small story about this NFT"
                          rows="5"
                          disabled={(actvDesc)?"":"disabled"}
                        ></textarea>
                        <div>
                          
                        </div>
                        
                      </div>
                    </div>

                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Attributes 
                        <span className="ms-2">{!actvAttrib && (<button className="xs-black-btn-2" style={{height: "30px", paddingTop: "0px"}} onClick={(e) => {
                              e.preventDefault();
                              setActivAttrib(true);
                            }}><i className='fas fa-edit'></i></button>)}
                          </span>
                        
                      </label>
                      <br />
                      <label className="form-label sub-label" htmlFor="name">
                        Attributes show up underneath your item.
                      </label>
                      <div className="row">
                        <div className="col-8">
                          {/* <div className="row percentage-input-container">
                          <div className="col-6 input-container">
                            <input type="text" placeholder="E.g. Characters" />
                          </div>
                          <div className="col-6 text-center symbol-container">
                            <input type="text" placeholder="Name" />
                          </div>
                        </div> */}
                          {attribs.map((p) => {
                            return (
                              <div
                                key={p.id}
                                className={(actvAttrib)?"row percentage-input-container":"row percentage-input-container disabled"}
                              >
                                <div className="col-6 input-container">
                                  <input
                                    value={p.trait_type} 
                                    onChange={(e) => {
                                      const trait_type = e.target.value;
                                      setAttribs((currentps) =>
                                        currentps.map((x) =>
                                          x.id === p.id
                                            ? {
                                                ...x,
                                                trait_type,
                                              }
                                            : x
                                        )
                                      );
                                    }}
                                    placeholder="trait_type"
                                    disabled={(actvAttrib)?"":"disabled"}
                                  />
                                </div>
                                <div className="col-6 text-center symbol-container">
                                  <input
                                    value={p.value}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setAttribs((currentps) =>
                                        currentps.map((x) =>
                                          x.id === p.id
                                            ? {
                                                ...x,
                                                value,
                                              }
                                            : x
                                        )
                                      );
                                    }}
                                    placeholder="value"
                                    disabled={(actvAttrib)?"":"disabled"}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="col-4 add-item-button">
                          <button
                            className="btn-solid-grad"
                            onClick={(e) => {
                              e.preventDefault();
                              setAttribs((currentAttribs) => [
                                ...currentAttribs,
                                {
                                  id: Math.floor(
                                    Math.random() * 100 + 1
                                  ).toString(),
                                  trait_type: "",
                                  value: "",
                                },
                              ]);
                            }}
                            disabled={(actvAttrib)?"":"disabled"}
                          >
                            Add Item
                          </button>
                          {attribs.length - 1 !== 0 && (
                            <button
                              className="btn-solid-grad-icon ms-2"
                              onClick={(e) => {
                                e.preventDefault();
                                remField(attribs.length - 1);
                              }}
                              disabled={(actvAttrib)?"":"disabled"}
                            >
                              <i className="far fa-trash-alt"></i>
                            </button>
                          )}
                        </div>
                        
                      </div>
                    </div>
                    {/* {JSON.stringify(attribs)} */}
                    {/* <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Share
                      </label>
                      <div className="row percentage-input-container">
                        <div className="col-8 input-container">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            name="share"
                            value={share}
                            onChange={(e) => {
                              let a = e.target.value;
                              if (a < 0 || a > 100)
                                setErrorShare("Value must be between 0-100");
                              else {
                                setShare(e.target.value);
                                setErrorShare("");
                              }
                            }}
                          />
                        </div>

                        <div className="col-4 text-center symbol-container">
                          %
                        </div>
                      </div>
                      <span className="text-danger">{errShare}</span>
                    </div>
                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Royalties
                      </label>
                      <div className="row percentage-input-container">
                        <div className="col-8 input-container">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            name="royalty"
                            value={royalty}
                            onChange={(e) => {
                              let a = e.target.value;
                              if (a < 0 || a > 100)
                                setErrorRoy("Value must be between 0-100");
                              else {
                                setRoyalty(e.target.value);
                                setErrorRoy("");
                              }
                            }}
                          />
                        </div>

                        <div className="col-4 text-center symbol-container">
                          %
                        </div>
                      </div>
                      <span className="text-danger">{errRoy}</span>
                      <div className="row black-input-container">
                        <div className="col-10 text-start">Platform fees</div>
                        <div className="col-2 text-end">0.5%</div>
                      </div>
                    </div>
                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Collection
                      </label>
                      <select
                        name="blockchain"
                        className="form-control form-select"
                        id=""
                      >
                        <option value="distruction">Distruction</option>
                      </select>
                    </div> */}
                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Royalties
                      </label>
                      <span className="ms-2">
                            {!actvRoy && (<button className="xs-black-btn-2" onClick={(e) => {
                              e.preventDefault();
                              setActvRoy(true);
                            }}><i className='fas fa-edit'></i></button>)}
                      </span>
                      
                        <div className={(actvRoy)?"row percentage-input-container":"row percentage-input-container disabled"}>
                          <div className="col-8 input-container">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              name="royalty"
                              value={royalty}
                              onChange={(e) => {
                                let a = e.target.value;
                                if (a < 0 || a > 100)
                                  setErrorRoy("Value must be between 0-100");
                                else {
                                  setRoyalty(e.target.value);
                                  setErrorRoy("");
                                }
                                
                              }}
                              disabled={(actvRoy)?"":"disabled"}
                            />
                          </div>

                          <div className="col-4 text-center symbol-container">
                            %
                          </div>
                          
                        </div>
                        
                      
                      <span className="text-danger">{errRoy}</span>
                      
                    </div>
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="name">
                        External Link
                      </label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="text"
                          name="externalUrl"
                          value={externalUrl}
                          onChange={(e) => setExternalUrl(e.target.value)}
                          className="form-control"
                          placeholder="Enter Link"
                          disabled={(actvLink)?"":"disabled"}
                        />
                        <div className="px-2 pt-1">
                          {!actvLink && (<button className="xs-black-btn-2" onClick={(e) => {
                            e.preventDefault();
                            setActvLink(true);
                          }}><i className='fas fa-edit'></i></button>)}
                        </div>
                      </div>
                      
                    </div>
                    {/* {externalUrl} */}
                    <div className="white-form-group">
                      <button
                        className="btn-solid-grad m-1"
                        type="submit"
                        onClick={handleUpload}
                      >
                        Update NFT
                      </button>
                      <button
                        className="btn-solid-grad m-1"
                        onClick={(e)=>{
                          e.preventDefault();
                          navigate(-1);
                        }}
                      >
                        &nbsp;&nbsp;Cancel&nbsp;&nbsp;
                      </button>
                    </div>
                    <p className="p-para text-danger">{mainErr}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
