/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useSubscription from 'Hooks/useSubscription';


const C = {
    online: css({
        display: 'inline-block',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#43b581',
        marginLeft: '8px',
        marginRight: '2px',


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
    const data = useSubscription(`online:${public_id}`, false, true)


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