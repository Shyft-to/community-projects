const Statistics = () => {
    return ( 
    <div>
        <div className="right-al-container">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12 col-lg-7 ps-4">
                        <h2 className="section-heading">Statistics</h2>
                    </div>
                    <div className="col-md-12 col-lg-2 pt-2">
                        <div className="white-form-group">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Start Date"  
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-2 pt-2">
                        <div className="white-form-group">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Start Date"
                                max="06-09-2022" 
                            />
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-1 pt-4">
                       <button className="btn-solid-grad py-2 px-3 mt-1">Go</button>
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
                            <p className="large-text text-end">8</p>
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
                            <p className="large-text text-end">8</p>
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
                            <p className="large-text text-end">8</p>
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
                            <p className="large-text text-end">8</p>
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
                            <p className="large-text text-end">8</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default Statistics;