const TransferLoader = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="list-square" style={{height: "220px"}}>
                    <div className='text-center p-1'>
                        <div className="white-form-group">
                        <label className="form-label" htmlFor="name">
                            Address of the NFT receiver
                        </label>

                        <input
                            type="text"
                            name="externalUrl"
                            value={props.transAddr}
                            onChange={(e) => props.setTransAddr(e.target.value)}
                            className="form-control"
                            placeholder="Enter Wallet Address"
                        />
                        </div>
                        
                        <div className="pt-1">
                            <button className="btn-solid-grad" onClick={() => props.buyNow()}>Transfer</button>
                            <button className="btn-solid-grad" onClick={() => props.setTransPop(false)}>Cancel</button>
                        </div>
                        <div className="p-para text-danger">{props.errorMsgBuy}</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default TransferLoader;