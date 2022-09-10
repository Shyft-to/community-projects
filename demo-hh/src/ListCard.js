import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const ListCard = (props) => {
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    useEffect(() => {
        const endPoint = process.env.REACT_APP_URL_EP;
        const xKey = process.env.REACT_APP_API_KEY;

        let reqUrl = `${endPoint}nft/read?network=devnet&token_address=${props.nft.nft_address}`;

        axios({
            url: reqUrl,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
        })
            .then((res) => {
                console.log(res.data);
                
                if (res.data.success) {
                    setName(res.data.result.name)
                    setImage(res.data.result.cached_image_uri)
                }
                

            })
            .catch((err) => {
                console.warn(err);
                

            });
    }, [props.nft.nft_address]);
    return (
        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 p-4">
            <div className="dark-cards-mp">
                <div className="image-container">
                    <img src={image} alt="Planet-1" />
                </div>
                <div className="text-section-1 ">
                    <div>
                        <p className="p-name-1">{(name.length>20)?name.substring(0, 10)+'...':name}</p>
                    </div>
                    
                </div>
                <div className="text-section d-flex flex-wrap justify-content-between">
                    <div>
                        <p className="p-name pt-2">{JSON.stringify(props.nft.price) }{" "+props.nft.currency_symbol}</p>
                    </div>
                    <div>
                        <div className="small-btn-outline">
                            <button onClick={() => {props.buyList(props.nft.nft_address,props.nft.seller_address,props.nft.price)}}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListCard;
