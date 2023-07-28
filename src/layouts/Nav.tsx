/** @jsxImportSource @emotion/react */

import { bg_1, bg_3, shadow_1 } from '@/global/var'
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

const s = css({
    background: bg_3,
    width: '100%',
    boxShadow: shadow_1,
    display: 'flex',
    gap: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 400,
    position: 'relative',
    height: '56px',

})


const Nav = ({ children }: any) => {

    const layout = useRecoilValue(layoutSize)

    return <div
        css={s}
        style={{
              borderRadius: layout === 'mobile' ? '0px !important' : '12px' ,
            //   width: layout === 'mobile' ? '100vw' : '100%' ,
        
        
        }}    >
        {children}
    </div >
}

export default memo(Nav)
