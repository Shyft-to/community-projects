import NFTs from "./nft";
import styles from '@/styles/Nft.module.css';
const AllNfts = () => {
    return ( 
        <div>
            <div className={styles.nft_all_section}>
                <div className={styles.main_heading}>
                    NFT Collections in your Space<span>(08 Collections)</span>
                </div>
                <div className="d-flex justify-content-start">
                    <NFTs />
                    <NFTs />
                    <NFTs />
                    <NFTs />

                </div>
            </div>
        </div>
     );
}
 
export default AllNfts;