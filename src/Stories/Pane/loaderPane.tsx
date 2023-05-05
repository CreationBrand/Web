/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { CircularProgress, Skeleton } from "@mui/material"
import { motion } from 'framer-motion'

const C = {
    container: css({
        padding: '8px',
        width: '100%',
        height: '140px',
        background: '#343442',
        borderRadius: '4px',
        margin: '10px 0px',
        display: 'flex',
        gap: '8px',
    }),
    right: css({
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    }),
}

const LoaderPane = ({ public_id, filter }: any) => {


    return (
        <motion.div

            key={'loaderpane'}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            css={C.container}>

            <Skeleton variant="rounded" width={40} height={40} animation="wave" />
            <div css={C.right}>
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />

            </div>
        </motion.div>
    )
}


export default LoaderPane
