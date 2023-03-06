import icon from "../../resources/images/txnImages/nft_transfer_2.svg";
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";
const TransactionStructure = ({ styles, id, data, address, cluster }) => {
    return ( 
    <div>
        <div className={styles.each_txn_2}>
            <div className={styles.toggle_button}>
                <a href="">
                    <div className={styles.sol_icon}>
                        <img src={solScan} alt="View on SolScan" />
                    </div>
                </a>
                
            </div>
            <div className="row">
                <div className="col-12 col-lg-1">
                    <div className={styles.type_image_container}>
                        <img src={icon} alt="Icon" />
                    </div>
                </div>
                <div className="col-12 col-lg-11">
                    <div className={styles.fields_container}>
                        <div className="row">
                            <div className="col-6 col-lg-12">
                                <div className={styles.txn_name}>
                                    NFT Transfer
                                </div>
                            </div>
                            <div className="col-6 col-lg-12">
                                <div className={styles.dynamic_field}>
                                    3teBNmcLtXj5hy08ibiHWi1...vN4AP
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-lg-4">
                                <div className={styles.dynamic_field_2}>
                                    CANDY_GUARD
                                </div>
                            </div>
                            <div className="col-6 col-lg-2">
                                <div className={`text-center ${styles.field_1}`}>
                                    +1
                                </div>
                            </div>
                            <div className="col-6 col-lg-2">
                                <div className={`text-center ${styles.field_1}`}>
                                    0.001
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className={`text-end ${styles.field_1}`}>
                                    15 mins ago
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default TransactionStructure;