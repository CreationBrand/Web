
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { communitySync } from "State/Sync";

const useCommunityData = (community_id: any) => {

    const [data, setData]: any = useState(false)
    const inSync = useRecoilValue(communitySync(community_id))

    useEffect(() => {
        if (!community_id) return
        (async () => {
            if (Object.keys(inSync).length > 0) {
                setData(inSync)
                return
            } else {
                let req: any = await socketRequest('community', { community_id: community_id })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Community: ${community_id}`);
                setData(req)
                setItem(req)
            }
        })()
    }, [community_id])

    const setItem = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(communitySync(listItems?.community?.public_id), listItems);
        },
        []
    );

    return data
}


export default useCommunityData