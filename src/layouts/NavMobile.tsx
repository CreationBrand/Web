/** @jsxImportSource @emotion/react */

import { bg_1, bg_3, bg_4, shadow_1, text_2 } from '@/global/var'
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { useNavigate } from 'react-router-dom'
import { iconButton } from '@/global/mixins'
const s = css({
    background: bg_3,
    borderBottom: `1px solid ${bg_1}`,
    width: '100%',
    display: 'flex',
    gap: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    alignItems: 'center',
    position: 'relative',
    height: '48px',
    color: text_2,


})


const Nav = ({ children }: any) => {

    const layout = useRecoilValue(layoutSize)


    return <div css={s}>
        {children}
    </div>
}

export default memo(Nav)
