/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { Button, Divider, IconButton } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import theme from 'Global/Theme'
import { forwardRef, memo } from 'react'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import Banner from 'Stories/Bits/Banner/Banner'
import { mNormal, xBold } from 'Stories/Bits/Text/Text'
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import CommunityStats from 'Stories/Bits/StatCheck/CommunityStats'
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import RoleList from 'Stories/Bits/RoleList/RoleList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { contentFlow } from 'State/Flow'
import RolePane from '../RolePane/RolePane'


const C = {
    container: css({
        width: '100%',
        margin: '10px 0px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
    }),


    content: css({
        padding: '12px',
        display: 'flex',
        width: '100%',
        borderRadius: '8px',
        gap: '8px',
        background: '#343442',
    }),
    title: css({
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

                <Banner size='large' public_id={data.public_id} />
                <div css={C.content}>
                    <Avatar public_id={data.public_id} size="extra" />
                    <div css={C.title}>
                        <div css={xBold}>{data.title}</div>
                        <div css={mNormal}>{data.description === undefined ? data.description : 'A new community'}</div>


                    </div>



                    <RolePane roles={contentState?.roles} />

                    <Button
                        disableRipple
                        color='secondary'
                        sx={{
                            height: '32px',
                            minWidth: '32px',
                            maxWidth: '32px',
                            width: '32px',
                        }}
                        variant="text">
                        <SettingsEthernetRoundedIcon />
                    </Button>


                </div>
            </div>

            <CommunityStats
                created_at={data.created_at}
                subscribers={data.subscribers}
                isPublic={data.public} />
        </>
    )
}

export default CommunityPane