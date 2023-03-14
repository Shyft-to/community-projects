import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { useInView } from 'react-intersection-observer'; 


import styles from "../../resources/css/Transactions.module.css";
import TxnLoader from "../loaders/TxnLoader";
// import TokenTransfer from "./TokenTransfer";
import TransactionStructureToken from "./TransactionsStructureToken";

const endpoint = process.env.REACT_APP_API_EP ?? "";
const xKey = process.env.REACT_APP_API_KEY ?? "";

const Transactions = ({ address, cluster }) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const [errOcc,setErrOcc] = useState(false);
  const [txnOne, setTxnOne] = useState("");
  const [txnLast, setTxnLast] = useState("");
  const [txnLastInitial, setTxnLastInitial] = useState("");

  const [txns, setTxns] = useState([]);

  const [moreTxns,setMoreTxns] = useState(false);

  const {ref,inView} = useInView();

  // const loadMoreArea = useRef(null);
  // const isInViewLoadMore = useInView(loadMoreArea,{ margin: "20%" });
  useEffect(() => {
    // console.log("End of screen reach:",inView,txns.length)
    if(isLoading === false)
    {
      if(inView === true)
      {
        if(moreTxns === true && txns.length>9)
        {
          console.log("Getting more txns");
          getPrevNext("next");
        }
      }
    }
  },[inView])
  

  useEffect(() => {
    setLoading(true);
    setTxns([]);
    var params = {
      network: cluster,
      account: address,
    };
    //   if(txnLast !== '')
    //   {
    //     params = {
    //         ...params,
    //         before_tx_signature:txnLast
    //     }
    //   }
    axios({
      url: `${endpoint}transaction/history`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: params,
    })
      .then((res) => {
        if (res.data.success === true && res.data.result.length > 0) {
          const txnReceived = res.data.result;
          if(txnReceived.length>=10)
            setMoreTxns(true);
          if (txnLastInitial === "")
            setTxnLastInitial(
              txnReceived[txnReceived.length - 1].signatures[0]
            );

          setTxnLast(txnReceived[txnReceived.length - 1].signatures[0]);
          setTxnOne(txnReceived[0].signatures[0]);
          setTxns(txnReceived);
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrOcc(true);
        console.warn(err);
        setLoading(false);
      });
  }, [address,cluster]);

  const getPrevNext = (value) => {
    setLoading(true);
    var params = {
      network: cluster,
      account: address,
      // tx_num: 5
    };
    if (value === "prev") {
      params = {
        ...params,
        before_tx_signature: txnOne,
      };
    } else {
      params = {
        ...params,
        before_tx_signature: txnLast,
      };
    }
    axios({
      url: `${endpoint}transaction/history`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      params: params,
    })
      .then((res) => {
        
        if (res.data.success === true && res.data.result.length > 0) {
          const txnReceived = res.data.result;
          if(txnReceived.length>=10)
            setMoreTxns(true);
          setTxns([...txns,...txnReceived]);
          setTxnLast(txnReceived[txnReceived.length - 1].signatures[0]);
          setTxnOne(txnReceived[0].signatures[0]); 
        }
        setLoaded(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setErrOcc(true);
        console.warn(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles.txn_section}>
      
        <h3 className={styles.main_heading}></h3>

        {/* <div className={styles.all_txn_container}>
          <TransactionStructure styles={styles} />
        </div> */}
        
        <div className={styles.all_txn_container}>
         {/* {
            (txns.length>0)?
                (
                    txns.map((each_txn) => <TokenTransfer styles={styles} id={each_txn.signatures[0]} data={each_txn} address={address} cluster={cluster} />)
                ):""
            
         } */}
         {
            (txns.length>0)?
                (
                    txns.map((each_txn) => <TransactionStructureToken styles={styles} id={each_txn.signatures[0]} data={each_txn} address={address} cluster={cluster}/>)
                ):""
            
         }
         {
          (errOcc) && <div className={styles.could_not_text}>
            Could Not Load Transactions
          </div>
         }
         <div ref={ref} className="ten-height-2">
              
         </div>
          <div  className="pt-2 text-center ten-height">
            {isLoading && <TxnLoader />}
            {(isLoading === false && moreTxns === false && errOcc === false)?<div className={styles.could_not_text}>Genesis Transaction Reached</div>:""}
            {/* <button className="btn btn-light" onClick={() => getPrevNext("next")}>Load More</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
