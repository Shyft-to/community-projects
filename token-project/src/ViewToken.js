const ViewToken = () => {
    return (
        
        <div className="right-al-container">
            <div className="fixed-price-page generic-ball-background right-al-container">
                <div className="container-xl">
                    <div className="row title-container" style={{marginTop: "5px"}}>
                        <div className="col-md-12">
                            <h2 className="section-heading-nft"></h2>
                        </div>
                    </div>
                </div>
                <div className="container-xl">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="image-sub-section">

                                <div className="image-container">
                                    <img className="image-nft" src="https://www.lifewire.com/thmb/8MhWKwi4GEGiYRT6P56TBvyrkYA=/1326x1326/smart/filters:no_upscale()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg" alt="NFT" />
                                </div>
                                <div className="img-subtext text-center">
                                    <a href="" target="_blank" className="no-decor" rel="noreferrer">
                                        <h6>View Original</h6>
                                    </a>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="text-section px-3">
                                <h6 className="p-para-headings"></h6>
                                
                                <h6 className="p-para-headings">Description</h6>
                                <p className="p-para-light">
                                    
                                </p>

                                <h6 className="p-para-headings">Symbol</h6>
                                <p className="p-para-light">
                                    
                                </p>
                                
                                <h6 className="p-para-headings">Details</h6>
                                <div className="details-table">
                                    <div className="row">
                                        <div className="col-8">Royalty</div>
                                        <div className="col-4 text-end"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Mint Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/?cluster=`} target="_blank" className="no-decor" rel="noreferrer"></a></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">Owner Address</div>
                                        <div className="col-8 text-end" style={{wordWrap: "break-word"}}><a href={`https://explorer.solana.com/address/?cluster=`} target="_blank" className="no-decor" rel="noreferrer"></a></div>
                                    </div>
                                </div>

                                <h6 className="p-para-headings">Attributes</h6>
                                <div id="attr" className="details-table">
                                      
                                </div>
                                {/* {
                                    Object.entries(attrib).forEach(([key, value]) => {
                                    document.getElementById("attr").innerHTML +=  (`<div class="row">
                                        <div class="col-8" style="word-wrap: break-word;">${key}</div>
                                        <div class="col-4 text-end" style="word-wrap: break-word;">${value}</div>
                                    </div>`)
                                    })
                                } */}
                                <div class="row">
                                    <div class="col-8"></div>
                                    <div class="col-4 text-end"></div>
                                </div>
                                <div class="row">
                                    <div class="col-8"></div>
                                    <div class="col-4 text-end"></div>
                                </div>
                                <div class="row">
                                    <div class="col-8"></div>
                                    <div class="col-4 text-end"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    

                </div>

            </div>
        </div>);
}

export default ViewToken;