/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Main = ({ children }: any) => {

    const s = css({
        width: '100%',
        borderRadius: '8px',
        height: '100%',
        background: '#0f0e10',
        overflow: 'hidden',
    })

    return <div css={s} id="MAIN">
        {children}
    </div >
}

export default Main
