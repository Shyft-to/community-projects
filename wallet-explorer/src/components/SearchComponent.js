import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

import styles from "../resources/css/SearchComponent.module.css";

const SearchComponent = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");
  const [network, setNetwork] = useState("mainnet-beta");
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


  const addDataNavigate = (wallet,network) => {
    console.log("clicked");
    try {
      if(wallet !== "")
      {
        const newAddress = {
          address: wallet,
          network: network
        }
        var newResults = [];
        if(searchData.length>4)
          newResults = [...searchData.slice(1),newAddress];
        else
          newResults = [...searchData,newAddress];
        
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
      <motion.div className={styles.form_container} initial={{ opacity: 0, y: -100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className={styles.search_n_suggestions} >
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
                        onFocus={() => setFocused(true)} 
                        onBlur={BlurAfterTime}
                      />
                    </div>
                    <div>
                      {/* <Link to={`/address/${wallet}?cluster=${network}`} className={styles.search_icon}>
                                <FaSearch />
                            </Link> */}
                      <button onClick={() => addDataNavigate(wallet,network)} style={{ backgroundColor: "transparent", border: "none", outline: "none" }} className={styles.search_icon}>
                        <FaSearch />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
          
          {isFocused && <div className={styles.suggestions_area_outer}>
          
            {<motion.div className={styles.suggestions_area} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              {(searchData.length > 0) && (searchData.map((result) => (<button className={styles.each_search} onClick={() => addDataNavigate(result.address,result.network)}>
                <div className="d-flex">
                  <div className={styles.network_area}>
                    {(result.network === "mainnet-beta")?<span className="text-light">mainnet</span>:(result.network === "testnet")?<span className="text-warning">testnet</span>:<span className="text-info">devnet</span>}
                  </div>
                  <div className={`flex-grow-1 ${styles.address_area}`}>
                    {result.address}
                  </div>
                </div>
              </button>)
             ))}
             </motion.div>  
            }

          </div>}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchComponent;