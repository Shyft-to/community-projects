import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Tooltip from 'react-tooltip-lite';

import icon from "../../resources/images/txnImages/nft_transfer_2.svg";
import arrow from "../../resources/images/txnImages/arrow.svg";
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";
import solExplorer from "../../resources/images/txnImages/solana_explorer.jpeg";
import copyIcon from "../../resources/images/txnImages/copy_icon.svg"

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getNFTData } from "../../utils/getAllData";
import { shortenAddress, getRelativetime, getFullTime, formatNames } from "../../utils/formatter";

import SubTransactions from "./SubTransaction";
import { Link } from "react-router-dom";



const TransactionStructureToken = ({ styles, id, data, address, cluster }) => {
    const [copied, setCopied] = useState("Copy");
    const copyValue = (value) => {
        navigator.clipboard.writeText(value);
        setCopied("Copied✅");
        setTimeout(() => {
            setCopied("Copy");
        }, 1000);
    }

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.each_txn_3}>
                <div className={styles.toggle_button}>
                    <div className="pe-3">
                        <Tooltip
                            content={copied}
                            className="myTarget"
                            direction="left"
                            // eventOn="onClick"
                            // eventOff="onMouseLeave"
                            useHover={true}
                            background="#101010"
                            color="#fefefe"
                            arrowSize={0}
                        >
                            <motion.button className={styles.copyTxnSig} onClick={() => copyValue(data.signatures[0])} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <img src={copyIcon} alt="Copy Value" />
                            </motion.button>
                        </Tooltip>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <motion.a href={(cluster === "mainnet-beta") ? `https://solscan.io/tx/${data.signatures[0]}` : `https://solscan.io/tx/${data.signatures[0]}?cluster=${cluster}`} target="_blank">
                            <div className={styles.sol_icon}>
                                <img src={solScan} alt="View on SolScan" />
                            </div>
                        </motion.a>
                    </motion.div>
                    {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <a href={`https://explorer.solana.com/tx/${data.signatures[0]}?cluster=${cluster}`} target="_blank">
                            <div className={styles.sol_icon_2}>
                                <img src={solExplorer} alt="View on SolExplorer" />
                            </div>
                        </a>
                    </motion.div> */}

                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={styles.fields_container}>
                            <div className="d-flex flex-wrap justify-content-start align-content-end">
                                <div className="">
                                    <div className={styles.txn_name}>
                                        {(data.type === "UNKNOWN") ? "Protocol Interaction" : (formatNames(data.type) || "Protocol Interaction")}
                                    </div>
                                </div>
                                <div className="">
                                    <div className={styles.txn_subname}>
                                        {(data.protocol.name != "") ? <div><Link to={`/address/${data.protocol.address}?cluster=mainnet-beta`}>{formatNames(data.protocol.name)}</Link></div> : (<Link to={`/address/${data.protocol.address}?cluster=mainnet-beta`}>{shortenAddress(data.protocol.address)}</Link>)}
                                    </div>
                                </div>
                                <div className="">
                                    <div className={styles.txn_subname} style={{ cursor: "pointer" }} aria-label={(data.timestamp != "") ? getFullTime(data.timestamp) : ""} data-balloon-pos="up">
                                        {(data.timestamp != "") ? getRelativetime(data.timestamp) : ""}
                                    </div>
                                </div>
                            </div>
                            {
                                (data.actions.length > 0) ?
                                    data.actions.map(action => <SubTransactions styles={styles} wallet={address} cluster={cluster} data={action} />)
                                    : "-"
                            }
                            {/* <SubTransactions styles={styles} wallet={address} cluster={cluster}/> */}

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default TransactionStructureToken;