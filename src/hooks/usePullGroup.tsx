import ChunkError from "@/components/bits/ChunkError"
import GroupPane from "@/components/chunks/Header/GroupPane"
import { useEffect, useState } from "react"
import { socketRequest } from "./util/useSocket"
import { useRecoilValue } from "recoil"
import { socketFlow } from "@/state/flow"



const usePullGroup = (public_id: any) => {

    // state
    const [data, setData]: any = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const socket = useRecoilValue(socketFlow)

    // fetch posts
    useEffect(() => {

        if (!public_id || socket !== 'connected') return

        const fetchMore = async () => {

            let req: any = await socketRequest('group', {
                group_id: public_id,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                setData(req)
                setLoading(false)
            }
        }

        fetchMore();
    }, [public_id, socket])



    if (loading === true) return [error, <ChunkError variant='error' />];
    return [error, <GroupPane data={data.group} />, data];
}

export default usePullGroup