/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useDeltaSubscription from 'Hooks/useDeltaSubscription';
import useSubscription from 'Hooks/useSubscription';
import { socket, socketRequest } from 'Service/Socket';
import { useEffect } from 'react';

const C = {
    online: css({
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#43b581',
        marginLeft: '8px',
    }),
}

const Online = ({ public_id }: any) => {

    const data = useSubscription(`online:${public_id}`)

    console.log('data', data)

    return (
        <span
            css={{

            }}>

            <span css={C.online} /> 5 Online
        </span>
    )

}


export default Online