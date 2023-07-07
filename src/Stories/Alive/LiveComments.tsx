/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
import { faComment, faReply, faReplyAll } from '@fortawesome/free-solid-svg-icons'
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
        padding: '9px 8px',
        color: '#b9bbb3',
        fontSize: '14px',
        lineHeight: '10px !important',
        fontWeight: 'bold',
    })
}

const LiveComments = ({ value }: any) => {

    return (
        <div css={C.container}>
            <FontAwesomeIcon icon={faReplyAll} size='xs' />
            {value}
        </div>
    )
}

export default memo(LiveComments)

