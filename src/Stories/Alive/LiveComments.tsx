/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
import { faComment, faReply, faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Ticker from 'Stories/Bits/Ticker/Ticker'

const C = {
    container: css({
        display: 'flex',
        alignItems: 'center',
        width: 'min-content',
        height: '30px',
        lineHeight: '30px',
        fontSize: '14px',
        background: '#181820',
        borderRadius: '8px',
        gap: '4px',
        padding: '0px 8px',
        color: '#b9bbbe',
        fontWeight: 'bold',
    }),

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

