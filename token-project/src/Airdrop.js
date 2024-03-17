import { useState, useContext } from "react";
import { WalletContext } from "./WalletContext";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

import { signAndConfirmTransaction } from "./utility/common";

import TokenLoader from "./loaders/TokenLoader";
import SuccessLoader from "./loaders/SuccessLoader";
import { useEffect } from "react";

const Airdrop = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const { walletId } = useContext(WalletContext);

  const [net, setNet] = useState("devnet");
  const [recAddr, setRecAddr] = useState("");
  const [tokAddr, setTokAddr] = useState("");
  const [amt, setAmt] = useState(0);
  const [mssg, setMssg] = useState("");

  const [mainErr, setMainErr] = useState("");

  const [sending, setSending] = useState(false);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    const tokAddrs = new URLSearchParams(search).get('token_address');
    const networks = new URLSearchParams(search).get('network');
    console.log("Token: ",tokAddrs);
    console.log("network: ",networks);
    if(tokAddrs)
      setTokAddr(tokAddrs);
    if(networks)
      setNet(networks);
  }, [])
  

  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);

    try {
      if (signature.err === null) {
        setSigning(false);
        navigate(`/wallet/${walletId}`);
      } else {
        setMainErr("Signature Failed");
        setSigning(false);
      }
    } catch (error) {
      setMainErr("Signature Failed, but check your wallet");
      setSigning(false);
    }
  };

  const createAToken = (e) => {
    e.preventDefault();
    var errorOcc = 0;
    setMainErr("");
    if (recAddr === "") {
      setMainErr("Receiver Wallet is required");
      errorOcc = 1;
    } else if (tokAddr === "") {
      setMainErr("Token Address is required");
      errorOcc = 1;
    } else if (amt < 1) {
      setMainErr("Amount Should be greater than 0");
      errorOcc = 1;
    }

    if (errorOcc === 0) {
      setSending(true);
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const formData = new FormData();
      formData.append("network", net);
      formData.append("wallet", walletId);
      formData.append("token_address", tokAddr);
      formData.append("amount", amt);
      formData.append("receiver", recAddr);
      if (mssg !== "") formData.append("message", mssg);
      axios({
        // Endpoint to send tokens
        url: `${endPoint}token/mint_detach`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },

        // Attaching the  data
        data: {
          "network": net,
          "mint_authority": walletId,
          "token_address": tokAddr,
          "amount": Number(amt),
          "receiver":recAddr
        },
      })
        // Handle the response from backend here
        .then(async (res) => {
          console.log(res);
          //setCreating(false);
          if (res.data.success === true) {
            const transaction = res.data.result.encoded_transaction;
            // setMinted(res.data.result.mint);
            setSending(false);
            setSigning(true);
            const ret_result = await signAndConfirmTransaction(
              net,
              transaction,
              callback
            );
            console.log(ret_result);
            // setSigning(false);
            // navigate(`/wallet/${walletId}`);
          } else {
            setMainErr(res.data.message);
            setSending(false);
          }
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message);
          setMainErr(err.message);
          setSending(false);
        });
    }
  };

  return (
    <div>
      <div>
        {sending && <TokenLoader msg1="Airdropping Token" />}
        {signing && <SuccessLoader />}
      </div>
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
                        value={net}
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
                        value={recAddr}
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
                        value={tokAddr}
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
                        value={amt}
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
                        value={mssg}
                        onChange={(e) => {
                          setMssg(e.target.value);
                        }}
                      ></textarea>
                    </div>

                    <div className="white-form-group">
                      <button className="btn-solid-grad-wide" onClick={createAToken}>
                        Airdrop
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

export default Airdrop;
