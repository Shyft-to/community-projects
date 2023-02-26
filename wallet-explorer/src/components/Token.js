import TokenImage from "../resources/images/ok_bear.png"
import styles from "../resources/css/Token.module.css";

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