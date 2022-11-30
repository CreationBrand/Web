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
        small: '32px',
        medium: '40px',
        large: '80px',
    }

    const C = {
        icon: css({
            minWidth: sizeMap[size],
            height: sizeMap[size],
            width: sizeMap[size],
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
        <motion.div whileTap={{ scale: 0.9 }} css={C.icon} onClick={handleClick}>
            <img
                css={C.image}
                onError={(event) => {
                    //@ts-ignore
                    event.target.style.display = 'none'
                }}
                src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}.png`}
            ></img>
        </motion.div>
    )
}

export default Avatar

interface Props {
    public_id: any

    onClick?: any
    size: 'small' | 'medium' | 'large'
}
