import styles from "../resources/css/CollectionRow.module.css";
import EachNft from "./EachNft";
import { motion } from "framer-motion";

const CollectionRow = ({ collection,cluster }) => {
  
  return (
    <div>
      <div className={styles.collection_row}>
        <div className={styles.collection_name}>{collection.name} {(collection.nfts && Array.isArray(collection.nfts))?(`(${collection.nfts.length})`):""}</div>
        <motion.div className={styles.collection_nft_container} initial={{ width: "0px" }} whileInView={{ width: "auto" }} viewport={{ once: true }}>
          <div className="d-flex flex-wrap justify-content-start">
            {
              (collection.nfts?.map((nft) => (
                <EachNft nft={nft} cluster={cluster} />
              )))
            }
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionRow;
