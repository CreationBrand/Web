/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react'
import theme from 'Global/Theme'
import { background } from 'Global/types'


const Mono = ({ so, background, children, src }: Props) => {

    //@ts-ignore
    const s = css({
        so,
        background: src? null : theme.background[background],
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        position: 'relative',
    })


    return <div css={s}>
        {src &&
            <img src={src}
                style={{
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }} />
        }
        {children}
    </div>
}

export default Mono

export interface Props {
    so?: any
    children?: any
    background: background,
    src?: string
}
