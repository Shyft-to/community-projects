import picture from '../resources/images/loader/transfer.gif';
const TransitLoader = () => {
    return ( 
        <div>
            <div className="full-overlay">
                <div className="loading-square">
                    <div className='text-center pt-4'>
                        <img src={picture} alt="PictureLoader" style={{width: "70%"}}/>
                    <p className="p-para pt-1">In Transit</p>
                    </div>
                </div>
            </div>
        </div> 
        );
}
 
export default TransitLoader;