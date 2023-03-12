import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useInView } from 'react-intersection-observer';


import styles from "../../resources/css/Transactions.module.css";
import { getAllTokens } from "../../utils/getAllData";
import TxnLoader from "../loaders/TxnLoader";
import EachTabToken from "./EachTabToken";
import TokenTransfer from "./TokenTransfer";
import TransactionStructureToken from "./TransactionsStructureToken";

const endpoint = process.env.REACT_APP_API_EP ?? "";
const xKey = process.env.REACT_APP_API_KEY ?? "";

const CompositeTxnComponent = ({ address, cluster }) => {

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errOcc, setErrOcc] = useState(false);
    const [txnOne, setTxnOne] = useState("");
    const [txnLast, setTxnLast] = useState("");
    const [txnLastInitial, setTxnLastInitial] = useState("");

    const [txns, setTxns] = useState([]);

    const [moreTxns, setMoreTxns] = useState(false);

    const { ref, inView } = useInView();

    useEffect(() => {
        // console.log("End of screen reach:",inView,txns.length)
        if (isLoading === false) {
            if (inView === true) {
                if (moreTxns === true && txns.length > 9) {
                    console.log("Getting more txns");
                    getPrevNext("next");
                }
            }
        }
    }, [inView])

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
                    if (txnReceived.length >= 10)
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
    }, [address, cluster]);

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
                    if (txnReceived.length >= 10)
                        setMoreTxns(true);
                    setTxns([...txns, ...txnReceived]);
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


    const [tokens, setTokens] = useState([]);
    const [isLoadingTokens, setLoadingTokens] = useState(false);
    // const [errorOcc,setErrorOcc] = useState(false);

    const getData = async (cluster, address) => {
        try {
            const res = await getAllTokens(cluster, address);
            if (res.success === true) {
                setTokens(res.details);
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            // setErrorOcc(true);
        }

    };

    useEffect(() => {
        setLoading(true);
        getData(cluster, address)

    }, [address, cluster]);

    const [panel, setPanel] = useState("TXN");


    return (<div>
        <div className={styles.tab_container}>
            <button className={(panel === "TXN") ? `${styles.top_tab} ${styles.top_tab_selected}` : `${styles.top_tab} `} onClick={(e) => setPanel("TXN")}>
                Activity
                {(panel === "TXN") ? <div className={styles.underline} /> : ""}
            </button>
            <button className={(panel === "TKN") ? `${styles.top_tab} ${styles.top_tab_selected}` : `${styles.top_tab} `} onClick={(e) => setPanel("TKN")}>
                Tokens
                {(panel === "TKN") ? <div className={styles.underline} /> : ""}
            </button>
        </div>
        <div className={styles.tabbed_section_container}>
            {
                (panel === "TXN") && <div className={styles.txn_section}>
                    <div className={styles.all_txn_container}>

                        {
                            (txns.length > 0) ?
                                (
                                    txns.map((each_txn) => <TransactionStructureToken styles={styles} id={each_txn.signatures[0]} data={each_txn} address={address} cluster={cluster} />)
                                ) : ""

                        }
                        {
                            (errOcc) && <div className={styles.could_not_text}>
                                Could Not Load Transactions
                            </div>
                        }
                        <div ref={ref} className="ten-height-2">

                        </div>
                        <div className="pt-2 text-center ten-height">
                            {isLoading && <TxnLoader />}
                            {(isLoading === false && moreTxns === false && errOcc === false) ? <div className={styles.could_not_text}>No more transactions to load</div> : ""}
                            {/* <button className="btn btn-light" onClick={() => getPrevNext("next")}>Load More</button> */}
                        </div>
                    </div>
                </div>
            }
            {
                (panel === "TKN") && <div className="text-center could_not_text pt-5">
                    <div className={styles.tabbed_token_section}>
                        {
                            (!isLoading && tokens.length > 0) &&
                            (
                                tokens.map((token) => (<EachTabToken styles={styles} token={token} cluster={cluster} />))
                            )
                        }
                        {

                            (isLoading) && <div className="pt-2"><TxnLoader /></div>
                        }
                        {
                            (!isLoading && tokens.length === 0) &&
                            (
                                <div className={styles.could_not_text}>No Tokens Found</div>
                            )
                        }

                        {/* <EachTabToken styles={styles} /> */}

                    </div>
                </div>
            }
        </div>
    </div>);
}

export default CompositeTxnComponent;