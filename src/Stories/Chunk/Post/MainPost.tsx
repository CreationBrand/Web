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
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { contentFlow } from 'State/Flow'
import { textBold } from 'Global/Mixins'

const C = {
    container: css({
        width: '100%',
        // borderBottom: `2px solid #343442`,
        // marginBottom: '8px',
        cursor: 'pointer',
        minHeight: '100px',
        padding: '16px 2px 0px 0px',
        // border:'1px solid #d6d6d7',
        // ':hover': {
        //     background: `#2c2c38`,
        // },
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


const Post = ({ varient, public_id, title, type, content, karma, comments, vote, created_at, updated_at, hot, author, views, community, ...props }: any) => {


    const contentState = useRecoilValue(contentFlow)
    const navigate = useNavigate()


    const bodyClick = () => {
        navigate(`/c/${community.public_id}/p/${public_id}`)
        // if (varient === 'community') navigate(`p/${public_id}`)
    }

    const contentClick = () => { }
    const userClick = () => { }


    return (
        <div css={C.container}>


            <div css={C.inner} onClick={bodyClick}>




                <div css={C.header}>
                    <Avatar size="medium" public_id={author.public_id} onClick={userClick} />
                    <div>

                        {contentState.type === 'community' ? (
                            <>
                                <Author username={author?.nickname} public_id={author?.public_id} />
                            </>
                        ) : (
                            <>
                                <CommunityTitle title={community?.title} public_id={community?.public_id} />
                                <Nickname title={author?.nickname} public_id={author?.public_id} />
                            </>
                        )}                    </div>
                </div>

                <div css={textBold('x')}>{title && title}</div>

                <ContentLoader type={type} content={content} />





                <div css={C.footer}>
                    <Vote karma={karma} vote={vote} public_id={public_id} />
                    <View public_id={public_id} views={views} />
                    <Comment public_id={public_id} comments={comments} />
                </div>

            </div>
            {/* <motion.div
                onMouseDown={bodyClick}
                key={`post${public_id}`}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={C.container} onClick={bodyClick}>



                <div css={C.left}>
                    <Avatar size="medium" public_id={author.public_id} onClick={avatarClick} />
                    <Vote karma={karma} vote={vote} public_id={public_id} />
                    <View public_id={public_id} views={views} />
                </div>



                <div css={C.right}>


                    {contentState.type === 'community' ? (
                        <>
                            <Author username={author?.nickname} public_id={author?.public_id} />
                        </>
                    ) : (
                        <>
                            <CommunityTitle title={community?.title} public_id={community?.public_id} />
                            <Nickname title={author?.nickname} public_id={author?.public_id} />
                        </>
                    )}

                    <div>
                        <div css={[C.title, textBold('l')]}>{title && title}</div>
                        <ContentLoader type={type} content={content} />
                    </div>

                </div>
            </motion.div> */}


        </div>
    )
}


export default memo(Post)