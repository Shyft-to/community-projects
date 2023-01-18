import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import imgThumb from './resources/images/img-thumb.png';

const NftDiscordOne = (props) => {
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    
    return (
        <div
            className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 port-cust-padding"
        >
            <div className="cards-outer-port">
                <div className="inner-box">

                    <div className="inner-box-img-container">
                        <img src={props.nft.nft.cached_image_uri ?? props.nft.nft.image_uri ?? imgThumb} alt="NftImage" />
                    </div>

                    <div className="row pt-3 pb-2">
                        <div className="col-12 col-xl-12">
                            <div
                                className="port-para-2 text-start"
                                style={{ wordWrap: "break-word" }}
                            >
                                {(props.nft.nft.name.length>10)?props.nft.nft.name.substring(0, 10)+'...':props.nft.nft.name}
                            </div>
                        </div>
                        

                    </div>
                    <div className="row pb-1">
                        <div className="col-sm-12 col-md-6">
                            <p
                                className="port-para-2 text-start text-xl-start"
                                style={{ wordWrap: "break-word" }}
                            >
                                {JSON.stringify(props.nft.price) }{" "+props.nft.currency_symbol}
                            </p>
                        </div>
                        {(!props.walletId)?
                            <div className="col-sm-12 col-md-6">
                            <div className="white-button-container-sm">
                                <button
                                  onClick={() => alert("Please connect phantom")}
                                >
                                  Buy
                                </button>
                            </div>
                        </div>:
                        <div className="col-sm-12 col-md-6">
                            <div className="white-button-container-sm">{((props.nft.seller_address===props.walletId)?<button>Listed</button>:<button onClick={() => {props.buyList(props.nft.nft_address,props.nft.seller_address,props.nft.price)}}>Buy</button>)}</div>
                        </div>
                        }
                        

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NftDiscordOne;
