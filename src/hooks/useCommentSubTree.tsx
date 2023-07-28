
/** @jsxImportSource @emotion/react */
import { commentList, commentSync } from '@/state/sync';
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from './util/useSocket';
import Comment from '@/components/chunks/Comment/Comment';
import ChunkError from '@/components/bits/ChunkError';
import { bg_3, bg_4, text_1, text_2 } from '@/global/var';
import { useNavigate, useParams } from 'react-router-dom';

let end: boolean = false

const useCommentSubTree = (comment_id: any) => {

    const params = useParams()
    const [components, setComponents]: any = useRecoilState(commentList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    const handleThread = () => {
        navigate(`/c/${params.community_id}/p/${params.post_id}`)
    }

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])

    }, [comment_id])

    useEffect(() => {
        (async () => {
            if (end) return
            let req: any = await socketRequest('comment-subtree', { comment_id, cursor: cursor })
            if (req?.comments?.length < 25) end = true
            setList(req.comments)
        })()
    }, [cursor])




    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let crop = listItems?.[0]?.depth
            for (let i = 0; i < listItems?.length; i++) {
                try {
                    listItems[i].depth = listItems[i].depth
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


    let temp: any = components.length > 0 ? [<div
        css={{
            width: '100%',
            background: bg_3,
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            height: '48px',
            marginTop: '8px',
            zIndex: 100,
            position: 'relative',
            padding: '8px',

        }}
    >
        <div
            onClick={handleThread}
            css={{
                display: 'flex',
                fontSize: '12px',
                fontWeight: 'bold',
                color: text_1,
                alignItems: 'center',
                padding: '0px 16px',
                height: '100%',
                borderRadius: '8px',
                background: bg_4,
                cursor: 'pointer',

            }}>
            View Full Thread
        </div>

    </div>, ...components, <div
        css={{
            width: '100%',
            background: bg_3,
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            height: '16px',
        }}
    />] : []


    return [isLoading, isError, temp.concat(<ChunkError variant={'end'} />)]
}




export default useCommentSubTree