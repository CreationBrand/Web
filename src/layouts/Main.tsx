/** @jsxImportSource @emotion/react */
import useSize from '@/hooks/util/useSize'
import { mainSize } from '@/state/layout'
import { css } from '@emotion/react'

import { memo, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

const s = css({
    width: '100%',
    // borderRadius: '8px',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    touchAction: 'pan-y',
})

const Main = ({ children }: any) => {

    const ref: any = useRef()
    const setMainSize = useSetRecoilState(mainSize)
    const size: any = useSize(ref)

    useEffect(() => {
        if (size?.width < 852) setMainSize(0)
        else if (size?.width < 1024) setMainSize(1)
        else setMainSize(2)
    }, [size])

    return <div css={s} ref={ref} id="MAIN" >
        {children}
    </div>
}

export default memo(Main)
