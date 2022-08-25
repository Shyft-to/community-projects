
import planets from '../resources/images/loaders/planet-loader.gif'
const PlanetLoader = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center'>
                    <img src={planets} alt="PlanetLoader" />
                    <p className="p-para">{props.message}<b>{props.message2}</b></p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default PlanetLoader;