/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { useState } from 'react'
import { socketRequest } from 'Service/Socket'
import Editor from 'Stories/Forum/Editor/Editor'

const C = {
    container: css({
        background: '#343442',
        width: '100%',
        margin: '10px 20px',
        borderRadius: '8px',
        position: 'relative',
        paddingBottom: '8px',
        height: '140px'
    }),
    buttons: css({
        position: 'absolute',
        display: 'flex',
        top: '8px',
        right: '28px'
    })
}

const CommentReply = ({ parent_id }: any) => {
    // state
    const [value, onChange] = useState('')
    const handleChange = (e: any) => onChange(e.target.value)

    // request
    const handleSubmit = async () => {
        // let res: any = await socketRequest('new-comment', {
        //     content: value,
        //     parent_id: parent.parent,
        //     post_id: params.post_id
        // })
        // console.log(res)
    }

    return (
        <div css={C.container}>
            <div css={C.buttons}>
            <Button
                    // onClick={handleSubmit}
                    color='secondary'
                    variant="text"
                    size="small"
                    disableElevation
                    sx={{ width: '60px', height: '24px' }}
                >
                    Cancel
                </Button>

                <Button
                    // onClick={handleSubmit}
                    variant="text"
                    size="small"
                    disableElevation
                    sx={{ width: '60px', height: '24px' }}
                >
                    Submit
                </Button>
            </div>
            <Editor lock={'80px'}></Editor>
        </div>
    )
}

export default CommentReply
