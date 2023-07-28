
import { communitySync } from "@/state/sync";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, } from "recoil";
import { socketRequest } from "./util/useSocket";
import CommunityPane from "@/components/chunks/Header/CommunityPane";
import { socketFlow } from "@/state/flow";

const useCommunity = (community_id: any) => {

    const socket = useRecoilValue(socketFlow)

    const [components, setComponents]: any = useState([])
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [inSync, setSync] = useRecoilState(communitySync(community_id))

    useEffect(() => {
        setIsLoading(false)
        setIsError(false)
        setComponents([])
    }, [community_id])

    useEffect(() => {
        if (!community_id || socket !== 'connected') return
        (async () => {
            if (inSync?.community?.public_id) {
                setComponents(<CommunityPane public_id={inSync?.community?.public_id} />)
                setIsLoading(false)
                setData(inSync)
                return
            }

            try {
                if (isError) return
                let req: any = await socketRequest('community', { community_id: community_id })
                setComponents(<CommunityPane public_id={req?.community?.public_id} />)
                setItem(req)
                setIsLoading(false)
                setData(req)
            } catch (e) { setIsError(true) }
        })()
    }, [community_id, socket])

    const setItem = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            set(communitySync(listItems.community.public_id), listItems);
        },
        []
    );

    return [isLoading, isError, components, data]
}



export default useCommunity