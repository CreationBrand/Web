/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, debounce } from '@mui/material'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { AnimatePresence, motion } from 'framer-motion'

import Avatar from '../Avatar/Avatar'
import { textLabel } from 'Global/Mixins'
import { leaveCommunity, joinCommunity } from 'Helper/Action'
import { useRecoilValue } from 'recoil'
import { communityListData } from 'State/Data'
import { authFlow } from 'State/Flow'
import Online from '../Online/Online'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { isAdmin } from 'Service/Rbac'
import useCommunityData from 'Hooks/Pull/useCommunityData'


const C = {
    underline: css({
        fontSize: '16px',
        height: '20px',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        // letterSpacing: '0.2px',
        color: '#fff',
        textDecoration: 'none',
        textDecorationThickness: '2px !important',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const CommunityTitle = ({ title, public_id }: any) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const handleHover = (event: any) => setAnchorEl(event.target)


    if (!title || !public_id) return null
    return (
        <PopupState variant="popover" popupId="community-title">
            {(popupState) => (
                <div onClick={(e: any) => e.stopPropagation()}>
                    <Link
                        to={`/c/${public_id}`}
                        onMouseEnter={handleHover}
                        {...bindHover(popupState)}
                        css={C.underline}>
                        {title}
                    </Link>
                    {Boolean(anchorEl) &&
                        <HoverPopover
                            sx={{
                                '& .MuiBackdrop-root': {
                                    background: 'transparent !important',
                                },
                                '.MuiPaper-root': {
                                    borderRadius: '16px !important',
                                }
                            }}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        ><Preview public_id={public_id} />
                        </HoverPopover>}
                </div>
            )}
        </PopupState>
    )
}

export default memo(CommunityTitle)


const D = {
    container: css({
        background: '#0f0e10',
        width: '360px',
        maxWidth: '360px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1e1e1e',
        boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%)',
        paddingBottom: '8px',
    }),
    banner: css({
        height: '60px',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
    }),
    action: css({
        marginLeft: 'auto',
        zIndex: 100,
    }),
}

let Preview = ({ public_id }: any) => {



    const data = useCommunityData(public_id)

    const authState = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)
    const communityList = useRecoilValue(communityListData)

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(public_id)
        else joinCommunity(public_id)
    }


    // find out if your a member
    useEffect(() => {
        const hasMatchingId = communityList.some((obj: any) => obj.public_id === public_id);
        setIsMember(hasMatchingId)
    }, [public_id])

    if (!data) return null

    return (<AnimatePresence mode='popLayout'>

        <motion.div
            key={`preview`}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={D.container}>


            <img css={D.banner}
                onError={handleImgError}
                src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.community.public_id}`} />


            <div css={{
                padding: '12px 12px 0px 12px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',

            }}>
                <Avatar size='medium' public_id={public_id} />
                <div css={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>
                    <h4 css={{
                        fontSize: '16px', textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}>{data.community.title}</h4>
                </div>

                {authState !== 'guest' && <div css={D.action}>
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
                        }}
                        variant="contained">{isMember ? 'LEAVE' : 'JOIN'}</Button>
                </div>
                }

            </div>
            {data.community.description !== "undefined" &&
                <div css={{
                    padding: '12px 16px 0px 16px',
                    fontSize: '14px',
                    color: '#dbdee1',
                }}>
                    <ReactMarkdown children={data.community.description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>

                </div>
            }


            <div css={{
                padding: '12px 16px 0px 16px',
                fontSize: '14px',
                display: 'flex',
                gap: '18px',
            }}>
                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Members</div>
                    <div css={{
                        color: '#fff',
                        fontWeight: 700,
                    }}>
                        <span css={{
                            display: ' inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#c4c9ce',
                            marginRight: '4px',
                        }} />{data.community.subscribers}</div>
                </div>
                <div>
                    <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Online</div>
                    <Online public_id={data.community.public_id} />

                </div>

            </div>


        </motion.div>




    </AnimatePresence >)
}


const handleImgError = (e: any) => e.target.style.display = 'none'
