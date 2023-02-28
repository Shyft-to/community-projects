import TokenImage from "../resources/images/unknown_token.svg"
import styles from "../resources/css/Token.module.css";

const Token = ({token,address,network}) => {
    return ( 
        <div>
            <div className={styles.token_container}>
                <a href={`/token/${address}?cluster=${network}`} target="_blank" rel="noreferrer">
                    <div className={styles.token_image}>
                        <img src={token.info.image ?? ""} alt="Token" />
                    </div>
                </a>
                <div className={styles.title}>{token.info.name ?? "--"}</div>
                <div className={styles.balance}>{token.balance ?? "--"}</div>
            </div>
        </div>
     );
}
 
export default Token;