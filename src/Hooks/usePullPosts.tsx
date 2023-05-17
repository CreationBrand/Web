import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData } from "State/Data";
import { socketFlow } from "State/Flow";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import MainPost from "Stories/Chunk/Post/MainPost";
var treeify = require('treeify');


const usePullPosts = (community_id: any, filter: string) => {

    const [page, setPage] = useState(0)
    const [end, setEnd] = useState(false)
    const [components, setComponents]: any = useState([])

    // useLayoutEffect(() => {
    //     setComponents([])
    // }, [community_id])

    const { isLoading, isError, data, error } = useQuery({
        enabled: true,
        queryKey: ['post-list', community_id, filter, page],
        queryFn: async () => {

            let req: any = await socketRequest('posts', { community_id, filter, page })

            // console.groupCollapsed('%c [DATA - post list] ', 'background: #000; color: #5555da');
            // console.log(treeify.asTree(req.posts, true));
            // console.groupEnd();

            let posts: any = []
            if (req.posts.length < 25) setEnd(true)

            for (var i in req.posts) { posts.push(<MainPost {...req.posts[i]} />) }

            if (page === 0) setComponents(posts)
            else await setComponents([...components, posts])

            return posts
        }

    })

    if (end === true) return [isLoading, isError, components.concat(<ChunkError variant='end' />)]
    return [isLoading, isError, components.concat(<ChunkError variant='loading' />)]
}

export default usePullPosts