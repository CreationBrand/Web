/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'


const C = {
    container: css({
        display: 'flex',
        gap: '4px',
    }),
    box: css({
        height: '22px',
        color: '#d7dadc',
        padding: '0px 6px',
        fontSize: '12px',
        background: '#181820',
        borderRadius: '6px',
        fontWeight: '400',
        lineHeight: '20px',
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    }),
    blob: css({
        height: '12px',
        width: '12px',
        borderRadius: '50%',
    }),
}

const LiveRoles = ({ value }: any) => {

    const [components, setComponents] = useState([])



    useEffect(() => {
        if (!value) return

        let list: any = []
        for (let i = 0; i < value.length; i++) {

            console.log(value[i].color?.toString(16))
            list.push(<div
                css={C.box} key={value[i].public_id} >
                {value[i].color && <div css={C.blob} style={{ backgroundColor: "#" + value[i].color?.toString(16) }}></div>}
                {value[i].title}</div>
            )
        }
        setComponents(list)
    }, [value])
    return <div css={C.container}>{components} </div>
}




export default memo(LiveRoles)

