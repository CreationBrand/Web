/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { textBold, textLabel, textLight } from 'Global/Mixins'
import { memo } from 'react'

import { useRecoilValue, } from 'recoil'
import { authFlow } from 'State/Flow'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import LiveRoles from 'Stories/Alive/LiveRoles'

const C = {

    container: css({
        width: '100%',
        minHeight: '100px',
        marginTop: '16px',
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

        padding: '8px',
        margin: '0 auto',
        marginTop: '16px',
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

    }),
    roles: css({
        marginTop: '16px',
        width: '100%',
        gap: '32px',
        display: 'flex',

    }),
}

const handleImgError = (e: any) => e.target.style.display = 'none'


const PersonHeader = ({ about_me, comments, created_at, global_roles, karma, nickname, posts, public_id, username, }: any) => {

    const authState = useRecoilValue(authFlow)

    const openDm = () => { }


    console.log('about_me', global_roles)
    return (
        <div css={C.container} key={'person'}>

            <div css={C.inner}>

                <img css={C.banner}
                    loading="lazy"

                    onError={handleImgError}
                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}`} />
                <div css={C.float}>
                    <Avatar size='large' public_id={public_id} />
                    <div css={{ lineHeight: '25px !important' }}>
                        <div css={textBold('x')}>{nickname}</div>
                        <div css={textLight('s')}>@{username}</div>
                    </div>
                </div>
                <div css={C.action}>

                    <Button
                        disabled={authState === 'guest'}
                        onClick={openDm}
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

                        variant="contained">Chat</Button>
                </div>
            </div>


            <div css={C.inner2}>

                {about_me && <>
                    <div css={textLabel('t')}>About Me</div>
                    <ReactMarkdown children={about_me} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                </>}

                <div css={C.roles}>
                    <div>
                        <div css={textLabel('t')}>Karma</div>
                        {karma}
                    </div>
                    <div>
                        <div css={textLabel('t')}>Posts</div>
                        {posts}
                    </div>
                    <div>
                        <div css={textLabel('t')}>Comments</div>
                        {comments}
                    </div>
                    <div>
                        <div css={textLabel('t')}>global Roles</div>
                        <LiveRoles value={global_roles} />
                    </div>
                </div>
            </div>


        </div>
    )
}


export default memo(PersonHeader)



