import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import ReactGA from "react-ga4";

import styles from "./resources/css/CollectionRow.module.css";
import CollectionRow from "./components/CollectionRow";
import SimpleLoader from "./components/loaders/SimpleLoader";

import { getCollectionsData } from "./utils/getAllData";
import Transactions from "./components/TransactionComponent/Transactions";
import SearchComponent from "./components/SearchComponent";
import CollectionRowSlice from "./components/CollectionRowSlice";

const SingleCollectionComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { addr } = useParams();
    const cluster = searchParams.get("cluster");
    const collectionName = searchParams.get("collName") ?? "";

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [contentType, setType] = useState('');
    const [errOccured, setErrOccured] = useState(false);

    useEffect(() => {
        setLoading(true);
        getClassifiedData();
    }, [cluster]);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: "/collection", title: "Single Collection" });
    }, []);

    const getClassifiedData = async () => {

        try {
            const res = await getCollectionsData(cluster, addr);
            console.log(res);
            if (res.success === true) {
                setData(res.details);
            }
            else {
                setErrOccured(true);
                setLoading(false);
            }
        }
        catch (err) {
            setErrOccured(true);
            setLoading(false);
        }

    }

    useEffect(() => {
        if (data !== null && errOccured === false) {
            setLoading(false);
            // setTimeout(() => {
            //     if(collectionName !== "")
            //     {
            //         console.log("The translated collection name",collectionName);
            //         document.getElementById(collectionName).scrollIntoView();  
            //     }

            // }, 3000);
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
                            {/* <div className={styles.main_heading}>
                                NFTs from this Collection
                            </div> */}
                        </div>
                        {
                            (collectionName !== "") ? (data.filter(collection => collection.name === collectionName)).map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                                <CollectionRow collection={collection} cluster={cluster} />

                            </div>)) :
                                data.map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                                    <CollectionRow collection={collection} cluster={cluster} />

                                </div>))
                        }
                        {/* {data.map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                        <CollectionRow collection={collection} cluster={cluster}/>

                    </div>))} */}

                    </div>
                }
                {!isLoading &&
                    <div className={styles.all_collections_page}>
                        <div className="container-lg pt-5">
                            <div className={styles.main_heading}>
                                More Collections from this wallet
                            </div>
                        </div>
                        {
                            (collectionName !== "") ? (data.filter(collection => collection.name !== collectionName)).map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                                <CollectionRowSlice collection={collection} cluster={cluster} />

                            </div>)) :
                                data.map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                                    <CollectionRow collection={collection} cluster={cluster} />
                                    
                                </div>))
                        }
                        {/* {data.map(collection => (<div className="container-lg pt-4" id={collection.name} key={Math.random()}>
                        <CollectionRow collection={collection} cluster={cluster}/>

                    </div>))} */}

                    </div>
                }
            </div>
        </div>
    );
}

export default SingleCollectionComponent;