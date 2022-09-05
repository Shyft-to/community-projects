const ListLoader = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="list-square">
                    <div className='text-center p-1'>
                        <div className="bg-primary closecross-section"><button onClick={props.closePopupList} style={{float:"right"}}><i className="fa fa-times"></i></button></div>
                        <img src={props.listingURI} alt="nftloader" />
                        <p className="p-para pt-2">{props.listingName}</p>
                        <div className="white-form-group">
                            <input type="number" className="form-control" placeholder="Ask Price?" min="0" onChange={(e) => {
                                if(!e.target.value)
                                {
                                    props.setErrMessg('Value Must be a Number and not less than 0');
                                }
                            props.setListingPrice(e.target.value);
                            }} />
                        </div>
                        <div>
                            <button className="btn-solid-grad" onClick={() => props.listNFT(props.listingNFT)}>List</button>
                            
                        </div>
                        <div className="text-center text-danger">{props.errMessg}</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ListLoader;