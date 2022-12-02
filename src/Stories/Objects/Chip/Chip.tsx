/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { xsLabel } from 'Stories/Text/Text'

const C = {
    container: css({
        width: 'fit-content',
        height: '20px',
        background: '#343442',
        borderRadius: '4px',
        padding: '6px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        marginTop: '4px',
    }),

    title: css({
        fontSize: '12px',
        color: '#fff',
        fontFamily: 'Inter',
    }),
}

const Chip = ({ title, color }: any) => {
    return (
        <div css={C.container}>
            <div css={C.title}>{title}</div>
        </div>
    )
}

interface props {
    title: string
    color: string
}

export default Chip
