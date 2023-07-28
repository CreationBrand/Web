/** @jsxImportSource @emotion/react */
import { bg_2 } from '@/global/var'
import { css } from '@emotion/react'
import { memo } from 'react'

const s = css({
    width: '100%',
    borderRadius: '8px',
    height: '100%',
    padding: '8px',
    background: bg_2,
    display: 'flex',
    flexDirection: 'column',
})

const Right = ({ children }: any) => {
    return <div css={s}>
        {children}
    </div >
}

export default memo(Right)
