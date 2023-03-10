import moment from "moment";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export function shortenAddress(address)
{
    var trimmedString = "";
    if(address === "")
        return "unknown";
    if(address != null || address.length>16)
    {
        trimmedString=(address.substring(0,8)+"..."+address.substring(address.length - 5));
    }
    else
    {
        trimmedString = address ?? ""; 
    }
    return trimmedString;
}

export function getRelativetime(ISOString)
{
    return moment(ISOString).fromNow();
}

export function getFullTime(ISOString)
{
    return (moment(ISOString).format('lll') + " (UTC)");
}

export function formatLamports(value)
{
    if(typeof value === "number")
        return (parseFloat(value)/LAMPORTS_PER_SOL);
    else
        return "--";
}