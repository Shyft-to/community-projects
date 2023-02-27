import styles from "../resources/css/CollectionRow.module.css";
import EachNft from "./EachNft";

const CollectionRow = ({ collection,cluster }) => {
  
  return (
    <div>
      <div className={styles.collection_row}>
        <div className={styles.collection_name}>{collection.name}</div>
        <div className={styles.collection_nft_container}>
          <div className="d-flex flex-wrap justify-content-start">
            {
              (collection.nfts?.map((nft) => (
                <EachNft nft={nft} cluster={cluster} />
              )))
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionRow;
