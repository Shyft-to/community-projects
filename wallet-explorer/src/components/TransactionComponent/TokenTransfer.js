import { useEffect, useState } from "react";
import $ from "jquery";
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getNFTData } from "../../utils/getAllData";

import SOL_TRANSFER from "../../resources/images/txnImages/token_create.png";

import NFT_MINT from "../../resources/images/txnImages/mint.png";
import NFT_BURN from "../../resources/images/txnImages/burn.png";
import NFT_TRANSFER from "../../resources/images/txnImages/transfer.png";

import TOKEN_CREATE from "../../resources/images/txnImages/token_create.png";
import TOKEN_MINT from "../../resources/images/txnImages/token_create.png";
import TOKEN_BURN from "../../resources/images/txnImages/token_create.png";
import TOKEN_TRANSFER from "../../resources/images/txnImages/token_create.png";

import NFT_SALE from "../../resources/images/txnImages/sale.png";
import NFT_BID from "../../resources/images/txnImages/buy.png";
import NFT_LIST from "../../resources/images/txnImages/sale.png";
import NFT_LIST_CANCEL from "../../resources/images/txnImages/sale.png";
import MARKETPLACE_WITHDRAW from "../../resources/images/txnImages/sale.png";

import UNKNOWN from "../../resources/images/txnImages/blue_unknown.png";

