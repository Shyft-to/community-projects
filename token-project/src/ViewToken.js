import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BurnTokens from "./BurnTokens";
import chainloader from "./resources/images/chainloader.gif";
import { WalletContext } from "./WalletContext";
import BurnLoader from "./loaders/BurnLoader";


import axios from "axios";
import { signAndConfirmTransaction } from "./utility/common";

const ViewToken = () => {
  const { walletId } = useContext(WalletContext);
  const navigate = useNavigate();
  const xKey = process.env.REACT_APP_API_KEY;
  const endPoint = process.env.REACT_APP_URL_EP;

  let Params = window.location.search.substring(1);
  let getParams = Params.split("&");
  let networkParams = getParams[1].split("=");
  console.log("network: ", networkParams[1]);

  const [name, setName] = useState("Loading");
  const [sym, setSym] = useState(null);
  const [desc, setDesc] = useState(null);
  const [logo, setLogo] = useState(chainloader);
  const [mint, setMint] = useState(null);
  const [tokAddr, setTok] = useState(null);
  const [decimal, setDecimal] = useState(null);
  const [freeze, setFreeze] = useState(null);
  const [curSup, setCurrSup] = useState(null);

  const [burnPopup, setBurnPopup] = useState(false);

  const [amtBurned, setAmtBurned] = useState(0);
  const [loading,setLoading] = useState(false);

  const callback = (signature,result) => {
    console.log("Signature ",signature);
    console.log("result ",result);
    setLoading(false);
    navigate(`/wallet/${walletId}`);
    // try {
    //   if(signature.err === null)
    //   {
    //     setSigning(false);
    //     navigate(`/view-details?token_address=${minted}&network=${net}`);
    //   }
    //   else
    //   {
    //     setMainErr("Signature Failed");
    //     setSigning(false);
    //   }
    // } catch (error) {
    //   setMainErr("Signature Failed, but check your wallet");
    //   setSigning(false);
    // }

  }

  const burnNow = () => {
    setBurnPopup(false);
    setLoading(true);
    axios({
        // Endpoint Burn Request
        url: `${endPoint}token/burn_detach`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xKey,
        },
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",

        // Attaching the data
        data: {
            "network": networkParams[1],
            "wallet": walletId,
            "token_address": tokAddr,
            "amount": Number(amtBurned)

        },
      })
        // Handle the response from backend here
        .then(async (res) => {
          console.log(res);
        //   setCreating(false);
          if(res.data.success === true)
          {
            const transaction = res.data.result.encoded_transaction;
            // setMinted(res.data.result.mint);
            // setSigning(true);
            const ret_result = await signAndConfirmTransaction(networkParams[1],transaction,callback);
            console.log(ret_result);
          }
          else
          {
            // setMainErr(res.data.message);
            // setCreating(false);
            setLoading(false);
          }
        })

        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          console.log(err.message)
        //   setMainErr(err.message);
        //   setCreating(false);
            setLoading(false);
        });
  }

  let nftUrl =
    `${endPoint}token/get_info?` + window.location.search.substring(1);
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
        console.log("Fetch Status: ", data.success);
        console.log(data);
        // setApiResponse(JSON.stringify(data.result));
        setName(data.result.name);
        setDesc(data.result.description);
        setLogo(data.result.image);
        setSym(data.result.symbol);
        setTok(data.result.address);
        setMint(data.result.mint_authority);
        setFreeze(data.result.freeze_authority);
        setDecimal(data.result.decimals);
        setCurrSup(data.result.current_supply);
      })
      .catch((errs) => {
        console.log(errs.message);
        // setErrorOcc(true);
      });
  }, [nftUrl]);
  // useEffect(() => {
  //     document.title = name;
  // }, [name]);
  return (
    <div>
        {loading && <BurnLoader />}
      {burnPopup && <BurnTokens setAmtBurned={setAmtBurned} amtBurned={amtBurned} burnNow={burnNow} setBurnPopup={setBurnPopup} />}
      <div className="right-al-container">
        <div className="fixed-price-page generic-ball-background">
          <div className="container-xl">
            <div className="row title-container" style={{ marginTop: "-20px" }}>
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
                    <img className="image-nft" src={logo} alt="NFT" />
                  </div>
                  <div className="img-subtext text-center">
                    <a
                      href={logo}
                      target="_blank"
                      className="no-decor"
                      rel="noreferrer"
                    >
                      <h6>View Original</h6>
                    </a>
                  </div>
                  {walletId && <div className="text-center">
                    <button className="btn-solid-grad" onClick={() => setBurnPopup(true)}>Burn Token</button>
                  </div>}
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-8">
                <div className="text-section px-3">
                  <h6 className="p-para-headings">{networkParams[1]}</h6>

                  <h6 className="p-para-headings">Description</h6>
                  <p className="p-para-light">{desc}</p>

                  <h6 className="p-para-headings">Symbol</h6>
                  <p className="p-para-light">{sym}</p>

                  <h6 className="p-para-headings">Details</h6>
                  <div className="details-table">
                    <div className="row">
                      <div className="col-4">Token Address</div>
                      <div
                        className="col-8 text-end"
                        style={{ wordWrap: "break-word" }}
                      >
                        <a
                          href={`https://explorer.solana.com/address/${tokAddr}?cluster=${networkParams[1]}`}
                          target="_blank"
                          className="no-decor"
                          rel="noreferrer"
                        >
                          {tokAddr}
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Mint Authority</div>
                      <div
                        className="col-8 text-end"
                        style={{ wordWrap: "break-word" }}
                      >
                        <a
                          href={`https://explorer.solana.com/address/${mint}?cluster=${networkParams[1]}`}
                          target="_blank"
                          className="no-decor"
                          rel="noreferrer"
                        >
                          {mint}
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Freeze Authority</div>
                      <div
                        className="col-8 text-end"
                        style={{ wordWrap: "break-word" }}
                      >
                        <a
                          href={`https://explorer.solana.com/address/${freeze}?cluster=${networkParams[1]}`}
                          target="_blank"
                          className="no-decor"
                          rel="noreferrer"
                        >
                          {freeze}
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Decimals</div>
                      <div className="col-8 text-end">{decimal}</div>
                    </div>
                    <div className="row">
                      <div className="col-4">Current Supply</div>
                      <div className="col-8 text-end">{curSup}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewToken;
