import Head from 'next/head'
const StandardHead = () => {
    return ( 
        <Head>
            <title>Wallet Explorer | SHYFT</title>
            <meta name="description" content="This wallet explorer was built using SHYFT APIs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
     );
}
 
export default StandardHead;