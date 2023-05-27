/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'

const C = {
    container: css({
        position: 'absolute',
        bottom: '8px',
        left: '8px',
        rotate: '180deg',
        background: '#181820',
        borderRadius: '8px',
        padding: '8px',
        color: "#b9bbbe",
        fontSize: '12px',
        fontWeight: 500,
        textTransform: 'capitalize',

    }),
}


const MessengerPane = ({ public_id, status }: any) => {


    return <div css={C.container}> {status}</div>
}





export default memo(MessengerPane)