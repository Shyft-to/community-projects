import Image from 'next/image';
import styles from '@/styles/Nft.module.css';
const NFTs = () => {
    return ( 
        <div className='p-3'>
            <div className={styles.nft_container}>
                <div className={styles.image_container}>
                    <img src="/images/ok_bear.png" alt="nft" />
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
                                    <Image src="/images/i_icon.svg" width={20} height={20} />
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