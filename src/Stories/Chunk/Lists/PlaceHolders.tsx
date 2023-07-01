/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Skeleton } from '@mui/material';

const C = {
    container: css({
        width: '100%',
        padding: '16px 0px 0px 0px',
    }),
    inner: css({
        background: '#272732',
        minHeight: '56px',
        width: '100%',
        maxWidth: '800px',
        height: '530px',
        display: 'flex',
        flexDirection: 'column',

        margin: '0 auto',
        gap: '8px',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
    }),
}

export const PostHolder = () => {

    return <div css={C.container}>
        <div css={C.inner}>

            <div css={{ display: 'flex', gap: '8px' }}>
                <Skeleton variant="rounded" animation="wave" width={40} height={40} />
                <div css={{ width: '100%' }}>
                    <Skeleton variant="rounded" animation="wave" width='140px' sx={{ marginBottom: '4px' }} height={18} />
                    <Skeleton variant="rounded" animation="wave" width='140px' height={18} />
                </div>
            </div>

            <Skeleton variant="rounded" animation="wave" width='100%' height={400} />

            <div css={{ display: 'flex', gap: '8px' }}>
                <Skeleton variant="rounded" animation="wave" width={80} height={30} />
                <Skeleton variant="rounded" animation="wave" width={50} height={30} />
                <Skeleton variant="rounded" animation="wave" width={30} height={30} />

            </div>
        </div>
    </div>
};


const D = {
    container: css({
        width: '100%',
        minHeight: '100px',
        padding: '16px 2px 0px 0px',
    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        height: '140px',
        maxWidth: '800px',
        background: '#272732',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',

    }),
}
export const HeadHolder = () => {


    return <div css={D.container}>
        <div css={D.inner}>

            <Skeleton variant="rounded" animation="wave" width='200px' sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                borderRadius: '16px !important',
            }} height={58} />

            <Skeleton variant="rounded" animation="wave" width='64px' sx={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                borderRadius: '16px !important',
            }} height={33} />


        </div>
    </div>
}


const E = {
    container: css({
        width: '100%',
        padding: '16px 2px 0px 0px',
    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        height: '42px',
        maxWidth: '800px',
        background: '#272732',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        padding: '8px',
        justifyContent: 'space-between',
    }),
}

export const FilterHolder = () => {

    return <div css={E.container}>
        <div css={E.inner}>

            <div css={{ display: 'flex', gap: '8px', }}>
                <Skeleton variant="rounded" animation="wave" width={80} height={28} />
                <Skeleton variant="rounded" animation="wave" width={80} height={28} />
                <Skeleton variant="rounded" animation="wave" width={80} height={28} />
            </div>

            <Skeleton variant="rounded" animation="wave" width={40} height={28} />


        </div>
    </div>
}

const F = {
    container: css({
        width: '100%',
        padding: '16px 2px 0px 0px',
    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        // height: '42px',
        // height: '120px',
        maxWidth: '800px',
        background: '#272732',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        padding: '16px 8px',
        justifyContent: 'space-between',
    }),
}
export const CommentHolder = () => {

    return <div css={F.container}>
        <div css={F.inner}>

            <div css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Skeleton variant="rounded" animation="wave" width={36} height={36} />
                <Skeleton variant="rounded" animation="wave" width={80} height={20} />
            </div>
            <Skeleton variant="rounded" animation="wave" width={36} height={36} />
        </div>




    </div>
}