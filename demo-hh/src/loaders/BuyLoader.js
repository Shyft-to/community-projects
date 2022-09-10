const BuyLoader = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="loading-square">
                    <div className='text-center p-1'>
                        {/* <img src={props.listingURI} alt="nftloader" style={{width: "50%"}}/> */}
                        <p className="p-para py-2">Confirm Purchase for {props.price} SFC?</p>
                        
                        
                        <div className="pt-1 d-flex justify-content-center">
                            <div className="px-2">
                                <button className="btn-solid-grad-xs" onClick={() => props.buyNow(props.nfAddr)}>Yes</button>
                            </div>
                            <div className="px-2">
                                <button className="btn-solid-grad-xs" onClick={props.closePopupList}>No</button>
                            </div>
                        </div>
                        <div className="p-para text-danger">{props.errorMsgBuy}</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default BuyLoader;