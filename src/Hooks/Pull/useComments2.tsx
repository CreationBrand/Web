//@ts-nocheck

import { useEffect, useState } from "react"
import { atom, atomFamily, selector, useRecoilState, useRecoilTransaction_UNSTABLE, useResetRecoilState, selectorFamily } from "recoil";
import { socketRequest } from "Service/Socket";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Comment from "Stories/Chunk/Comment/Comment";

let end: boolean = false

export const commentSync = atomFamily({
    key: 'commentSync',
    default: {} as any,
})

const resetAllAtoms = selector({
    key: 'resetAllAtoms',
    get: ({ get }) => {
        const atomKeys = Object.keys(commentSync).filter((key) =>
            key.includes(commentSync.key)
        );
        const initialValues = atomKeys.reduce((acc, key) => {
            acc[key] = get(commentSync(key)).default;
            return acc;
        }, {});

        return initialValues;
    },
    set: ({ set }, newValue) => {
        Object.entries(newValue).forEach(([key, value]) =>
            set(commentSync(key), value)
        );
    },
});


export const setVisibilityByPath = selectorFamily({
    key: 'setVisibilityByPath',
    get: () => ({ get }) => {
        return;
    },
    set: (param) => ({ set, get }) => {

        let temp = get(commentList)
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].props.path === param.dynamicPath) {
                const atomValue = get(commentSync(temp[i].props.public_id));

                const updatedValue = {
                    ...atomValue,
                    active: param.status,
                };
                set(commentSync(temp[i].props.public_id), updatedValue);
            }

            else if (temp[i].props.path.includes(param.dynamicPath)) {
                const atomValue = get(commentSync(temp[i].props.public_id));

                const updatedValue = {
                    ...atomValue,
                    visibility: !param.status,
                };
                set(commentSync(temp[i].props.public_id), updatedValue);

            }

        }

    },
});

export const commentList = atom({
    key: 'commentList',
    default: [] as any,
})







const useComments = (post_id: any, filter: string) => {

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

    }, [post_id, filter])

    useEffect(() => {
        (async () => {
            if (end) return
            let req: any = await socketRequest('comments', { post_id, filter, cursor: cursor })
            if (req?.comments?.length < 25) end = true
            setList(req.comments)
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                try {

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

    const fetchNext = async () => {
        if (components?.length === 0) return
        setCursor(components[components.length - 1].props.sort_path)
    }

    return [isLoading, isError, components.concat(<ChunkError variant={!end ? 'loading' : 'end'} onLoad={fetchNext} />)]
}




export default useComments