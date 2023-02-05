/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Divider } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import theme from 'Global/Theme'
import { memo } from 'react'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import { mNormal, xBold } from 'Stories/Bits/Text/Text'

const C = {
    container: css({
        width: '100%',
        margin: '10px 20px',
        borderRadius: '8px',
        display: 'flex',
        background: '#45455a',
        flexDirection: 'column',
        gap: '8px',
    }),
    banner: css({
        width: '100%',
        height: '60px',
        background: '#151618',
        position: 'relative',
        borderRadius: '8px',
    }),
    bannerImage: css({
        objectFit: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px',
    }),
    content: css({
        position: 'absolute',
        display: 'flex',
        top: '40px',
        left: '40px',
        borderRadius: '8px',
        gap: '8px',
        background: '#0f0e10',
        boxShadow: theme.elevation.m,
    }),
    title: css({
        height: '60px',
        paddingLeft: '120px',
    }),
}

const CommunityPane = ({ data }: any) => {
    // console.log(data)
    return (
        <div css={C.container}>
            <div css={C.banner}>
                <img css={C.bannerImage} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}.png`}></img>
            </div>

            <div css={C.content}>
                <Avatar public_id={data.public_id} size="extra"></Avatar>
            </div>
            <div css={C.title}>
                <div>
                    <div css={xBold}>{data.title}</div>
                    <div css={mNormal}>{data.description}</div>
                </div>
            </div>
        </div>
    )
}

export default memo(CommunityPane)
