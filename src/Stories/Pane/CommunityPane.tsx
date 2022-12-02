/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Divider } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import { mNormal, xBold } from 'Stories/Text/Text'

const C = {
    container: css({
        width: '100%',
        margin: '10px 20px',
        borderRadius: '8px',
        display: 'flex',
        background: '#343442',
        flexDirection: 'column',
        gap: '8px',
    }),
    banner: css({
        width: '100%',
        height: '120px',
        background: '#151618',
        borderRadius: '8px',
        position: 'relative',
        // border: '8px solid #151618',
    }),
    bannerImage: css({
        objectFit: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '8px',

    }),
    quad: css({
        maxHeight: '40px',
        width: '100%',
    }),
    content: css({
        background: '#181820',
        display: 'flex',
        margin: '12px',
        padding: '12px',
        borderRadius: '8px',
        gap: '8px',
    }),
}

const CommunityPane = ({ data }: any) => {
    console.log(data)
    return (
        <div css={C.container}>
            <div css={C.banner}>
                <img css={C.bannerImage} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}.png`}></img>
            </div>
            <div css={C.content}>
                <Avatar public_id={data.public_id} size="extra"></Avatar>

                <Grid2 container spacing={0}  width='100%'>
                    <Grid2 xs={6} margin={0}>
                        <div css={C.quad}>
                            <div css={xBold}> {data.title}</div>
                            <div css={mNormal}> This is the description</div>
                        </div>
                    </Grid2>

                    <Grid2 xs={6} margin={0}>
                        <div css={C.quad}>
                            <div css={xBold}> {data.title}</div>
                            <div css={mNormal}> This is the description</div>
                        </div>
                    </Grid2>

                    <Grid2 xs={6} margin={0}>
                        <div css={C.quad}>
                            <div css={xBold}> {data.title}</div>
                            <div css={mNormal}> This is the description</div>
                        </div>
                    </Grid2>

                    <Grid2 xs={6} margin={0}>
                        <div css={C.quad}>
                            <div css={xBold}> {data.title}</div>
                            <div css={mNormal}> This is the description</div>
                        </div>
                    </Grid2>
                </Grid2>
            </div>
        </div>
    )
}

export default CommunityPane
