import { useState,useEffect } from "react";
import {useSearchParams,useParams} from "react-router-dom";
import { categorizeAddress } from "./utils/getAllData";

import styles from "./resources/css/WalletAddress.module.css";

import AllNfts from "./components/AllNfts";
import AllTokens from "./components/AllTokens";
import HeaderComponent from "./components/HeaderComponent";
import Transactions from "./components/TransactionComponent/Transactions";


const AddressComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { addr } = useParams();
    const cluster = searchParams.get("cluster");
    const [isLoading,setLoading] = useState(true);
    const [data,setData] = useState(null);
    const [type,setType] = useState('');
    const [errOccured,setErrOccured] = useState(false);

    useEffect(() => {
        getClassifiedData();
    }, []);

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
      if(data !== null && type!== '' && errOccured === false)
      {
        setLoading(false);
      }
    }, [data,type])
    
    
    return ( 
        <div>
        <HeaderComponent />
        <div className={styles.background}>
            <div className="container pt-4">
                <div className={styles.heading_section}>
                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className={styles.main_heading}>
                                <span>Space Overview</span> (Easdfe2asd13as123123131asc3131)
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 text-end">
                            <div className={styles.wallet_balance_indicator}>
                                0.21717296 SOL
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <AllTokens />
                </div>
                <div className="pt-5">
                    <AllNfts />
                </div>
                {/* <div className="pt-5">
                    <Transactions address={addr} cluster={cluster} />
                </div> */}
            </div>
        </div>
        </div> 
    );
}
 
export default AddressComponent;