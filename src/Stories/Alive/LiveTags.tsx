/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'


const C = {
    container: css({
        display: 'flex',
        gap: '4px',
    }),
    box: css({
        height: '12px',
        width: '12px',
        borderRadius: '3px',

    }),
}

const LiveTags = ({ value }: any) => {

    const [components, setComponents] = useState([])

    useEffect(() => {
        let list: any = []
        for (let i = 0; i < value.length; i++) {
            list.push(<div
                style={{ backgroundColor: "#" + value[i].color?.toString(16) }}
                css={C.box} key={value[i].public_id} />
            )
        }
        setComponents(list)
    }, [value])
    return <div css={C.container}>{components} </div>
}




export default memo(LiveTags)
