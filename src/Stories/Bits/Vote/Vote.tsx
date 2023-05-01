
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import theme from 'Global/Theme'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { mMuted } from 'Stories/Bits/Text/Text'
import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import Ticker from '../Ticker/Ticker'
import { useEffect, useState } from 'react'
import { socketRequest } from 'Service/Socket'


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
        alignItems: 'center',
        overflow: 'hidden',
    }),
    small: css({
        flexDirection: 'row',
        width: 'min-content',
        background: 'transparent',
    }),
    smallDown: css({
        borderRadius: '8px',
        width: 'min-content',
        height: '100%',
        padding: '0px',
    }),
}

const Vote = ({ karma, public_id, vote, size }: any) => {

    const [counter, setCounter] = useDeltaSubscription(`vote:${public_id}`, karma)
    const [interaction, setInteraction] = useState(vote)


    const increase = () => {
        if (interaction === -1) { setCounter(counter + 2); setInteraction(1); socketRequest('vote', { vote: 1, public_id: public_id }) }
        else if (interaction === 0) { setCounter(counter + 1); setInteraction(1); socketRequest('vote', { vote: 1, public_id: public_id }) }
        else if (interaction === 1) { setCounter(counter - 1); setInteraction(0); socketRequest('vote', { vote: 0, public_id: public_id }) }
    }

    const decrease = () => {
        if (interaction === 1) { setCounter(counter - 2); setInteraction(-1); socketRequest('vote', { vote: -1, public_id: public_id }) }
        else if (interaction === 0) { setCounter(counter - 1); setInteraction(-1); socketRequest('vote', { vote: -1, public_id: public_id }) }
        else if (interaction === -1) { setCounter(counter + 1); setInteraction(0); socketRequest('vote', { vote: 0, public_id: public_id }) }
    }


    let color = '#b9bbbe'
    if (interaction === 1) { color = '#43b581' }
    else if (interaction === -1) { color = '#f04747' }


    return (
        <div css={[C.vote, size === 'small' && C.small]}>
            <Button
                css={[C.up, size === 'small' && C.smallDown, interaction === 1 && { color: '#43b581' }]}
                variant="text"
                color="secondary"
                size="small"
                onClick={increase}
            >
                <ArrowDropUpRoundedIcon fontSize="large" />
            </Button>

            <div css={[mMuted,


                {
                    color: color
                }]}>
                <Ticker value={counter} />
            </div>

            <Button
                css={[C.down, size === 'small' && C.smallDown, interaction === -1 && { color: '#f04747' }]}
                variant="text"
                color="secondary"
                size="small"
                onClick={decrease}
            >
                <ArrowDropDownRoundedIcon fontSize="large" />
            </Button>
        </div >
    )
}

export default Vote

