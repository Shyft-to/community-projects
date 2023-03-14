import { useState } from "react";
import styles from "../resources/css/CollectionRow.module.css";
import EachNft from "./EachNft";
import { motion } from "framer-motion";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CollectionRowSlice = ({ collection, cluster }) => {
    const [numnfts, setNumnfts] = useState(5);
    return (
        <div>
            <div className={styles.collection_row}>

                <div className="d-flex justify-content-start">
                    <div className={styles.collection_name}>{collection.name} {(collection.nfts && Array.isArray(collection.nfts)) ? (`(${collection.nfts.length})`) : ""}</div>
                    {(collection.nfts?.length > 5) ? <div>
                        <div className={styles.expand_button}><button onClick={() => {
                            if (numnfts === 5)
                                setNumnfts(collection.nfts?.length)
                            else
                                setNumnfts(5)
                        }}>{(numnfts>5)?<FaMinus/>:<FaPlus />}</button></div>
                    </div> : ""}
                </div>

                <motion.div className={styles.collection_nft_container} initial={{ width: "0px" }} whileInView={{ width: "auto" }} viewport={{ once: true }}>
                    <div className="d-flex flex-wrap justify-content-start">
                        {
                            (collection.nfts?.slice(0, numnfts).map((nft) => (
                                <EachNft nft={nft} cluster={cluster} />
                            )))
                        }

                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CollectionRowSlice;