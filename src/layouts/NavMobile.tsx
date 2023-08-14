/** @jsxImportSource @emotion/react */

import { bg_1, bg_3, text_2 } from '@/global/var'
import { navOffset } from '@/state/data'
import { css } from '@emotion/react'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

const s = css({
    background: bg_3,
    borderBottom: `1px solid ${bg_1}`,
    width: '100%',
    display: 'flex',
    gap: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '48px',
    color: text_2,
    zIndex: 500,
})



const Nav = ({ children }: any) => {

    const offset = useRecoilValue(navOffset)

    return <div css={s} style={{ top:- offset }}>
        {children}
    </div>
}

export default memo(Nav)
