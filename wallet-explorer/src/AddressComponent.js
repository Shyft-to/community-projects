import { useState,useEffect } from "react";
import {useSearchParams,useParams,useNavigate} from "react-router-dom";
import { categorizeAddress } from "./utils/getAllData";

import styles from "./resources/css/WalletAddress.module.css";

import AllNfts from "./components/AllNfts";
import AllTokens from "./components/AllTokens";
import HeaderComponent from "./components/HeaderComponent";
import Transactions from "./components/TransactionComponent/Transactions";
import NftExpanded from "./components/NftExpanded";
import PlanetLoader from "./components/loaders/loaders";

const AddressComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { addr } = useParams();
    const cluster = searchParams.get("cluster");
    const navigate = useNavigate();

    
    const [isLoading,setLoading] = useState(true);
    const [data,setData] = useState(null);
    const [contentType,setType] = useState('');
    const [errOccured,setErrOccured] = useState(false);

    useEffect(() => {
        setLoading(true);
        getClassifiedData();
    }, [cluster]);

    const getClassifiedData = async() => {
      
        try{
            const res = await categorizeAddress(cluster,addr);
            console.log(res);
            if(res.success === true)
            {
                setData(res.details);
                setType(res.type);
            }
            else
            {
                setErrOccured(true);
                setLoading(false);
            }
        }
        catch(err)
        {
            setErrOccured(true);
            setLoading(false);
        }
        
    }
    
    useEffect(() => {
      if(data !== null && contentType!== '' && errOccured === false)
      {
        setLoading(false);
      }
    }, [data,contentType])
    
    const changeCluster = (networkCluster) => {
        if(networkCluster !== cluster)
            navigate(`/address/${addr}?cluster=${networkCluster}`)
    }
    
    return ( 
        <div>
        <HeaderComponent />
        <div className={styles.background_super}>
            {isLoading && <PlanetLoader />}
            {!isLoading && <div>
                {(contentType === "WALLET") && <div className="container pt-4">
                    <div className={styles.heading_section}>
                        <div className="row">
                            <div className="col-12 col-lg-7">
                                <div className={styles.main_heading}>
                                    <span>Space Overview</span> ({addr})
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 text-end">
                                <div className={styles.wallet_balance_indicator}>
                                    {data.balance} SOL
                                </div>
                            </div>
                            <div className="col-12 col-lg-1 text-end">
                                <div className="select_container" value={cluster} onChange={(e) => changeCluster(e.target.value)}>
                                    <select>
                                        <option value="mainnet-beta">Mainnet</option>
                                        <option value="devnet">Devnet</option>
                                        <option value="testnet">Testnet</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <AllTokens tokens={data.tokens} address={addr} network={cluster} />
                    </div>
                    <div className="pt-5">
                        <AllNfts collections={data.collections} address={addr} network={cluster}/>
                    </div>
                    
                </div>}
                {
                    (contentType === "NFT") && 
                    <div className="container pt-4">
                        <NftExpanded nft={data}/>
                    </div>
                }
                <div className="container pt-4">
                    <div className="pt-5">
                        <Transactions address={addr} cluster={cluster} />
                    </div>
                </div>
            </div>}
            
        </div>
        </div> 
    );
}
 
export default AddressComponent;