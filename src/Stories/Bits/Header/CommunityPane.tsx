/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, IconButton } from '@mui/material'
import { textBold, textLabel, textLight, textNormal } from 'Global/Mixins'
import { memo, useEffect, useState } from 'react'

import { useRecoilValue, } from 'recoil'
import { communityListData, } from 'State/Data'
import { authFlow, communityFlow, } from 'State/Flow'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'
import { joinCommunity, leaveCommunity } from 'Helper/Action'
import Online from 'Stories/Bits/Online/Online'
import LiveRoles from 'Stories/Alive/LiveRoles'
import { canManageCommunity, isAdmin } from 'Service/Rbac'
import useLiveData from 'Hooks/useLiveData'
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const C = {

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
        background: '#1c1c2d',
        borderRadius: '8px',
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
        background: '#0f0e10',
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
        marginTop: '16px',
        background: '#0f0e10',

    }),
    roles: css({
        marginTop: '16px',
        width: '100%',
        gap: '32px',
        display: 'flex',

    }),
}

const handleImgError = (e: any) => e.target.style.display = 'none'


const CommunityPane = ({ public_id }: any) => {


    const data = useLiveData(true, `community:${public_id}`)

    const authState = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)
    const navigate = useNavigate()
    const [active, setActive] = useState(false)

    const community: any = useRecoilValue(communityFlow)
    const communityList = useRecoilValue(communityListData)

    const handleEdit = (e: any) => {
        e.stopPropagation()
        navigate(`/c/${data.public_id}/edit`)
    }

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(data.public_id)
        else joinCommunity(data.public_id)
    }

    const openCommunity = () => setActive(!active)

    useEffect(() => {
        const hasMatchingId = communityList.some((obj: any) => obj.public_id === data.public_id);
        setIsMember(hasMatchingId)
    }, [communityList])


    return (
        <div css={C.container} key={'community'}>
            <div css={C.inner} onClick={openCommunity}>

                <IconButton
                    disabled={authState === 'guest' || !canManageCommunity(community?.roleHex)}
                    sx={{
                        zIndex: 100,
                        color: '#d7dadc', borderRadius: '12px', position: 'absolute', top: '8px', right: '8px'
                    }}
                    aria-haspopup="true"
                    onClick={handleEdit}
                >
                    <MoreVertIcon />
                </IconButton>

                <img css={C.banner}
                    loading="lazy"

                    onError={handleImgError}
                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}`} />
                <div css={C.float}>
                    <Avatar size='large' public_id={data.public_id} />
                    <div>
                        <div css={textBold('x')}>{data.title}</div>
                        <div css={C.stats}>
                            <div css={C.under}>

                                <span
                                    css={{
                                        lineHeight: '20px',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#fff',
                                    }}>
                                    <span css={C.offline} /> {data.subscribers} <span css={[textBold('t'), { color: '#d7dadc', }]}>Members</span>
                                </span>

                                <Online public_id={data.public_id} /> <span css={[textBold('t'), { color: '#d7dadc', }]}>Viewing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div css={C.action}>

                    <Button

                        disabled={authState === 'guest' || isAdmin(community?.roleHex)}
                        onClick={handleJoin}
                        disableElevation
                        sx={{
                            marginLeft: 'auto !important',
                            fontFamily: 'Noto Sans',
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

                    {data.description && <>
                        <div css={textLabel('t')}>About Community</div>
                        <ReactMarkdown children={data.description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                    </>}

                    <div css={C.roles}>
                        <div>
                            <div css={textLabel('t')}>Community Roles</div>
                            <LiveRoles value={data.community_roles} />
                        </div>
                        <div>
                            <div css={textLabel('t')}>Your Roles</div>
                            <LiveRoles value={data.your_roles} />

                        </div>
                    </div>
                </div>

            </div>}

        </div>
    )
}


export default memo(CommunityPane)



