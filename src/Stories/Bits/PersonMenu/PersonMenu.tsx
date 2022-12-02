/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'

const C = {
    container: css({
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
        width: '210px',
        background:'#0f0e10',
    }),
}

const PersonMenu = () => {
    return (
        <div css={C.container}>
            <Button>Status</Button>
            <Button>Settings</Button>
            <Button>Logout</Button>
        </div>
    )
}

export default PersonMenu
