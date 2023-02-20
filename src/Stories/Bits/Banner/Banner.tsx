/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState } from 'react'

const Banner = ({ public_id, size }: Props) => {


    const [error, setError] = useState(true)



    let sizeMap = {
        small: '32px',
        medium: '40px',
        large: '60px',
        extra: '80px',
    }

    const C = {
        icon: css({
            width: '100%',
            height: sizeMap[size],
            borderRadius: '8px',
            background: '#0e0e10',
            overflow: 'hidden',
        }),
        image: css({
            minWidth: sizeMap[size],
            height: sizeMap[size],
            width: sizeMap[size],
            objectFit: 'cover',
        }),
    }

    return (
        <div css={C.icon}
            style={error ? { display: 'none' } : {}}
        >
            <img
                css={C.image}
                onLoad={(event) => { setError(false) }}
                // onError={(event) => {setError(true)}}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}.png`}
            ></img>
        </div>
    )
}

export default Banner

interface Props {
    public_id: any
    size: 'small' | 'medium' | 'large' | 'extra'
}
