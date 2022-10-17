import { useState } from "react";
import axios from "axios";

const Airdrop = () => {
  const [net,setNet] = useState('devnet');
  const [recAddr,setRecAddr] = useState('');
  const [tokAddr,setTokAddr] = useState('');
  const [amt,setAmt] = useState(0);
  const [mssg,setMssg] = useState("");

  const [mainErr,setMainErr] = useState("");

  const createAToken = (e) => {
    e.preventDefault()
    var errorOcc = 0;
    setMainErr("");
    if(recAddr === "")
    {
      setMainErr("Receiver Wallet is required");
      errorOcc = 1;
    }
    else if(tokAddr === "")
    {
      setMainErr("Token Address is required");
      errorOcc = 1;
    }
    else if(amt < 1)
    {
      setMainErr("Amount Should be greater than 0");
      errorOcc = 1;
    }

    if(errorOcc === 0)
    {
      //setCreating(true);
      const xKey = process.env.REACT_APP_API_KEY.toString();
      const endPoint = process.env.REACT_APP_URL_EP;
      const formData = new FormData();
      formData.append("network",net);
      // formData.append("wallet",walletId)
      // formData.append("name",recAddr);
      // formData.append("symbol",amt);
      // formData.append("desc",mssg);
      // formData.append("decimals",decis);
      // formData.append("file",img);
      axios({
        // Endpoint to send files
        url: `${endPoint}token/mint_detach`,
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
          //setCreating(false);
          if(res.data.success === true)
          {
            const transaction = res.data.result.encoded_transaction;
            // setMinted(res.data.result.mint);
            // setSigning(true);
            //const ret_result = await signAndConfirmTransaction(net,transaction,callback);
            //console.log(ret_result);
          }
          else
          {
            setMainErr(res.data.message);
            //setCreating(false);
          }
          
            
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message)
          setMainErr(err.message);
          // setCreating(false);
        });
    }

    
  }


  return (
    <div className="right-al-container">
      <div className="container-xl mint-single">
        <div className="row page-heading-container">
          <div className="col-sm-12 col-md-12">
            <h2 className="section-heading" style={{ marginTop: "-60px" }}>
              Airdrop Token
            </h2>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-sm-12 col-md-8 p-2">
              <div className="form-section">
                <div className="form-elements-container">
                  <div className="white-form-group">
                    <label htmlFor="email" className="form-label">
                      Network
                    </label>
                    <select
                      name="network"
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setNet(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet</option>
                    </select>
                  </div>
                  <div className="white-form-group">
                    <label className="form-label">Receiver Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Receiver Address"
                      onChange={(e) => {
                        setRecAddr(e.target.value);
                      }}
                    />
                  </div>

                  <div className="white-form-group">
                    <label className="form-label">Token Address</label>
                    <input
                      type="text"
                      name="frezeAuth"
                      className="form-control"
                      placeholder="Enter here"
                      onChange={(e) => {
                        setTokAddr(e.target.value);
                      }}
                    />
                  </div>

                  <div className="white-form-group">
                    <label className="form-label" htmlFor="decimal">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="decimal"
                      className="form-control"
                      placeholder="Enter Amount to be Airdropped"
                      onChange={(e) => {
                        setAmt(e.target.value);
                      }}
                    />
                  </div>

                  <div className="white-form-group">
                    <label className="form-label">Optional Message</label>
                    <textarea
                      
                      
                      className="form-control"
                      placeholder="Enter here"
                      onChange={(e) => {
                        setMssg(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="white-form-group">
                    <button className="btn-solid-grad-wide" type="submit">
                      Airdrop
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

export default Airdrop;
