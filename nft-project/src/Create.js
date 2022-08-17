import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

// import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

// import { clusterUrl } from "./utility/utilityfunc";

import { WalletContext } from "./Context/WalletContext";
import file1 from "./resources/images/inner-box.png";
import CreateLoader from "./Loaders/CreateLoader";
// import {confirmTransactionFromFrontend} from './utility/shyft';
import { signAndConfirmTransaction } from "./utility/common";
import SuccessLoader from "./Loaders/SuccessLoader";

const Create = () => {
    const navigate = useNavigate();
    const xKey = process.env.REACT_APP_API_KEY.toString();
    const endPoint = process.env.REACT_APP_URL_EP;
    const {walletId} = useContext(WalletContext);
    console.log("walletid: ",walletId);
    useEffect(() => {
      if(!walletId)
        navigate('/connect-wallet');
    }, [])
    
    

  const [isLoading, setloading] = useState(false);
  const [successful,setSuccessful] = useState(false);
  const [network, setNetwork] = useState("devnet");
  //const [privKey, setprivKey] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [desc, setDesc] = useState("");
  //const [share, setShare] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [maxSupply, setMaxSupply] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [file, setFile] = useState(null);
  const [dispFile, setDispFile] = useState(file1);

  //const [privErr,setPrivErr] = useState("");
  const [nameErr,setNameErr] = useState("");
  const [symErr,setSymErr] = useState("");
  const [descErr,setDescErr] = useState("");

  const [attribErr,setAttribErr] = useState("");

  const [fileErr,setFileErr] = useState("");
  const [errmaxSup, setErrMaxSup] = useState("");

  //const [errShare, setErrorShare] = useState("");
  const [errRoy, setErrorRoy] = useState("");

  const [mainErr,setMainErr] = useState("");
  const[compleMint,setComMinted] = useState(false);
  const [attribs, setAttribs] = useState([
    { id: "5", trait_type: "", value: "" },
  ]);
  const [minted,setMinted] = useState(null);
  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    
    try {
      if(signature.err === null)
      {
        setComMinted(true);
      }
      else
      {
        setMainErr("Signature Failed");
        setSuccessful(false);
      }
    } catch (error) {
      setMainErr("Signature Failed, but check your wallet");
      setSuccessful(false);
    }

    
      
    //console.log("minted: ",minted);
    //setComMinted(true);
   

  }
  useEffect(() => {
    if(compleMint === true)
      navigate(`/get-details?token_address=${minted}&network=${network}&refresh`); 
  }, [compleMint]);
  
  const handleUpload = (e) => {
    e.preventDefault();
    setAttribErr("");
    setMainErr("");
    let name_err = 0;
    let sym_error = 0;
    let desc_error = 0;
    let file_error = 0;
    let attrib_error = 0;
    let maxSupp_error = 0;
    let royalty_error = 0;


    if(!name)
    {
      setNameErr("This field cannot be empty");
      name_err = 1;
    }
    if(!symbol)
    {
      setSymErr("This field cannot be empty");
      sym_error = 1;
    }
    if(!desc)
    {
      setDescErr("This field cannot be empty");
      desc_error = 1;
    }
    if(!file)
    {
      setFileErr("Please select a file");
      file_error = 1;
    }
    if(royalty<0 || royalty>100)
    {
      royalty_error = 1;
      setErrorRoy("Value should be between 0 to 100");
    }
    if(maxSupply<0)
    {
      maxSupp_error = 1;
      setErrMaxSup("Should be a number greater than 1");
    }
    if(attribs[0] === { id: "5", trait_type: "", value: "" })
    {
      setAttribErr("Attributes should have a trait_type and value, it should not be Empty");
    }
    else
    {
      let flag = 0;
      attribs.forEach(element => {
        if(element.trait_type === "")
          flag = 1;
      
      });
      if(flag === 1)
      {
        setAttribErr("Attribute cannot be empty");
        attrib_error = 1;
      }
    }
    

    if(name_err || sym_error || desc_error || file_error || attrib_error || royalty_error || maxSupp_error)
    {
      setMainErr("Please fill all the required fields");
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
      // return;
      let formDatatoSend = new FormData();
      formDatatoSend.append("network", network);
      //formDatatoSend.append("private_key", privKey);
      formDatatoSend.append("wallet", walletId);
      formDatatoSend.append("name", name);
      formDatatoSend.append("symbol", symbol);
      formDatatoSend.append("description", desc);
      // formDatatoSend.append(
      //   "attributes",
      //   JSON.stringify([
      //     {
      //       trait_type: "edification",
      //       value: "100",
      //     },
      //   ])
      // );
      formDatatoSend.append("attributes", JSON.stringify(attribs));
      //formDatatoSend.append("share", share);
      formDatatoSend.append("external_url", externalUrl);
      formDatatoSend.append("max_supply", maxSupply);
      formDatatoSend.append("royalty", royalty);
      formDatatoSend.append("file", file);

      axios({
        // Endpoint to send files
        url: `${endPoint}nft/create_detach`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": xKey,
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },

        // Attaching the form data
        data: formDatatoSend,
      })
        // Handle the response from backend here
        .then(async (res) => {
          console.log(res);
          if(res.data.success === true)
          {
            const transaction = res.data.result.encoded_transaction;
            setMinted(res.data.result.mint);
            const ret_result = await signAndConfirmTransaction(network,transaction,callback);
            console.log(ret_result);
            
            //const minted = res.data.result.mint;
            setSuccessful(true);
            // setTimeout((()=>{
            //   if(minted)
            //     navigate(`/get-details?token_address=${minted}&network=${network}`); 
            //   else
            //     navigate('/'); 
            // }),15000);
            
          }
          else
          {
            setMainErr(res.data.message);
            setloading(false);
          }
          
            //console.log("trans: ",transaction);
            //const network = "devnet";
            //const phantom = new PhantomWalletAdapter();
            //await phantom.disconnect();
            // await phantom.connect();
            // const rpcUrl = clusterUrl(network);
            // const connection = new Connection(rpcUrl,"confirmed");
            // console.log(connection.rpcEndpoint);
            // const ret = await confirmTransactionFromFrontend(connection,transaction,phantom);
            // const checks = await connection.confirmTransaction({signature:ret},'finalised');
            // console.log(ret);
            // console.log(checks);
          
          // if(res.data.success === true)
          // {
          //   if(walletId!==null)
          //     navigate(`/wallet/${walletId}`); 
          //   else
          //     navigate('/') 
          // }
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message)
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
      {
          isLoading && <CreateLoader />
        }
        {
          successful && <SuccessLoader />
        }
      <div className="right-al-container">
        {/* {isLoading && (
          <div
            className="card mx-auto text-center d-flex justify-content-center text-light"
            style={{
              width: "130px",
              height: "50px",
              backgroundColor: "green",
              borderRadius: "10px",
              padding: "20px",
              position: "fixed",
              zIndex: "10",
              top: "10%",
              left: "50%",
            }}
          >
            <span className="loading-text">
              Loading <i className="fas fa-circle-notch fa-spin"></i>
            </span>
          </div>
        )} */}
        
        <div className="container-lg mint-single">
          <div className="row page-heading-container">
            <div className="col-sm-12 col-md-8">
              <h2 className="section-heading">Create Master NFT</h2>
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
                      className="custom-file-input-1"
                      
                      onChange={(e) => {
                        const [fileDisp] = e.target.files;
                        //setFile(e.target.files[0]);
                        console.log(e.target.files[0]);
                        setFile(e.target.files[0]);
                        setFileErr("");
                        setDispFile(URL.createObjectURL(fileDisp));
                        //console.log(typeof file);
                      }}
                    />
                  </div>
                  <div className="text-center" style={{ width: "90%" }}>
                    <small className="error-msg">{fileErr}</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-7">
                <div className="form-section">
                  <div className="form-elements-container">
                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Network*
                      </label>
                      <select
                        name="network"
                        className="form-control form-select"
                        id=""
                        onChange={(e) => setNetwork(e.target.value)}
                      >
                        <option value="devnet">Devnet</option>
                        <option value="testnet">Testnet</option>
                        <option value="mainnet-beta">Mainnet</option>
                      </select>
                    </div>
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="name">
                        Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        maxLength={32}
                        onChange={(e) => {
                          if (!e.target.value)
                            setNameErr("This field cannot be empty");
                          else setNameErr("");
                          setName(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter NFT Name"
                        required
                      />
                      <small className="error-msg">{nameErr}</small>
                    </div>
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="symbol">
                        Symbol*
                      </label>
                      <input
                        type="text"
                        name="symbol"
                        value={symbol}
                        maxLength={10}
                        onChange={(e) => {
                          if (!e.target.value)
                            setSymErr("This field cannot be empty");
                          else setSymErr("");
                          setSymbol(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter NFT Symbol"
                        required
                      />
                      <small className="error-msg">{symErr}</small>
                    </div>
                    {/* <div className="white-form-group">
                      <label className="form-label" htmlFor="name">
                        Private Key*
                      </label>

                      <input
                        type="text"
                        name="privKey"
                        value={privKey}
                        onChange={(e) => setprivKey(e.target.value)}
                        className="form-control"
                        placeholder="Enter Private Key"
                        required
                      />
                    </div> */}
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="maxSupply">
                        Max Supply*
                      </label>
                      <br />
                      <label className="form-label sub-label" htmlFor="name">
                        Keep it 0 if you want one of a kind NFT.
                      </label>
                      <input
                        type="number"
                        min={1}
                        name="maxValue"
                        value={maxSupply}
                        onChange={(e) => {
                              let a = e.target.value;
                              if (a < 0 || !a)
                                setErrMaxSup("Value must be a number greater than 0");
                              else {
                                setErrMaxSup("");
                              }
                              setMaxSupply(e.target.value);
                            }}
                        className="form-control"
                        placeholder="Enter Max Supply Value"
                        required
                      />
                      <small className="error-msg">{errmaxSup}</small>
                    </div>
                    <div className="white-form-group">
                      <label htmlFor="bio" className="form-label">
                        Description*
                      </label>
                      <br />
                      <label className="form-label sub-label" htmlFor="name">
                        The description will be included on the item's detail
                        page underneath its image.
                      </label>
                      <textarea
                        name="desc"
                        value={desc}
                        onChange={(e) => {
                          if (!e.target.value)
                            setDescErr("This field cannot be empty");
                          else setDescErr("");
                          setDesc(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Type a small story"
                        rows="5"
                        required
                      ></textarea>
                      <small className="error-msg">{descErr}</small>
                    </div>

                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Attributes*
                      </label>
                      
                      <div className="row">
                        <div className="col-8">
                          
                          {attribs.map((p) => {
                            return (
                              <div
                                key={p.id}
                                className="row percentage-input-container"
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
                                    placeholder="Trait Type"
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
                                    placeholder="Value"
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
                            >
                              <i className="far fa-trash-alt"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <small className="error-msg">{attribErr}</small>
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
                    </div> */}
                    <div className="white-form-group">
                      <label htmlFor="email" className="form-label">
                        Royalty*
                      </label>
                      <div className="row percentage-input-container" style={{width: "65%"}}>
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
                      {/* <div className="row black-input-container">
                        <div className="col-10 text-start">Platform fees</div>
                        <div className="col-2 text-end">0.5%</div>
                      </div> */}
                    </div>
                    {/* <div className="white-form-group">
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
                      <label className="form-label" htmlFor="name">
                        External Link
                      </label>

                      <input
                        type="text"
                        name="externalUrl"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        className="form-control"
                        placeholder="Enter Link"
                      />
                    </div>
                    {/* {externalUrl} */}
                    <div className="white-form-group">
                      <button
                        className="btn-solid-grad px-5"
                        type="submit"
                        onClick={handleUpload}
                      >
                        Submit
                      </button>
                    </div>
                    <small className="mt-1 error-msg">{mainErr}</small>
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

export default Create;
