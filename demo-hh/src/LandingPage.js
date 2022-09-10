import { useContext, useEffect,useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { WalletContext } from "./context/WalletContext";
import spaceBoyFlag from "./resources/images/space-boy-2.png";
import PlanetLoader from "./loaders/PlanetLoader";
import CoinsLoader from "./loaders/CoinsLoader";
import { MoneyContext } from "./context/MoneyContext";

const LandingPage = () => {
  const { walletId,setWalletId } = useContext(WalletContext);
  const { money,setMoney } = useContext(MoneyContext);
  const navigate = useNavigate();

 

  const [name,setName] = useState('');
  const [desc,setDesc] = useState('');
  const [pubs,setPubs] = useState('');
  const [bites,setBites] = useState('');
  const [stays,setStay] = useState('');

  const [loading,setLoading] = useState(true);

  const [coinsAwarded,setCoinsAwarded] = useState(false);


  let nft_key = 0;
  useEffect(() => {
      
      nft_key = ReactSession.get("nft_key") ?? 0;
      // if(nft_key === 0)
      //     navigate('/');
  }, [])
  useEffect(() => {
        
    if(walletId === null)
    {
        const get_wall = ReactSession.get("user_wallet_addr");
        setWalletId(get_wall);

    }
        
}, []);
  
  
  useEffect(() => {
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      let nftUrl = `${endPoint}nft/read?network=devnet&token_address=${nft_key}&refresh=refresh`;

      if(nft_key !== 0)
      {
        setLoading(true);
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
          setLoading(false);
          })
          // Catch errors if any
          .catch((err) => {
              console.warn(err);
              setName('Nowhere. Spaceship Broke.');
              setLoading(false);
          });
      
      }

      
    
  }, [nft_key]);

  useEffect(() => {
    const from_mark = ReactSession.get("from_pass") ?? false;
    if(name !== '' && from_mark === true)
    {
      const xKey = process.env.REACT_APP_API_KEY;
      const endPoint = process.env.REACT_APP_URL_EP;
      const privateKey = process.env.REACT_APP_TOKEN_PKEY;
      const TokenAddr = process.env.REACT_APP_TOKEN_ADDRESS;
      let amount = 0;

      if(name === 'Valetudo')
        amount = 15;
      else if(name === 'Ganymede')
        amount = 10;
      else
        amount = 5;

      let coinUrl = `${endPoint}token/mint`;
      axios({
        // Endpoint to get NFTs
        url: coinUrl,
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
        },
        data:{
          network: "devnet",
          private_key: privateKey,
          "token_address": TokenAddr,
          "receiver":walletId,
          "amount": amount
        }
        })
        // Handle the response from backend here
        .then((res) => {
          console.log(res.data.success);
          if(res.data.success === true)
          {
            setCoinsAwarded(true);
            setMoney(!money);
          }
          
      
        })
        // Catch errors if any
        .catch((err) => {
            console.warn(err);
        });
    }
    
      
    
  }, [name])
  

  return (
    <div className="landing-page">
      <div className="content">
        {loading && <PlanetLoader message="Sit Tight! We are travelling at the speed of light..."/>}
        {coinsAwarded && <CoinsLoader message="Hello space traveller!! Welcome to" message2="have been airdropped to your wallet." message3="Happy Exploring." name={name} closer={setCoinsAwarded}/>}
        <div className={(name==='Ganymede')?"planet-bg-gan":(name==='Isonoe')?"planet-bg-iso":"planet-bg-val"}>
          <div className="container-lg">
            <div className="row">
              <div className="col-md-12 col-lg-10">
                <h2 className="main-heading">Successfully landed on {name}</h2>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-md-12 col-lg-7">
                <p className="p-para">
                  Congratulations! You are now officially a citizen of {name}.
                  You landed on {name} by holding the {name} NFT in your
                  wallet. Feel free to explore and know this planet, also you can try and visit our marketplace.
                </p>
                <h4 className="blue-headings mt-5 mb-3">Planet Story</h4>
                <p className="p-para">
                  {/* Valetudo is a planet in the SHYFT solar system. It was
                  discovered by a team of shyfters working hard providing
                  services. There are a lot of planets such as Minter, Tokenizer,
                  Walloter, Destroyer, Metamine which revolve around the central
                  star, which is known as SHYFT solar. Valetudo is an important
                  part of the SHYFT solar system. */}
                  {desc}
                </p>
                <div className="button-section">
                  <div className="pe-3">
                    <Link to="/mint" className="btn-solid-grad-outline">
                      <div>Fly Home</div>
                    </Link>
                  </div>
                  <div className="pe-3">
                    <Link to="/marketplace" className="btn-solid-grad">
                      Explore {name}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-5">
                <div className="img-container">
                  {/* <img src={spaceBoyFlag} alt="" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
