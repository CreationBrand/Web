/** @jsxImportSource @emotion/react */
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'


const C = {
    container: css({
        marginLeft: 'auto',
        display: 'flex',
        gap: '4px',
        height: '12px',
        alignItems: 'center',
    }),
    box: css({
        height: '12px',
        width: '12px',
        borderRadius: '4px',
    }),
    mobile: css({
        height: '10px',
        width: '10px',
        borderRadius: '50%',
    }),
}

const LiveTags = ({ value }: any) => {
    const [components, setComponents] = useState([])
    const layout = useRecoilValue(layoutSize)

    useEffect(() => {
        if (!value) return
        let list: any = []
        for (let i = 0; i < value.length; i++) {
            if (!value[i]) continue
            list.push(<div
                style={{ backgroundColor: "#" + value[i].color?.toString(16) }}
                css={layout === 'mobile' ? C.mobile : C.box} key={value[i].public_id} />
            )
        }
        setComponents(list)
    }, [value])

    if (!value) return null
    return <div css={C.container}>{components}</div>
}




export default memo(LiveTags)

