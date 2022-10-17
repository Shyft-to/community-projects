import picture from '../resources/images/loader/coin-loader.gif';
const CreateLoader = () => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center pt-4'>
                    <img src={picture} alt="PictureLoader" />
                <p className="p-para pt-1">Creating Token</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default CreateLoader;