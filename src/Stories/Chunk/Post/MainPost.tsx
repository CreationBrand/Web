/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from "framer-motion"
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import Author from "Stories/Bits/Titles/Author"
import CommunityTitle from "Stories/Bits/Titles/CommunityTitle"
import Nickname from "Stories/Bits/Titles/Nickname"
import { useNavigate } from 'react-router-dom'
import { memo, useState, } from 'react'
import { useRecoilValue } from 'recoil'
import { authFlow, contentFlow } from 'State/Flow'
import { textBold, textLight } from 'Global/Mixins'
import RightMenu from 'Stories/Bits/RightMenu/RightMenu'
import { formatDistanceStrict, parseISO } from 'date-fns'
import VisibilitySensor from 'react-visibility-sensor';
import LiveComments from 'Stories/Alive/LiveComments'
import LiveViews from 'Stories/Alive/LiveViews'
import LiveVotes from 'Stories/Alive/LiveVotes'
import LiveTags from '../../Alive/LiveTags'
import useLiveData from 'Hooks/useLiveData'

const C = {
    container: css({
        width: '100%',
        minHeight: '100px',
        padding: '16px 2px 0px 0px',

    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: '#272732',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
    }),
    footer: css({
        display: 'flex',
        width: 'min-content',
        gap: '8px',

    }),
    right: css({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '750px',
    }),
    header: css({
        gap: '8px',
        height: '40px',
        color: '#f2f4f5 !important',
        display: 'flex',
    })
}


const Post = ({ public_id }: any) => {


    // proxing data
    const [visibility, setVisibility] = useState(false)
    const data = useLiveData(visibility, public_id)

    const { title, content, created_at, author, community, vote, karma, views, comments, tags, type } = data

    const authState = useRecoilValue(authFlow)
    const contentState = useRecoilValue(contentFlow)

    const navigate = useNavigate()
    const handleVisibility = (isVisible: boolean) => setVisibility(isVisible)
    const bodyClick = () => navigate(`/c/${community.public_id}/p/${public_id}`)

    if (!data || data === undefined || !created_at) return null


    return (
        <VisibilitySensor> 
            <div css={C.container} key={public_id}>

                <motion.div
                    key={`post${public_id}`}

                    css={C.inner} onClick={bodyClick}>


                    <div css={C.header}>
                        {contentState.type === 'global' ?
                            <Avatar size="medium" public_id={community?.public_id} /> :
                            <Avatar size="medium" public_id={author?.public_id} />
                        }
                        <div>

                            {/* {contentState.type === 'global' && <CommunityTitle title={community?.title} public_id={community?.public_id} />} */}


                            {contentState.type === 'community' ? (
                                <>
                                    <div css={{ display: 'flex', gap: '4px' }}>
                                        <Author username={author?.nickname} public_id={author?.public_id} />
                                        <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                                            addSuffix: true
                                        })}
                                        </div>
                                    </div>
                                    {/* {tags && <LiveTags active={isVisible} public_id={public_id} value={tags} />} */}
                                </>
                            ) : (
                                <div>
                                    <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                        <CommunityTitle title={community?.title} public_id={community?.public_id} />

                                        <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                                            addSuffix: true
                                        })}</div>
                                    </div>
                                    <div css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <Nickname title={author?.nickname} public_id={author?.public_id} />
                                        {/* {tags && <TagList tags={tags} />} */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {authState !== 'guest' && <RightMenu tags={tags} type={'post'} public_id={public_id} />}

                    </div>

                    <div css={textBold('x')}>{title && title}</div>
                    <ContentLoader type={type} content={content} />



                    <div css={C.footer} onClick={(e) => e.stopPropagation()}>
                        <LiveVotes value={vote} karma={karma} public_id={public_id} type='post' />
                        <LiveViews value={views} />
                        <LiveComments value={comments} />
                    </div>

                </motion.div>



            </div>
        </VisibilitySensor>
    )
}


export default memo(Post)



