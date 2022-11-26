/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { xsLabel } from 'Stories/Text/Text'

const C = {
    container: css({
        width: 'fit-content',
        height: '14px',
        background: 'rgb(59, 59, 59)',
        borderRadius: '4px',
        paddingRight: '4px',
        paddingLeft: '4px',
        display: 'flex',
        marginTop:'2px',
        justifyContent: 'start',
        alignItems: 'center'
    }),
    bullet: css({
        borderRadius: '50%',
        width: '6px',
        height: '6px',
        padding: '0',
        margin: '0 4px',
        background: '$text-muted'
    }),
    title: css({
        fontSize: '10px', lineHeight: '16px',
        color: '#fff'
    })
}

const Chip = ({ title, color, showBullet, clickable, onClick }: props) => {
    return (
        <div css={C.container}>
            {showBullet && (
                <div css={C.bullet} style={{ background: `#${color}` }}></div>
            )}
            <div css={xsLabel}>
                {title}
            </div>
        </div>
    )
}

interface props {
    title: string
    color: string
    showBullet: boolean
    clickable: boolean
    onClick?: any
}

export default Chip
