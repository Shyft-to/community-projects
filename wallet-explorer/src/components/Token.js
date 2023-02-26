import Image from "next/image";
import TokenImage from "@/public/images/ok_bear.png"
import styles from "@/styles/Token.module.css";
const Token = () => {
    return ( 
        <div>
            <div className={styles.token_container}>
                <div className={styles.token_image}>
                    <img src="/images/ok_bear.png" />
                </div>
                <div className={styles.title}>Solge</div>
                <div className={styles.balance}>0.04</div>
            </div>
        </div>
     );
}
 
export default Token;