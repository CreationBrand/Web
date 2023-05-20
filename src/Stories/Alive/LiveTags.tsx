/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import useDeltaSubscription from 'Hooks/useDeltaSubscription'
import { memo, useEffect } from 'react'



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
    const [ components, setComponents] = useState([])

    // const [counter, setCounter] = useDeltaSubscription(`post:comments:${public_id}`, value)

    useEffect(() => {
        // if (!public_id) return
        // socketRequest('view', { public_id: public_id })
    }, [public_id])



    useEffect(() => {
        let tags:any = value;
        let list = []
        for (let i = 0; i < tags.length; i++) {
            list.push(<div
                style={{ backgroundColor: "#" + tags[i].color?.toString(16) }}
                css={C.box} key={tags[i].public_id} />
            )
        }
        setComponents(list)
    }, [value])



    return <div css={C.container}>{components} </div>
}




export default memo(LiveTags)

