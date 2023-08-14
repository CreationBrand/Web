
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// ICONS
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { socketRequest } from '@/hooks/util/useSocket'
import { authFlow } from '@/state/flow'
import { postSync, commentSync } from '@/state/sync'
import Ticker from '../Ticker'
import { bg_2, text_3 } from '@/global/var'
import { block } from '@/utils/stopPropagation'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const C = {

    vote: css({
        display: 'flex',
        background: bg_2,
        width: 'min-content',
        borderRadius: '12px',
        alignItems: 'center',
        overflow: 'hidden',
        gap: '10px',
        height: '30px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: text_3,
        padding: ' 8px',


    }),
    small: css({
        flexDirection: 'row',
        width: 'min-content',
        background: 'transparent',
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

    let color = text_3
    if (vote === 1) { color = '#43b581' }
    else if (vote === -1) { color = '#f04747' }

    return (
        <div css={[C.vote, size === 'small' && C.small]} onClick={block}>


            <FontAwesomeIcon icon={faCaretUp}
                onClick={increase}
                css={{
                    marginTop: '1px',
                    cursor: 'pointer',
                    fontSize: '16px !important',
                    color: vote === 1 ? '#43b581' : text_3
                }}
            />

            <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: color
            }}>{karma}</div>
            <FontAwesomeIcon icon={faCaretDown}
                onClick={decrease}
                css={{
                    marginBottom: '1px',
                    cursor: 'pointer',
                    fontSize: '16px !important',
                    color: vote === -1 ? '#f04747' : text_3
                }}
            />

        </div >
    )
}

export default memo(LiveVotes)



