import NftExpanded from "@/components/NftExpanded";
import TokenExpanded from "@/components/TokenExpanded";

const nft = () => {
    return ( 
        <div className="background">
            <div className="container pt-5">
                <NftExpanded />
                {/* <TokenExpanded /> */}
            </div>
        </div>
     );
}
 
export default nft;