/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, IconButton } from '@mui/material'
import { memo, useEffect, useState } from 'react'

import { useRecoilState, useRecoilValue, } from 'recoil'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import LiveRoles from '@/components/bits/Alive/LiveRoles';
import { header, label } from '@/global/mixins';
import { canManageCommunity, isAdmin } from '@/service/Rbac';
import { authFlow } from '@/state/flow';
import { leaveCommunity, joinCommunity } from '@/service/Action';
import Avatar from '@/components/bits/Avatar';
import { communitySync } from '@/state/sync';
// @ts-ignore
import src from '@/assets/fbB.webp';
import { communityList } from '@/state/person';
import { layoutSize } from '@/state/layout';

const C = {
    inner: css({
        marginTop: '12px',
        width: '100%',
        height: '140px',
        minHeight: '140px',
        maxHeight: '140px',
        background: '#1c1c2d',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
    }),
    inner2: css({
        padding: '0px 8px',
        margin: '0 auto',
        width: '100%',
        maxWidth: '800px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        color: '#f2f2f2',
        fontSize: '16px',
    }),
    banner: css({
        borderRadius: '8px',
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 10,
        cursor: 'pointer',
    }),
    float: css({
        minWidth: '200px',
        bottom: '8px',
        left: '8px',
        position: 'absolute',
        borderRadius: '16px',
        background: '#0f0e10',
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
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#c4c9ce',
    }),
    under: css({
        lineHeight: '20px',
        fontSize: '14px',
        fontWeight: 700,
        color: '#fff',
    }),
    action: css({
        bottom: '8px',
        right: '8px',
        position: 'absolute',
        zIndex: 100,
    }),
    more: css({
        marginTop: '12px',
    }),
    roles: css({
        marginTop: '16px',
        width: '100%',
        gap: '32px',
        display: 'flex',
        flexWrap: 'wrap',
    }),
    title: css({
        color: '#f2f3f5',
        fontSize: '20px',
        fontWeight: 'bold',
    }),
}

const handleImgError = (e: any) => {
    e.target.src = src
}

const CommunityPane = ({ public_id }: any) => {

    const data: any = useRecoilValue(communitySync(public_id))

    const { title = '', description = '', subscribers = 0, your_roles = null, community_roles = null } = { ...data?.community }

    // const auth = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)

    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const communitys = useRecoilValue(communityList)
    const layout = useRecoilValue(layoutSize)

    const handleEdit = (e: any) => {
        e.stopPropagation()
        navigate(`/c/${public_id}/edit`)
    }

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(public_id)
        else joinCommunity(public_id)
    }

    const openCommunity = () => setActive(!active)

    useEffect(() => {
        if (!communitys) return
        const hasMatchingId = communitys.some((obj: any) => obj.public_id === public_id);
        setIsMember(hasMatchingId)
    }, [communitys])


    return (
        <>

            <div css={C.inner}
                style={{ marginTop: layout === 'mobile' ? '8px' : '12px' }}
                onClick={openCommunity}>

                <IconButton
                    disabled={!canManageCommunity(data.communityHex)}
                    sx={{ zIndex: 100, color: '#d7dadc', borderRadius: '12px', position: 'absolute', top: '8px', right: '8px' }}
                    onClick={handleEdit}>
                    <MoreVertIcon />
                </IconButton>

                {/* @ts-ignore */}
                <img css={C.banner} onError={handleImgError} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}`} />

                <div css={C.float}>
                    <Avatar size='large' public_id={public_id} />
                    <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '2px' }}>
                        <div css={header}>{title}</div>
                        <div css={C.under}>
                            <span>
                                <span css={C.offline} /> {subscribers} <span css={{ color: '#d7dadc' }}>Members</span>
                            </span>

                            {/* <Online value={data.online} /> <span css={[textBold('t'), { color: '#d7dadc', }]}>Viewing</span> */}
                        </div>
                    </div>
                </div>



                <div css={C.action}>

                    <Button
                        disabled={isAdmin(data?.communityHex)}
                        onClick={handleJoin}
                        disableElevation
                        sx={{
                            marginLeft: 'auto !important',
                            background: '#0f0e10',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '700',
                            "&.Mui-disabled": {
                                background: "#0f0e10",
                                color: "#827d7d !important",
                                ':hover': {
                                    background: "#0f0e10",
                                }
                            }
                        }}
                        variant="contained">
                        {isMember ? 'LEAVE' : 'JOIN'}
                    </Button>
                </div>

            </div>

            {active && <div css={C.more} key='more'>

                <div css={C.inner2}>

                    {description && <>
                        <div css={label}>About Community</div>
                        <ReactMarkdown className='text' children={description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                    </>}

                    <div css={C.roles}>
                        <div>
                            <div css={label}>Community Roles</div>
                            <LiveRoles value={community_roles} />
                        </div>
                        <div>
                            <div css={label}>Flairs</div>
                            {/* <PublicRole value={community_roles} current={your_roles} community_id={public_id} /> */}
                        </div>
                        {your_roles && your_roles.length > 0 &&
                            <div>
                                <div css={label}>Your Roles</div>
                                <LiveRoles value={your_roles} />
                            </div>
                        }
                    </div>
                </div>

            </div>}

        </>
    )
}


export default memo(CommunityPane)



