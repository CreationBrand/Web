
/** @jsxImportSource @emotion/react */
import { bg_1 } from '@/global/var'
import { css } from '@emotion/react'

const c = {
    left: css({
        height: '100%',
        padding: '8px',
        paddingRight: '0px',
        boxSizing: 'border-box',
        minWidth: '240px',
        width: '240px',
        marginLeft: '',
        position: 'relative',
        zIndex: '',
        opacity: '',
        transition: 'opacity 0.3s , margin-left 0.3s ease-in-out'
    }),
    right: css({
        height: '100%',
        padding: '8px',
        paddingLeft: '0px',
        boxSizing: 'border-box',
        width: '240px',
        position: 'relative',
        right: '',
        zIndex: '',
        opacity: '',
        transition: 'opacity 0.3s , margin-right 0.3s ease-in-out'
    }),
    center: css({
        height: '100%',
        flexGrow: '1',
        boxSizing: 'border-box',
        width: 'auto',
        padding: '8px',
        touchAction: 'none',
        position: 'relative',
        zIndex: 100
    }),
    layout: css({
        display: 'flex',
        overflow: 'hidden',
        height: '100vh',
        boxSizing: 'border-box',
        touchAction: 'none',
        background: bg_1,
    })
}

const Desktop = (props: any) => {

    return (
        <div css={c.layout}>
            <div style={{ marginLeft: (props.left ? '0px' : '-240px') }} css={c.left}>
                {props.children[0]}
            </div>
            <div css={c.center}>
                {props.children[1]}
            </div>
            <div style={{ marginRight: (props.right ? '0px' : '-240px') }} css={c.right}>
                {props.children[2]}
            </div>
        </div>
    )
}

export default Desktop
