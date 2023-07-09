import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData } from "State/Data";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import MainPost from "Stories/Chunk/Post/Post";


// const usePullGroups = (group_id: any, filter: string, varient: string) => {


//     // state
//     const [list, setList]: any = useRecoilState(postListData)
//     const [page, setPage] = useState({ data: 0 })
//     const [end, setEnd] = useState(false)
//     const [error, setError] = useState(false)
//     const [loading, setLoading] = useState(true)

//     // reset list on props change
//     useEffect(() => {
//         setList([])
//         setPage({ data: 0 })
//         setEnd(false)
//         setError(false)
//     }, [group_id, filter])


//     // fetch posts
//     useEffect(() => {
//         if (!group_id || !filter) return

//         const fetchMore = async () => {

//             let req: any = await socketRequest('post-group', {
//                 group_id: group_id,
//                 filter: filter,
//                 page: page.data,
//             })

//             if (req === false || req.status === 'error') setError(true)

//             if (req.status === 'ok') {
//                 if (req.posts.length < 25) setEnd(true)
//                 let posts = []

//                 for (var i in req.posts) {
//                     posts.push(<MainPost varient={varient} {...req.posts[i]} />)
//                 }

//                 if (page.data === 0) setList(posts)
//                 else await setList([...list, posts])
//             }
//         }
//         if (end === false) fetchMore().catch((err) => console.log(err))
//     }, [page])

//     if (end === false) return [error]
//     if (end === true) return [error, list.concat(<ChunkError variant='end' />)]

//     return [error, list] as const;
// }

// export default usePullGroups



import { startTransition, } from "react"
import { useRecoilTransaction_UNSTABLE } from "recoil";
import { postFilter } from "State/filterAtoms";
import { postList, postSync, resetAllAtoms } from "State/postAtoms";
import Post from "Stories/Chunk/Post/Post";

import TTLCache from '@isaacs/ttlcache';
const cache = new TTLCache({ max: 10000, ttl: 60000 })
let end: boolean = false

const usePullGroup = (community_id: any, filter: string) => {

    const [components, setComponents]: any = useRecoilState(postList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        end = false
        setIsLoading(true)
        setCursor(false)
        setComponents([])
    }, [community_id, filter])

    useEffect(() => {
        (async () => {
            try {
                if (end || isError) return
                if (cache.has(`posts:${community_id}:${cursor}`)) {
                    return setList(cache.get(`posts:${community_id}:${cursor}`))
                }

                let req: any = await socketRequest('group', { group_id: community_id, filter: filter, cursor: cursor })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);

                if (req?.posts?.length < 10) end = true
                setList(req.posts)
                cache.set(`posts:${community_id}:${cursor}`, req.posts)
            } catch (e) {
                setIsError(true)
                setIsLoading(false)
            }
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                batch.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            set(postList, (oldList: any) => [...oldList, batch])
            setIsLoading(false)
        },
        []
    );

    const fetchNext = async () => {

        if (end || isError) return
        if (components?.length === 0) return


        let last: any = components[components.length - 1]
        if (!last[last.length - 1]) return
        if (last.length === 0) return
        return setCursor(last[last.length - 1].props.hot)

    }

    const onReset = () => {
        try {
            let last: any = components[components.length - 1]

        }
        catch (e) {
            console.log(e)
        }

    }


    return [isLoading, isError, components.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} reset={onReset} />)]
}



export default usePullGroup