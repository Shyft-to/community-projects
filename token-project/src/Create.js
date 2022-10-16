import { useContext, useState } from "react";
import { WalletContext } from "./WalletContext";
import axios from "axios";

const CreateToken = () => {
  const {walletId,setWalletId} = useContext(WalletContext);


  const [net,setNet] = useState("devnet");
  
  const [name,setName] = useState("");
  const [symbol,setSymbol] = useState("");
  const [desc,setDesc] = useState("");
  const [decis,setDesics] = useState(0);
  const [img,setImg] = useState(null);

  const createToken = () => {
    const xKey = process.env.REACT_APP_API_KEY.toString();
    const endPoint = process.env.REACT_APP_URL_EP;
    const formData = new FormData();
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
        if(res.data.success === true)
        {
          // const transaction = res.data.result.encoded_transaction;
          // setMinted(res.data.result.mint);
          // const ret_result = await signAndConfirmTransaction(network,transaction,callback);
          // console.log(ret_result);
          
          // //const minted = res.data.result.mint;
          // setSuccessful(true);
         
          
        }
        else
        {
          // setMainErr(res.data.message);
          // setloading(false);
        }
        
          
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
        console.log(err.message)
        // setMainErr(err.message);
        // setloading(false);
      });
  }

  return (
    <div className="right-al-container">
      <div className="container-xl mint-single">
        <div className="row page-heading-container">
          <div className="col-sm-12 col-md-12">
            <h2 className="section-headings">Create A Token</h2>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-sm-12 col-md-6 p-3">
              <div className="image-section">
                <div className="image-container">
                  <div className="inner">
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="button-container">
                  <button className="btn-solid-grad-fullwidth text-center">
                    Upload File
                  </button>

                  <br></br>
                  <input
                    type="file"
                    id="testFile"
                    style={{
                      marginTop: "-54px",
                      position: "absolute",
                      width: "500px",
                      height: "50px",
                      border: "2px solid black",
                      zIndex: 3,
                      opacity: 0,
                    }}
                    
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="form-section">
                <div className="form-elements-container">
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="name">
                      Upload File
                    </label>
                    
                  </div>
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
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
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
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </div>
                  <div className="white-form-group">
                    <label htmlFor="bio" className="form-label">
                      Description
                    </label>
                    <p>Add a small story about the token</p>
                    <textarea
                      name="desc"
                      className="form-control"
                      placeholder="Write a short product description"
                      rows="5"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                  

                  <div className="white-form-group">
                    <label className="form-label" htmlFor="decimal">
                      Decimal
                    </label>
                    <input
                      type="text"
                      name="decimal"
                      className="form-control"
                      placeholder="Enter Max Supply Value"
                      value={decis}
                      onChange={(e) => setDesics(e.target.value)}
                    />
                  </div>
                  
                                    
                  <div className="white-form-group">
                    <button
                      className="btn-solid-grad"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateToken;
