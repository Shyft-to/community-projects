import axios from "axios";
import { useEffect,useState } from "react";
import FetchLoader from "./Loaders/FetchComponent";


const Statistics = () => {
    const [tSales,setTSales] = useState(0);
    const [tVolume,setTVolume] = useState(0);
    const [tListing,setTListing] = useState(0);
    const [tSellers,setTSellers] = useState(0);
    const [listedVolumes,setListedVolumes] = useState(0);
    // const [activList,setActivList] = useState(0);

    const [dateOne,setDateOne] = useState('');
    const [dateTwo,setDateTwo] = useState('');

    const [callThis,setCallThis] = useState(false);
    const [errMsg,setErr] = useState('');

    const [loading,setLoading] = useState(false);


    useEffect(() => {
      const xKey = process.env.REACT_APP_API_KEY;
        const endPoint = process.env.REACT_APP_URL_EP;
        const marketplaceAddress = process.env.REACT_APP_MARKPLACE; 
        setErr('');
        setLoading(true);
        let nftUrl = `${endPoint}marketplace/stats?network=devnet&marketplace_address=${marketplaceAddress}`;
        if(dateOne!=='')
        {
          const todaysDate = new Date();
          const markedDate = new Date(dateOne);
          if(markedDate<=todaysDate)
            nftUrl += `&start_date=${dateOne}` 
          else
            setErr('Start date is from the future, displaying stats untill today');
        }
        if(dateTwo!=='')
        {
          const todaysDate = new Date();
          const markedDate = new Date(dateTwo);
          if(markedDate<todaysDate)
          {
            const markedDateFrom = new Date(dateOne);
            if(dateOne!=='' && markedDateFrom<markedDate)
              nftUrl += `&end_date=${dateTwo}`
            else
              setErr('Error in Dates, displaying stats untill today');
          }
        }
          
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xKey,
            },
          })
            // Handle the response from backend here
            .then((res) => {
                
              //console.log(res.data);
              if(res.data.success === true)
              {
                setTSales(res.data.result.total_sales);
                setTVolume(res.data.result.sales_volume.toFixed(2));
                setTListing(res.data.result.total_listings);
                setTSellers(res.data.result.total_sellers);
                setListedVolumes(res.data.result.listed_volume.toFixed(2));
                // const active_list = ReactSession.get("NumberNfts") ?? 0;
                // setActivList(active_list);

              }
              else
              {
                setErr('Could not get data from the API');
              }
              setLoading(false);
            })
            // Catch errors if any
            .catch((err) => {
              console.warn(err);
              setErr(err.message);
              setLoading(false);
            });
    
     
    }, [callThis])
    
    return ( 
    <div>
        {loading && <FetchLoader />}
        <div className="right-al-container">
            <div className="container-lg statistics-page">
                <div className="row">
                    <div className="col-md-12 col-lg-7 ps-4">
                        <h2 className="section-heading">Statistics</h2>
                    </div>
                    <div className="col-md-12 col-lg-2 pt-2">
                        <div className="white-form-group">
                          <label className="ms-1">Filter From</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Start Date" 
                                onChange={(e)=>setDateOne(e.target.value)} 
                            />
                        </div>
                        {/* {JSON.stringify(dateOne).substring(9,11)+"-"+JSON.stringify(dateOne).substring(6,8)+"-"+JSON.stringify(dateOne).substring(1,5)} */}
                    </div>
                    <div className="col-md-12 col-lg-2 pt-2">
                        <div className="white-form-group">
                            <label className="ms-1">To</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Start Date"
                                max="06-09-2022" 
                                onChange={(e)=>setDateTwo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-1 pt-5 mt-1">
                       <button className="btn-solid-grad py-2 px-3 mt-1" onClick={() => (setCallThis(!callThis))}>Go</button>
                    </div>
                </div>
                <div className="row">
                <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Total Sales
                            </p>
                            <p className="large-text text-end">{tSales}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Total Volume
                            </p>
                            <p className="large-text text-end">{tVolume} <small>SOL</small></p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Total Listings
                            </p>
                            <p className="large-text text-end">{tListing}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Total Sellers
                            </p>
                            <p className="large-text text-end">{tSellers}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Listed Volumes
                            </p>
                            <p className="large-text text-end">{listedVolumes} <small>SOL</small></p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4"
                  >
                    <div className="cards-outer-port">
                      <div className="inner-box">
                        <div className="row px-3 pb-2">
                          <div className="col-12 col-xl-12">
                            <p className="port-para-2 text-center text-xl-start" style={{ wordWrap: "break-word" }}>
                              Active Listings
                            </p>
                            <p className="large-text text-end">{tListing-tSales}</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-md-12">
                    <p className="p-para text-danger text-center">{errMsg}</p>
                  </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default Statistics;