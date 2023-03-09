import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../resources/css/CollectionRow.module.css";

import i_icon from "../resources/images/i_icon.svg";
import ok_bear from "../resources/images/ok_bear.png";
import { getNFTData } from "../utils/getAllData";

const EachNft = ({nft,cluster}) => {
    const [image, setImage] = useState(ok_bear);
    const [attributes, setAttributes] = useState([]);
    const [msg, setMsg] = useState("None");

    useEffect(() => {
        if(nft.mint)
            getData(cluster,nft.mint);
        
    }, []);
    const getData = async (cluster,address) => {
        setMsg("Loading");
        const res = await getNFTData(cluster, address);

        if (res.success === true) {
        if(res.details.cached_image_uri !== "")
            setImage(res.details.cached_image_uri);

        if(res.details.attributes_array?.length > 0)
            setAttributes(res.details.attributes_array);
        else
            setMsg("None")
        }
    };
    return ( 
        <div className=" py-4 pe-4">
              <motion.div className={styles.nft_container} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                
                <Link to={`/address/${nft.mint}?cluster=${cluster}`}>
                  <div className={styles.image_container}>
                    <img src={image} alt="nft" />
                  </div>
                </Link>
                
                <div className={styles.name_section}>
                  <div className="row">
                    <div className="col-12">
                      <div className={styles.name_text}>{nft.name ?? "--"}</div>
                    </div>
                  </div>
                </div>
                {/* <div className={styles.button_section}>
                  <div className="row">
                    <div className="col-6">
                      <div className={styles.i_hover_section}>
                        <div className={styles.i_indicator}>
                          <img
                            src={i_icon}
                            alt="details"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                        <div className={styles.desc_area}>
                          <div className={styles.desc_heading}>Attributes</div>
                          {attributes.length > 0 && (
                            <table>
                              {attributes.map((attr) => (
                                <tr>
                                  <td className={styles.trait_type}>
                                    {attr.trait_type ?? "--"}
                                  </td>
                                  <td className={styles.value}>
                                    {attr.value ?? "--"}
                                  </td>
                                </tr>
                              ))}
                            </table>
                          )}
                          {attributes.length < 1 && (
                            <table>
                              <tr>
                                <td className={styles.trait_type}>{msg}</td>
                              </tr>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className={styles.details_button}>
                        <a className="no_underline" href={`/address/${nft.mint}?cluster=${cluster}`}>
                          <div className={styles.btn_sm_outline_outer}>
                            <div className={styles.btn_sm_outline_inner}>
                              Details
                            </div>
                          </div>
                        </a>
                        
                      </div>
                    </div>
                  </div>
                </div> */}
              </motion.div>
            </div>
     );
}
 
export default EachNft;