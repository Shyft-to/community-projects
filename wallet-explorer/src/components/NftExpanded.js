import styles from "../resources/css/NftExpanded.module.css";
const NftExpanded = ({ nft }) => {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-5">
          <div className={styles.nft_image_container}>
            <img
              src={nft.cached_image_uri ?? nft.image_uri ?? ""}
              className="img-fluid"
              alt="nft"
            />
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div className={styles.nft_desc_section}>
            <h2 className={styles.nft_name}>{nft.name ?? "--"}</h2>
            <div className={styles.nft_section}>
              <h6 className={styles.section_heading}>Description</h6>
              <p className={styles.section_desc}>{nft.description ?? "--"}</p>
            </div>
            <div className={styles.nft_section}>
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
                      {nft.mint ?? "--"}
                    </div>
                  </div>
                </div>
                <div className={`row ${styles.each_row}`}>
                  <div className="col-4">
                    <div className={styles.table_field_name}>Owner Address</div>
                  </div>
                  <div className="col-8">
                    <div className={styles.table_field_value}>
                      {nft.owner ?? "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(nft.attributes_array?.length > 0) && (
              <div className="pt-4">
                <div className={styles.nft_section}>
                  <h6 className={styles.section_heading}>Attributes</h6>
                  <div className={styles.attributes_section}>
                    <div className="row">
                        {nft.attributes_array.map((each_attrib) => (
                      <div className="col-12 col-lg-6">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftExpanded;
