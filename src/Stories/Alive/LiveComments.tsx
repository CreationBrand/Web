/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
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
        fontSize: '14px',
        fontWeight: 'bold',
    })
}

const LiveComments = ({ value }: any) => {

    return (
        <div css={C.container}>
            <FontAwesomeIcon icon={faComment} size='xs' />
            <div css={{ height: '20px' }}><Ticker value={value} /></div>
        </div >
    )
}

export default memo(LiveComments)

