import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddressComponent from "./AddressComponent";
import Home from "./Home";
import TxnComponent from "./TxnComponent";
const Parent = () => {
    return ( 
        <div>
            <Router>
                <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/address/:addr" element={<AddressComponent />} />
                <Route exact path="/tx/:txn" element={<TxnComponent />} />
                <Route exact path="*" element={<Home />} />
                </Routes>
            </Router>
        </div>
     );
}
 
export default Parent;