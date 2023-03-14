import { Link } from "react-router-dom";

const Four04 = () => {
    return ( 
        <div className="background">
            <div className="d-flex justify-content-center align-content-center flex-wrap h-100">
                <div className="text-center">
                    <div className="four04">Page Not Found!</div>
                    <Link to="/" className="four04_button" >Translate New</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Four04;