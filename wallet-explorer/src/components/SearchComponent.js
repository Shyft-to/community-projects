import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {motion} from "framer-motion";

import styles from "../resources/css/SearchComponent.module.css";

const SearchComponent = () => {
  const [wallet, setWallet] = useState("");
  const [network, setNetwork] = useState("mainnet-beta");
  return (
    <div>
      <motion.div className={styles.form_container} initial={{ opacity: 0,y:-100 }} whileInView={{ opacity: 1,y:0 }} viewport={{ once: true }}>
        <div className={styles.form_field_outer}>
          <div className={styles.form_field_inner}>
            <div className="d-flex justify-content-start">
              
              <select
              className="me-4"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                <option value="mainnet-beta">Mainnet</option>
                <option value="devnet">Devnet</option>
                <option value="testnet">Testnet</option>
              </select>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                    <div className="flex-grow-1">
                        <input
                            
                            type="text"
                            placeholder="Explore Solana"
                            value={wallet}
                            onChange={(e) => setWallet(e.target.value)}
                        />
                    </div>
                    <div>
                        <Link to={`/address/${wallet}?cluster=${network}`} className={styles.search_icon}>
                            <FaSearch />
                        </Link>
                    </div>
                    
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchComponent;
