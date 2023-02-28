import styles from "../resources/css/NftExpanded.module.css";
import unknown from "../resources/images/ok_bear.png";

const TokenExpanded = ({token}) => {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-5">
          <div className={styles.nft_image_container}>
            <img src={(!token?.image || token?.image === "" )?unknown:token.image} className="img-fluid" alt="token" />
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div className={styles.nft_desc_section}>
            <h2 className={styles.nft_name}>{token?.name}</h2>
            <div className={styles.nft_section}>
              <h6 className={styles.section_heading}>Description</h6>
              <p className={styles.section_desc}>
                {token.description}
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
                                {token?.symbol}
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Decimals
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                {token.decimals}
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.each_row}`}>
                        <div className="col-4">
                            <div className={styles.table_field_name}>
                                Address
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
                                Current Supply
                            </div>
                        </div>
                        <div className="col-8">
                            <div className={styles.table_field_value}>
                                {token.current_supply}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className="pt-4">
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
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenExpanded;
