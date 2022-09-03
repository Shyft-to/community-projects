const UnListLoader = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="list-square">
                    <div className='text-center p-1'>
                        <img src={props.listingURI} alt="nftloader" style={{width: "50%"}}/>
                    <p className="p-para pt-2">{props.listingName}</p>
                    <div className="white-form-group">
                        <input type="number" className="form-control" placeholder="Enter Price" value={props.listingPrice} onChange={(e) => {
                          props.setListingPrice(e.target.value);
                        }} />
                    </div>
                    <div>
                        <button className="btn-solid-grad" onClick={() => props.listNFT(props.listingNFT)}>List</button>
                        <button className="btn-solid-grad" onClick={props.closePopupList}>Close</button>
                    </div>
                    <div className="text-center text-danger">{props.errMessg}</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UnListLoader;