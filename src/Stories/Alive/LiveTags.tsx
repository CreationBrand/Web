/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import useSubscription from 'Hooks/useSubscription'
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

const LiveTags = ({ active, value, public_id }: any) => {

    const [components, setComponents] = useState([])
    const tags = useSubscription(`tags:${public_id}`, value, active)


    useEffect(() => {
        let list: any = []
        for (let i = 0; i < tags.length; i++) {
            list.push(<div
                style={{ backgroundColor: "#" + tags[i].color?.toString(16) }}
                css={C.box} key={tags[i].public_id} />
            )
        }
        setComponents(list)
    }, [tags])

    return <div css={C.container}>{components} </div>
}




export default memo(LiveTags)

