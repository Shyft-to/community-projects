import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'balloon-css';

import icon from "../../resources/images/txnImages/unknown.png";
import arrow from "../../resources/images/txnImages/arrow.svg";
import copyIcon from "../../resources/images/txnImages/copy_icon.svg"

import { getNFTData, getTokenData } from "../../utils/getAllData";
import { shortenAddress } from "../../utils/formatter";



const SubTransactions = ({ styles, data, wallet, cluster }) => {
    const [image, setImage] = useState(icon);
    const [name, setName] = useState("");
    const [relField, setRelField] = useState("");
    const [currency, setCurrency] = useState("");
    const [currencyField,setCurrencyField] = useState("");
    const [varFields, setVarFields] = useState({
        type: "",
        from: "",
        to: "",
        token: "",
        action: "",
        value: "",
        symbol: ""
    });

    const getData = async (cluster, address) => {
        try {
            const res = await getNFTData(cluster, address);
            if (res.success === true) {
                if (res.details.image_uri)
                    setImage(res.details.cached_image_uri ?? res.details.image_uri);
                setName(res.details.name);
            }
        }
        catch (error) {
            setName("");
        }

    };

    const getCurrency = async (cluster, address) => {
        try {
            const res = await getTokenData(cluster, address);
            if (res.success === true) {
                setCurrency(res.details.symbol ?? res.details.name ?? "");
            }
        } catch (error) {
            setCurrencyField(address);
        }

    };

    const categoriseAction = () => {
        var type_obj = {
            type: "",
            from: "",
            to: "",
            token: "",
            action: "",
            value: "",
            symbol: ""
        }

        try {
            if (data.type === "SOL_TRANSFER") {
                type_obj = {
                    type: "TRANSFER",
                    from: data.info.sender ?? "--",
                    to: data.info.receiver ?? "--",
                    token: "TOKEN",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
                setName("SOL");

            } else if (data.type === "TOKEN_TRANSFER") {
                type_obj = {
                    type: "TRANSFER",
                    from: data.info.sender ?? "--",
                    to: data.info.receiver ?? "--",
                    token: "TOKEN",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
                setRelField(data.info.token_address ?? "");
            } else if (data.type === "NFT_TRANSFER") {
                type_obj = {
                    type: "TRANSFER",
                    from: data.info.sender ?? "--",
                    to: data.info.receiver ?? "--",
                    token: "NFT",
                    action: "--",
                    // value: data.info.amount ?? "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
                setRelField(data.info.nft_address ?? "");
            } else if (data.type === "TOKEN_MINT") {
                type_obj = {
                    type: "MINT",
                    from: "TOKEN",
                    to: data.info.receiver_address ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }

                setRelField(data.info.token_address ?? "");
            } else if (data.type === "NFT_MINT") {
                type_obj = {
                    type: "MINT",
                    from: "NFT",
                    to: data.info.owner ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
                setRelField(data.info.nft_address ?? "");
            } else if (data.type === "NFT_BURN") {
                type_obj = {
                    type: "BURN",
                    from: data.info.wallet ?? "--",
                    to: "--",
                    token: "NFT",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }

                setRelField(data.info.nft_address ?? "");
            } else if (data.type === "BURN") {
                type_obj = {
                    type: "BURN",
                    from: "--",
                    to: "--",
                    token: "NFT",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }

                setRelField(data.info.mint ?? "");
            } else if (data.type === "TOKEN_BURN") {
                type_obj = {
                    type: "BURN",
                    from: data.info.wallet ?? "--",
                    to: "--",
                    token: "TOKEN",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
                setRelField(data.info.token_address ?? "");
            } else if (data.type === "TOKEN_CREATE") {
                type_obj = {
                    type: "CREATE",
                    from: "--",
                    to: "--",
                    token: "TOKEN",
                    action: "--",
                    value: "--",
                    symbol: ""
                }
                setRelField(data.info.token_address ?? "");
            } else if (data.type === "NFT_LIST") {
                type_obj = {
                    type: "NFT_LIST",
                    from: data.info.seller ?? "--",
                    to: data.info.marketplace ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.price ?? "--",
                    symbol: ""
                }

                setRelField(data.info.nft_address ?? "");
                setCurrencyField(data.info.currency ?? "");
            } else if (data.type === "NFT_SALE") {
                type_obj = {
                    type: "NFT_SALE",
                    from: data.info.seller ?? "--",
                    to: data.info.buyer ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.price ?? "--",
                    symbol: ""
                }
                setRelField(data.info.nft_address ?? "");
                setCurrencyField(data.info.currency ?? "");
            } else if (data.type === "NFT_LIST_CANCEL") {
                type_obj = {
                    type: "NFT_LIST_CANCEL",
                    from: data.info.seller ?? "--",
                    to: data.info.marketplace ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.price ?? "--",
                    symbol: ""
                }

                setRelField(data.info.nft_address ?? "");
                setCurrencyField(data.info.currency ?? "");
            } else if (data.type === "NFT_BID") {
                type_obj = {
                    type: "NFT_BID",
                    from: data.info.bidder ?? "--",
                    to: data.info.marketplace ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.price ?? "--",
                    symbol: ""
                }

                setRelField(data.info.nft_address ?? "");
                setCurrencyField(data.info.currency ?? "");
            } else if (data.type === "MARKETPLACE_WITHDRAW") {
                type_obj = {
                    type: "MARKETPLACE_WITHDRAW",
                    from: data.info.marketplace ?? "--",
                    to: data.info.withdrawal_destination_account ?? "--",
                    token: "--",
                    action: "--",
                    value: data.info.amount ?? "--",
                    symbol: ""
                }
            }
            else {
                type_obj = {
                    type: "",
                    from: "",
                    to: "",
                    token: "",
                    action: "",
                    value: "",
                    symbol: ""
                }
            }
            setVarFields(type_obj);
            // setVarFields({
            //   ...varFields,
            //   type_field,
            //   dynamic_field_1,
            //   dynamic_field_2,
            //   third_field,
            //   fourth_field,
            //   fee_field,
            //   time_field
            // });
        } catch (err) {
            console.warn(err);
            var type_obj = {
                type: "--",
                from: "--",
                to: "--",
                token: "--",
                action: "--",
                value: "--",
                symbol: "--"
            }
            setVarFields(type_obj);
        }

    }

    const copyValue = (value) => {
        navigator.clipboard.writeText(value);
    }

    useEffect(() => {
        if (relField !== "") getData(cluster, relField);
    }, [relField]);

    useEffect(() => {
        if (currencyField !== "") getCurrency(cluster, currencyField);
    }, [currencyField]);

    useEffect(() => {

        categoriseAction();
    }, []);
    return (
        <div className={styles.sub_txns}>
            <div className="d-flex">
                <div className={styles.thumb_container}>
                    <img src={image} alt="token" />
                </div>
                <div className={styles.txn_details}>
                    <div className={styles.subtxn_token}>
                        <div className="d-flex">
                            <div>
                                {name || relField}
                            </div>
                            <div className={styles.copy_bt}>
                                <button onClick={() => copyValue(relField)}>
                                    <img src={copyIcon} alt="Copy Icon" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        (() => {
                            if (varFields.type === "TRANSFER") {
                                return (
                                    <>
                                        {(wallet === varFields.from) && <div className="row pt-1">
                                            <div className="col-6">
                                                <div className="d-flex">
                                                    <div className="pe-2">
                                                        <div className={styles.field_sub_1}>
                                                            To
                                                        </div>
                                                    </div>
                                                    <div className="pe-1">
                                                        <img src={arrow} alt="" style={{ width: "14px" }} />
                                                    </div>
                                                    <div className="pe-1">
                                                        <div className={styles.field_sub_1}>
                                                            <Link to={`/address/${varFields.to}?cluster=${cluster}`} aria-label={varFields.to} data-balloon-pos="up">{shortenAddress(varFields.to)}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className={`text-end ${styles.field_sub_1}`}>
                                                    <div className={styles.minus_color}>
                                                        - {varFields.value} {(varFields.token === "TOKEN")?"SOL":""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {(wallet === varFields.to) && <div className="row pt-1">
                                            <div className="col-6">
                                                <div className="d-flex">
                                                    <div className="pe-2">
                                                        <div className={styles.field_sub_1}>
                                                            From
                                                        </div>
                                                    </div>
                                                    <div className="pe-1">
                                                        <img src={arrow} alt="" style={{ width: "14px" }} />
                                                    </div>
                                                    <div className="pe-1">
                                                        <div className={styles.field_sub_1}>
                                                            <Link to={`/address/${varFields.from}?cluster=${cluster}`} aria-label={varFields.from} data-balloon-pos="up">{shortenAddress(varFields.from)}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className={`text-end ${styles.field_sub_1}`}>
                                                    <div className={styles.plus_color}>
                                                        + {varFields.value} {(varFields.token === "TOKEN")?"SOL":""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        {(wallet !== varFields.to && wallet !== varFields.from) && <>
                                            <div className="row pt-1">
                                                <div className="col-6">
                                                    <div className="d-flex">
                                                        <div className="pe-2">
                                                            <div className={styles.field_sub_1}>
                                                                From
                                                            </div>
                                                        </div>
                                                        <div className="pe-1">
                                                            <img src={arrow} alt="" style={{ width: "14px" }} />
                                                        </div>
                                                        <div className="pe-2">
                                                            <div className={styles.field_sub_1}>
                                                                <Link to={`/address/${varFields.from}?cluster=${cluster}`} aria-label={varFields.from} data-balloon-pos="up">{varFields.from}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className={`text-end ${styles.field_sub_1}`}>
                                                        <div className={styles.plus}>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row pt-1">
                                                <div className="col-6">
                                                    <div className="d-flex">
                                                        <div className="pe-1">
                                                            <div className={styles.field_sub_1}>
                                                                To
                                                            </div>
                                                        </div>
                                                        <div className="pe-1">
                                                            <img src={arrow} alt="" style={{ width: "14px" }} />
                                                        </div>
                                                        <div className="pe-1">
                                                            <div className={styles.field_sub_1}>
                                                                <Link to={`/address/${varFields.to}?cluster=${cluster}`} aria-label={varFields.to} data-balloon-pos="up">{shortenAddress(varFields.to)}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className={`text-end ${styles.field_sub_1}`}>
                                                        {varFields.value} {(varFields.token === "TOKEN")?"SOL":""}
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    </>


                                )
                            }
                            else if (varFields.type === "MINT") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Mint
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    <img src={arrow} alt="" style={{ width: "14px" }} />
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        <Link to={`/address/${varFields.to}?cluster=${cluster}`} aria-label={varFields.to} data-balloon-pos="up">{shortenAddress(varFields.to)}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div className={styles.plus_color}>
                                                    + {varFields.value} {(varFields.token === "TOKEN")?"SOL":""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "BURN") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Burned
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    {/* <img src={arrow} alt="" style={{ width: "14px" }} /> */}
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        {/* {varFields.to} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div className={styles.minus_color}>
                                                    - {varFields.value} {(varFields.token === "TOKEN")?"SOL":""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "CREATE") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Created
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    {/* <img src={arrow} alt="" style={{ width: "14px" }} /> */}
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        {/* {varFields.to} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div className={styles.plus_color}>
                                                    + 1
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "NFT_LIST") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex justify-content-start">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Listed By
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    {/* <img src={arrow} alt="" style={{ width: "14px" }} /> */}
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        <Link to={`/address/${varFields.from}?cluster=${cluster}`} aria-label={varFields.from} data-balloon-pos="up">{shortenAddress(varFields.from)}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div>
                                                    {varFields.value} {currency}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "NFT_SALE") {
                                return (
                                    <>
                                        <div className="row pt-1">
                                            <div className="col-6">
                                                <div className="d-flex">
                                                    <div className="pe-2">
                                                        <div className={styles.field_sub_1}>
                                                            Sold By
                                                        </div>
                                                    </div>
                                                    <div className="pe-1">
                                                        <img src={arrow} alt="" style={{ width: "14px" }} />
                                                    </div>
                                                    <div className="pe-1">
                                                        <div className={styles.field_sub_1}>
                                                            <Link to={`/address/${varFields.from}?cluster=${cluster}`} aria-label={varFields.from} data-balloon-pos="up">{shortenAddress(varFields.from)}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className={`text-end ${styles.field_sub_1}`}>
                                                    <div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="col-6">
                                                <div className="d-flex">
                                                    <div className="pe-2">
                                                        <div className={styles.field_sub_1}>
                                                            To
                                                        </div>
                                                    </div>
                                                    <div className="pe-1">
                                                        <img src={arrow} alt="" style={{ width: "14px" }} />
                                                    </div>
                                                    <div className="pe-1">
                                                        <div className={styles.field_sub_1}>
                                                            <Link to={`/address/${varFields.to}?cluster=${cluster}`} aria-label={varFields.to} data-balloon-pos="up">{shortenAddress(varFields.to)}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className={`text-end ${styles.field_sub_1}`}>
                                                    {varFields.value} {currency}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            else if (varFields.type === "NFT_LIST_CANCEL") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Listing Cancelled
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    {/* <img src={arrow} alt="" style={{ width: "14px" }} /> */}
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        {/* {varFields.from} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div className={styles.plus}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "NFT_BID") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        Bid
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    <img src={arrow} alt="" style={{ width: "14px" }} />
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        <Link to={`/address/${varFields.from}?cluster=${cluster}`} aria-label={varFields.from} data-balloon-pos="up">{shortenAddress(varFields.from)}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div>
                                                    {varFields.value} {currency}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else if (varFields.type === "MARKETPLACE_WITHDRAW") {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-6">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        By
                                                    </div>
                                                </div>
                                                <div className="pe-1">
                                                    <img src={arrow} alt="" style={{ width: "14px" }} />
                                                </div>
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        <Link to={`/address/${varFields.to}?cluster=${cluster}`} aria-label={varFields.to} data-balloon-pos="up">{shortenAddress(varFields.to)}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`text-end ${styles.field_sub_1}`}>
                                                <div>
                                                    {varFields.value} {currency}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="row pt-1">
                                        <div className="col-10">
                                            <div className="d-flex">
                                                <div className="pe-2">
                                                    <div className={styles.field_sub_1}>
                                                        -
                                                    </div>
                                                </div>
                                                {/* <div className="pe-1">
                                                    <img src={arrow} alt="" style={{ width: "14px" }} />
                                                </div> */}
                                                <div className="pe-1">
                                                    <div className={styles.field_sub_1}>
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className={`text-center ${styles.field_sub_1}`}>
                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        })
                            ()
                    }
                    {/* <div className="row pt-1">
                        <div className="col-10">
                            <div className="d-flex">
                                <div className="pe-1">
                                    <div className={styles.field_sub_1}>
                                        From
                                    </div>
                                </div>
                                <div className="pe-1">
                                    <img src={arrow} alt="" style={{ width: "14px" }} />
                                </div>
                                <div className="pe-1">
                                    <div className={styles.field_sub_1}>
                                        ashbdjhabdhjabdasbdashbdjasd
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className={`text-center ${styles.field_sub_1}`}>
                                <div className={styles.plus}>
                                    + 1
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default SubTransactions;