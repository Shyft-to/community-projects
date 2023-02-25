import $ from "jquery";
import { useEffect } from "react";
const TokenTransfer = ({ styles, id }) => {
  useEffect(() => {
    $(`#${id}`).animate({
      height: "hide",
    });
  }, []);

  const togglePanel = (div_id) => {
    $(`#${div_id}`).animate({
      height: "toggle",
    });
  };

  return (
    <div>
      <div className={styles.each_txn}>
        <div className={styles.toggle_button}>
          <button onClick={() => togglePanel(id)}>Close</button>
        </div>
        <div className={styles.fieldset_1}>
          <div className="row">
            <div className="col-12 col-lg-2">
                <div className={styles.tx_image}>
                    <img src="/images/ok_bear.png" className="img-fluid" alt="Token Container" />   
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="row">
                    <div className="col-12 col-md-5">
                        <div className={styles.tx_field}>
                            <div className={styles.tx_top}>
                                From
                            </div>
                            <div className={styles.tx_bottom}>
                                asuhhah2yh31uy2uyasdhuy2hu1y2h3y1231hyysuhdauyd
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className={styles.tx_image_type}>

                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                        <div className={styles.tx_field}>
                            <div className={styles.tx_top}>
                                To
                            </div>
                            <div className={styles.tx_bottom}>
                                asuhhah2yh31uy2uyasdhuy2hu1y2h3y1231hyysuhdauyd
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-4">
                <div className="row">
                    <div className="col-6">
                        <div className={styles.tx_field}>
                            <div className={styles.tx_top}>
                                Amount
                            </div>
                            <div className={styles.tx_bottom}>
                                0.005 SOL
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={styles.tx_field}>
                            <div className={styles.tx_top}>
                                Time
                            </div>
                            <div className={styles.tx_bottom}>
                                15 mins ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div>
          <div id={id} className={styles.fieldset_2}>
            <div className={styles.second_row}
              
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTransfer;
