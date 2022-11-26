/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { mNormal } from 'Stories/Text/Text'

import Avatar from '../Avatar/Avatar'

const C = {
    container: css({})
}

const MessegerLi = ({ props }: any) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(`m/${props.public_id}`)
    return (
        <Button
        onClick={handleClick}
        variant='text' size="large" color='secondary' fullWidth sx={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '8px',
            paddingLeft:  '8px',
            height:'40px',
            gap: '12px',
            marginTop: '4px',
            // background: location.pathname === `/${path}` ? `#343442` : 'transparent',
            // color: location.pathname === `/${path}` ? `#fff` : null,

        }} >



            <Avatar public_id={props.public_id} size="small"></Avatar>
           
            <div css={mNormal}>{props.person.nickname}</div>
            <div css={mNormal}>{props.person.username}</div>

            
      </Button>
    )
}

export default MessegerLi

interface Props {
    public_id: string
    status: 'pending' | 'active' | 'closed' | 'blocked'
    person: {
        public_id: string
        nickname: string
        username: string
    }
}
