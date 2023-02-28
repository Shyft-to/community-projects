import {useState,useEffect} from "react";

import styles from '../resources/css/Nft.module.css';

import i_icon from "../resources/images/i_icon.svg";
import ok_bear from "../resources/images/ok_bear.png"
import { getNFTData } from "../utils/getAllData";

const NFTs = ({collection,address,network}) => {
    const [image,setImage] = useState(ok_bear);

    const getData = async (address, cluster) => {
        const res = await getNFTData(address, cluster);
        if (res.success === true) {
          setImage(res.details.cached_image_uri ?? res.details.image_uri);
        }
      };
    
    useEffect(() => {
        if(collection.address)
            getData(network,collection.address);
    
      
    }, [])
    

    return ( 
        <div className='py-3 px-1'>
            <div className={styles.nft_container}>
                <a href={`/nft/${address}?cluster=${network}`} target="_blank" rel="noreferrer">
                    <div className={styles.image_container}>
                        <img src={image} alt="nft" />
                    </div>
                </a>
                
                <div className={styles.name_section}>
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.name_text}>
                                {collection.name ?? "--"}
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
                                    NFTs: {collection.nft_count ?? "--"}
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="col-6">
                            <div className={styles.details_button}>
                            <a href={`/collections/${address}?cluster=${network}`}>
                                <div className={styles.btn_sm_outline_outer}>
                                    <div className={styles.btn_sm_outline_inner}>
                                        Details
                                    </div>
                                </div>
                            </a>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default NFTs;