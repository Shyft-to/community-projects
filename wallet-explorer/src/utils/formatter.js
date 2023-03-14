import moment from "moment";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function shortenAddress(address) {
    var trimmedString = "";
    if (address === "")
        return "unknown";
    if (address != null || address.length > 16) {
        trimmedString = (address.substring(0, 8) + "..." + address.substring(address.length - 5));
    }
    else {
        trimmedString = address ?? "";
    }
    return trimmedString;
}

export function getRelativetime(ISOString) {
    return moment(ISOString).fromNow();
}

export function getFullTime(ISOString) {
    return (moment(ISOString).format('lll') + " (UTC)");
}

export function formatLamports(value) {
    try {
        if (typeof value === "number")
            return (parseFloat(value) / LAMPORTS_PER_SOL);
        else
            return value;
    } catch (error) {
        return value;
    }

}

export function formatNames(name) {
    try {
        if (name.includes("_")) {
            var words = name.split("_");
            var capitalizedText = "";
            for (let index = 0; index < words.length; index++) {
                capitalizedText += capitalizeText(words[index]) + " ";
            }
            return capitalizedText;
        }
        else
            return (capitalizeText(name))
    } catch (error) {
        return name;
    }

}
function capitalizeText(text) {
    try {
        if (text === "NFT")
            return "NFT";
        else if (text === "SOL")
            return "SOL";
        else
            return text[0].toUpperCase() + text.substring(1).toLowerCase();
    } catch (error) {
        return text;
    }

}