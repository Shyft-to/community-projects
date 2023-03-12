import styles from "../../resources/css/Loader.module.css";
const SimpleLoader = () => {
    return ( 
        <div className={styles.loader_container}>
            <span class={styles.loader}></span>
        </div> 
    );
}
 
export default SimpleLoader;