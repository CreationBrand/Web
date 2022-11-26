/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Input } from '@mui/material'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { socketRequest } from 'Service/Socket'

import MessageList from 'Stories/Loaders/MessageList'

const Messenger = () => {
    const params = useParams()
    const [value, setValue] = useState('')

    const createMessage = async () => {
        let req:any = await socketRequest('new-message', {
            content: value,
            messenger_id: params.messenger_id
        })
        console.log(req)

        if(req.status === 'ok') {
            //add to list
        }
    }

    const handleChange = (e: any) => setValue(e.target.value)

    return (
        <div>
            <MessageList messenger_id={params.messenger_id}></MessageList>

            <Input
                value={value}
                onChange={handleChange}
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        createMessage()
                        setValue('')
                    }
                }}
            ></Input>
        </div>
    )
}

export default Messenger
