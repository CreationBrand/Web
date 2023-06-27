
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, } from "recoil";
import { socketRequest } from "Service/Socket";
import { communitySync } from "State/Sync";
import CommunityPane from "Stories/Bits/Header/CommunityPane";

const useCommunity = (community_id: any) => {

    const [components, setComponents]: any = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [inSync, setSync] = useRecoilState(communitySync(community_id))

    useEffect(() => {
        setIsLoading(false)
        setIsError(false)
        setComponents([])
    }, [community_id])

    useEffect(() => {

        (async () => {
            if (inSync?.community?.public_id) {
                console.log('%c [SYNC] ', 'font-weight: bold; color: #0F0', `Community: ${inSync?.community.public_id}`);
                setComponents(<CommunityPane public_id={inSync?.community?.public_id} />)
                setIsLoading(false)
                return
            }

            try {
                if (isError) return

                let req: any = await socketRequest('community', { community_id: community_id })

                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Community: ${community_id}`);
                setComponents(<CommunityPane public_id={req?.community?.public_id} />)
                setItem(req)
                setIsLoading(false)
            } catch (e) { setIsError(true) }
        })()
    }, [community_id])

    const setItem = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(communitySync(listItems.community.public_id), listItems);
        },
        []
    );

    return [isLoading, isError, components]
}



export default useCommunity