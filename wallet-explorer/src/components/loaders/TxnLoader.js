import styles from "../../resources/css/Loader.module.css";

const TxnLoader = () => {
    return ( 
        <div className="w-100 text-center">
            <span class={styles.loader}></span>
        </div>
     );
}
 
export default TxnLoader;