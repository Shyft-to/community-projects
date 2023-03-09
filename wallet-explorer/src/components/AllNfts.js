import NFTs from "./nft";
import styles from '../resources/css/Nft.module.css';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const AllNfts = ({collections,address,network}) => {
    return ( 
        <div>
            {<div className={styles.nft_all_section}>
                <div className="d-flex flex-wrap justify-content-between justify-content-md-start">
                    <div className="pe-2">
                    <div className={styles.main_heading}>
                        NFT Collections  ({collections.length})
                    </div>
                    </div>
                    <div className="pe-2">
                        <a className="no_underline" href={`/collections/${address}?cluster=${network}`}>
                            <div className={styles.view_all_text}>
                                View All
                            </div>
                        </a>
                    </div>
                </div>
                
                {(collections.length > 0) && <div>
                    <OwlCarousel 
                    className='owl-theme' 
                    margin={40} 
                    nav={true}
                    // dotClass={TestStyles.grad_dot}
                    navClass={[styles.nav_class_color_left,styles.nav_class_color_right]}
                    responsive={{
                        0:{
                            items:1
                        },
                        768:{
                            items:3
                        },
                        1100:{
                            items:4
                        }
                    }}
                    dots={false}
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