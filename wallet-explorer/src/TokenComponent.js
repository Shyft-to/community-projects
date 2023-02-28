import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import PlanetLoader from "./components/loaders/loaders";
import NftExpanded from "./components/NftExpanded";
import TokenExpanded from "./components/TokenExpanded";
import Transactions from "./components/TransactionComponent/Transactions";
import { getNFTData, getTokenData } from "./utils/getAllData";

const TokenComponent = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { type, addr } = useParams();
  const cluster = searchParams.get("cluster");

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errOccured, setErrOccured] = useState(false);

  useEffect(() => {
    setLoading(true);
    getClassifiedData();
  }, [cluster]);
  
  const getClassifiedData = async () => {
    try {
      var res;
      if (type === "token") res = await getTokenData(cluster, addr);
      else res = await getNFTData(cluster, addr);

      console.log(res);
      if (res.success === true) {
        setData(res.details);
      } else {
        setErrOccured(true);
        setLoading(false);
      }
    } catch (err) {
      setErrOccured(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data !== null && errOccured === false) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="background_super">
    
    {isLoading && <PlanetLoader />}
    {!isLoading && !errOccured && <div>
      {type === "nft" && (
        <div className="container pt-4">
          <NftExpanded nft={data} />
        </div>
      )}
      {type === "token" && (
        <div className="container pt-4">
          <TokenExpanded token={data} />
        </div>
      )}
    </div>}
    <div className="container pt-4">
        <div className="pt-5">
            <Transactions address={addr} cluster={cluster} />
        </div>
    </div>
    </div>
  );
};

export default TokenComponent;
