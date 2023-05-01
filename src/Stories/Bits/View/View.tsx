
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Button } from '@mui/material'
import theme from 'Global/Theme'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import { mMuted } from 'Stories/Bits/Text/Text'
import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import Ticker from '../Ticker/Ticker'
import { memo, useEffect, useState } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSocketRequest } from 'Hooks'
import { socketRequest } from 'Service/Socket'


const C = {

    vote: css({
        display: 'flex',
        background: theme.background.tri,
        flexDirection: 'column',
        borderRadius: '8px',
        width: '40px',
        alignItems: 'center',
        padding: '4px',
        color: '#b9bbb3',
    })
}

const View = ({ views, public_id }: any) => {

    const [counter, setCounter] = useDeltaSubscription(`view:${public_id}`, views)

    useEffect(() => {
        socketRequest('view', { public_id: public_id })
    }, [public_id])

    return (
        <div css={C.vote}>

            <FontAwesomeIcon icon={faEye} size='xs' />

            <div css={[mMuted, {
            }]}>
                <Ticker value={counter} />
            </div>


        </div >
    )
}

export default memo(View)

