import picture from '../resources/images/loader/fire.gif';
const BurnLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center pt-4'>
                    <img src={picture} alt="PictureLoader" style={{width: "60%"}}/>
                <p className="p-para pt-1">Burning NFT</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default BurnLoader;