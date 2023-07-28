/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { roundButton } from '@/global/mixins'
import useCommunityData from '@/hooks/useCommunityData'
import { socketRequest } from '@/hooks/util/useSocket'
import { authFlow } from '@/state/flow'
import { commentList, commentSync } from '@/state/sync'
import { LoadingButton } from '@mui/lab'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, } from 'recoil'
import Editor from '../Editor/Editor'
import { accent, bg_3 } from '@/global/var'


const C = {
    container: css({
        position: 'relative',
        background: bg_3,
        width: '100%',
        borderRadius: '8px',
        // marginTop: '8px',
        touchAction: 'pan-y',
        padding: '8px',
        // border: `2px solid #343442`,
        borderWidth: '2px',
        borderColor: bg_3,
        borderStyle: 'solid',
        cursor: 'pointer',
        zIndex: 1000,
        ':focus-within': {
            border: `2px solid ${accent}`,
        },
    }),
}


const AddComment = ({ parent_id, post_id, onClose, isMuted }: any) => {

    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    const authState = useRecoilValue(authFlow)
    const [list, setList] = useRecoilState(commentList)
    const params: any = useParams()
    const community = useCommunityData(params.community_id)


    const sync = useRecoilTransaction_UNSTABLE(
        ({ set }) => (item: any) => {
            set(commentSync(item.public_id), item);
        }, []
    );


    // console.log('parent_id', parent_id, 'post_id', post_id)

    const onSubmit = async () => {
        setLoading(true)
        const req: any = await socketRequest('comment-new', {
            content: comment,
            post_id: post_id,
            parent_id: parent_id,
            community_id: community.community.public_id,
        })

        if (req.status === 'ok') {
            setComment('')
            setLoading(false)
            if (onClose) onClose()
        }
    }


    return <div css={C.container}>

        <Editor
            disabled={authState === 'guest' || isMuted}
            value={comment}
            onChange={(e: any) => setComment(e)}
            placeholder={isMuted ? 'You are Muted' : 'Comment your thoughts?'} />

        {
            comment.length > 11 && <LoadingButton
                onClick={onSubmit}
                loadingIndicator="Loading…"
                loading={loading}
                disableElevation
                sx={[roundButton,{
                    position: 'absolute',
                    right: '8px',
                    bottom: '8px',
                }]}
                onMouseDown={onSubmit} variant='contained'
            >
                Submit
            </LoadingButton>
        }


    </div>
}



export default AddComment