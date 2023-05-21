/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, debounce } from '@mui/material'
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import { AnimatePresence, motion } from 'framer-motion'
import MiniError from '../ChunkError/MiniError'
import { socketRequest } from 'Service/Socket'
import Avatar from '../Avatar/Avatar'
import { textLabel } from 'Global/Mixins'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { useRecoilValue } from 'recoil'
import { authFlow } from 'State/Flow'

const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),
    underline: css({
        fontSize: '12px',
        lineHeight: '20px',
        color: '#b9b6ba',
        ':hover': {

            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const Nickname = ({ title, public_id, community_id }: any) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const handleClick = () => { }

    const handleHover = (event: any) => setAnchorEl(event.target)
    const handleClose = () => setAnchorEl(null);

    return (

        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div onClick={(e: any) => e.stopPropagation()}>
                    <div
                        onMouseEnter={handleHover}
                        {...bindHover(popupState)}
                        onClick={handleClick}
                        css={C.underline}>{title}</div>


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
                        {Boolean(anchorEl) && <Preview public_id={public_id} community_id={community_id} />}
                    </HoverPopover>
                </div>
            )}
        </PopupState>
    )
}

export default memo(Nickname)


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
}

let Preview = ({ public_id, community_id }: any) => {

    let [data, setData]: any = useState(null)
    const authState = useRecoilValue(authFlow)


    useEffect(() => {
        (async () => {
            let temp: any = await socketRequest('person', { person_id: public_id, community_id: community_id })
            setData(temp.person)

        })()
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
                        }}>{data.nickname}</h4>
                        <h5 css={{
                            fontSize: '14px', color: '#b9b6ba', textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            fontWeight: '400',
                        }}>@{data.username}</h5>


                    </div>


                    {authState !== 'guest' && <MailOutlineRoundedIcon
                        sx={{
                            color: '#b9b6ba',
                            fontSize: '24px',
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#fff',
                            }
                        }}
                    />
                    }

                </div>
                {data.about_me &&
                    <div css={{
                        padding: '12px 16px 0px 16px',
                        fontSize: '14px',
                        color: '#dbdee1',
                    }}>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>About Me</div>
                        {data.about_me}
                    </div>
                }


                <div css={{
                    padding: '16px 16px 0px 16px',
                    fontSize: '14px',
                    display: 'flex',
                    gap: '18px',
                }}>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Karma</div>
                        <div> {data.karma}</div>
                    </div>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Posts</div>
                        <div> {data.posts}</div>
                    </div>
                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Comments</div>
                        <div> {data.comments}</div>
                    </div>

                    <div>
                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>role</div>
                        {/* <RoleList roles={data.global_roles} /> */}
                    </div>


                </div>


            </motion.div>
        }



    </AnimatePresence >)
}


const handleImgError = (e: any) => e.target.style.display = 'none'
