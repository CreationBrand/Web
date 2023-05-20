
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import theme from 'Global/Theme'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { mMuted } from 'Stories/Bits/Text/Text'
import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import Ticker from '../Bits/Ticker/Ticker'
import { memo, useEffect, useState } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSocketRequest } from 'Hooks'
import { socketRequest } from 'Service/Socket'


const C = {

    vote: css({
        display: 'flex',
        background: '#181820',
        borderRadius: '8px',
        gap: '4px',
        width: 'min-content',
        height: '30px',
        alignItems: 'center',
        padding: '0px 8px',
        color: '#b9bbb3',
    })
}

const LiveViews = ({ views, public_id }: any) => {

    const [counter, setCounter] = useDeltaSubscription(`view:${public_id}`, views)

    useEffect(() => {


        if (!public_id) return
        socketRequest('view', { public_id: public_id })
    }, [public_id])

    return (
        <div css={C.vote}>
            <Ticker value={counter} />
            <FontAwesomeIcon icon={faEye} version='fa-reg' size='xs' />
        </div >
    )
}

export default memo(LiveViews)

