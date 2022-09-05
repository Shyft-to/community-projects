import failed from '../resources/images/loader/error.gif';
const FailedLoader = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square px-1" style={{width: "220px", height: "220px",}}>
                <div className='text-center pt-4'>
                    <img src={failed} alt="successful" style={{width: "40%"}}/>
                <p className="p-para pt-2" style={{lineHeight: "0.1em"}}>Failed!</p>
                {/* <div className="subtext-msg">Error Occured</div> */}
                <button onClick={() => props.closer(false)} className="btn-solid-grad my-3 py-2 px-3">Close</button>
                </div>
            </div>
        </div>
    </div> 
    );
    // <i className="fas fa-circle-notch fa-spin"></i>
}
 
export default FailedLoader;