import { useState,useEffect } from "react";
import icon from "../../resources/images/txnImages/nft_transfer_2.svg";
import arrow from "../../resources/images/txnImages/arrow.svg";
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";

import placeholder from "../../resources/images/txnImages/unknown.png";
import { getNFTData } from "../../utils/getAllData";

import SOL_TRANSFER from "../../resources/images/txnImages/sol_transfer.png";

import NFT_MINT from "../../resources/images/txnImages/mint.png";
import NFT_BURN from "../../resources/images/txnImages/nft_burn.png";
import NFT_TRANSFER from "../../resources/images/txnImages/nft_transfer.png";

import TOKEN_CREATE from "../../resources/images/txnImages/mint.png";
import TOKEN_MINT from "../../resources/images/txnImages/mint.png";
import TOKEN_BURN from "../../resources/images/txnImages/token_burn.png";
import TOKEN_TRANSFER from "../../resources/images/txnImages/token_transfer.png";

import NFT_SALE from "../../resources/images/txnImages/sale.png";
import NFT_BID from "../../resources/images/txnImages/bid.png";
import NFT_LIST from "../../resources/images/txnImages/list.png";
import NFT_LIST_CANCEL from "../../resources/images/txnImages/blue_unknown.png";
import MARKETPLACE_WITHDRAW from "../../resources/images/txnImages/blue_unknown.png";

import UNKNOWN from "../../resources/images/txnImages/blue_unknown.png";

