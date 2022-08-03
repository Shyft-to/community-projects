import axios from "axios";
import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate,useParams  } from "react-router-dom";


const ListAll = ({walletId,setWalletId,setSolDomainApp}) => {
    const navigate = useNavigate();
    const {waddress} = useParams();
    console.log("Your Wallet Address: ",waddress);
    const [nfts,setNfts] = useState(null);
    const [loaded,setLoaded] = useState(false);
    const [network, setNetwork] = useState("mainnet-beta");
    let uwallet = ReactSession.get("userw");
    let memNetwork =  ReactSession.get("networkSel");
    useEffect(()=>{
        //ReactSession.set("userw",waddress);
        ReactSession.set("networkSel", null);
        ReactSession.set("solDomain",null);
        if( !waddress )
        {
            console.log('Wallet Not connected')
            navigate('/');
        }
        else
        {
            
            ReactSession.set("userw",waddress);
            const endPoint = process.env.REACT_APP_URL_EP;
            const xKey = process.env.REACT_APP_API_KEY.toString();
            let reqUrl = `${endPoint}wallet/get_domains?network=mainnet-beta&wallet=${waddress}`;
      
            axios({
            // Endpoint to send files
                url: reqUrl,
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
                },
            })
            // Handle the response from backend here
            .then((res) => {
                console.log(res.data);
                if(res.data.result[0])
                {
                    ReactSession.set("solDomain",res.data.result[0].name);
                    setSolDomainApp(res.data.result[0].name);
                    //setDomain(res.data.result[0].name);
                }
                else
                {
                    ReactSession.set("solDomain",null);
                }
                //ReactSession.set("nfts", res.data.result);
                //setLoaded(true);
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
                ReactSession.set("solDomain",null);
            });

            }


            console.log('I am running and setting the wallet address');
            setWalletId(waddress);
    },[waddress]);
    //console.log(walletId);
    useEffect(()=>{
        if(memNetwork)
            setNetwork(memNetwork);
    },[memNetwork])
    useEffect(() => {
      console.log("Use Our API EndPoint:",process.env.REACT_APP_URL_EP);
      const endPoint = process.env.REACT_APP_URL_EP;
      const xKey = process.env.REACT_APP_API_KEY.toString();
      //console.log(xKey);
      setLoaded(false);
      

    // let nftUrl = `${endPoint}nft/read_all?network=${network}&address=${waddress}&update_authority=${waddress}`;
    let nftUrl = `${endPoint}nft/read_all?network=${network}&address=${waddress}`;
    let nftsFromMem = ReactSession.get("nfts");
    // console.log(nftsFromMem);
    if(nftsFromMem != null && uwallet === waddress )
    {
        //console.log("here");
        setNfts(nftsFromMem);
        setLoaded(true);
    }
    else
    {
        ReactSession.set("nfts", null);
        console.log('Fetching NFTs From Blockchain');
        axios({
            // Endpoint to send files
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
              setNfts(res.data.result);
              ReactSession.set("nfts", res.data.result);
              //setLoaded(true);
            })
      
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
            });  
    }
      
    }, [network]);
    
    
    useEffect(()=>{
        if(nfts!==null)
            setLoaded(true);
        else
            setLoaded(false);
    },[nfts]);
    
    return ( 
        <div>
            <div className="right-al-container">
                <div className="container-lg">
                        {/* {loaded && 

                        } */}
                        <div className="row">
                            <div className="col-9">
                                <h2 className="section-heading">{loaded && (`${nfts.length} NFT(s) Found`)}</h2>
                            </div>
                            <div className="col-3">
                            <div className="white-form-group">
                                <select
                                name="network"
                                className="form-control form-select"
                                id=""
                                onChange={
                                    (e) => {
                                        ReactSession.set("nfts", null);
                                        ReactSession.set("networkSel", e.target.value);
                                        setNetwork(e.target.value)
                                    }
                                }
                                value={network}
                                >
                                <option value="mainnet-beta">Mainnet</option>
                                <option value="devnet">Devnet</option>
                                <option value="testnet">Testnet</option>

                                {/* <option value="testnet">Testnet</option>
                                <option value="mainnet">Mainnet</option> */}
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 port-cust-padding">
                                <div className="cards-outer-port">
                                    <a href="" style={{textDecoration: "none"}}>
                                        <div className="inner-box">
                                            <div className="inner-box-img-container">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgOEqtH-wzp3LS_mInNtYSseUvJGg85fubvIAJQPaWAmflkObvFghL5V8YclM-zh2Fzc&usqp=CAU" alt="NftImage" />
                                            </div>
                                            <div className="d-flex justify-content-between px-1 py-2">
                                                <div>
                                                    <p className="port-para-2">Name</p>

                                                </div>
                                                <div>
                                                    <a href="/" className="no-decor" disabled>
                                                        <div className="btn-link-sm">
                                                            <div>Update</div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                
                            </div> */}
                            {loaded && 
                                nfts.map((nft) => (<div className="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 port-cust-padding" key={nft.mint}>
                                <div className="cards-outer-port">
                                    <a href={`/get-details?token_address=${nft.mint}&network=${network}`} style={{textDecoration: "none"}}>
                                        <div className="inner-box">
                                            <div className="inner-box-img-container">
                                                <img src={nft.image_uri} alt="NftImage" />
                                            </div>
                                            <div className="d-flex justify-content-between px-1 py-2">
                                                <div>
                                                    <p className="port-para-2">{nft.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                
                            </div>))}
                            
                        </div>
                </div>
            </div>
        </div> 
    );
}
 
export default ListAll;