
import { communitySync } from "@/state/sync";
import { useEffect } from "react"
import { useRecoilState } from "recoil";
import { socketRequest } from "./util/useSocket";

let isFetching = false

const useCommunityData = (community_id: any) => {

    const [inSync, setSync] = useRecoilState(communitySync(community_id))

    useEffect(() => {
        if (!community_id) return
        (async () => {
            if (inSync?.community?.public_id) {
                return
            } else {
                if (isFetching) return
                isFetching = true
                let req: any = await socketRequest('community', { community_id: community_id })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Community: ${community_id}`);
                isFetching = false
                setSync(req)
            }
        })()
    }, [])

    return (Object.keys(inSync).length > 1) ? inSync : false
}


export default useCommunityData