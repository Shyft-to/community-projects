import success from '../resources/images/loader/success.gif';
const SuccessLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square px-1" style={{width: "220px", height: "220px",}}>
                <div className='text-center pt-4'>
                    <img src={success} alt="successful" style={{width: "40%"}}/>
                <p className="p-para pt-2" style={{lineHeight: "0.1em"}}>Success!</p>
                <div className="subtext-msg">Awaiting blockchain confirmation</div>
                </div>
            </div>
        </div>
    </div> 
    );
    // <i className="fas fa-circle-notch fa-spin"></i>
}
 
export default SuccessLoader;