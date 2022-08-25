import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

import isonoe from "./resources/images/planets/i.png";
import gane from "./resources/images/planets/g.png";
import vito from "./resources/images/planets/v.png";
import no from "./resources/images/planets/no.png";

const LandingPages = () => {
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [pubs,setPubs] = useState('');
    const [bites,setBites] = useState('');
    const [stays,setStay] = useState('');

    let nft_key = 0;
    useEffect(() => {
        const auth_checker = ReactSession.get("auth") ?? false;
        nft_key = ReactSession.get("nft_key") ?? 0;
        if(auth_checker === false || nft_key === 0)
            navigate('/');
    }, [])
    
    
    useEffect(() => {
        const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        let nftUrl = `${endPoint}nft/read?network=devnet&token_address=${nft_key}&refresh=refresh`;

        if(nft_key !== 0)
        {
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
            if(res.data.success === true)
            {
                 setName(res.data.result.name);
                 setDesc(res.data.result.description);
                 setBites(res.data.result.attributes.gravity);
                 setPubs(res.data.result.attributes.size);
                 setStay(res.data.result.attributes.rotate);
    
            }
            else
            {
                setName('Nowhere. Spaceship Broke.');
            }
            
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
                setName('Nowhere. Spaceship Broke.');
            });
        
        }

        
      
    }, [nft_key])
    
  return (
    <div className="landing-page-2">
      <div className="content">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h2 className="main-heading text-start">
                Successfully landed on {name}
              </h2>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-5">
          <div className="row">
            <div className="col-md-12 col-lg-2"></div>
            <div className="col-md-12 col-lg-3 pt-3">
              <p className="p-para-xtra text-light pb-2">
                Congratulations! You are now officially a citizen of {name}.
                You landed on {name} by holding the <b>{name} NFT</b> in your
                wallet. Feel free to <b className="text-warning">hover over the star marks</b> to find out the
                various features of this planet.
              </p>
              <p className="p-para pt-4">
                <span className="xtra-font text-info">Planet Story:</span><br /><br />{desc}
              </p>
              <Link to='/' className="btn-solid-grad-wide no-decor my-5">Fly Home</Link>
            </div>
            <div className="col-md-12 col-lg-7">
              <div className="planet-outer">
                <div
                  
                  className="planet-container mx-auto"
                  style={(name === 'Isonoe')?{ backgroundImage: `url(${isonoe})` }:((name === 'Ganymede')?{ backgroundImage: `url(${gane})` }:(name === 'Valetudo')?{ backgroundImage: `url(${vito})` }:{ backgroundImage: `url(${no})` })}
                ></div>
                {/* <div id="facts" className="facts text-light text-center pt-4">
                  <div className="d-flex justify-content-center">
                    <div className="border border-2 border-info px-3 py-1 m-1 text-start p-para">
                      <small>PUBS</small>
                      <br />
                      <span>{pubs}</span>
                    </div>
                    <div className="border border-2 border-warning px-3 py-1 m-1 text-start p-para">
                      <small>BITES</small>
                      <br />
                      <span>{bites}</span>
                    </div>
                    <div className="border border-2 border-light px-3 py-1 m-1 text-start p-para">
                      <small>STAYS</small>
                      <br />
                      <span>{stays}</span>
                    </div>
                  </div>
                </div> */}
                <div className="planet-info">
                    <div className="stays-icon">
                      <i className="fas fa-star"></i>
                      <div className="planet-information-box pi-box-1 border border-2 border-light text-start p-para">
                        <small>STAYS</small>
                        <br />
                        <span>{stays}</span>
                      </div>
                    </div>
                    <div className="bites-icon">
                      <i className="fas fa-star"></i>
                      <div className="planet-information-box pi-box-2 border border-2 border-warning text-start p-para">
                        <small>BITES</small>
                        <br />
                        <span>{bites}</span>
                      </div>
                    </div>
                    <div className="pubs-icon">
                      <i className="fas fa-star"></i>
                      <div className="planet-information-box pi-box-3 border border-2 border-info text-start p-para">
                        <small>PUBS</small>
                        <br />
                        <span>{pubs}</span>
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

export default LandingPages;
