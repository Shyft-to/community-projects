import TokenImage from "../resources/images/unknown_token.svg"
import styles from "../resources/css/Token.module.css";
import { Link } from "react-router-dom";

const Token = ({token,address,network}) => {
    return ( 
        <div>
            <div className={styles.token_container}>
                
                <Link to={`/token/${token.address}?cluster=${network}`}>
                    <div className={styles.token_image}>
                        <img src={token.info.image ?? TokenImage} alt="Token" />
                    </div>
                </Link>
                <div className={styles.title}>{token.info.name ?? "--"}</div>
                <div className={styles.balance}>{token.balance ?? "--"}</div>
            </div>
        </div>
     );
}
 
export default Token;