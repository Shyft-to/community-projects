import ufo from '../resources/images/loaders/space-success.gif'
const SuccessLoader = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center'>
                    <img src={ufo} alt="PlanetLoader" style={{width: "30%"}}/>
                    <p className="p-para px-2">{props.message}</p>
                    <div className='d-flex justify-content-center'>
                        <div className="px-2 pb-5">
                            <button className='btn-solid-grad-xs' onClick={() => {
                                props.setSuccessState(false);
                                props.navigateToPlanet();
                            }}>Let's Go</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default SuccessLoader;