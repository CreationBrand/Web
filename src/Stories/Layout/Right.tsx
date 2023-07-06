/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'

const s = css({
    width: '100%',
    borderRadius: '8px',
    height: '100%',
    padding: '8px',
    background: '#181820',
    display: 'flex',
    flexDirection: 'column',
})

const Right = ({ children }: any) => {
    return <div css={s} id="LEFT">
        {children}
    </div >
}

export default memo(Right)
