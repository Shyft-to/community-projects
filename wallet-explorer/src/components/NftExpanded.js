import styles from "@/styles/NftExpanded.module.css";
const NftExpanded = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-5">
          <div className={styles.nft_image_container}>
            <img src="/images/ok_bear.png" className="img-fluid" />
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div className={styles.nft_desc_section}>
            <h2 className={styles.nft_name}>Fox # 7815</h2>
            <div className={styles.nft_section}>
              <h6 className={styles.section_heading}>Description</h6>
              <p className={styles.section_desc}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Veritatis quisquam quibusdam culpa commodi, ratione numquam aut
                doloremque rerum itaque natus voluptas doloribus in maxime quas
                quia accusamus nesciunt qui mollitia.
              </p>
            </div>
            <div className={styles.nft_section}>
                <h6 className={styles.section_heading}>Details</h6>
                <div className={`mt-3 ${styles.table_container}`}>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Symbol
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                FOX
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Royalty
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                4.5 %
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Mint Address
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                aTjagsyuGUYGUSjgJGuyGgY12314y14214ygGSHSGYSG
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Owner Address
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                aTjagsyuGUYGUSjgJGuyGgY12314y14214ygGSHSGYSG
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="pt-4">
                <div className={styles.nft_section}>
                    <h6 className={styles.section_heading}>Attributes</h6>
                    <div className={styles.attributes_section}>
                        <div className="row">
                            <div className="col-12 col-lg-6">
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
                            </div>
                            <div className="col-12 col-lg-6">
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
                            </div>
                            <div className="col-12 col-lg-6">
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
                            </div>
                            <div className="col-12 col-lg-6">
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftExpanded;
