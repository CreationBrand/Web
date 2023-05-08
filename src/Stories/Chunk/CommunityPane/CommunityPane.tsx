/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { textBold, textLabel, textLight, textNormal } from 'Global/Mixins'
import { useState } from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'
import { postListData } from 'State/Data'
import { contentFlow } from 'State/Flow'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import RoleList from 'Stories/Bits/RoleList/RoleList'
import CommunityStats from 'Stories/Bits/StatCheck/CommunityStats'


const C = {
    container: css({
        marginTop: '16px',
        width: '100%',
        height: '140px',
        background: '#343442',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',

        ':hover': {
            outline: `2px solid #583e76`,
        },
    }),
    banner: css({
        borderRadius: '16px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 10,
    }),
    float: css({
        minWidth: '200px',
        bottom: '8px',
        left: '8px',
        position: 'absolute',
        borderRadius: '16px',
        background: '#343442',
        zIndex: 100,
        padding: '4px 12px 4px 4px',
        gap: '4px',
        display: 'flex',
    }),

    stats: css({
        display: 'flex',
        alignItems: 'center',
    }),
    online: css({
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#43b581',
        marginLeft: '8px',
    }),
    offline: css({
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#c4c9ce',
    }),
    under: css({
        ...textLight('t'),
        whiteSpace: 'nowrap',
        color: '#b5bac1',
        lineHeight: '16px',
    }),
    action: css({
        bottom: '8px',
        right: '8px',
        position: 'absolute',
        zIndex: 100,
    }),
    more: css({

    }),
    roles: css({
        padding: '8px',
        marginTop: '8px',
        width: '100%',
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
        background: '#343442',
        borderRadius: '8px',
    }),
}


const CommunityPane = ({ data }: any) => {



    const [active, setActive] = useState(false)
    const contentState = useRecoilValue(contentFlow)



    const openCommunity = () => setActive(!active)

    return (
        <>
            <div css={C.container} onClick={openCommunity}>

                <img css={C.banner} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}.svg`} />
                <div css={C.float}>
                    <Avatar size='large' public_id={data.public_id} />
                    <div>
                        <div css={textBold('x')}>{data.title}</div>
                        <div css={C.stats}>
                            <div css={C.under}><span css={C.offline} /> 13 Members  <span css={C.online} /> 2 Viewing</div>
                        </div>

                    </div>
                </div>

                <div css={C.action}>
                    <Button
                        disableElevation
                        sx={{
                            marginLeft: 'auto !important',
                            fontFamily: 'Noto Sans',
                            background: '#0f0e10',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '700',
                        }}
                        variant="contained">{contentState?.roles?.length > 1 ? 'LEAVE' : 'JOIN'}</Button>
                </div>

            </div>
            {active && <div css={C.more} key='more'>

                <div css={C.roles}>
                    <div>
                        <div css={textLabel('s')}>Community Roles</div>
                        <RoleList roles={data.community_roles} />
                    </div>
                    <div>
                        <div css={textLabel('s')}>Your Roles</div>
                        <RoleList roles={contentState.roles} />
                    </div>
                </div>


            </div>}
        </>
    )
}


export default CommunityPane



