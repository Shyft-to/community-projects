import { useState,useEffect } from "react";
import 'balloon-css';

import icon from "../../resources/images/txnImages/nft_transfer_2.svg";
import arrow from "../../resources/images/txnImages/arrow.svg";
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";
import solExplorer from "../../resources/images/txnImages/solana_explorer.jpeg";
import copyIcon from "../../resources/images/txnImages/copy_icon.svg"

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getNFTData } from "../../utils/getAllData";
import { shortenAddress,getRelativetime, getFullTime } from "../../utils/formatter";

import SubTransactions from "./SubTransaction";
import { Link } from "react-router-dom";


const TransactionStructureToken = ({ styles, id, data, address, cluster }) => {
    
    const copyValue = (value) => {
        navigator.clipboard.writeText(value);
    }

    return ( 
    <div>
        <div className={styles.each_txn_3}>
            <div className={styles.toggle_button}>
                <div className="pe-3">
                    <button className={styles.copyTxnSig} onClick={() => copyValue(data.signatures[0])} aria-label="Copy Signature" data-balloon-pos="up">
                        <img src={copyIcon} alt="Copy Value" />
                    </button>
                </div>
                <div className="pe-2">
                    <a href={(cluster === "mainnet-beta")?`https://solscan.io/tx/${data.signatures[0]}`:`https://solscan.io/tx/${data.signatures[0]}?cluster=${cluster}`} target="_blank" aria-label="View on Solscan" data-balloon-pos="up">
                        <div className={styles.sol_icon}>
                            <img src={solScan} alt="View on SolScan" />
                        </div>
                    </a>
                </div>
                <div>
                    <a href={`https://explorer.solana.com/tx/${data.signatures[0]}?cluster=${cluster}`} target="_blank" aria-label="View on Explorer" data-balloon-pos="up">
                        <div className={styles.sol_icon_2}>
                            <img src={solExplorer} alt="View on SolExplorer" />
                        </div>
                    </a>
                </div>
                
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.fields_container}>
                        <div className="d-flex flex-wrap justify-content-start align-content-end">
                            <div className="">
                                <div className={styles.txn_name}>
                                    {(data.type === "UNKNOWN")?"Interacted with":(data.type ?? "--")}
                                </div>
                            </div>
                            <div className="">
                                <div className={styles.txn_subname}>
                                  {(data.protocol.name != "")?<div><Link to={`/address/${data.protocol.address}?cluster=mainnet-beta`}>{data.protocol.name}</Link></div>:(data.protocol.address ?? "--")}
                                </div>
                            </div>
                            <div className="">
                                <div className={styles.txn_subname} aria-label={(data.timestamp != "")?getFullTime(data.timestamp):""} data-balloon-pos="up">
                                    {(data.timestamp != "")?getRelativetime(data.timestamp):""}
                                </div>
                            </div>
                          </div>
                          {
                            (data.actions.length>0)?
                              data.actions.map(action => <SubTransactions styles={styles} wallet={address} cluster={cluster} data={action}/>)
                            :"-"
                          }
                          {/* <SubTransactions styles={styles} wallet={address} cluster={cluster}/> */}
                          
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default TransactionStructureToken;