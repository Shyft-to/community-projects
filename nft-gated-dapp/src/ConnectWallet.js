import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

import { WalletContext } from "./context/WalletContext";
import { connectTheWallet } from "./utilityfunc";

import spaceBoy from "./resources/images/space-boy.png";
import PlanetLoader from "./loaders/PlanetLoader";
import SuccessLoader from "./loaders/SuccessLoader";
import FailedLoader from "./loaders/FailedLoader";
const ConnectWallet = () => {
  const navigate = useNavigate();
  const { setWalletId } = useContext(WalletContext);

  //const [nfts, setNfts] = useState(null);
  const [mssg, setMssg] = useState("");

  const [loading, setLoading] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [failedState, setFailedState] = useState(false);

  const navigateToMint = () => {
    navigate("/mint");
  }

  const navigateToPlanet = () => {
    navigate("/landing-page");
  }

  const solanaConnect = async () => {
    console.log("Attempting to connect wallet");
    ReactSession.set("auth", false);

    const resp = await connectTheWallet();

    console.log("Your Wallet Address: ", resp);

    if (resp.success === true) {
      setWalletId(resp.addr);
      ReactSession.set("uwall", resp.addr);
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const updAuth = process.env.REACT_APP_PUBLIC_KEY;

      setLoading(true);

      let nftUrl = `${endPoint}nft/read_all?network=devnet&address=${resp.addr}&update_authority=${updAuth}&refresh=refresh`;
      
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
          console.log(res.data);
          if (res.data.success === true && res.data.result.length > 0) {
            //setNfts(res.data.result);
            ReactSession.set("nft_key", res.data.result[0].mint);
            ReactSession.set("auth", true);
            setLoading(false);
            setSuccessState(true);
          }
          else if(res.data.success === true && res.data.result.length === 0)
          {
            setLoading(false);
            setSuccessState(false);
            setFailedState(true);
            ReactSession.set("auth", false);
          }
          else 
          {
            setMssg("Some Error Occured");
            setLoading(false);
            //setFailedState(true);
            //setNfts([]);
          }
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          setMssg("Failed! Could not get NFTs");
          //setNfts([]);
          setLoading(false);
        });
    }
  };
  

  return (
    <div>
      <div className="background-container">
        <div className="connect-wallet-back">
          {loading && (
            <PlanetLoader
              message="Please wait... while we check your "
              message2=" Landing pass"
            />
          )}
          {successState && (
            <SuccessLoader message="Landing pass found. You have access to land on the planet." setSuccessState={setSuccessState} navigateToPlanet={navigateToPlanet} />
          )}
          {failedState && (
            <FailedLoader message="No Landing pass found in your wallet." setFailedState={setFailedState} navigateToMint={navigateToMint} />
          )}
          <div className="container-lg">
            <div className="row connect-wallet">
              <div className="col-md-12 col-lg-7">
                <div>
                  <h2 className="main-heading">SHYFT Landing Pass Check</h2>
                  <p className="p-para p-para-emphasis">
                    You need a landing pass to land on a planet. Connect your wallet to check.
                  </p>
                  {/* <p className="p-para">
                    Connect your wallet to discover more.
                  </p> */}
                  <button
                    className="btn-solid-grad-wide"
                    onClick={solanaConnect}
                  >
                    Connect Phantom
                  </button>
                  {/* <div className="pe-2">
                    <img className="powered-by-img" src={shyftlogo} alt="" />

                  </div> */}
                  {/* <div className="d-flex justify-content-start mt-3">
                    <div className="ps-3">
                      <a className="btn-solid-grad-xs-2" href="https://shyft.to/" target="_blank" rel="noreferrer">Visit Site</a>

                    </div>
                    <div className="px-2">
                      <a className="btn-solid-grad-xs-2" href="https://docs.shyft.to/" target="_blank" rel="noreferrer">Read Docs</a>

                    </div>
                  </div> */}
                    
                </div>
                <div className="py-2">
                  <small className="text=warning">{mssg}</small>
                </div>
              </div>
              <div className="col-md-12 col-lg-5">
                <img src={spaceBoy} alt="SpaceBoy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
