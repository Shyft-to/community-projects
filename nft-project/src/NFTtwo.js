import axios from "axios";
import { useEffect,useState } from "react";

import imgThumb from './resources/images/img-thumb.png';

const NftTwo = (props) => {
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    //console.log("Current NFT printed",props.nft);
    // useEffect(() => {
    //     const endPoint = process.env.REACT_APP_URL_EP;
    //     const xKey = process.env.REACT_APP_API_KEY;

    //     let reqUrl = `${endPoint}nft/read?network=devnet&token_address=${props.nft.nft_address}`;

    //     axios({
    //         url: reqUrl,
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-api-key": xKey,
    //         },
    //     })
    //         .then((res) => {
    //             console.log(res.data.success);
                
    //             if (res.data.success) {
    //                 setName(res.data.result.name)
    //                 setImage(res.data.result.image_uri)
    //             }
                

    //         })
    //         .catch((err) => {
    //             console.warn(err);
                

    //         });

    // }, [props.nft.nft_address]);
    return (

        //(props.nft&&
        <div
            className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
        >
            <div className="cards-outer-port">
                <div className="inner-box">

                    <div className="inner-box-img-container">
                        <img src={props.nft.nft.cached_image_uri ?? props.nft.nft.image_uri ?? imgThumb} alt="NftImage" />
                    </div>

                    <div className="row pt-3">
                        <div className="col-12 col-xl-7">
                            <p
                                className="port-para-2 text-start"
                                style={{ wordWrap: "break-word" }}
                            >
                                {(props.nft.nft.name.length>9)?props.nft.nft.name.substring(0, 9)+'...':props.nft.nft.name}
                            </p>
                        </div>
                        <div className="col-12 col-xl-5">
                            <p
                                className="port-para-2 text-end"
                                style={{ wordWrap: "break-word" }}
                            >
                                {JSON.stringify(props.nft.price)} {props.nft.currency_symbol}
                            </p>
                        </div>

                    </div>
                    {/* <div className="row pt-1 pb-3">
                        <div className="col-12 col-xl-6 mx-auto">
                            <div className="white-button-container-sm" ><button onClick={() => {props.buyList(props.nft.nft_address,props.nft.seller_address,props.nft.price)}}>Buy</button></div>
                        </div>
                        

                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default NftTwo;
