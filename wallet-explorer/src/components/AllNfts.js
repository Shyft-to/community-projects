import NFTs from "./nft";
import styles from '../resources/css/Nft.module.css';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const AllNfts = ({collections,address,network}) => {
    return ( 
        <div>
            {<div className={styles.nft_all_section}>
                <div className={styles.main_heading}>
                    NFT Collections in your Space<span>({collections.length} Collection)</span>
                </div>
                {(collections.length > 0) && <div>
                    <OwlCarousel 
                    className='owl-theme' 
                    margin={40} 
                    nav={true}
                    // dotClass={TestStyles.grad_dot}
                    responsive={{
                        0:{
                            items:1
                        },
                        768:{
                            items:3
                        },
                        1100:{
                            items:5
                        }
                    }}
                    dots
                    autoplay
                >
                    
                    {collections.map(coll => (
                        <div>
                            <NFTs collection={coll} address={address} network={network} />
                        </div>
                    ))}
                    {/* <div>
                        <NFTs />
                    </div> */}
                    </OwlCarousel>

                </div>}
                {
                    (collections.length < 1) && 
                    <div className='pt-2 not_found_text'>
                        No Collections Found
                    </div>
                }
                    

                
            </div>}
        </div>
     );
}
 
export default AllNfts;