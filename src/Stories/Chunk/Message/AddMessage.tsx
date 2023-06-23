/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faFaceLaugh, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import Input from '@mui/base/Input';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { socketRequest } from 'Service/Socket';
import { messageListData, personData } from 'State/Data';
import Message from 'Stories/Chunk/Message/Message';
import { blue } from 'ansicolor';
import { forwardRef, InputHTMLAttributes, ForwardedRef, useState, memo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';




const C = {
    container: css({
        height: '44px',
        width: '100%',
        display: 'flex',
        // alignItems: 'center',
        // marginBottom: '2px',
        // borderRadius: '8px',
        // zIndex: 1000,

        background: '#272732',
        borderRadius: '12px',
        fontSize: '24px',

    }),
    input: css({
        all: 'unset',
        height: '28px',
        marginTop: '6px',
        paddingLeft: '12px',
        borderRadius: '12px',
        width: '100%',
        fontSize: '14px',
        color: '#b9bbbe',
        background: '#0f0e10',
        border: '2px solid #0f0e10',
        '&:focus': {
            border: '2px solid #996ccc',
        },
    }),
}





const AddMessage = ({ messenger_id }: any) => {

    const [value, setValue] = useState('')
    const [messages, setMessages]: any = useRecoilState(messageListData)
    const person = useRecoilValue(personData)

    const handleSubmit = async (e: any) => {
        if (e.key !== 'Enter') return
        let res: any = await socketRequest('message-new', { messenger_id: messenger_id, content: value })
        res.message.author = person
        setMessages([<Message props={res.message} />, ...messages])
        setValue('')

    }

    const handleChange = (e: any) => setValue(e.target.value)


    return <div css={C.container}>
        <FontAwesomeIcon icon={faFaceLaugh} css={{ padding: '8px 16px 8px 16px', color: '#b9bbbe', fontSize: '22px', marginTop: '3px' }} />
        <input css={C.input} value={value} onChange={handleChange} onKeyDown={handleSubmit} placeholder='Type a message...' />
        <FontAwesomeIcon icon={faPaperPlane} css={{ padding: '8px 16px 8px 16px', color: '#b9bbbe', fontSize: '22px', marginTop: '3px' }} />

    </div>

}



export default memo(AddMessage)