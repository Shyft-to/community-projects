import { useState,useEffect } from "react";
import icon from "../../resources/images/txnImages/nft_transfer_2.svg";
import arrow from "../../resources/images/txnImages/arrow.svg";
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getNFTData } from "../../utils/getAllData";
import { shortenAddress,getRelativetime } from "../../utils/formatter";

import SubTransactions from "./SubTransaction";
import { Link } from "react-router-dom";


const TransactionStructureToken = ({ styles, id, data, address, cluster }) => {
    
    return ( 
    <div>
        <div className={styles.each_txn_3}>
            <div className={styles.toggle_button}>
                <a href="">
                    <div className={styles.sol_icon}>
                        <img src={solScan} alt="View on SolScan" />
                    </div>
                </a>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.fields_container}>
                        <div className="d-flex flex-wrap justify-content-start align-content-end">
                            <div className="">
                                <div className={styles.txn_name}>
                                    {data.type ?? "--"}
                                </div>
                            </div>
                            <div className="">
                                <div className={styles.txn_subname}>
                                  {(data.protocol.name != "")?<div><Link to={`/address/${data.protocol.address}?cluster=${cluster}`}>{data.protocol.name}</Link></div>:(data.protocol.address ?? "--")}
                                </div>
                            </div>
                            <div className="">
                                <div className={styles.txn_subname}>
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