/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { textBold, textLabel } from 'Global/Mixins';
import useDeltaSubscription from 'Hooks/useDeltaSubscription';
import useSubscription from 'Hooks/useSubscription';
import { socket, socketRequest } from 'Service/Socket';
import { useEffect } from 'react';

const C = {
    online: css({
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#43b581',
        marginLeft: '8px',
        marginRight: '2px',
        animation: 'pulse 2s infinite',

        "@keyframes pulse": {
            "0%": {
                "transform": "scale(0.95)",
                "boxShadow": "0 0 0 0 rgba(51, 217, 178, 0.7)"
            },
            "70%": {
                "transform": "scale(1)",
                "boxShadow": "0 0 0 4px rgba(51, 217, 178, 0)"
            },
            "100%": {
                "transform": "scale(0.95)",
                "boxShadow": "0 0 0 0 rgba(51, 217, 178, 0)"
            }
        }

    }),
}

const Online = ({ public_id }: any) => {
    const data = useSubscription(`online:${public_id}`)


    return (
        <span
            css={{
                lineHeight: '20px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
            }}>
            <span css={C.online} />
            {data ? data : 0}
        </span>
    )

}


export default Online