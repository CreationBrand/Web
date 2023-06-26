/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

let sizeMap: any = {
    small: '36px',
    medium: '40px',
    large: '50px',
    extra: '80px',
}
let radiusMap: any = {
    small: '8px',
    medium: '8px',
    large: '16px',
    extra: '12px',
}

const C = {
    icon: css({
        zIndex: 100,
        background: '#0e0e10',
        overflow: 'hidden',
    }),

}

const Avatar = ({ public_id, size }: any) => {

    const handleImgError = (e: any) => e.target.src = 'fb.jpg'

    return (
        <img
            style={{
                objectFit: 'cover',
                border: '1px solid #181820',
                minWidth: sizeMap[size],
                height: sizeMap[size],
                width: sizeMap[size],
                borderRadius: radiusMap[size],
            }}
            onError={handleImgError}
            src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}`}
        />

    )
}

export default Avatar

