import styles from '../resources/css/Nft.module.css';

import i_icon from "../resources/images/i_icon.svg";
import ok_bear from "../resources/images/ok_bear.png"

const NFTs = () => {
    return ( 
        <div className='py-3 px-1'>
            <div className={styles.nft_container}>
                <div className={styles.image_container}>
                    <img src={ok_bear} alt="nft" />
                </div>
                <div className={styles.name_section}>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.name_text}>
                                Ok BEars #2
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.button_section}>
                    <div className="row">
                        <div className="col-6">
                            <div className={styles.i_hover_section}>
                                <div className={styles.i_indicator}>
                                    <img src={i_icon} alt="details" style={{width:"20px", height:"20px"}} />
                                </div>
                                <div className={styles.desc_area}>
                                    NFTs: 8
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="col-6">
                            <div className={styles.details_button}>
                                <button className={styles.btn_sm_outline_outer}>
                                    <div className={styles.btn_sm_outline_inner}>
                                        Details
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default NFTs;