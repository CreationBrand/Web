/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { textBold, textNormal } from 'Global/Mixins'

import { useRecoilState, useRecoilValue } from 'recoil'
import { contentFlow } from 'State/Flow'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import CommunityStats from 'Stories/Bits/StatCheck/CommunityStats'


const C = {
    container: css({
        width: '100%',
        background: '#343442',
        borderRadius: '16px',
    }),
    banner: css({
        width: '100%',
        background: '#181820',
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
    }),
    inner: css({
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',

    }),
    row: css({
        display: 'flex',
        gap: '16px',
        alignItems: 'end',
        lineHeight: '30px',
    }),

}

const CommunityPane = ({ data }: any) => {


    const contentState = useRecoilValue(contentFlow)


    // console.log(data)
    console.log(contentState)

    console.log(data)
    return (
        <>

            <div css={C.container}>
                <div css={C.banner} />
                <div css={C.inner} >

                    <div css={C.row}>
                        <Avatar size='large' public_id={data.public_id} />
                        <div>
                            <div css={textBold('g')}>{data.title}</div>
                            <div css={[textNormal('s')]}>{data.description === undefined ? data.description : 'A non-descript community.'}</div>
                        </div>

                        <Button
                            disableElevation
                            sx={{
                                marginLeft: 'auto !important',
                                fontFamily: 'Noto Sans',
                                background: '#272732',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '700',
                            }}
                            variant="contained">{contentState?.roles?.length > 1 ? 'LEAVE' : 'JOIN'}</Button>

                    </div>

                </div>
            </div>
            <CommunityStats
                created_at={data.created_at}
                subscribers={data.subscribers}
                isPublic={data.public} /></>
    )
}

export default CommunityPane



