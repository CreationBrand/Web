/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { textLight } from 'Global/Mixins'

const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    underline: css({
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const Nickname = ({ title, public_id }: any) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const handleClick = () => { }


    return (
        <div css={C.container} onClick={handleClick}>
            <div css={[textLight('t'), C.underline]}>{title}</div>
        </div>
    )
}

export default Nickname
