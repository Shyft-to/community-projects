import { useContext, useState } from "react";
import { WalletContext } from "./WalletContext";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

import { signAndConfirmTransaction } from './utility/common';

import imgPlcHldr from './resources/images/img-thumb.png';
import CreateLoader from "./loaders/CreateLoader";
import SuccessLoader from "./loaders/SuccessLoader";

const CreateToken = () => {
  const {walletId} = useContext(WalletContext);
  const navigate = useNavigate();

  var valueMinted = "";

  // const [minted,setMinted] = useState("");
  const [net,setNet] = useState("devnet");
  
  const [name,setName] = useState("");
  const [symbol,setSymbol] = useState("");
  const [desc,setDesc] = useState("");
  const [decis,setDesics] = useState(9);
  const [img,setImg] = useState(null);

  const [dispFile,setDispFile] = useState(imgPlcHldr);

  const [creating,setCreating] = useState(false);
  const [signing,setSigning] = useState(false);

  const [nameErr,setNameErr] = useState("");
  const [symErr,setSymErr] = useState("");
  const [descErr,setDescErr] = useState("");
  // const [deciErr,setDeciErr] = useState("");
  // const [imgErr,setImgErr] = useState("");
  const [mainErr,setMainErr] = useState("");

  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);

    try {
      if(signature.err === null)
      {
        setSigning(false);
        // navigate(`/view-details?token_address=${valueMinted}&network=${net}`);
        navigate(`/airdrop?token_address=${valueMinted}&network=${net}`);
      }
      else
      {
        setMainErr("Signature Failed");
        setSigning(false);
      }
    } catch (error) {
      setMainErr("Signature Failed, but check your wallet");
      setSigning(false);
    }

  }

  const createAToken = (e) => {
    e.preventDefault()
    var errorOcc = 0;
    setMainErr("");
    if(name === "")
    {
      setMainErr("Name is required");
      errorOcc = 1;
    }
    else if(symbol === "")
    {
      setMainErr("Symbol is required");
      errorOcc = 1;
    }
    else if(desc === "")
    {
      setMainErr("Desc is required");
      errorOcc = 1;
    }
    else if(img === null)
    {
      setMainErr("Token Image is required");
      errorOcc = 1;
    }

    if(errorOcc === 0)
    {
      setCreating(true);
      const xKey = process.env.REACT_APP_API_KEY.toString();
      const endPoint = process.env.REACT_APP_URL_EP;
      const formData = new FormData();
      formData.append("network",net);
      formData.append("wallet",walletId)
      formData.append("name",name);
      formData.append("symbol",symbol);
      formData.append("desc",desc);
      formData.append("decimals",decis);
      formData.append("file",img);
      axios({
        // Endpoint to send files
        url: `${endPoint}token/create_detach`,
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
          setCreating(false);
          if(res.data.success === true)
          {
            const transaction = res.data.result.encoded_transaction;
            // setMinted(res.data.result.mint);
            valueMinted = res.data.result.mint;
            console.log('RespMint',res.data.result.mint);
            setSigning(true);
            const ret_result = await signAndConfirmTransaction(net,transaction,callback);
            console.log(ret_result);
            console.log('minted',valueMinted);
          }
          else
          {
            setMainErr(res.data.message);
            setCreating(false);
            setSigning(false);
          }
          
            
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message)
          setMainErr(err.message);
          setCreating(false);
          setSigning(false);
        });
    }

    
  }

  return (
    <div>
    <div>
      {creating && <CreateLoader />}
      {signing && <SuccessLoader />}
    </div>
    <div className="right-al-container">
      <div className="container-xl mint-single">
        <div className="row page-heading-container">
          <div className="col-sm-12 col-md-12">
            <h2 className="section-heading" style={{ marginTop: "-60px" }}>Create A Token</h2>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-sm-12 col-md-5 col-lg-6 col-xl-4 p-3">
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
                        setImg(e.target.files[0]);
                        //setFileErr("");
                        setDispFile(URL.createObjectURL(fileDisp));
                        //console.log(typeof file);
                      }}
                    />
                  </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-6 ps-1 ps-xl-3">
              <div className="form-section">
                <div className="form-elements-container">
                  <div className="white-form-group">
                    <label htmlFor="email" className="form-label">
                      Network
                    </label>
                    <select
                      name="network"
                      className="form-control form-select"
                      id="" onChange={(e) => setNet(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet</option>
                    </select>
                  </div>
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e)=>{
                        if(e.target.value === "")
                          setNameErr("Name cannot be Empty")
                        else
                          setNameErr("")
                        setName(e.target.value)
                      }}
                    />
                  </div>
                  <small className="p-para-light text-danger">{nameErr}</small>
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="symbol">
                      Symbol
                    </label>
                    <input
                      type="text"
                      name="symbol"
                      className="form-control"
                      placeholder="Enter Symbol"
                      value={symbol}
                      onChange={(e) => {
                        if(e.target.value === "")
                          setSymErr("Symbol cannot be Empty")
                        else
                          setSymErr("")
                        setSymbol(e.target.value)
                      }}
                    />
                  </div>
                  <small className="p-para-light text-danger">{symErr}</small>
                  <div className="white-form-group">
                    <label htmlFor="bio" className="form-label">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      className="form-control"
                      placeholder="Write a short product description"
                      rows="5"
                      value={desc}
                      onChange={(e) => {
                        if(e.target.value === "")
                          setDescErr("Please Enter a small description");
                        else
                        setDescErr("");
                        setDesc(e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <small className="p-para-light text-danger">{descErr}</small>

                  <div className="white-form-group">
                    <label className="form-label" htmlFor="decimal">
                      Decimals
                    </label>
                    <input
                      type="text"
                      name="decimal"
                      className="form-control"
                      placeholder="Enter Token Decimals"
                      min={0}
                      value={decis}
                      onChange={(e) => setDesics(e.target.value)}
                    />
                  </div>
                  
                                    
                  <div className="white-form-group">
                    <button
                      className="btn-solid-grad"
                      onClick={createAToken}
                    >
                      Create
                    </button>
                  </div>
                  <div className="p-para-light text-danger">{mainErr}</div>
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

export default CreateToken;
