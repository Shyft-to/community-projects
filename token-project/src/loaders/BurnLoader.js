import picture from '../resources/images/loader/fire.gif';
const BurnLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center pt-4'>
                    <img src={picture} alt="PictureLoader" />
                <p className="p-para pt-1">Burning Token(s)</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default BurnLoader;