import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { set } from "date-fns";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { socketFlow } from "State/Flow";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import MainPost from "Stories/Chunk/Post/Post";

let end = false

const usePullPosts = (community_id: any, filter: string) => {

    const [socket, setSocket] = useRecoilState(socketFlow)
    const [components, setComponents]: any = useRecoilState(postListData)

    useEffect(() => {
        end = false
        setComponents([])
    }, [community_id, filter])

    const fetch = async ({ pageParam = false }) => {
        let req: any = await socketRequest('posts', { community_id, filter, cursor: pageParam })
        console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts From: ${pageParam}`);
        setListItems(req.posts)
        return req.posts
    }

    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            if (!listItems) return
            for (let i = 0; i < listItems.length; i++) {
                set(virtualListStateFamily(`subscribe:${listItems[i].public_id}`), listItems[i]);
            }
        },
        []
    );

    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        enabled: socket === 'connected' && !end,
        queryKey: ['post-list', community_id, filter],
        queryFn: fetch,
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage || lastPage.length === 0) return undefined
            if (filter === 'none') return lastPage[lastPage.length - 1].hot
            else if (filter === 'HOT') return lastPage[lastPage.length - 1].hot
            else if (filter === 'NEW') return lastPage[lastPage.length - 1].created_at
            else if (filter === 'TOP') return lastPage[lastPage.length - 1].karma
        },

        onSuccess: (data) => {
            if (end) return

            if (!data || data === undefined || data.pages.length === 0) return
            if (!data || data === undefined || data.pages.length === 0) return

            const temp = []
            for (let i in data.pages) {
                for (let j in data.pages[i]) {
                    temp.push(<MainPost public_id={data.pages[i][j].public_id} />)
                }
            }
            setComponents(temp)

            if (data.pages[data.pages.length - 1].length < 25) end = true

        },
    })


    return [isLoading, isError, components.concat(<ChunkError variant={hasNextPage ? 'loading' : 'end'} onLoad={fetchNextPage} />)]
}


export default usePullPosts