/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import theme from 'Global/Theme'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { mMuted } from 'Stories/Text/Text'

const C = {
    up: css({
        width: '40px',
        borderRadius: '8px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
        minWidth: '20px',
        height: '25px'
    }),

    down: css({
        width: '40px',
        borderRadius: '8px',
        borderTopRightRadius: '0px',
        borderTopLeftRadius: '0px',
        minWidth: '20px',
        height: '25px'
    }),

    vote: css({
        display: 'flex',
        background: theme.background.tri,
        flexDirection: 'column',
        borderRadius: '8px',
        width: '40px',
        alignItems: 'center'
    })
}

const Vote = ({ karma }: any) => {
    const handleUp = () => { }
    const handleDown = () => { }

    return (
        <div css={C.vote}>
            <Button
                css={C.up}
                variant="text"
                color="secondary"
                size="small"
                onClick={handleUp}
            >
                <ArrowDropUpRoundedIcon fontSize="medium" />
            </Button>
            <div css={mMuted}> {karma} </div>
            <Button
                css={C.down}
                variant="text"
                color="secondary"
                size="small"
                onClick={handleDown}
            >
                <ArrowDropDownRoundedIcon fontSize="medium" />
            </Button>
        </div >
    )
}

export default Vote
