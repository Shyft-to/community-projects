import nft from '../resources/images/loader/nft.gif';
const FetchLoaderGen = (props) => {
    return ( 
    <div>
        <div className="full-overlay">
            <div className="loading-square">
                <div className='text-center pt-4'>
                    <img src={nft} alt="nftloader" style={{width: "50%"}}/>
                <p className="p-para pt-2 px-1">{props.message}</p>
                </div>
            </div>
        </div>
    </div> 
    );
}
 
export default FetchLoaderGen;