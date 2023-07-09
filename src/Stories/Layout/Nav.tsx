/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { layoutSizeData } from 'State/Data'
import { cancel } from 'Util/stopPropagation'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

const s = css({
    background: '#272732',
    width: '100%',
    borderTopLeftRadius: '0.4rem',
    borderTopRightRadius: '0.4rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.9),2px 0px 2px',
    display: 'flex',
    gap: '6px',
    paddingLeft: '8px',
    paddingRight: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 400,
    position: 'relative',
    height: '56px',
    // backgroundImage: `url(${process.env.REACT_APP_CLOUDFRONT}/banner/85d7ca20-199a-40bb-ba9f-dc7d54ebfae2)`,
})


const Nav = ({ children }: any) => {

    const layout = useRecoilValue(layoutSizeData)

    return <div
        id="NAV"
        css={s}
        style={{
            borderRadius: layout === 'mobile' ? '8px' : '12px',
            // height: layout === 'mobile' ? '50px' : '56px',
        }}
        onClick={cancel}
    >
        {children}
    </div >
}

export default memo(Nav)
