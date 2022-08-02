import { useState, useEffect } from "react";
const GetDetails = () => {
    const xKey = process.env.REACT_APP_API_KEY.toString();
    const endPoint = process.env.REACT_APP_URL_EP;
    let Params = window.location.search.substring(1);
    //console.log("Params",Params);
    let getParams = Params.split("&");
    //console.log(getParams);
    let networkParams = getParams[1].split("=");
    console.log("network: ",networkParams[1]);
    // const [apiResponse, setApiResponse] = useState();
    const [name, setName] = useState("Loading");
    const [desc, setDesc] = useState("");
    const [sym, setSym] = useState("");
    const [imgs, setImgs] = useState(
        "https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
    );
    const [mintAddr, setMintAddr] = useState("");
    const [ownAddr, setOwnAddr] = useState("");
    const [roy, setRoy] = useState();
    const [attrib, setAttrib] = useState("");
    // const [tokenParams, setTokenparams] = useState(
    //     window.location.search.substring(1)
    // );

    let nftUrl =
    `${endPoint}nft/read?` + window.location.search.substring(1);
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
        // setApiResponse(JSON.stringify(data.result));
        setName(data.result.name);
        setDesc(data.result.description);
        setImgs(data.result.image_uri);
        setSym(data.result.symbol);
        setSym(data.result.symbol);
        setOwnAddr(data.result.owner);
        setMintAddr(data.result.mint);
        setRoy(data.result.royalty);
        setAttrib(data.result.attributes);
        //console.log(data.result);
      })
      .catch((errs) => {
        console.log(errs.message);
        // setErrorOcc(true);
      });
  }, [nftUrl]);
  useEffect(() => {
    document.title = name;
 }, [name]);

    return (
        
        <div>
            <div className="fixed-price-page generic-ball-background right-al-container">
                <div className="container-xl">
                    <div className="row title-container" style={{marginTop: "5px"}}>
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
                                    <img className="image-nft" src={imgs} alt="NFT" />
                                </div>
                                <div className="img-subtext text-center">
                                    <a href={imgs} target="_blank" className="no-decor" rel="noreferrer">
                                        <h6>View Original</h6>
                                    </a>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="text-section px-3">
                                <h6 className="p-para-headings">{networkParams[1]}</h6>
                                
                                <h6 className="p-para-headings">Description</h6>
                                <p className="p-para-light">
                                    {desc}
                                </p>

                                <h6 className="p-para-headings">Symbol</h6>
                                <p className="p-para-light">
                                    {sym}
                                </p>
                                
                                <h6 className="p-para-headings">Details</h6>
                                <div className="details-table">
                                    <div className="row">
                                        <div className="col-8">Royalty</div>
                                        <div className="col-4 text-end">{roy}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Mint Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/${mintAddr}?cluster=${networkParams[1]}`} target="_blank" className="no-decor" rel="noreferrer">{mintAddr}</a></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Owner Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/${ownAddr}?cluster=${networkParams[1]}`} target="_blank" className="no-decor" rel="noreferrer">{ownAddr}</a></div>
                                    </div>
                                </div>

                                <h6 className="p-para-headings">Attributes</h6>
                                <div id="attr" className="details-table">
                                      
                                </div>
                                {
                                    Object.entries(attrib).forEach(([key, value]) => {
                                    document.getElementById("attr").innerHTML +=  (`<div class="row">
                                        <div class="col-8" style="word-wrap: break-word;">${key}</div>
                                        <div class="col-4 text-end" style="word-wrap: break-word;">${value}</div>
                                    </div>`)
                                    })
                                }
                            </div>

                        </div>
                    </div>
                    
                    

                </div>

            </div>
        </div>);
}

export default GetDetails;