import picture from '../resources/images/loader/picture.gif';
const UpdateLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center pt-4'>
                    <img src={picture} alt="Hourglass" style={{width: "60%"}}/>
                <p className="p-para pt-1">Updating NFT</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default UpdateLoader;