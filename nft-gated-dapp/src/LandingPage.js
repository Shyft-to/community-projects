import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { WalletContext } from "./context/WalletContext";
import spaceBoyFlag from './resources/images/space-boy-2.png';

const LandingPage = () => {
    const { walletId } = useContext(WalletContext);
    const navigate = useNavigate();

    const wall = ReactSession.get("uwall") ?? null;
    const auth = ReactSession.get("auth") ?? false;

    useEffect(() => {
      if(walletId === null || walletId !== wall)
        navigate('/');
        
      if(walletId !== wall || auth === false)
        navigate('/');
    
    }, [])
    

    return ( 
        <div className="landing-page">
           <div className="content">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <h2 className="main-heading">
                            Welcome to shyft games
                        </h2>
                        <div className="img-container">
                            <img src={spaceBoyFlag} alt="" />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        
                    </div>
                </div>
            </div>
            
           </div> 
        </div>
     );
}
 
export default LandingPage;