/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { textBold } from 'Global/Mixins'
const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        width: 'min-content',
    }),
    underline: css({
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const CommunityTitle = ({ title, public_id }: any) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const navigate = useNavigate()
    const handleClick = () => navigate(`/c/${public_id}`)


    return (
        <>
            <div css={C.container} onClick={handleClick}>
                <div css={[textBold('m'), C.underline]}>{title}</div>
            </div>
        </>
    )
}

export default CommunityTitle
