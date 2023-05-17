/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, debounce } from '@mui/material'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { AnimatePresence, motion } from 'framer-motion'
import MiniError from '../ChunkError/MiniError'
import { socketRequest } from 'Service/Socket'
import Avatar from '../Avatar/Avatar'
import { textLabel } from 'Global/Mixins'
import RoleList from '../RoleList/RoleList'
import { leaveCommunity, joinCommunity } from 'Helper/Action'
import { useRecoilValue } from 'recoil'
import { communityListData } from 'State/Data'

const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    underline: css({
        fontSize: '16px',
        lineHeight: '20px',
        color: '#fff',
        ':hover': {

            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const CommunityTitle = ({ title, public_id }: any) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.stopPropagation()
        navigate(`/c/${public_id}`)
    }
    const handleHover = (event: any) => setAnchorEl(event.target)
    const handleClose = () => setAnchorEl(null);

    return (

        <PopupState variant="popover" popupId="community-popup">
            {(popupState) => (
                <div onClick={(e: any) => e.stopPropagation()}>

                    <div
                        onMouseEnter={handleHover}
                        {...bindHover(popupState)}
                        onClick={handleClick}
                        css={C.underline}>
                        {title}
                    </div>

                    <HoverPopover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {Boolean(anchorEl) && <Preview public_id={public_id} />}
                    </HoverPopover>
                </div>
            )}
        </PopupState>
    )
}

export default CommunityTitle


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
        paddingBottom: '16px',
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

    let [data, setData]: any = useState(null)
    const [isMember, setIsMember] = useState(false)
    const communityList = useRecoilValue(communityListData)

    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(public_id)
        else joinCommunity(public_id)
    }

    // get community data
    useEffect(() => {
        (async () => {
            let temp: any = await socketRequest('community', { community_id: public_id })
            setData(temp.community)
        })()
    }, [public_id])

    // find out if your a member
    useEffect(() => {
        const hasMatchingId = communityList.some((obj: any) => obj.public_id === public_id);
        setIsMember(hasMatchingId)
    }, [public_id])




    return (<AnimatePresence mode='popLayout'>

        {!data ? <motion.div
            key={`error`}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            css={D.container}><MiniError variant="loading" /></motion.div>
            :
            <motion.div
                key={`preview`}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={D.container}>


                <img css={D.banner}
                    onError={handleImgError}
                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.public_id}`} />


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
                        }}>{data.title}</h4>
                    </div>

                    <div css={D.action}>
                        <Button
                            onClick={handleJoin}
                            disableElevation
                            sx={{
                                marginLeft: 'auto !important',
                                fontFamily: 'Noto Sans',
                                background: '#0f0e10',
                                borderRadius: '16px',
                                fontSize: '12px',
                                fontWeight: '700',
                            }}
                            variant="contained">{isMember ? 'LEAVE' : 'JOIN'}</Button>
                    </div>


                </div>
                {data.description !== "undefined" &&
                    <div css={{
                        padding: '12px 16px 0px 16px',
                        fontSize: '14px',
                        color: '#dbdee1',
                    }}>
                        {data.description}
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
                        <div>
                            <span css={{
                                display: ' inline-block',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#c4c9ce',
                                marginRight: '4px',
                            }} />{data.subscribers}</div>
                    </div>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Online</div>
                        <span css={{
                            display: ' inline-block',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#60e660',
                            marginRight: '4px',
                        }} />12</div>

                </div>


            </motion.div>
        }



    </AnimatePresence >)
}


const handleImgError = (e: any) => e.target.style.display = 'none'
