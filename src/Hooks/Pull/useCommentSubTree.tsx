
import { useEffect, useState } from "react"
import { atom, atomFamily, selector, useRecoilState, useRecoilTransaction_UNSTABLE, useResetRecoilState, selectorFamily } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentList, commentSync, resetAllAtoms } from "State/commentAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Comment from "Stories/Chunk/Comment/Comment";

let end: boolean = false







const useCommentSubTree = (comment_id: any) => {

    const [components, setComponents]: any = useRecoilState(commentList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        setResetState({});

    }, [comment_id])

    useEffect(() => {
        (async () => {
            if (end) return
            let req: any = await socketRequest('comment-subtree', { comment_id, cursor: cursor })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments`);
            if (req?.comments?.length < 25) end = true
            setList(req.comments)
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let crop = listItems?.[0]?.depth
            for (let i = 0; i < listItems?.length; i++) {
                try {
                    listItems[i].depth = listItems[i].depth + 2 - crop
                    let parts = listItems[i].path.split('.')
                    listItems[i].id = parts[listItems[i].depth - 1]
                    listItems[i].visibility = true
                    listItems[i].active = false
                    if (2 === listItems[i + 1].depth) {
                        listItems[i].last = true
                    }
                } catch (e) { listItems[i].last = true }

                try {
                    listItems[i].hasChildren = listItems[i + 1].depth > listItems[i].depth
                } catch (e) { listItems[i].hasChildren = false }


                set(commentSync(listItems[i].public_id), listItems[i]);
                set(commentList, (oldList: any) => [...oldList, <Comment {...listItems[i]} />])
            }
        }, []
    );


    return [isLoading, isError, components.concat(<ChunkError variant={'end'} />)]
}




export default useCommentSubTree