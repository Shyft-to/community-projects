import astroCoin from '../resources/images/loaders/got-coins.png';
import cross from '../resources/images/loaders/crossIcon.svg';
const CoinsLoader = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
        
            <div className="loading-square">
                
                <div className='text-center mt-3 pt-5'>
                    <div className="text-end">
                        <button className='transparent-btn move' onClick={() => props.closer(false)}><img style={{width:"100%"}} src={cross} alt="" /></button>
                        
                    </div>
                    <img style={{width:"25%"}} src={astroCoin} alt="You got Coins" />
                    <p className="p-para">{props.message} <b>{props.name}</b><br /><b> {(props.name === 'Ganymede')?'10 SHYFT coins':(props.name === 'Valetudo')?'15 SHYFT coins':'5 SHYFT coins'}</b> {props.message2}<br /> {props.message3}</p>
                    <p className="p-para"></p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default CoinsLoader;