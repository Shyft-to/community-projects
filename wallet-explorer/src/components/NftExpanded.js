import { motion } from "framer-motion";
import { useState } from "react";
import styles from "../resources/css/NftExpanded.module.css";
import unknown from "../resources/images/ok_bear.png";
import copyBtn from "../resources/images/txnImages/copy_icon.svg";
import Tooltip from 'react-tooltip-lite';
import { Link } from "react-router-dom";

const NftExpanded = ({ nft,cluster }) => {
  const [copied, setcopied] = useState("copy");
  const copyValue = (value) => {

    navigator.clipboard.writeText(value);
    setcopied("copied");
    setTimeout(() => {
      setcopied("copy");
    }, 500);
  }
  return (
    <div className={styles.entire_nft_expanded}>
      <div className="row">
        <motion.div className="col-12 col-lg-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className={styles.nft_image_container}>
            <img
              src={(nft.image_uri === "") ? unknown : nft.image_uri}
              className="img-fluid"
              alt="nft"
            />
          </div>
        </motion.div>
        <div className="col-12 col-lg-9">
          <div className={styles.nft_desc_section}>
            <motion.h2 className={styles.nft_name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>{nft.name ?? "--"}</motion.h2>
            <motion.div className={styles.nft_section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h6 className={styles.section_heading}>Description</h6>
              <p className={styles.section_desc}>{nft.description ?? "--"}</p>
            </motion.div>
            <div className={styles.nft_image_container_mob}>
              <motion.img
                src={(nft.image_uri === "") ? unknown : nft.image_uri}

                className="img-fluid"
                alt="nft"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
              />
            </div>
            <motion.div className={styles.nft_section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
              <h6 className={styles.section_heading}>Details</h6>
              <div className={`mt-3 ${styles.table_container}`}>
                <div className={`row ${styles.each_row}`}>
                  <div className="col-4">
                    <div className={styles.table_field_name}>Symbol</div>
                  </div>
                  <div className="col-8">
                    <div className={styles.table_field_value}>
                      {nft.symbol ?? "--"}
                    </div>
                  </div>
                </div>
                <div className={`row ${styles.each_row}`}>
                  <div className="col-4">
                    <div className={styles.table_field_name}>Royalty</div>
                  </div>
                  <div className="col-8">
                    <div className={styles.table_field_value}>
                      {nft.royalty ?? 0}
                    </div>
                  </div>
                </div>
                <div className={`row ${styles.each_row}`}>
                  <div className="col-4">
                    <div className={styles.table_field_name}>Mint Address</div>
                  </div>
                  <div className="col-8">
                    <div className={styles.table_field_value}>
                      {(nft.mint !== "") && <Tooltip
                        content={"Copied✅"}
                        className="myTarget"
                        direction="left"
                        eventOn="onClick"
                        eventOff="onMouseLeave"
                        useHover={false}
                        background="#101010"
                        color="#fefefe"
                        styles={{display:"inline"}}
                        arrowSize={5}
                      ><button onClick={() => copyValue(nft.mint)}><img src={copyBtn} /></button></Tooltip>}{nft.mint ?? "--"}
                    </div>
                  </div>
                </div>
                <div className={`row ${styles.each_row}`}>
                  <div className="col-4">
                    <div className={styles.table_field_name}>Owner Address</div>
                  </div>
                  <div className="col-8">
                    <div className={styles.table_field_value}>
                      {(nft.owner !== "") && <Tooltip
                        content={"Copied✅"}
                        className="myTarget"
                        direction="left"
                        eventOn="onClick"
                        eventOff="onMouseLeave"
                        useHover={false}
                        background="#101010"
                        color="#fefefe"
                        styles={{display:"inline"}}
                        arrowSize={5}
                      ><button onClick={() => copyValue(nft.owner)}><img src={copyBtn} /></button></Tooltip>}{(nft.owner !== "")? <Link to={`/address/${nft.owner}?cluster=${cluster}`}>{nft.owner}</Link>:"--"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {(nft.attributes_array?.length > 0) && (
              <div className="pt-4">
                <motion.div className={styles.nft_section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1 }}>
                  <h6 className={styles.section_heading}>Attributes</h6>
                  <div className={styles.attributes_section}>
                    <div className="row">
                      {nft.attributes_array.map((each_attrib) => (
                        <div className="col-12 col-lg-6" key={Math.random()}>
                          <div className={styles.each_attribute}>
                            <div className="row">
                              <div className="col-6">
                                <div className={styles.attribute_label}>
                                  {each_attrib.trait_type}
                                </div>
                              </div>
                              <div className="col-6">
                                <div className={styles.attribute_value}>
                                  {each_attrib.value}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className="col-12 col-lg-6">
                                <div className={styles.each_attribute}>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={styles.attribute_label}>
                                                Background
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={styles.attribute_value}>
                                                Champagne
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftExpanded;
