import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';

import styles from "./resources/css/Home.module.css";

// import spottedPlanetTop from "./resources/images/spotted-planet-top.png";
// import bluePlanet from "./resources/images/blue_planet.png";
// import redPlanet from "./resources/images/red-planet.png";
// import spottedPlanetBottom from "./resources/images/spotted-planet-bottom.png";
// import rocket from "./resources/images/rocket.png";
import searchIcon from "./resources/images/uil_search.svg";

const Home = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState('');
  const [network, setNetwork] = useState('mainnet-beta')

  const [isFocused, setFocused] = useState(false);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    try {
      const searchHistory = JSON.parse(localStorage.getItem("shshis") || "[]");

      if (Array.isArray(searchHistory) && searchHistory.length > 0) {
        setSearchData(searchHistory);
      }
    } catch (error) {
      setSearchData([]);
    }


  }, [])

  const BlurAfterTime = () => {
    setTimeout(() => {
      setFocused(false)
    }, 200);
  }


  const addDataNavigate = (wallet, network) => {
    console.log("clicked");
    try {
      if (wallet !== "") {
        const newAddress = {
          address: wallet,
          network: network
        }
        var newResults = [];
        if (searchData.length > 4)
          newResults = [...searchData.slice(1), newAddress];
        else
          newResults = [...searchData, newAddress];

        setSearchData(newResults);
        localStorage.setItem('shshis', JSON.stringify(newResults));
        navigate(`/address/${wallet}?cluster=${network}`);

      }
    } catch (error) {
      navigate(`/address/${wallet}?cluster=${network}`);
    }

  }
  return (
    <div>
      <div className={styles.background_2}>
        <div className="container-lg">
          <div className={styles.central_area}>
            <div className={styles.main_title_container}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Solana Translator</motion.div>

              {/* <div className="d-flex flex-wrap justify-content-center">
                <motion.div initial={{ opacity: 0, y:30 }} animate={{ opacity: 1, y:0 }} transition={{delay:0.4}}>Solana Translator</motion.div>
                <div>
                  
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString('Tokens')
                        // .pauseFor(500)
                        .deleteAll(15)
                        .typeString('Transactions')
                        // .pauseFor(500)
                        .deleteAll(15)
                        .typeString('Translator')
                        .pauseFor(500)
                        .start();
                    }}
                  />
                </div>
              </div> */}

            </div>
            <motion.div className="row py-5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <div className="col-12 col-md-8 p-2">
                <div className={styles.simple_input_container}>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <input type="text" placeholder="Explore Solana" value={wallet} onChange={(e) => setWallet(e.target.value)} onFocus={() => setFocused(true)} onBlur={BlurAfterTime} />
                    </div>
                    <div style={{ marginTop: "-1px", color: "#fff" }}>
                      <img src={searchIcon} alt="Search Box" />
                    </div>
                  </div>
                  {isFocused && <div className={styles.search_area}>
                    {searchData.map((result) => (<motion.button className={styles.each_item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div className="d-flex">
                        <div className={`flex-grow-1 ${styles.address_area}`}>
                          {result.address}
                        </div>
                        <div className={styles.network_area}>
                        {(result.network === "mainnet-beta")?<span className="text-light">mainnet</span>:(result.network === "testnet")?<span className="text-warning">testnet</span>:<span className="text-info">devnet</span>}
                        </div>
                      </div>
                    </motion.button>))}
                    
                  </div>}
                </div>
              </div>
              <div className="col-12 col-md-4 p-2">
                <div className={styles.simple_select_container}>
                  <select value={network} onChange={(e) => setNetwork(e.target.value)}>
                    <option value="mainnet-beta">Mainnet</option>
                    <option value="devnet">Devnet</option>
                    <option value="testnet">Testnet</option>
                  </select>
                </div>
              </div>
            </motion.div>
            <div className="text-center">
              <motion.div className={styles.button_container} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                <Link to={`/address/${wallet}?cluster=${network}`} className={styles.btn_solid_grad}>
                  Translate
                </Link>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
