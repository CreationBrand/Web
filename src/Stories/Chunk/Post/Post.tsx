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
import { xBold, mNormal } from "Stories/Bits/Text/Text"
import { useNavigate } from 'react-router-dom'
import PostStats from 'Stories/Bits/StatCheck/PostStats'

const C = {
    container: css({
        background: theme.background.qua,
        width: '100%',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        marginTop: '8px',
    }),
    header: css({
        display: 'flex',

        gap: '4px',
        alignItems: 'center',
    }),

    title: css({
        padding: '8px 0px',
        fontWeight: '400',
    }),
    left: css({
        width: '56px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        // alignItems: 'center',
    }),
    right: css({
        width: '100%',
    }),
    row: css({
        display: 'flex',
        alignItems: 'center',
        height: '20px',
        gap: '4px',
    }),
    menu: css({
        marginLeft: 'auto',
    }),

    underline: css({
        ':hover': {
            textDecoration: 'underline',
        },
    }),
}


const Post = ({
    varient,
    public_id,
    title,
    type,
    content,
    karma,
    comments,
    created_at,
    updated_at,
    hot,
    author,
    community,
}: Post) => {

    const navigate = useNavigate()

    // console.log(varient)
    const bodyClick = () => {
        if (varient === 'community') navigate(`p/${public_id}`)
    }


    const avatarClick = () => { }


    // console.log('Post.tsx', community)

    return (
        <>
            <motion.div
                key={public_id}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={C.container} onClick={bodyClick}>

                <div css={C.left}>
                    <Avatar size="medium" public_id={author.public_id} onClick={avatarClick} />
                    <Vote karma={karma} />
                </div>

                <div css={C.right}>

                    {varient === 'global' ? (
                        <>
                            <CommunityTitle title={community.title} public_id={community.public_id} />
                            <Author username={author.username} public_id={author.public_id} />
                        </>
                    ) : (
                        <>
                            <Nickname title={author.nickname} public_id={author.public_id} />
                            <Author username={author.username} public_id={author.public_id} />
                        </>
                    )}


                    <div css={[C.title, xBold]}>{title}</div>

                    <ContentLoader type={type} content={content} />



                </div>
            </motion.div>

            {varient === 'post' && (
                <PostStats
                    comments={comments}
                    created_at={created_at}
                    karma={karma} />
            )}

        </>

    )
}


export default Post