/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
// import theme from "Global/Theme"

const C = {
    layout: css({
        display: 'flex',
        overflow: 'hidden',
        height: '100vh',
        background: '#0e0e10',
        boxSizing: 'border-box',
        padding: '22px',
    }),
    left: css({
        height: '100%',
        boxSizing: 'border-box',
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
    }),
    right: css({
        paddingLeft: '22px',
        height: '100%',
        width: '50%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'flex-start',
    }),
    exit: css({
        position: 'absolute',
        top: '22px',
        right: '22px',
    })
}

const Duo = (props: Props) => {


    return (
        <div css={C.layout}>
            <div css={C.left}> {props.children[0]} </div>
            <div css={C.right}> {props.children[1]} </div>
            <div css={C.exit}> {props.children[2]} </div>
        </div>
    )
}

export default Duo

export interface Props {
    children: any
}
