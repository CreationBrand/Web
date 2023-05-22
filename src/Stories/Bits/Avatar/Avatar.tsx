/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const Avatar = ({ public_id, size, onClick }: Props) => {
    const handleClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (onClick) onClick(e)
    }

    let sizeMap = {
        small: '34px',
        medium: '40px',
        large: '50px',
        extra: '80px',
    }

    let radiusMap = {
        small: '8px',
        medium: '8px',
        large: '16px',
        extra: '12px',
    }

    const C = {
        icon: css({
            minWidth: sizeMap[size],
            height: sizeMap[size],
            width: sizeMap[size],
            borderRadius: radiusMap[size],
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


    const handleImgError = (e: any) => {
        // console.log('error')
        e.target.style.display = 'none'

    }

    return (
        <motion.div whileTap={{ scale: 0.9 }} css={C.icon} onClick={handleClick}>
            <img
                css={C.image}
                onError={handleImgError}
                src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}`}
            ></img>
        </motion.div>
    )
}

export default Avatar

interface Props {
    public_id: any

    onClick?: any
    size: 'small' | 'medium' | 'large' | 'extra'
}
