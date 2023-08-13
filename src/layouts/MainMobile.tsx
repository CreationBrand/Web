/** @jsxImportSource @emotion/react */
import { bg_1, bg_2 } from '@/global/var'
import useSize from '@/hooks/util/useSize'
import { mainSize } from '@/state/layout'
import { css } from '@emotion/react'

import { memo, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const s = css({
    width: '100%',
    background: bg_1,
    // borderRadius: '8px',
    height: '100%',
    // overflow: 'hidden',
    position: 'fixed',
    touchAction: 'pan-y',
})

const Main = ({ children }: any) => {

    const ref: any = useRef()
    const setMainSize = useSetRecoilState(mainSize)
    const size: any = useSize(ref)

    const [hidden, setHidden]: any = useState(false);


    useEffect(() => {
        setMainSize(0)
    }, [])

    return <div css={s} ref={ref} id="MAIN" >
        {children}
    </div>
}

export default memo(Main)
