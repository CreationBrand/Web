import useCommunityData from "Hooks/Pull/useCommunityData";
import { boolean } from "joi";





const useIsMuted = (community_id:any) => {

    let data = useCommunityData(community_id)

// console.log('data', data)   

// let new bitSet()
//     return Boolean( new BitSet(data?.communityHex))

};



export default useIsMuted;