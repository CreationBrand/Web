import { isMuted } from "@/service/Rbac";
import useCommunityData from "./useCommunityData";

import BitSet from "bitset";
import { boolean } from "joi";


const useIsMuted = (community_id: any) => {
    let data = useCommunityData(community_id)
    return isMuted(data?.communityHex)
};



export default useIsMuted;