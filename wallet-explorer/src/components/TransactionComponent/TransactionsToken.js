import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../resources/css/Transactions.module.css";
import TokenTransfer from "./TokenTransfer";
import TransactionStructureToken from "./TransactionsStructureToken";

const endpoint = process.env.REACT_APP_API_EP ?? "";
const xKey = process.env.REACT_APP_API_KEY ?? "";

const TransactionsToken = ({ address, cluster }) => {
  const [loaded, setLoaded] = useState(false);
  const [errOcc,setErrOcc] = useState(false);
  const [txnOne, setTxnOne] = useState("");
  const [txnLast, setTxnLast] = useState("");
  const [txnLastInitial, setTxnLastInitial] = useState("");

  const [txns, setTxns] = useState([]);

  useEffect(() => {
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
          if (txnLastInitial === "")
            setTxnLastInitial(
              txnReceived[txnReceived.length - 1].signatures[0]
            );

          setTxnLast(txnReceived[txnReceived.length - 1].signatures[0]);
          setTxnOne(txnReceived[0].signatures[0]);
          setTxns(txnReceived);
        }
      })
      .catch((err) => {
        setErrOcc(true);
        console.warn(err);
      });
  }, []);

  const getPrevNext = (value) => {
    var params = {
      network: cluster,
      account: address,
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
          setTxns(txnReceived);
          setTxnLast(txnReceived[txnReceived.length - 1].signatures[0]);
          setTxnOne(txnReceived[0].signatures[0]); 
        }
        setLoaded(true);
      })
      .catch((err) => {
        setErrOcc(true);
        console.warn(err);
      });
  };

  return (
    <div>
      <div className={styles.txn_section}>
      
        <h3 className={styles.main_heading}>Transactions</h3>

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
                    txns.map((each_txn) => <TransactionStructureToken styles={styles} id={each_txn.signatures[0]} data={each_txn} address={address} cluster={cluster} />)
                ):""
            
         }
         {
          (errOcc) && <div className="text-light text-center lead">
            Could Not Load Transactions
          </div>
         }
          
        </div>
      </div>
    </div>
  );
};

export default TransactionsToken;
