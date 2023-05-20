import { useEffect, useState } from "react"
import { socketRequest } from "Service/Socket";
import GroupPane from "Stories/Bits/GroupPane/GroupPane";
import CommunityPane from "Stories/Chunk/CommunityPane/CommunityPane";
import LoaderPane from "Stories/Pane/loaderPane";


const usePullGroup = (public_id: any) => {

    // state
    const [data, setData]: any = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // fetch posts
    useEffect(() => {

        if (!public_id) return

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
    }, [public_id])



    if (loading === true) return [error, <LoaderPane />];
    return [error, <GroupPane data={data.group} />, data];
}

export default usePullGroup