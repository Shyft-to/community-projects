import {useState,useEffect} from "react";
import {useSearchParams,useParams} from "react-router-dom";
import ReactGA from "react-ga4";

import styles from "./resources/css/CollectionRow.module.css";
import CollectionRow from "./components/CollectionRow";
import SimpleLoader from "./components/loaders/SimpleLoader";

import { getCollectionsData } from "./utils/getAllData";
import Transactions from "./components/TransactionComponent/Transactions";
import SearchComponent from "./components/SearchComponent";

const CollectionsComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { addr } = useParams();
    const cluster = searchParams.get("cluster");
    const collectionName = searchParams.get("collName") ?? "";
    
    const [isLoading,setLoading] = useState(true);
    const [data,setData] = useState(null);
    const [contentType,setType] = useState('');
    const [errOccured,setErrOccured] = useState(false);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/collections", title: "Collections" });
    }, []);

    useEffect(() => {
        setLoading(true);
        getClassifiedData();
    }, [cluster]);

    const getClassifiedData = async() => {
      
        try{
            const res = await getCollectionsData(cluster,addr);
            console.log(res);
            if(res.success === true)
            {
                setData(res.details);
            }
            else
            {
                setErrOccured(true);
                setLoading(false);
            }
        }
        catch(err)
        {
            setErrOccured(true);
            setLoading(false);
        }
        
    }
    
    useEffect(() => {
      if(data !== null && errOccured === false)
      {
        setLoading(false);
        setTimeout(() => {
            if(collectionName !== "")
            {
                // console.log("The translated collection name",collectionName);
                document.getElementById(collectionName).scrollIntoView();  
            }
            
        }, 3000);
      }
    }, [data])
    

    return ( 
        <div>
            <div className="background_super">
                
                <div className="container pt-2 pb-1">
                    <SearchComponent />
                </div>
                {isLoading && 
                <div className="pt-5 mt-3">
                    <SimpleLoader />
                </div>
                }
                {!isLoading && 
                    <div className={styles.all_collections_page}>
                    <div className="container-lg pt-4">
                        <div className={styles.main_heading}>
                            Collections in your space 
                        </div>
                    </div>
                    {data.map(collection => (<div className="container-lg pt-5" id={collection.name}>
                        <CollectionRow collection={collection} cluster={cluster}/>

                    </div>))}

                    </div>
                }
                <div className="container pt-4">
                    {/* <div className="pt-5">
                        <Transactions address={addr} cluster={cluster} />
                    </div> */}
                </div>
            </div>            
        </div>
     );
}
 
export default CollectionsComponent;