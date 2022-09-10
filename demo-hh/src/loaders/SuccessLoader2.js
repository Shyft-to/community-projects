import ufo from '../resources/images/loaders/space-success.gif'
const SuccessLoader2 = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center'>
                    <img src={ufo} alt="PlanetLoader" style={{width: "30%"}}/>
                    <p className="p-para">{props.message}</p>
                    <div className='d-flex justify-content-center'>
                        <div className="px-2 pb-5">
                            <button className='btn-solid-grad-xs' onClick={props.navigateHome}> Ok </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default SuccessLoader2;