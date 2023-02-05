/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { formatDistanceStrict, parseISO } from 'date-fns'
import { sMuted } from 'Stories/Bits/Text/Text'

const TimeStamp = ({ time }: any) => {
    return (
        <div css={sMuted}>
            {formatDistanceStrict(parseISO(time), new Date(), {
                addSuffix: false
            })}
        </div>
    )
}

export default TimeStamp
