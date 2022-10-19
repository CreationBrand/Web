/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'

const Nav = (props: Props) => {
    const s = css({
        width: '100%',
        borderTopLeftRadius: '0.4rem',
        borderTopRightRadius: '0.4rem',
        // border: '1px solid blue',
        height: '50px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9),0 0px 2px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    })

    return <div css={s}>{props.children}</div>
}

export default Nav

export interface Props {
    children?: any
}
