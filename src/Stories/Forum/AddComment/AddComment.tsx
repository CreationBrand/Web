/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { postListData, virtualListStateFamily } from 'State/Data'
import { authFlow, postFilterFlow } from 'State/Flow'
import Comment from 'Stories/Chunk/Comment/Comment'
import Editor from 'Stories/Bits/Editor/Editor'
import { setRecoil } from 'recoil-nexus'
import { set } from 'date-fns'
import { useQueryClient } from '@tanstack/react-query'


const C = {
    container: css({
        position: 'relative',
        background: '#343442',
        width: '100%',
        borderRadius: '8px',
        marginTop: '8px',
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
    const [list, setList] = useRecoilState(postListData)


    const onSubmit = async () => {

        const req: any = await socketRequest('comment-new', {
            content: comment,
            post_id: post_id,
            parent_id: parent_id,
        })

        if (req.status === 'ok') {
            // const loading = setRecoil(virtualListStateFamily(`subscribe:${req.comments.public_id}`), req.comments);
            setComment('')

            try {

                // setQueryState
                // let clone = [...state]
                // clone[0][1].pages[page].splice(page_index + 1, 0, req.comments);
                // queryClient.setQueryData(['comment-list', post_id, filter], clone)

                //Set Recoil State
                const clone2 = [...list]
                var insertIndex = clone2.findIndex((obj: any) => obj.props.public_id === parent_id);
                clone2.splice(insertIndex + 1, 0, <Comment {...req.comments} />);
                setList(clone2)

                onClose()
            }
            catch (e) {
                // console.log(e)
            }
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