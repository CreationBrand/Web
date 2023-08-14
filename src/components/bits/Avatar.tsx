/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'
// @ts-ignore
import src from '@/assets/fb.webp'

let sizeMap: any = {
    tiny: '24px',
    small: '32px',
    medium: '40px',
    large: '50px',
    extra: '80px',
    mobilePost: '26px',
    headerMobile: '48px',
    
}
let radiusMap: any = {
    tiny: '50%',
    small: '50%',
    medium: '12px',
    large: '16px',
    extra: '12px',
    mobilePost: '50%',
    headerMobile: '16px',
}

const C = {
    icon: css({
        zIndex: 100,
        background: '#0e0e10',
        overflow: 'hidden',
    }),

}

const Avatar = ({ public_id, size }: any) => {

    const handleImgError = (e: any) => e.target.src = src

    return (

        <img
            alt={'avatar'}
            style={{
                objectFit: 'cover',
                border: '1px solid #181820',
                minWidth: sizeMap[size],
                height: sizeMap[size],
                width: sizeMap[size],
                borderRadius: radiusMap[size],
            }}
            onError={handleImgError}
            // @ts-ignore
            src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}`}
        />

    )
}

export default memo(Avatar)