const TokenTransfer = ({ styles, id, data, address, cluster }) => {
  const [image, setImage] = useState(placeholder);
  const [name, setName] = useState("");
  const [relField, setRelField] = useState("");

  const [typeImage, setTypeImage] = useState(UNKNOWN);

  const [varFields, setVarFields] = useState({
    first_field: {
      name: "",
      value: "",
    },
    second_field: {
      name: "",
      value: "",
    },
    third_field: {
      name: "",
      value: "",
    },
    fourth_field: {
      name: "",
      value: "",
    },
  });

  useEffect(() => {
    $(`#${id}`).animate({
      height: "hide",
    });
    categoriseTxn();
  }, []);

  useEffect(() => {
    if (relField !== "") getData(cluster, relField);
  }, [relField]);

  const getData = async (cluster, address) => {
    const res = await getNFTData(cluster, address);
    if (res.success === true) {
      if (res.details.image_uri)
        setImage(res.details.cached_image_uri ?? res.details.image_uri);
      setName(res.details.name);
    }
  };

  const categoriseTxn = () => {
    var first_field = {};
    var second_field = {};
    var third_field = {};
    var fourth_field = {};
    try {
      if (data.type === "SOL_TRANSFER") {
        first_field = {
          name: "From",
          value: data.actions[0].info.sender ?? "--",
        };
        second_field = {
          name: "To",
          value: data.actions[0].info.receiver ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token",
          value: "SOLANA",
        };
        setTypeImage(SOL_TRANSFER);
      } else if (data.type === "TOKEN_TRANSFER") {
        first_field = {
          name: "From",
          value: data.actions[0].info.sender ?? "--",
        };
        second_field = {
          name: "To",
          value: data.actions[0].info.receiver ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token Address",
          value: data.actions[0].info.token_address ?? "--",
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_TRANSFER);
      } else if (data.type === "NFT_TRANSFER") {
        first_field = {
          name: "From",
          value: data.actions[0].info.sender ?? "--",
        };
        second_field = {
          name: "To",
          value: data.actions[0].info.receiver ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "NFT Address",
          value: data.actions[0].info.nft_address ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_TRANSFER);
      } else if (data.type === "TOKEN_MINT") {
        first_field = {
          name: "Token Address",
          value: data.actions[0].info.token_address ?? "--",
        };
        second_field = {
          name: "Receiver",
          value: data.actions[0].info.receiver_address ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token",
          value: name ?? "--",
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_MINT);
      } else if (data.type === "NFT_MINT") {
        first_field = {
          name: "NFT Address",
          value: data.actions[0].info.nft_address ?? "--",
        };
        second_field = {
          name: "Owner",
          value: data.actions[0].info.owner ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token",
          value: name ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_MINT);
      } else if (data.type === "NFT_BURN") {
        first_field = {
          name: "NFT Address",
          value: data.actions[0].info.nft_address ?? "--",
        };
        second_field = {
          name: "Wallet",
          value: data.actions[0].info.wallet ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token",
          value: name ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_BURN);
      } else if (data.type === "TOKEN_BURN") {
        first_field = {
          name: "Token Address",
          value: data.actions[0].info.token_address ?? "--",
        };
        second_field = {
          name: "Wallet",
          value: data.actions[0].info.wallet ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Token",
          value: name ?? "--",
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_BURN);
      } else if (data.type === "TOKEN_CREATE") {
        first_field = {
          name: "Token Address",
          value: data.actions[0].info.token_address ?? "--",
        };
        second_field = {
          name: "Fee Payer",
          value: data.fee_payer ?? "--",
        };
        third_field = {
          name: "Type",
          value: "TOKEN",
        };
        // fourth_field = {
        //   name: "",
        //   value: (name ?? "--")
        // }
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_CREATE);
      } else if (data.type === "NFT_LIST") {
        first_field = {
          name: "Seller",
          value: data.actions[0].info.seller ?? "--",
        };
        second_field = {
          name: "NFT Address",
          value: data.actions[0].info.nft_address ?? "--",
        };
        third_field = {
          name: "Price",
          value: data.actions[0].info.price ?? "--",
        };
        fourth_field = {
          name: "Marketplace",
          value: data.actions[0].info.marketplace ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_LIST);
      } else if (data.type === "NFT_SALE") {
        first_field = {
          name: "Seller",
          value: data.actions[0].info.seller ?? "--",
        };
        second_field = {
          name: "Buyer",
          value: data.actions[0].info.buyer ?? "--",
        };
        third_field = {
          name: "Price",
          value: data.actions[0].info.price ?? "--",
        };
        fourth_field = {
          name: "Marketplace",
          value: data.actions[0].info.marketplace ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_SALE);
      } else if (data.type === "NFT_LIST_CANCEL") {
        first_field = {
          name: "Seller",
          value: data.actions[0].info.seller ?? "--",
        };
        second_field = {
          name: "Buyer",
          value: data.actions[0].info.buyer ?? "--",
        };
        third_field = {
          name: "Price",
          value: data.actions[0].info.price ?? "--",
        };
        fourth_field = {
          name: "Marketplace",
          value: data.actions[0].info.marketplace ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_LIST_CANCEL);
      } else if (data.type === "NFT_BID") {
        first_field = {
          name: "Bidder",
          value: data.actions[0].info.bidder ?? "--",
        };
        second_field = {
          name: "NFT Address",
          value: data.actions[0].info.nft_address ?? "--",
        };
        third_field = {
          name: "Price",
          value: data.actions[0].info.price ?? "--",
        };
        fourth_field = {
          name: "Marketplace",
          value: data.actions[0].info.marketplace ?? "--",
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_BID);
      } else if (data.type === "MARKETPLACE_WITHDRAW") {
        first_field = {
          name: "Marketplace",
          value: data.actions[0].info.marketplace ?? "--",
        };
        second_field = {
          name: "By",
          value: data.actions[0].info.withdrawal_destination_account ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info.amount ?? "--",
        };
        fourth_field = {
          name: "Treasury Ac",
          value: data.actions[0].info.treasury_account ?? "--",
        };
        setTypeImage(MARKETPLACE_WITHDRAW);
      }

      setVarFields({
        ...varFields,
        first_field,
        second_field,
        third_field,
        fourth_field,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const togglePanel = (event, div_id) => {
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
          <button onClick={(event) => togglePanel(event, id)}>
            <IconContext.Provider value={{ size: 24 }}>
              <FaAngleDown />
            </IconContext.Provider>
          </button>
        </div>
        <div className={styles.fieldset_1}>
          <div className="row">
            <div className="col-12 col-lg-1">
              <div className={styles.tx_image}>
                <img src={image} className="img-fluid" alt="Token Container" />
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row">
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>
                      {varFields.first_field.name ?? "--"}
                    </div>
                    <div className={styles.tx_bottom}>
                      {varFields.first_field.value ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-2">
                  <div className={styles.tx_image_type}>
                    <div className={styles.tx_type_image}>
                      <img src={typeImage} alt="" />
                    </div>
                    <div className={styles.tx_type_text}>
                      {data.type ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>
                      {varFields.second_field.name ?? "--"}
                    </div>
                    <div className={styles.tx_bottom}>
                      {varFields.second_field.value ?? "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row">
                <div className="col-6 text-center">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>
                      {varFields.third_field.name ?? "--"}
                    </div>
                    <div className={styles.tx_bottom}>
                      {varFields.third_field.value ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.tx_field}>
                    <div className={styles.tx_top}>Time</div>
                    <div className={styles.tx_bottom}>
                      {data.timestamp ?? "--"}
                    </div>
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
                <div className="col-12 col-md-1"></div>
                <div className="col-12 col-md-4">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>
                      {varFields.fourth_field.name ?? "--"}
                    </div>
                    <div className={styles.tx_bottom}>
                      {varFields.fourth_field.value ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-7">
                  <div className={styles.tx_field_sub_2}>
                    <div className={styles.tx_top}>Signers</div>
                    <div className={styles.tx_bottom}>
                      {Array.isArray(data.signers) && data.signers.length > 0
                        ? data.signers[0]
                        : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.third_row}>
              <div className="row">
                <div className="col-12 col-md-1"></div>
                <div className="col-12 col-md-4">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Signature</div>
                    <div className={styles.tx_bottom}>
                      {Array.isArray(data.signatures) &&
                      data.signatures.length > 0 ? (
                        <a
                          href={`https://explorer.solana.com/address/${data.signatures[0]}?cluster=${cluster}`}
                          target="_blank"
                          rel="noreferrer"
                          className="no_decor"
                        >
                          {data.signatures[0]}
                        </a>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className={styles.tx_field_sub_2}>
                    <div className={styles.tx_top}>Protocol</div>
                    <div className={styles.tx_bottom}>
                      {data.protocol?.name ?? "--"}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-2">
                  <div className={styles.tx_field_sub}>
                    <div className={styles.tx_top}>Gas Fees</div>
                    <div className={styles.tx_bottom}>{data.fee ?? "--"}</div>
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

export default TokenTransfer;
