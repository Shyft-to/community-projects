import { useEffect, useState } from "react";
import $ from "jquery";
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getTokenData } from "../../utils/getAllData";


const TokenCreate = ({ styles, id, data, address, cluster }) => {

  const [image,setImage] = useState(placeholder);
  const [name,setName] = useState('');

  useEffect(() => {
    $(`#${id}`).animate({
      height: "hide",
    });
    
    // getData(address,cluster);
    
  }, []);

  const getData = async (address,cluster) => {
    const res = await getTokenData(address,cluster);
    if(res.success === true)
    {
      setImage(res.details.image_uri);
      setName(res.details.name);
    }
  }
  

  const togglePanel = (event,div_id) => {
    // const clickedButton = event.target;
    // console.log(clickedButton.className);
    // clickedButton.style.transform = "rotate(180deg)";
    $(`#${div_id}`).animate({
      height: "toggle",
    });
  };

  return (
    <div>
      <div className={styles.each_txn}>
        <div className={styles.toggle_button}>
          <button onClick={(event) => togglePanel(event,id)}>
                <IconContext.Provider value={{ size: 24 }}>
                    <FaAngleDown />
                </IconContext.Provider>
          </button>
        </div>
        <div className={styles.fieldset_1}>
          <div className="row">
            <div className="col-12 col-lg-2">
              <div className={styles.tx_image}>
                <img
                  src={image}
                  className="img-fluid"
                  alt="Token Container"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>Token Address</div>
                    <div className={styles.tx_bottom}>
                      {data.actions.info?.token_address ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-2">
                  <div className={styles.tx_image_type}>
                    <div className="text-light">
                      {data.type ?? ""}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>Protocol</div>
                    <div className={styles.tx_bottom}>
                      {data.protocol?.name ?? "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row">
                <div className="col-6">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>Fee</div>
                    <div className={styles.tx_bottom}>{data.fee ?? "--"} SOL</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>Time</div>
                    <div className={styles.tx_bottom}>{data.timestamp ?? "--"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id={id} className={styles.fieldset_2}>
            <div className={styles.second_row}>
              <div className="row">
                <div className="col-12 col-md-2"></div>
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Signers</div>
                    <div className={styles.tx_bottom}>
                      {data.signers[0] ?? ""}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Signature</div>
                    <div className={styles.tx_bottom}>
                    {data.signatures[0] ?? ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.third_row}>
              <div className="row">
                <div className="col-12 col-md-2"></div>
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Signers</div>
                    <div className={styles.tx_bottom}>
                      hihHYAG12yg31ydbyhBSDYB21hybhSgHGs45StyS12n1uusauBb
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Protocol</div>
                    <div className={styles.tx_bottom}>Metapass</div>
                  </div>
                </div>
                <div className="col-6 col-md-2">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Gas Fees</div>
                    <div className={styles.tx_bottom}>0.0005</div>
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

export default TokenCreate;
