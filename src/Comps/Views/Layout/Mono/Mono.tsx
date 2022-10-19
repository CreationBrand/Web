/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react'
import { background } from 'Global/types'

const Mono = ({ so, background, children }: Props) => {
    const theme: any = useTheme()
    const s = css({
        so,
        background: theme.background[background],
        overflow: 'hidden',
        height: '100vh',
        width: '100vw'
    })

    return <div css={s}>{children}</div>
}

export default Mono

export interface Props {
    so?: any
    children?: any
    background: background
}
