import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ListNFTs = () => {
    const { waddress, network } = useParams();
    

    const [walletAddress, setAddress] = useState('');
    const [net, setNet] = useState('');

    const [nfts, setNfts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errOcc, setErrOcc] = useState(false);

    useEffect(() => {
        document.getElementById("mySidenav").style.display = "none";
        if (!waddress || !network) {
            console.log('Wallet address not found');
            setErrOcc(true);
            setLoaded(true);
        }
        else {
            setAddress(waddress);
            setNet(network);
        }

    }, []);

    useEffect(() => {
        if (walletAddress !== '' && net !== '') {
            const xKey = process.env.REACT_APP_API_KEY;
            const endPoint = process.env.REACT_APP_URL_EP;
            let nftUrl = `${endPoint}nft/read_all?network=${net}&address=${walletAddress}`;

            axios({
                // Endpoint to get NFTs
                url: nftUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": xKey,
                },
            })
                // Handle the response from backend here
                .then((res) => {
                    if (res.data.success === true) {
                        setErrOcc(false);
                        setNfts(res.data.result);
                    }
                    else {
                        setErrOcc(true);
                        setNfts([]);
                    }
                    setLoaded(true);

                })
                // Catch errors if any
                .catch((err) => {
                    console.warn(err);
                    setErrOcc(true);
                    setNfts([]);
                    setLoaded(true);
                });
        }

    }, [walletAddress, net])


    return (
        <div>
            <div className="container-lg mt-5">
                <h2 className="section-heading">
                    {loaded && !errOcc && `${nfts.length} NFT(s) Found`}
                </h2>
            </div>
            <div className="container-lg">
                <h2 className="section-heading">
                    {errOcc && `Cannot Load Your Assets`}
                </h2>
            </div>
            <div className="container-lg">
                <div className="row">
                    {loaded &&
                        nfts.map((nft) => (
                            <div
                                className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
                                key={nft.mint}
                            >
                                <div className="cards-outer-port">
                                    <div className="inner-box">
                                        <Link
                                            to={'#'}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className="inner-box-img-container">
                                                <img src={nft.cached_image_uri} alt="NftImage" />
                                            </div>
                                        </Link>
                                        <div className="row pt-3 pb-2">
                                            <div className="col-12 col-xl-6">
                                                <p
                                                    className="port-para-2 text-center text-xl-start"
                                                    style={{ wordWrap: "break-word" }}
                                                >
                                                    {(nft.name.length > 8) ? nft.name.substring(0, 8) + '...' : nft.name}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ListNFTs;