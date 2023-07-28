/** @jsxImportSource @emotion/react */
import LiveRoles from '@/components/bits/Alive/LiveRoles'
import Avatar from '@/components/bits/Avatar'
import { header, label, subheader } from '@/global/mixins'
import { socketRequest } from '@/hooks/util/useSocket'
import { messengerLTT } from '@/service/Clean'
import { authFlow } from '@/state/flow'
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import rehypeRaw from 'rehype-raw'

// @ts-ignore
import src from '@/assets/fbB.webp'
import { layoutSize } from '@/state/layout'

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

const handleImgError = (e: any) => {
    e.target.src = src
}



const PersonHeader = ({ about_me, comments, created_at, global_roles, karma, nickname, posts, public_id, username, }: any) => {

    const layout = useRecoilValue(layoutSize)
    const authState = useRecoilValue(authFlow)
    // const setMTD = useSetRecoilState(messengerTreeData)
    const handleChat = async () => {

        let req: any = await socketRequest('messenger-new', { person_id: public_id })
        if (req) {
            // setMTD(messengerLTT(req.messengers))
            // Navigate('/messenger')
        }
    }


    return (
        <div
            style={{ marginTop: layout === 'mobile' ? '8px' : '12px' }}
            css={C.container} key={'person'}>

            <div css={C.inner}>

                <img css={C.banner}
                    loading="lazy"
                    alt=""
                    onError={handleImgError}
                    // @ts-ignore
                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}`} />
                <div css={C.float}>
                    <Avatar size='large' public_id={public_id} />
                    <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '2px' }}>
                        <div css={header}>{nickname}</div>
                        <div css={subheader}>@{username}</div>
                    </div>
                </div>
                <div css={C.action}>

                    <Button
                        disabled={true}
                        // onClick={handleChat}
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

                        variant="contained">Chat</Button>
                </div>
            </div>


            <div css={C.inner2}>

                {about_me && <>
                    <div css={label}>About Me</div>
                    <ReactMarkdown className='text' children={about_me} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                </>}

                <div css={C.roles}>
                    <div>
                        <div css={label}>Karma</div>
                        {karma}
                    </div>
                    <div>
                        <div css={label}>Posts</div>
                        {posts}
                    </div>
                    <div>
                        <div css={label}>Comments</div>
                        {comments}
                    </div>
                    <div>
                        <div css={label}>Role</div>
                        <LiveRoles value={global_roles} />
                    </div>
                </div>
            </div>


        </div>
    )
}


export default memo(PersonHeader)



