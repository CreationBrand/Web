/** @jsxImportSource @emotion/react */
import { bg_1, bg_3 } from '@/global/var';
import { css } from '@emotion/react'
import { Skeleton } from '@mui/material';

const C = {
    container: css({
        width: '100%',
        margin: '12px 0px 0px 0px',
        background: bg_3,
        minHeight: '56px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
    }),

}

export const PostHolder = () => {

    return <div css={C.container}>

        <div css={{ display: 'flex', gap: '8px' }}>
            <div css={{
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                background: bg_1,
            }}></div>
            <div css={{ width: '100%' }}>
                <div css={{
                    borderRadius: '12px',
                    width: '80px',
                    height: '18px',
                    background: bg_1,
                }} />
                <div css={{
                    marginTop: '4px',
                    borderRadius: '12px',
                    width: '80px',
                    height: '18px',
                    background: bg_1,
                }} />
            </div>
        </div>

        <div css={{
            marginTop: '4px',
            borderRadius: '12px',
            width: '100%',
            height: '400px',
            background: bg_1,
        }} />

        <div css={{ display: 'flex', gap: '8px' }}>
            <div css={{
                marginTop: '4px',
                borderRadius: '12px',
                width: '80px',
                height: '30px',
                background: bg_1,
            }} />
            <div css={{
                marginTop: '4px',
                borderRadius: '12px',
                width: '40px',
                height: '30px',
                background: bg_1,
            }} />
            <div css={{
                marginTop: '4px',
                borderRadius: '12px',
                width: '40px',
                height: '30px',
                background: bg_1,
            }} />

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
        background: bg_3,
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',

    }),
}
export const HeadHolder = () => {


    return <div css={D.container}>
        <div css={D.inner}>

            <Skeleton variant="rounded" animation={false} width='200px' sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                borderRadius: '16px !important',
            }} height={58} />

            <Skeleton variant="rounded" animation={false} width='64px' sx={{
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
        background: bg_3,
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
                <div css={{
                    borderRadius: '12px',
                    width: '80px',
                    height: '28px',
                    background: bg_1,
                }} />
                <div css={{
                    borderRadius: '12px',
                    width: '80px',
                    height: '28px',
                    background: bg_1,
                }} />
                <div css={{
                    borderRadius: '12px',
                    width: '80px',
                    height: '28px',
                    background: bg_1,
                }} />

            </div>

            <Skeleton variant="rounded" animation={false} width={40} height={28} />


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
        background: bg_3,
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
                <Skeleton variant="rounded" animation={false} width={36} height={36} />
                <Skeleton variant="rounded" animation={false} width={80} height={20} />
            </div>
            <Skeleton variant="rounded" animation={false} width={36} height={36} />
        </div>




    </div>
}