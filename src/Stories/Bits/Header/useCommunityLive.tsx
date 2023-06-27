import { useRecoilState } from "recoil";
import { communitySync } from "State/Sync";


const useCommunityLive = (active: boolean, community_id: any) => {

    const [data, setData] = useRecoilState(communitySync(community_id))

    return data
}

export default useCommunityLive