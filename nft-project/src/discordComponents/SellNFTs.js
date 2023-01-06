import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import FetchLoader from "../Loaders/FetchComponent";
import FetchLoaderGen from "../Loaders/FetchLoaderGen";
import ListLoader from "../Loaders/ListLoader";
import { connectTheWallet } from "../utility/common";

import { signAndConfirmTransaction } from "../utility/common";
import SuccessLoaderWithClose from "../Loaders/SuccessLoaderWithClose";
import FailedLoader from "../Loaders/FailedLoader";

const SellNFTs = () => {
  const navigate = useNavigate();
  const { mpaddress, net } = useParams();

  // const { walletId, setWalletId } = useContext(WalletContext);
  // const {network, setNetwork} = useContext(NetworkContext);

  const [walletId, setWalletId] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [marketplaceAddress, setMarketplaceAddress] = useState("");
  const [isWalletConn, setWalletConn] = useState(false);

  const [nfts, setNfts] = useState(null);
  const [loaded, setLoaded] = useState(false);


  const [got_listings, setGotListings] = useState(null);
  const [mpListings, setMplisting] = useState([]);
  const [conn_wall, setConnWall] = useState(null);

  const [mssg, setMssg] = useState("");
  const [LoadingConf, setLoadingConf] = useState(false);

  useEffect(() => {
    document.getElementById("mySidenav").style.display = "none";
    if (!marketplaceAddress) {
      setMssg("Some error occured. Please provide the correct wallet address, marketplace address or network");
      setNfts([]);
      setLoaded(true);
    }
    else {
      const networkGot = net ?? 'mainnet-beta';
      setNetwork(networkGot);
      setMarketplaceAddress(mpaddress);
    }
  }, []);

  //Required Code to fetch marketplace listings
  useEffect(() => {
    if (walletId !== "" || marketplaceAddress !== "") {
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      // const marketplaceAddress = process.env.REACT_APP_MARKPLACE; 
      setMssg("");

      let nftUrl = `${endPoint}marketplace/active_listings?network=${network}&marketplace_address=${marketplaceAddress}`;

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
          if (res.data.success === true) {
            setGotListings(res.data.result);
          }
          else {
            setMplisting([]);
          }
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);

        });
    }
  }, []);

  useEffect(() => {
    console.log("Got Listings: ", got_listings);
    if (got_listings != null) {
      let arr_listng = [];
      got_listings.forEach((listing) => {
        if (listing)
          arr_listng.push(listing.nft_address);
      })
      setMplisting(arr_listng);
      //console.log("MP Listings: ",mpListings);
    }
  }, [got_listings, nfts]);

  //Required Code
  useEffect(() => {
    if (walletId !== "" || marketplaceAddress !== "") {
      const xKey = process.env.REACT_APP_API_KEY.toString();
      const endPoint = process.env.REACT_APP_URL_EP;
      setMssg("");

      let nftUrl = `${endPoint}nft/read_all?network=${network}&address=${walletId}`;

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
          if (res.data.success === true)
            setNfts(res.data.result);
          else {
            setMssg("Some Error Occured");
            setNfts([]);
          }
          setLoaded(true);
          //ReactSession.set("nfts", res.data.result);
          //setLoaded(true);
        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          setMssg(err.message);
          setNfts([]);
          setLoaded(true);
        });
    }
  }, [walletId, network]);

  //all functions required for listing
  const [listingNFT, setListingNFT] = useState(null);
  const [listingName, setListingName] = useState(null);
  const [listingURI, setListingURI] = useState(null);
  const [listingPrice, setListingPrice] = useState(0);
  const [showLister, setShowLister] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const [failedModal, setFailedModal] = useState(false);

  const [isListing, setIsListing] = useState(false);

  const [errMessg, setErrMessg] = useState('');

  const lister = (nft_addr, nftname, nfturi) => {
    setListingNFT(nft_addr);
    setListingName(nftname);
    setListingURI(nfturi);
    setErrMessg('');
    setShowLister(true);
  }
  const callback = (signature, result) => {
    console.log("Signature ", signature);
    console.log("result ", result);
    setLoadingConf(true);
    try {
      if (signature.err === null) {
        console.log('ok');
        //navigate(`/marketplace`);
        setTimeout(() => {
          navigate(`/yourwallet/${walletId}/${net}`);
        }, 5000);
      }
      else {
        console.log('failed');
        setFailedModal(true);
        setLoadingConf(false);
      }
      setOkModal(false);
    } catch (error) {
      console.log('failed');
      setOkModal(false);
      setFailedModal(true);
      setLoadingConf(false);
    }

  }
  const solanaConnect = async () => {
    console.log('clicked solana connect');
    const resp = await connectTheWallet();
    console.log(resp);
    setWalletId(resp.addr);
  }

  useEffect(() => {
    if (walletId !== "")
      setWalletConn(true);

  }, [walletId]);


  const listNFT = (nft_addr) => {
    setIsListing(true);
    setShowLister(false);
    const xKey = process.env.REACT_APP_API_KEY;
    const endPoint = process.env.REACT_APP_URL_EP;
    const marketplaceAddress = process.env.REACT_APP_MARKPLACE;

    if (listingPrice === 0) {
      setErrMessg('Value must be a number greater than 0')
    }
    else {
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
          network: 'devnet',
          marketplace_address: marketplaceAddress,
          nft_address: nft_addr,
          price: Number(listingPrice),
          seller_wallet: walletId

        }
      })
        // Handle the response from backend here
        .then(async (res) => {
          console.log(res.data);
          setIsListing(false);
          if (res.data.success === true) {
            setOkModal(true);

            const transaction = res.data.result.encoded_transaction;
            const ret_result = await signAndConfirmTransaction('devnet', transaction, callback);
            console.log(ret_result);
            setListingPrice(0);
          }
          else {

            setFailedModal(true);
            //setShowLister(false);
          }

        })
        // Catch errors if any
        .catch((err) => {
          console.warn(err);
          setErrMessg(err.message);
          setIsListing(false);
          setFailedModal(true);
          setShowLister(false);
          // navigate(`/my-listings`);
          setListingPrice(0);
          //setShowLister(false);
        });
    }


  }
  const closePopupList = () => {
    setShowLister(false);
  }


  return (
    <div>
      {isWalletConn && !loaded && <FetchLoader />}
      {LoadingConf && <FetchLoaderGen message="Loading" />}
      {isListing && <FetchLoaderGen message="Listing NFT" />}
      {showLister && <ListLoader listingNFT={listingNFT} listingName={listingName} listingURI={listingURI} listingPrice={listingPrice} setListingPrice={setListingPrice} listNFT={listNFT} closePopupList={closePopupList} errMessg={errMessg} setErrMessg={setErrMessg} />}
      {okModal && <SuccessLoaderWithClose closer={setOkModal} />}
      {failedModal && <FailedLoader closer={setFailedModal} />}
      <div className="">
        {
          !isWalletConn &&
          <div className="container-lg pt-5" style={{ minHeight: "85vh" }}>
            <div className="row">
              <div className="col-12 col-md-10">
                <h2 className="section-heading">
                  Connect Your Wallet
                </h2>
                <p className="p-para">Please connect your wallet to list NFTs on the discord marketplace</p>
              </div>
              <div className="col-12 col-md-2 pt-2 text-center text-md-end">
                <button className="btn-solid-grad" onClick={solanaConnect}>Connect</button>
              </div>

            </div>
          </div>
        }
        {isWalletConn && <div className="container-lg">

          <div className="row">
            <div className="col-12 col-md-8">
              <h2 className="section-heading">
                {loaded && `${nfts.length} NFT(s) Found`}
              </h2>
            </div>
            <div className="col-12 col-md-4 text-center text-md-end">
              <p className="p-para text-success">
                Network: {network}
              </p>
            </div>

          </div>
          {mssg && (
            <div className="pt-5 text-center">
              <p className="p-para">{mssg}</p>
            </div>
          )}
          <div className="row">

            {loaded &&
              nfts.map((nft) => (
                <div
                  className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
                  key={nft.mint}
                >
                  <div className="cards-outer-port">
                    <div className="inner-box">
                      <Link
                        to={`/get-details?token_address=${nft.mint}&network=${network}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="inner-box-img-container">
                          <img src={nft.cached_image_uri} alt="NftImage" />
                        </div>
                      </Link>
                      <div className="row pt-3 pb-2">
                        <div className="col-12 col-xl-6">
                          <p
                            className="port-para-2 text-center text-xl-start"
                            style={{ wordWrap: "break-word" }}
                          >
                            {(nft.name.length > 8) ? nft.name.substring(0, 8) + '...' : nft.name}
                          </p>
                        </div>

                        <div className="col-12 col-xl-6 pt-1 px-3">
                          {/* {(conn_wall === walletId && network === 'devnet') ? (mpListings.includes(nft.mint)) ? <div className="white-button-container-sm"><button disabled>Listed</button></div> : <div className="white-button-container-sm disabled" ><button onClick={() => lister(nft.mint, nft.name, nft.cached_image_uri)}>List</button></div> : ""} */}
                          {( walletId !== "" && network === 'devnet') ? (mpListings.includes(nft.mint)) ? <div className="white-button-container-sm"><button disabled>Listed</button></div> : <div className="white-button-container-sm disabled" ><button onClick={() => lister(nft.mint, nft.name, nft.cached_image_uri)}>List</button></div> : ""}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default SellNFTs;