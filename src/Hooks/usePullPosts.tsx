import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { socketFlow } from "State/Flow";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import MainPost from "Stories/Chunk/Post/MainPost";

var treeify = require('treeify');


const usePullPosts = (community_id: any, filter: string) => {

    const [page, setPage] = useState(0)
    const [components, setComponents]: any = useRecoilState(postListData)
    const [socket, setSocket] = useRecoilState(socketFlow)


    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp = []
            for (let i = 0; i < listItems.length; i++) {
                set(virtualListStateFamily(listItems[i].public_id), listItems[i]);
                temp.push(<MainPost public_id={listItems[i].public_id} />)
            }
            // setComponents([temp])
            if (page === 0) set(postListData, temp);
            else set(postListData, [...components, temp])
        },
        []
    );


    useEffect(() => {
        setPage(0)
    }, [community_id, filter])



    const { isLoading, isError, data } = useQuery({
        enabled: socket === 'connected',
        queryKey: ['post-list', community_id, filter, page],
        queryFn: async () => {

            if (page === -1) return false
            let req: any = await socketRequest('posts', { community_id, filter, page })

            // console.groupCollapsed('%c [DATA - post list] ', 'background: #000; color: #5555da');
            // console.log(treeify.asTree(req.posts, true));
            // console.groupEnd();

            if (req.posts.length < 25) setPage(-1)

            return req.posts
        },
        onSuccess: (data) => {
            if (!data || data === undefined) return
            setListItems(data)
        },

    })



    if (page === -1) return [isLoading, isError, components.concat(<ChunkError variant='end' />)]
    return [isLoading, isError, components.concat(<ChunkError variant='loading' />)]
}

export default usePullPosts