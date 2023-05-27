/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { authFlow } from 'State/Flow'

import Editor from 'Stories/Bits/Editor/Editor'

const C = {
    container: css({
        position: 'relative',
        background: '#343442',
        width: '100%',
        borderRadius: '8px',
        // marginBottom: '8px',
        // marginLeft: '12px',
        border: `2px solid #343442`,
        cursor: 'pointer',
        zIndex: 1000,
        ':hover': {
            border: `2px solid #583e76`,
        },
    }),
}


const AddComment = ({ parent_id, post_id }: any) => {

    const [comment, setComment] = useState('')
    const authState = useRecoilValue(authFlow)


    const onSubmit = async () => {

        const req: any = await socketRequest('comment-new', {
            content: comment,
            post_id: post_id,
            parent_id: parent_id,
        })

        if (req.status === 'ok') {
            setComment('')
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