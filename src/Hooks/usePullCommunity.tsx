import { useEffect, useState } from "react"
import { socketRequest } from "Service/Socket";
import CommunityPane from "Stories/Chunk/CommunityPane/CommunityPane";
import Post from "Stories/Objects/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";
import { colorLog } from "Util";


const usePullCommunity = (community_id: any) => {

    // state
    const [data, setData]: any = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // fetch posts
    useEffect(() => {

        if (!community_id) return

        const fetchMore = async () => {
            colorLog('[hook] Fetching Community', 'green')

            let req: any = await socketRequest('community', {
                community_id: community_id,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                setData(req)
                setLoading(false)
            }
        }

        fetchMore();
    }, [community_id])



    if (loading === true) return [error, <LoaderPane />];
    return [error, <CommunityPane data={data.community} />];
}

export default usePullCommunity