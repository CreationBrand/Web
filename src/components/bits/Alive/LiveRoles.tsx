/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'


const C = {
    container: css({
        display: 'flex',
        gap: '4px',
    }),
    box: css({
        height: '18px',
        color: '#d7dadc',
        padding: '0px 6px',
        fontSize: '10px',
        background: '#181820',
        borderRadius: '6px',
        fontWeight: '600',
        lineHeight: '12px',
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    }),
    blob: css({
        height: '10px',
        width: '10px',
        borderRadius: '50%',
    }),
}

const LiveRoles = ({ value }: any) => {

    const [components, setComponents] = useState([])



    useEffect(() => {
        if (!value) return

        let list: any = []
        for (let i = 0; i < value.length; i++) {
            if (!value[i]) continue
            list.push(<div
                css={C.box} key={`${i},${value[i]?.public_id}`} >
                {value[i]?.color && <div css={C.blob} style={{
                    backgroundColor: "#" + value[i]?.color?.toString(16),
                    // borderRadius: isPublic(value[i]?.permissions) ? "2px" : "50%",
                }}></div>}
                {value[i].title}</div>
            )
        }
        setComponents(list)
    }, [value])
    return <div css={C.container}>{components} </div>
}




export default memo(LiveRoles)

