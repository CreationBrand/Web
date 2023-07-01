
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import Ticker from '../Bits/Ticker/Ticker'
import { memo, useEffect, useState } from 'react'
import { socketRequest } from 'Service/Socket'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authFlow } from 'State/Flow'

// ICONS
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { commentSync } from 'State/commentAtoms'
import { postSync } from 'State/postAtoms'

const C = {
    up: css({
        borderRadius: '8px',
        padding: '0px',
        width: '30px',
        height: '30px',
        minWidth: '10px',
    }),

    down: css({
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        padding: '0px',
        minWidth: '10px',
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
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#b9bbb3',
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

    const authData = useRecoilValue(authFlow)
    const updater = useSetRecoilState(type === 'post' ? postSync(public_id) : commentSync(public_id))

    const setvote = (delta: number, interaction: any) => {
        updater((old: any) => {
            return {
                ...old,
                karma: old.karma + delta,
                vote: interaction,
            }
        })
    }


    const increase = () => {
        if (authData === 'guest') return
        else if (vote === -1) { setvote(2, 1); socketRequest('vote', { vote: 1, public_id: public_id, type: type }) }
        else if (vote === 0 || !vote) { setvote(1, 1); socketRequest('vote', { vote: 1, public_id: public_id, type: type }) }
        else if (vote === 1) { setvote(-1, 0); socketRequest('vote', { vote: 0, public_id: public_id, type: type }) }
    }

    const decrease = () => {
        if (authData === 'guest') return
        else if (vote === 1) { setvote(-2, -1); socketRequest('vote', { vote: -1, public_id: public_id, type: type }) }
        else if (vote === 0 || !vote) { setvote(-1, -1); socketRequest('vote', { vote: -1, public_id: public_id, type: type }) }
        else if (vote === -1) { setvote(1, 0); socketRequest('vote', { vote: 0, public_id: public_id, type: type }) }
    }

    let color = '#b9bbbe'
    if (vote === 1) { color = '#43b581' }
    else if (vote === -1) { color = '#f04747' }

    return (
        <div css={[C.vote, size === 'small' && C.small]}>
            <Button
                css={[C.up, size === 'small' && C.smallDown, vote === 1 && { color: '#43b581' }]}
                variant="text"
                color="secondary"
                size="small"
                onClick={increase}
            >
                <ArrowDropUpRoundedIcon fontSize="large" />
            </Button>

            <Ticker value={karma} color={color} />

            <Button
                css={[C.down, size === 'small' && C.smallDown, vote === -1 && { color: '#f04747' }]}
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

export default memo(LiveVotes)