const TransactionStructureToken = ({ styles, id, data, address, cluster }) => {
    const [image, setImage] = useState(placeholder);
  const [name, setName] = useState("");
  const [relField, setRelField] = useState("");

  const [typeImage, setTypeImage] = useState(UNKNOWN);

  const [varFields, setVarFields] = useState({
    type_field: {
      name: "",
      value: "",
    },
    dynamic_field_1: {
        name:"",
        value:""
    },
    dynamic_field_2: {
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
    time_field: {
        name: "",
        value: "",
      },
  });

  useEffect(() => {
    // $(`#${id}`).animate({
    //   height: "hide",
    // });
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
    var type_field = {};
    var dynamic_field_1 = {};
    var dynamic_field_2 = {};
    var third_field = {};
    var fourth_field = {};
    var fee_field = {};
    var time_field = {};
    try {
      if (data.type === "SOL_TRANSFER") {
        type_field = {
            name: "Type",
            value: "SOL Transfer"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.receiver ?? "--",
            arrow:true
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"-"
        };
        // fourth_field = {
        //   name: "Fee",
        //   value: data.fee?.name ?? "--",,
        // };
        setTypeImage(SOL_TRANSFER);
      } else if (data.type === "TOKEN_TRANSFER") {
        type_field = {
            name: "Type",
            value: "TOKEN Transfer"
        }
        dynamic_field_1 = {
            from: data.actions[0].info.sender ?? "--",
            to: data.actions[0].info.receiver ?? "--",
            arrow:true
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"-"
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_TRANSFER);
      } else if (data.type === "NFT_TRANSFER") {
        type_field = {
            name: "Type",
            value: "NFT Transfer"
        }
        dynamic_field_1 = {
            from: data.actions[0].info.sender ?? "--",
            to: data.actions[0].info.receiver ?? "--",
            arrow:true
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"-"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_TRANSFER);
      } else if (data.type === "TOKEN_MINT") {
        type_field = {
            name: "Type",
            value: "TOKEN Mint"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.token_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"+"
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_MINT);
      } else if (data.type === "NFT_MINT") {
        type_field = {
            name: "Type",
            value: "NFT Mint"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"+"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_MINT);
      } else if (data.type === "NFT_BURN") {
        type_field = {
            name: "Type",
            value: "NFT Mint"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"-"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_BURN);
      } else if (data.type === "TOKEN_BURN") {
        type_field = {
            name: "Type",
            value: "NFT Burn"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.token_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
          value: data.actions[0].info?.amount ?? "--",
          symbol:"-"
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_BURN);
      } else if (data.type === "TOKEN_CREATE") {
        type_field = {
            name: "Type",
            value: "TOKEN Create"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.token_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
        //   value: data.actions[0].info?.amount ?? "--",
          value: 1,
          symbol:"+"
        };
        setRelField(data.actions[0].info.token_address ?? "");
        setTypeImage(TOKEN_CREATE);
      } else if (data.type === "NFT_LIST") {
        type_field = {
            name: "Type",
            value: "NFT List"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Price",
        //   value: data.actions[0].info?.amount ?? "--",
          value: data.actions[0].info.price ?? "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_LIST);
      } else if (data.type === "NFT_SALE") {
        type_field = {
            name: "Type",
            value: "NFT Sale"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Price",
        //   value: data.actions[0].info?.amount ?? "--",
          value: data.actions[0].info.price ?? "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_SALE);
      } else if (data.type === "NFT_LIST_CANCEL") {
        type_field = {
            name: "Type",
            value: "NFT List Cancel"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Price",
        //   value: data.actions[0].info?.amount ?? "--",
          value: data.actions[0].info.price ?? "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_LIST_CANCEL);
      } else if (data.type === "NFT_BID") {
        type_field = {
            name: "Type",
            value: "NFT Bid"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.nft_address ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Price",
        //   value: data.actions[0].info?.amount ?? "--",
          value: data.actions[0].info.price ?? "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
        setRelField(data.actions[0].info.nft_address ?? "");
        setTypeImage(NFT_BID);
      } else if (data.type === "MARKETPLACE_WITHDRAW") {
        type_field = {
            name: "Type",
            value: "NFT Bid"
        }
        dynamic_field_1 = {
            name: "To",
            value: data.actions[0].info.treasury_account ?? "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: data.protocol?.name ?? "--",
        };
        third_field = {
          name: "Amount",
        //   value: data.actions[0].info?.amount ?? "--",
          value: data.actions[0].info.amount ?? "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
        setTypeImage(MARKETPLACE_WITHDRAW);
      }
      else
      {
        type_field = {
            name: "Type",
            value: "Unknown"
        }
        dynamic_field_1 = {
            name: "To",
            value: "--",
            arrow:false
        };
        dynamic_field_2 = {
          name: "Protocol",
          value: "--",
        };
        third_field = {
          name: "Amount",
        //   value: data.actions[0].info?.amount ?? "--",
          value: "--",
          symbol:"",
        //   end_symbol: data.actions[0].info.price ?? "--"
        };
      }
      fee_field = {
        name: "Fees",
        value: data.fee ?? "--"
      }
      time_field = { 
        name: "Time",
        value: data.timestamp ?? ""
      
      }
      setVarFields({
        ...varFields,
        type_field,
        dynamic_field_1,
        dynamic_field_2,
        third_field,
        fourth_field,
        fee_field,
        time_field
      });
    } catch (err) {
      console.warn(err);
    }
  };
//   console.log(varFields.fee_field);
    return ( 
    <div>
        <div className={styles.each_txn_2}>
            <div className={styles.toggle_button}>
                <a href="">
                    <div className={styles.sol_icon}>
                        <img src={solScan} alt="View on SolScan" />
                    </div>
                </a>
                
            </div>
            <div className="row">
                <div className="col-12 col-lg-1">
                    <div className={styles.type_image_container}>
                        <img src={typeImage} className="img-fluid" alt="Icon" />
                    </div>
                </div>
                <div className="col-12 col-lg-11">
                    <div className={styles.fields_container}>
                        <div className="row">
                            <div className="col-6 col-lg-12">
                                <div className={styles.txn_name}>
                                    {varFields.type_field.value ?? "--"}
                                </div>
                            </div>
                            <div className="col-6 col-lg-12">
                                <div className={styles.dynamic_field}>
                                    {
                                        (varFields.type_field.value === "NFT Transfer" || varFields.type_field.value === "TOKEN Transfer")?
                                            <div className="d-flex">
                                                <div className="pe-1">
                                                   From: {varFields.dynamic_field_1.from ?? ""}
                                                </div>
                                                <div className="pe-1">
                                                    <img src={arrow} alt="" style={{width: "10px"}}/>
                                                </div>
                                                <div className="pe-1">
                                                   To: {varFields.dynamic_field_1.to ?? ""}
                                                </div>
                                            </div>
                                        :((varFields.dynamic_field_1.arrow)?
                                            <div className="d-flex">
                                                <div className="pe-1">
                                                    {varFields.dynamic_field_1.name}
                                                </div>
                                                <div className="pe-1">
                                                    <img src={arrow} alt="" style={{width: "10px"}}/>
                                                </div>
                                                <div className="pe-1">
                                                    {varFields.dynamic_field_1.value}
                                                </div>
                                            </div>
                                        :
                                        <div>
                                            {varFields.dynamic_field_1.value}
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-lg-4">
                                <div className={styles.dynamic_field_2}>
                                {varFields.dynamic_field_2.value ?? "--"}
                                </div>
                            </div>
                            <div className="col-6 col-lg-2">
                                <div className={`text-center ${styles.field_1} ${(varFields.third_field.value === "+")?styles.plus:styles.minus}`}>
                                    {varFields.third_field.symbol ?? ""}{varFields.third_field.value ?? ""}
                                </div>
                            </div>
                            <div className="col-6 col-lg-2">
                                <div className={`text-center ${styles.field_1}`}>
                                    {varFields.fee_field?.value ?? ""}
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className={`text-end ${styles.field_1}`}>
                                    {varFields.time_field.value ?? ""}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default TransactionStructureToken;