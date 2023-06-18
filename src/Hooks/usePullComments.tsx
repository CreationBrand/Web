import { useInfiniteQuery,} from "@tanstack/react-query";
import { useEffect,} from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { socketFlow } from "State/Flow";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Comment from "Stories/Chunk/Comment/Comment";

let end = false

const usePullPosts = (post_id: any, filter: string) => {

    const [socket, setSocket] = useRecoilState(socketFlow)
    const [components, setComponents]: any = useRecoilState(postListData)


    useEffect(() => {
        end = false
        setComponents([])
    }, [post_id, filter])

    const fetch = async ({ pageParam = false }) => {
        if (end) return
        let req: any = await socketRequest('comments', { post_id, filter, cursor: pageParam })
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
        enabled: socket === 'connected' || !end,
        queryKey: ['comment-list', post_id, filter],

        queryFn: fetch,
        getNextPageParam: (lastPage, pages) => {

            console.log(lastPage, pages, 'hererere')

            if (!lastPage) return

            if (lastPage.length < 25) {
                end = true
                return undefined
            }
            console.log(pages)

            // else if (filter === 'HOT') return pages[0][pages[0].length - 1].hot
            // else if (filter === 'NEW') return pages[0][pages[0].length - 1].created_at
            // else if (filter === 'TOP') return pages[0][pages[0].length - 1].karma

        },

        onSuccess: (data) => {
            console.log(data, 'data')
            if (!data || data === undefined || data.pages.length === 0) return


            if (!data || data === undefined || data.pages.length === 0) return
            const temp = []
            for (let i in data.pages) {
                for (let j in data.pages[i]) {
                    temp.push(<Comment public_id={data.pages[i][j].public_id} />)
                }
            }

            // conosle.log(temp, 'temp')
            setComponents(temp)

        },
    })

    return [isLoading, isError, components.concat(<ChunkError variant={hasNextPage ? 'loading' : 'end'} onLoad={fetchNextPage} />)]
}


export default usePullPosts