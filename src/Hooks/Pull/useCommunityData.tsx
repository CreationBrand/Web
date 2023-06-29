
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { communitySync } from "State/Sync";

const useCommunityData = (community_id: any) => {

    const [data, setData]: any = useState(false)
    const [inSync, setSync] = useRecoilState(communitySync(community_id))

    useEffect(() => {
        if (!community_id) return
        (async () => {
            if (Object.keys(inSync).length > 0) {
                console.log('%c [SYNC] ', 'font-weight: bold; color: #0F0', `Community: ${inSync?.community?.public_id}`);
                setData(inSync)
                return
            }
            let req: any = await socketRequest('community', { community_id: community_id })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Community: ${community_id}`);
            setData(req)
            setItem(req)
        })()
    }, [community_id])

    const setItem = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            console.log('%c [SYNC] ', 'font-weight: bold; color: #0F0', `Community: ${listItems?.community?.public_id}`);
            set(communitySync(listItems?.community?.public_id), listItems);
        },
        []
    );

    return data
}


export default useCommunityData