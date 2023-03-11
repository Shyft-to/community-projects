import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressComponent from "./AddressComponent";
import CollectionsComponent from "./CollectionsComponent";
import Home from "./Home";
import ScrollToTop from "./ScrollToTop";
import TokenComponent from "./TokenComponent";
import TxnComponent from "./TxnComponent";

const Parent = () => {
    return ( 
        <div>
            <Router>
                <ScrollToTop />
                <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/address/:addr" element={<AddressComponent />} />
                <Route exact path="/tx/:txn" element={<TxnComponent />} />
                <Route exact path="/collections/:addr" element={<CollectionsComponent />} />
                <Route exact path="/:type/:addr" element={<TokenComponent />} />
                <Route exact path="*" element={<Home />} />
                </Routes>
                
            </Router>
        </div>
     );
}
 
export default Parent;