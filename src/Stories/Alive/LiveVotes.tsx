
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'

import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { mMuted } from 'Stories/Bits/Text/Text'
import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import Ticker from '../Bits/Ticker/Ticker'
import { useEffect, useState } from 'react'
import { socketRequest } from 'Service/Socket'
import { useRecoilValue } from 'recoil'
import { authFlow } from 'State/Flow'


const C = {
    up: css({
        width: 'min-content',
        borderRadius: '8px',
        padding: '0px',

        minWidth: '10px',
        height: '100% '
    }),

    down: css({
        width: 'min-content',
        borderRadius: '8px',
        padding: '0px',

        minWidth: '10px',
        height: '100% '
    }),

    vote: css({
        display: 'flex',
        background: '#181820',
        width: 'min-content',
        borderRadius: '8px',
        alignItems: 'center',
        overflow: 'hidden',
        gap: '4px',
        height: '30px',
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

const LiveVotes = ({ karma, public_id, vote, size, type }: any) => {

    const [counter, setCounter] = useDeltaSubscription(`vote:${public_id}`, karma)
    const [interaction, setInteraction] = useState(vote)
    const authData = useRecoilValue(authFlow)


    useEffect(() => {
        if (authData === 'guest') setInteraction(0)
    }, [])

    const increase = () => {
        if (authData === 'guest') return
        else if (interaction === -1) { setCounter(counter + 2); setInteraction(1); socketRequest('vote', { vote: 1, public_id: public_id, type: type }) }
        else if (interaction === 0 || !interaction) { setCounter(counter + 1); setInteraction(1); socketRequest('vote', { vote: 1, public_id: public_id, type: type }) }
        else if (interaction === 1) { setCounter(counter - 1); setInteraction(0); socketRequest('vote', { vote: 0, public_id: public_id, type: type }) }
    }

    const decrease = () => {
        if (authData === 'guest') return
        else if (interaction === 1) { setCounter(counter - 2); setInteraction(-1); socketRequest('vote', { vote: -1, public_id: public_id, type: type }) }
        else if (interaction === 0 || !interaction) { setCounter(counter - 1); setInteraction(-1); socketRequest('vote', { vote: -1, public_id: public_id, type: type }) }
        else if (interaction === -1) { setCounter(counter + 1); setInteraction(0); socketRequest('vote', { vote: 0, public_id: public_id, type: type }) }
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

export default LiveVotes



