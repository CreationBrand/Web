/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Menu } from "@mui/material"
import { motion } from "framer-motion"
import theme from "Global/Theme"
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import Author from "Stories/Bits/Titles/Author"
import CommunityTitle from "Stories/Bits/Titles/CommunityTitle"
import Nickname from "Stories/Bits/Titles/Nickname"
import Vote from "Stories/Bits/Vote/Vote"
import { useNavigate } from 'react-router-dom'
import PostStats from 'Stories/Bits/StatCheck/PostStats'
import View from 'Stories/Bits/View/View'
import Comment from 'Stories/Bits/Comment/Comment'
import { memo, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authFlow, contentFlow } from 'State/Flow'
import { textBold, textLight } from 'Global/Mixins'
import RightMenu from 'Stories/Bits/RightMenu/RightMenu'
import EditTags from 'Stories/Popups/EditTags'
import RoleList from 'Stories/Bits/RoleList/RoleList'
import TagList from 'Stories/Bits/TagList/TagList'
import { formatDistanceStrict, parseISO } from 'date-fns'

const C = {
    container: css({
        width: '100%',
        minHeight: '100px',
        padding: '16px 2px 0px 0px',
    }),
    inner: css({
        // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        ':hover': {
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',

            // outline: `2px solid #583e7691`,
        },
        margin: '0 auto',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: '#272732',
        padding: '8px',
        borderRadius: '8px',

    }),
    footer: css({
        display: 'flex',

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


const Post = ({ tags, varient, public_id, title, type, content, karma, comments, vote, created_at, updated_at, hot, author, views, community, ...props }: any) => {


    const authState = useRecoilValue(authFlow)
    const contentState = useRecoilValue(contentFlow)
    const navigate = useNavigate()



    const bodyClick = (e: any) => {
        // if (e.currentTarget !== e.target) return

        navigate(`/c/${community.public_id}/p/${public_id}`)
        // if (varient === 'community') navigate(`p/${public_id}`)
    }





    const contentClick = () => { }
    const userClick = () => { }


    return (
        <div css={C.container} key={public_id}>

            <motion.div
                key={`post${public_id}`}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={C.inner} onClick={bodyClick}>


                <div css={C.header}>
                    {contentState.type === 'global' ?
                        <Avatar size="medium" public_id={community.public_id} onClick={userClick} /> :
                        <Avatar size="medium" public_id={author.public_id} onClick={userClick} />
                    }
                    <div>

                        {/* {contentState.type === 'global' && <CommunityTitle title={community?.title} public_id={community?.public_id} />} */}


                        {contentState.type === 'community' ? (
                            <>    <div css={{ display: 'flex', gap: '4px' }}>
                                <Author username={author?.nickname} public_id={author?.public_id} />
                                {/* <span css={textLight('t')}> - {created_at && formatDistanceStrict(parseISO(created_at), new Date(), { addSuffix: false })}</span> */}
                            </div>

                                {tags ? <TagList tags={tags} /> : <Nickname title={author?.nickname} public_id={author?.public_id} />
                                }

                            </>
                        ) : (
                            <div>
                                <div css={{ display: 'flex', gap: '4px', alignItems:'baseline' }}>
                                    <CommunityTitle title={community?.title} public_id={community?.public_id} />

                                    <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                                        addSuffix: true
                                    })}</div>
                                </div>

                                <Nickname title={author?.nickname} public_id={author?.public_id} />

                            </div>
                        )}
                    </div>

                    {authState !== 'guest' && <RightMenu tags={tags} type={'post'} public_id={public_id} />}

                </div>

                <div css={textBold('x')}>{title && title}</div>

                <ContentLoader type={type} content={content} />

                <div css={C.footer} onClick={(e) => e.stopPropagation()}>
                    <Vote karma={karma} vote={vote} public_id={public_id} type='post' />
                    <View public_id={public_id} views={views} />
                    <Comment public_id={public_id} comments={comments} />
                </div>

            </motion.div>
        </div>
    )
}


export default memo(Post)