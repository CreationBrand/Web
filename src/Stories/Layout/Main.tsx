/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import useSize from 'Hooks/useSize'
import { mainSizeState } from 'State/Data'
import { memo, useEffect, useRef } from 'react'
import { set } from 'react-hook-form'
import { useRecoilState } from 'recoil'


const s = css({
    width: '100%',
    borderRadius: '8px',
    height: '100%',
    background: '#0f0e10',
    overflow: 'hidden',
    position: 'relative',
})



const Main = ({ children }: any) => {

    const ref: any = useRef()
    const [mainSize, setMainSize] = useRecoilState(mainSizeState)
    const size: any = useSize(ref)


    useEffect(() => {
        if(size?.width < 852) setMainSize(0)
        else if(size?.width < 1024) setMainSize(1)
        else setMainSize(2)
    }, [size])



return <div css={s} ref={ref} id="MAIN" >
    {children}
</div >
}

export default memo(Main)
