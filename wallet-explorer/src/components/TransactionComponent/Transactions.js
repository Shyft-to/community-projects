import styles from "../resources/css/Transactions.module.css";
import TokenTransfer from "./TokenTransfer";

const Transactions = () => {
    return ( 
        <div>
            <div className={styles.txn_section}>
                <h3 className={styles.main_heading}>
                    Transactions
                </h3>
                <div className={styles.token_section}>
                    <TokenTransfer styles={styles} id="trans1"/>
                    <TokenTransfer styles={styles} id="trans2"/>
                    <TokenTransfer styles={styles} id="trans3"/>

                </div>
            </div>
        </div> 
    );
}
 
export default Transactions;