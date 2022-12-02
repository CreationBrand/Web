/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Input, TextField } from '@mui/material'
import InputUnstyled from '@mui/base/InputUnstyled'
import { socketRequest } from 'Service/Socket'
import { createMessage } from 'Helper/Action'
import { useState } from 'react'

// styles
const C = {
    container: css({
        height: 'min-content',
        minHeight: '44px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        background: '#343442',
        margin: '0px 20px 8px 20px',
        // padding: '0px 20px 0px 20px',
        borderRadius: '8px',
    }),
}

const CreateMessage = ({messenger_id}: any) => {
    // state
    const [value, onChange] = useState('')

    // handlers
    const handleChange = (event: any) => onChange(event.target.value)
    const handleSubmit = (event: any) => {
        if (event.key === 'Enter') {
            createMessage(messenger_id, value)
            onChange('')
        }
    }

    return (
        <div css={C.container}>
            <Input
                value={value}
                onChange={handleChange}
                onKeyDown={handleSubmit}
                disableUnderline
                placeholder="Type a message..."
                size="small"
                multiline
                sx={{
                    padding: '0px 8px 0px 8px !important',
                    border: 'none !important',
                    outline: 'none !important',
                    fontSize: '14px !important',
                    background: 'transparent !important',
                }}
                fullWidth
            ></Input>
        </div>
    )
}

export default CreateMessage
