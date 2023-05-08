/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'



const Nav = ({ children }: any) => {

    const s = css({
        background: '#272732',
        width: '100%',
        borderTopLeftRadius: '0.4rem',
        borderTopRightRadius: '0.4rem',
        borderRadius: '8px',
        height: '56px',
        minHeight: '50px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9),0 0px 2px',
        display: 'flex',
        gap: '16px',
        paddingLeft: '12px',
        paddingRight: '12px',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        position: 'relative',
    })

    return <div css={s} id="NAV">
        {children}
    </div >
}

export default Nav
