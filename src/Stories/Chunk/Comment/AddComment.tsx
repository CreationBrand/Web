/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Button from '@mui/material/Button'
import { useState } from 'react'
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { authFlow } from 'State/Flow'
import Comment from 'Stories/Chunk/Comment/Comment'
import Editor from 'Stories/Bits/Editor/Editor'
import { commentList, commentSync } from 'State/commentAtoms'


const C = {
    container: css({
        position: 'relative',
        background: '#272732',
        width: '100%',
        borderRadius: '8px',
        // marginTop: '8px',
        padding: '8px',
        border: `2px solid #343442`,
        cursor: 'pointer',
        zIndex: 1000,
        ':hover': {
            border: `2px solid #583e76`,
        },
    }),
}


const AddComment = ({ parent_id, post_id, onClose }: any) => {

    const [comment, setComment] = useState('')
    const authState = useRecoilValue(authFlow)
    const [list, setList] = useRecoilState(commentList)

    const sync = useRecoilTransaction_UNSTABLE(
        ({ set }) => (item: any) => {
            set(commentSync(item.public_id), item);
        }, []
    );


    // console.log('parent_id', parent_id, 'post_id', post_id)

    const onSubmit = async () => {

        const req: any = await socketRequest('comment-new', {
            content: comment,
            post_id: post_id,
            parent_id: parent_id,
        })

        if (req.status === 'ok') {
            setComment('')
            sync(req.comments)

            const clone2 = [...list]
            var insertIndex = 0

            if (parent_id === post_id) {
                req.comments.last = true
                insertIndex = -1
            }

            else {
                insertIndex = clone2.findIndex((obj: any) => {

                    return obj.props.public_id === parent_id
                });
            }
            req.comments.visibility = true
            clone2.splice(insertIndex + 1, 0, <Comment {...req.comments} />);
            setList(clone2)

            if (onClose) onClose()
        }

    }


    return <div css={C.container}>

        <Editor
            disabled={authState === 'guest'}
            value={comment}
            onChange={(e: any) => setComment(e)}
            placeholder='Comment your thoughts?' />

        {comment.length > 11 && <Button
            onClick={onSubmit}
            size='small'
            disableElevation
            sx={{

                margin: '4px',
                bottom: '0px',
                right: '0px',
                borderRadius: '8px',
                background: '#272732',
                position: 'absolute',
                height: '32px',
                // border: `2px solid #343442`,
                color: '#b8babd',
                ':hover': {
                    background: '#272732',
                    // border: `2px solid #583e76`,
                    color: '#fff',

                },
            }}
            variant='contained'>Submit</Button>}


    </div>
}



export default AddComment