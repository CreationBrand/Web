/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import { memo, useEffect } from 'react'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Ticker from 'Stories/Bits/Ticker/Ticker'

const C = {
    container: css({
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

const LiveRoles = ({ active, value, public_id }: any) => {

    // const [counter, setCounter] = useDeltaSubscription(`post:comments:${public_id}`, value)

    useEffect(() => {
        // if (!public_id) return
        // socketRequest('view', { public_id: public_id })
    }, [public_id])

    return (
        <div css={C.container}>
        </div >
    )
}

export default memo(LiveRoles)

