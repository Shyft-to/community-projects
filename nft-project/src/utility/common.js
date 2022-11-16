import {  clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

import { confirmTransactionFromFrontend,confirmTransactionsFromFrontend } from './shyft';
import { clusterUrl } from "./utilityfunc";

export async function connectTheWallet()
{
    const { solana } = window;
    let res = {success: false, message:"Could not connect wallet", addr:""};
    if(!solana)
    {
        alert("Please Install Phantom");
    }
    try{  
        const network = "devnet";
        const phantom = new PhantomWalletAdapter();
        await phantom.disconnect();
        await phantom.connect();
        const rpcUrl = clusterApiUrl(network);
        const connection = new Connection(rpcUrl,"confirmed");
        
        const wallet = {
            address: phantom.publicKey.toBase58(),
        };

        if(wallet.address)
        {
            const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address),"confirmed");
            console.log(accountInfo); 
            res.success = true;
            res.message = "Wallet connected successfully";
            res.addr = wallet.address;
        }

    }
    catch(err)
    {
        console.log(err);
    }
    return res;
}

export async function signAndConfirmTransaction(network,transaction,callback)
{
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterUrl(network);
    const connection = new Connection(rpcUrl,"confirmed");
    //console.log(connection.rpcEndpoint);
    const ret = await confirmTransactionFromFrontend(connection,transaction,phantom);
    // const checks = await connection.confirmTransaction({signature:ret},'finalised');
    console.log(ret);
    // console.log(checks);
    // await connection.confirmTransaction({
    //     blockhash: transaction.blockhash,
    //     signature: ret,
    //   });
    connection.onSignature(ret,callback,'finalized')
    return ret;
}
// export async function signAndConfirmTransactions(network,transactions,callback)
// {
//     const phantom = new PhantomWalletAdapter();
//     await phantom.connect();
//     const rpcUrl = clusterUrl(network);
//     const connection = new Connection(rpcUrl,"confirmed");
//     //console.log(connection.rpcEndpoint);
//     var ret = "";
//     await transactions.forEach(async (transaction,index) => {
//         ret = await confirmTransactionFromFrontend(connection,transaction,phantom);
        
//         if(index === (transactions.length - 1))
//         {
//             connection.onSignature(ret,callback,'finalized')
//             return ret;
//         }
//     });
//     // console.log("Signing Complete");
//     // return "Signing Complete";
    
// }
export async function signAndConfirmTransactions(network,transactions,callback)
{
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterUrl(network);
    const connection = new Connection(rpcUrl,"confirmed");
    const ret = await confirmTransactionsFromFrontend(connection,transactions,phantom);
    // console.log("After return");
    // console.log(ret);
    console.log("Finalizing Transaction");
    connection.onSignature(ret[0],callback,'finalized')
    return ret;
    
}