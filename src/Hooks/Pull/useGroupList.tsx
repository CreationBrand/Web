import TTLCache from "@isaacs/ttlcache";
import { socketRequest } from "Service/Socket";
import { postList, postSync } from "State/postAtoms";
import Post from "Stories/Chunk/Post/Post";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";


const cache = new TTLCache({ max: 10000, ttl: 60000 })
let end: boolean = false

const useGroupList = (group_id: string) => {

    const [isError, setIsError] = useState(false);
    const [components, setComponents]: any = useRecoilState(postList)
    const [cursor, setCursor]: any = useState(false);


    useEffect(() => {
        setCursor(false)
        setComponents([])
    }, [group_id])


    useEffect(() => {
        (async () => {
            try {
                if (cursor === null || isError) return

                if (cache.has(`posts:${group_id}:${cursor}`)) {
                    return setList(cache.get(`posts:${group_id}:${cursor}`))
                }

                let req: any = await socketRequest('posts', { community_id: group_id, filter: 'group', cursor: cursor })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);

                if (req?.posts?.length < 10) setCursor(null)
                setList(req.posts)
                cache.set(`posts:${group_id}:${cursor}`, req.posts)
            } catch (e) {
                setIsError(true)
            }
        })()
    }, [group_id, cursor])


    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                batch.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            set(postList, (oldList: any) => [...oldList, batch])
        },
        []
    );

    const fetchNext = async () => {
        if (components?.length === 0) return
        let last: any = components[components.length - 1]
        if (!last[last.length - 1]) return
        if (last.length === 0) return
        return setCursor(last[last.length - 1].props.hot)
    }

    const onReset = () => {
        try {
            let last: any = components[components.length - 1]
            return setCursor(last[last.length - 1].props.hot)
        }
        catch (e) {
            console.log(e)
        }

    }


    return [isError, components.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} reset={onReset} />)]
};


export default useGroupList