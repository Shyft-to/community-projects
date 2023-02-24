import AllNfts from "@/components/AllNfts";
import AllTokens from "@/components/AllTokens";
import StandardHead from "@/components/StandardHead";
import styles from "@/styles/WalletAddress.module.css";
const WalletDetails = () => {
    return (
        <>
        <StandardHead />
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
            </div>
        </div>
        </> 
        
     );
}
 
export default WalletDetails;