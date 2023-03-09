import { useState } from "react";
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
  const [wallet, setWallet] = useState('');
  const [network, setNetwork] = useState('mainnet-beta')
  return (
    <div>
      <div className={styles.background_2}>
        <div className="container-lg">
          <div className={styles.central_area}>
            <div className={styles.main_title_container}>
              <div className="d-flex flex-wrap justify-content-center">
                <div>Solana &nbsp;</div>
                <div>
                  {/* <Typewriter
                    options={{
                      strings: ["Tokens","Transactions", 'Translator'],
                      autoStart: true,
                      loop: true,
                    }}
                  /> */}
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
              </div>
            </div>
            <motion.div className="row py-5" initial={{ opacity: 0, y:30 }} animate={{ opacity: 1, y:0 }} transition={{delay:5}}>
              <div className="col-12 col-md-8 p-2">
                <div className={styles.simple_input_container}>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <input type="text" placeholder="Explore Solana" value={wallet} onChange={(e) => setWallet(e.target.value)} />
                    </div>
                    <div style={{ marginTop: "-1px", color: "#fff" }}>
                      <img src={searchIcon} alt="Search Box" />
                    </div>
                  </div>

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
              <motion.div className={styles.button_container} initial={{ opacity: 0, y:30 }} animate={{ opacity: 1, y:0 }} transition={{delay:5.5}}>
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
