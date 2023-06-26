
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentList, commentSync, resetAllAtoms } from "State/commentAtoms";
import { commentFilter } from "State/filterAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Comment from "Stories/Chunk/Comment/Comment";

let end: boolean = false

const useComments = (post_id: any) => {

    const [components, setComponents]: any = useRecoilState(commentList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);
    const filter = useRecoilValue(commentFilter)

    useEffect(() => {
        end = false
        setCursor(false)
        setIsError(false)
        setIsLoading(false)
        setComponents([])
        setResetState({});

    }, [post_id, filter])

    useEffect(() => {
        (async () => {
            console.log(end)
            if (end || isError) return
            try {

                let req: any = await socketRequest('comments', { post_id, filter, cursor: cursor })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments`);
                console.log(req.comments);
                if (req?.comments?.length < 25) end = true
                setList(req.comments)
            } catch (e) { setIsError(true) }
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
      
            for (let i = 0; i < listItems?.length; i++) {

                // set props
                let parts = listItems[i].path.split('.')
                listItems[i].id = parts[listItems[i].depth - 1]
                listItems[i].visibility = true
                listItems[i].active = false

                // first last
                // if (i === 0) listItems[i].first = true
                // if (i === listItems.length - 1) listItems[i].last = true

                // has children
                try {
                    listItems[i].hasChildren = listItems[i + 1].depth > listItems[i].depth
                } catch (e) {
                    listItems[i].hasChildren = false
                }

                set(commentSync(listItems[i].public_id), listItems[i]);
                set(commentList, (oldList: any) => [...oldList, <Comment {...listItems[i]} />])
            }
        }, []
    );

    const fetchNext = async () => {
        if (end || isError) return
        if (components?.length === 0) return
        setCursor(components[components.length - 1].props.sort_path)
    }



    

    return [isLoading, isError, components.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} />)]
}




export default useComments