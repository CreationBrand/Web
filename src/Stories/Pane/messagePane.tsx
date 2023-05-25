/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faFaceLaugh, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import Input from '@mui/base/Input';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { socketRequest } from 'Service/Socket';
import { blue } from 'ansicolor';
import { forwardRef, InputHTMLAttributes, ForwardedRef, useState } from 'react';




const C = {
    container: css({
        height: '44px',
        display: 'flex',
        alignItems: 'center',

        marginBottom: '24px',
        borderRadius: '8px',
        zIndex: 1000,
        backgroundColor: '#343446',
        fontSize: '24px',
        rotate: '180deg',
    }),
    input: css({
        all: 'unset',
        height: '22px',
        width: '100%',
        fontSize: '16px',
        color: '#b9bbbe',
    }),
}





const MessagePane = ({ messenger_id }: any) => {

    const [value, setValue] = useState('')


    const handleSubmit = (e: any) => {
        if (e.key !== 'Enter') return

        let res = socketRequest('message-new', { messenger_id: messenger_id, content: value })

        console.log(res)
    }


    const handleChange = (e: any) => setValue(e.target.value)




    return <div css={C.container}>
        <FontAwesomeIcon size='1x' icon={faPaperPlane} css={{ padding: '8px 16px 8px 16px', color: '#b9bbbe' }} />
        <input css={C.input} value={value} onChange={handleChange} onKeyDown={handleSubmit} placeholder='Type a message...' />

        <FontAwesomeIcon size='1x' icon={faFaceLaugh} css={{ padding: '8px 16px 8px 16px', color: '#b9bbbe' }} />
    </div>

}



export default MessagePane