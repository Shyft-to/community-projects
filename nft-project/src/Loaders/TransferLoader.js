const TransferLoader = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="list-square" style={{minHeight: "240px"}}>
                    <div className='text-center p-1'>
                        
                        <div className="white-form-group">
                        <p className="p-para">Receiver Wallet Address</p>
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
                            <button className="btn-solid-grad" onClick={props.startListing}>Transfer</button>
                            <button className="btn-solid-grad" onClick={() => props.setTransPop(false)}>Cancel</button>
                        </div>
                        <div className="p-para text-danger pt-3">{props.recErr}</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default TransferLoader;