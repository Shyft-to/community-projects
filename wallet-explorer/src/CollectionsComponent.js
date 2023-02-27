import {useState,useEffect} from "react";
import {useSearchParams,useParams} from "react-router-dom";

import styles from "./resources/css/CollectionRow.module.css";
import CollectionRow from "./components/CollectionRow";
import { getCollectionsData } from "./utils/getAllData";

const CollectionsComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { addr } = useParams();
    const cluster = searchParams.get("cluster");
    
    const [isLoading,setLoading] = useState(true);
    const [data,setData] = useState(null);
    const [contentType,setType] = useState('');
    const [errOccured,setErrOccured] = useState(false);

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
      }
    }, [data])
    

    return ( 
        <div>
            <div className="background_super">
                {!isLoading && 
                    <div className={styles.all_collections_page}>
                    <div className="container-lg pt-4">
                        <div className={styles.main_heading}>
                            Collections in your space 
                        </div>
                    </div>
                    {data.map(collection => (<div className="container-lg pt-4">
                        <CollectionRow collection={collection} cluster={cluster}/>

                    </div>))}

                    </div>
                }
            </div>            
        </div>
     );
}
 
export default CollectionsComponent;