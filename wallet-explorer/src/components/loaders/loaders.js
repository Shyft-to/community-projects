
import planets from '../../resources/images/planet_loader_2.gif'
const PlanetLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center'>
                    <img src={planets} alt="PlanetLoader" />
                    <p className="p-para">Loading Data</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default PlanetLoader;