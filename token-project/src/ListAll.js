import { useContext, useState,useEffect } from "react";
import axios from 'axios';
import { WalletContext } from "./WalletContext";
import { useNavigate,useParams  } from "react-router-dom";

const ListAll = () => {
    const {walletId,setWalletId} = useContext(WalletContext);
    const [coins,setCoins] = useState(null);
    const [network,setNetwork] = useState('devnet');
    const navigate = useNavigate();
    //const [isLoaded,setLoaded] = useState(false);
    
    const {waddress} = useParams();
    useEffect(() => {
        if( !waddress )
        {
            console.log('Wallet Not connected')
            navigate('/');
        }
        else
        {
            setWalletId(waddress);
        }
    },[])
    

    useEffect(() => {
        const endPoint = process.env.REACT_APP_URL_EP;
        const xKey = process.env.REACT_APP_API_KEY.toString();

        let reqUrl = `12${endPoint}wallet/all_tokens?network=devnet&wallet=${waddress}`;
    
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
                if(res.data.success)
                {
                    setCoins(res.data.result);
                }
                else
                {
                    setCoins(null);
                }
            })
            .catch((err) => {
                console.warn(err);
                setCoins(null);
            });
      
    }, [walletId]);
    

    return ( 
        <div>
            <div className="right-al-container">
                <div className="container-lg">
                    <div className="p-1">
                        <h2 className="section-heading" style={{padding: "80px 0px 40px"}}>All Your Tokens</h2>

                        <div className="row dark-head-table">
                            <div className="col-12 col-sm-10 content">Token Address</div>
                            <div className="col-12 col-sm-2 content">Balance</div>
                        </div>
                        
                        {
                            !coins && (
                                <div className="text-center">
                                    No tokes to show
                                </div>
                            )
                        }
                        {
                            coins && coins.map((coin) => (
                                <div className="row light-table-body" key={coin.address}>
                                    <div className="col-12 col-sm-10 content">{coin.address}</div>
                                    <div className="col-12 col-sm-2 content">{coin.balance}</div>
                                </div>
                            )) 
                        }
                        
                        {/* <div className="row light-table-body">
                            <div className="col-12 col-sm-10 content">asdaAvS3avds0asd1123123assad41d1e1</div>
                            <div className="col-12 col-sm-2 content">12.1 ETH</div>
                        </div> */}
                        
                    </div>
                    
                </div>
            </div>  
        </div> 
    );
}
 
export default ListAll;