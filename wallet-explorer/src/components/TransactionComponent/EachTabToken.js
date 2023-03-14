
import { motion } from "framer-motion";
import { useState } from "react";
import Tooltip from 'react-tooltip-lite';
import solScan from "../../resources/images/txnImages/sol_scan_icon.svg";
import solExplorer from "../../resources/images/txnImages/solana_explorer.jpeg";
import copyIcon from "../../resources/images/txnImages/copy_icon.svg";
import unknown from "../../resources/images/txnImages/unknown_token.png";
import { Link } from "react-router-dom";
import { shortenAddress } from "../../utils/formatter";

const EachTabToken = ({ styles, token, cluster }) => {
    const [copied, setCopied] = useState("Copy");
    const copyValue = (value) => {
        navigator.clipboard.writeText(value);
        setCopied("Copied✅");
        setTimeout(() => {
            setCopied("Copy");
        }, 1000);
    }

    return (
        <div className={styles.each_tab_token}>
            <div className={styles.toggle_button}>
                <div className="pe-1">
                    <Tooltip
                        content={copied}
                        className="myTarget"
                        direction="left"
                        // eventOn="onClick"
                        // eventOff="onMouseLeave"
                        useHover={true}
                        background="#101010"
                        color="#fefefe"
                        arrowSize={0}
                    >
                        <motion.button className={styles.copyTxnSig} onClick={() => copyValue(token.address)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <img src={copyIcon} alt="Copy Value" />
                        </motion.button>
                    </Tooltip>

                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <motion.a href={(cluster === "mainnet-beta") ? `https://solscan.io/token/${token.address}` : `https://solscan.io/token/${token.address}?cluster=${cluster}`} target="_blank">
                        <div className={styles.sol_icon}>
                            <img src={solScan} alt="View on SolScan" />
                        </div>
                    </motion.a>
                </motion.div>
                {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <a href={`https://explorer.solana.com/address/${token.address}?cluster=${cluster}`} target="_blank">
                        <div className={styles.sol_icon_2}>
                            <img src={solExplorer} alt="View on SolExplorer" />
                        </div>
                    </a>
                </motion.div> */}

            </div>
            <div className={styles.name_section}>
                <div className="d-flex flex-wrap">
                    <div className={styles.name}>{token.info.name || "Unknown"}</div>
                    <div className={styles.sub_name}>{token.info.symbol}</div>
                </div>
                <div className={styles.sub_name_mob}>{token.info.symbol}</div>
            </div>
            <div className={styles.info_section}>
                <div className="row">
                    <div className="col-12 col-md-1">
                        <div className={styles.token_image_container}>
                            <img src={token.info.image || unknown} alt="Unknown Token" />
                        </div>
                    </div>
                    <div className="col-6 col-md-6 text-start">
                        <div className={styles.field}>
                            <Link to={`/address/${token.address}?cluster=${cluster}`}>
                                {shortenAddress(token.address) || "unknown"}

                            </Link>
                        </div>
                    </div>
                    <div className="col-6 col-md-5 text-end">
                        <div className={styles.field}>
                            {token.balance}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default EachTabToken;