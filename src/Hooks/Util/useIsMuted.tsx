import useCommunityData from "Hooks/Pull/useCommunityData";
import { isMuted } from "Service/Rbac";
import BitSet from "bitset";
import { boolean } from "joi";





const useIsMuted = (community_id: any) => {
    let data = useCommunityData(community_id)
    return isMuted(data?.communityHex)
};



export default useIsMuted;