import image from '../resources/images/loader/coin-loader.gif'
const TokenLoader = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square px-1">
                <div className='text-center pt-4'>
                    <img src={image} alt="successful" style={{width: "40%"}}/>
                <p className="p-para pt-2" style={{lineHeight: "0.1em"}}>{props.msg1}</p>
                <div className="subtext-msg">{props.msg2}</div>
                </div>
            </div>
        </div>
    </div> 
    );
    // <i className="fas fa-circle-notch fa-spin"></i>
}
 
export default TokenLoader;