/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bg_2 } from '@/global/var'

const C = {
    container: css({
        display: 'flex',
        width: 'min-content',
        fontSize: '14px',
        background: bg_2,
        borderRadius: '12px',
        gap: '4px',
        padding: '10px 10px',
        color: '#b9bbbe',
        fontWeight: 'bold',
        lineHeight: '10px',
    }),

}

const LiveComments = ({ value }: any) => {

    return (
        <div css={C.container}>
            <FontAwesomeIcon icon={faFolderOpen} size='xs' />
            {value}
        </div>
    )
}

export default memo(LiveComments)

