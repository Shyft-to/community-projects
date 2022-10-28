import cross from './resources/images/circle-cross.svg';
const PassPopup = (props) => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="loading-square-pass">
                    <div className='text-center p-1'>
                        <button className="popup-closer" onClick={() => props.closer(false)}><img src={cross} alt="" /></button>
                        <h3 className="popup-title">Get your travel Visa</h3>
                        <div className="row py-3">
                            <div className="col-12 col-lg-5">
                                <img className="img-fluid" src={props.popImg} alt="" />
                            </div>
                            <div className="col-12 col-lg-7">
                                <h6 className="popup-name">{props.name}</h6>
                                <h4>Planet Story</h4>
                                <p className="popup-story">{props.desc}</p>
                                <button className="popup-button" onClick={() => props.MintNow(props.mAddr,props.name)}>
                                    Mint NFT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PassPopup;