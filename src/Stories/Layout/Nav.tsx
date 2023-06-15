/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { layoutSizeData } from 'State/Data'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'



const Nav = ({ children }: any) => {



    const layoutSize = useRecoilValue(layoutSizeData)

    const s = css({
        background: '#272732',
        width: '100%',
        borderTopLeftRadius: '0.4rem',
        borderTopRightRadius: '0.4rem',
        borderRadius: layoutSize === 'mobile' ? '8px' : '12px',
        height: '56px',
        minHeight: '50px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9),2px 0px 2px',
        display: 'flex',
        gap: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        position: 'relative',
    })

    return <div css={s} id="NAV" onClick={(e) => e.stopPropagation()}>
        {children}
    </div >
}

export default memo(Nav)
