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

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.button_section}>
                    <div className="row">
                        <div className="col-6">
                            
                        </div>
                        <div className="col-6">

                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default NFTs;