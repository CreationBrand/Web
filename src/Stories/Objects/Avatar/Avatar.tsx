/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const Avatar = ({ public_id, size }: Props) => {
    let sizeMap = {
        small: '32px',
        medium: '40px',
        large: '80px'
    }

    const C = {
        icon: css({
            height: sizeMap[size],
            width: sizeMap[size],
            borderRadius: '8px',
            background: '#0e0e10',
            overflow: 'hidden'
        }),
        image: css({
            height: sizeMap[size],
            width: sizeMap[size],
            objectFit: 'cover'
        })
    }

    return (
        <div css={C.icon}>
            <img
                css={C.image}
                onError={(event) => {
                    //@ts-ignore
                    event.target.style.display = 'none'
                }}
                src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}.png`}
            ></img>
        </div>
    )
}

export default Avatar

interface Props {
    public_id: any
    size: 'small' | 'medium' | 'large'
}
