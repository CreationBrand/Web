
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Ticker from '../Ticker/Ticker'
import { memo, useEffect, useState } from 'react'
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mMuted } from '../Text/Text'

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

const Comment = ({ comments, public_id }: any) => {

    // const [counter, setCounter] = useDeltaSubscription(`view:${public_id}`, views)

    // useEffect(() => {

    //     if (!public_id) return
    //     socketRequest('view', { public_id: public_id })
    // }, [public_id])

    return (
        <div css={C.vote}>

            <div css={[mMuted, {
            }]}>
                <Ticker value={comments} />
            </div>

            <FontAwesomeIcon icon={ faComment }   size='xs'/>
   



        </div >
    )
}

export default memo(Comment)

