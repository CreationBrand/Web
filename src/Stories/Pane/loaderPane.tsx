/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { CircularProgress, Skeleton } from "@mui/material"

const C = {
    container: css({
        padding: '8px',
        width: '100%',
        height: '100px',
        background: '#343442',
        borderRadius: '4px',
        margin: '10px 20px',
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
        <div css={C.container}>

            <Skeleton variant="rounded" width={40} height={40} animation="wave" />
            <div css={C.right}>
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height={20} animation="wave" />
                <Skeleton variant="rounded" width={'100%'} height={20}  animation="wave"/>
                <Skeleton variant="rounded" width={'100%'} height={20}  animation="wave"/>

            </div>
        </div>
    )
}


export default LoaderPane
