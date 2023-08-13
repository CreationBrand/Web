

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AddComment from './AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';



import ContentLoader from '../ContentLoader/ContentLoader'

// @ts-ignore
import TimeAgo from 'react-timeago'

import { faFolder, faFolderOpen, faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIsMuted from '@/hooks/useIsMuted'
import LiveRoles from '@/components/bits/Alive/LiveRoles'
import LiveTags from '@/components/bits/Alive/LiveTags'
import LiveVotes from '@/components/bits/Alive/LiveVotes'
import { iconButton, time } from '@/global/mixins'
import { filterFlow, authFlow } from '@/state/flow'
import { formatTime } from '@/utils/formatTime'
import { useRecoilValue, useRecoilState } from 'recoil'
import Nickname from '../Titles/Nickname'
import { layoutSize } from '@/state/layout';
import { commentSync, pathExistsSelector, pathSelector } from '@/state/sync';
import Avatar from '@/components/bits/Avatar';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { bg_1, bg_2, bg_3, bg_4, bg_active, bg_hover, text_1, text_2 } from '@/global/var';
import CommentMenu from '@/components/menu/CommentMenu';
import { AnimatePresence, motion } from 'framer-motion';


import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';


const C = {
    container: css({
        display: 'flex',
        width: '100%',
        background: bg_2,

    }),
    content: css({
        padding: '12px 8px',
        color: text_1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '100%',

    }),
    header: css({
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        fontSize: '12px',
        color: text_2,
        fontWeight: 600,
    }),
    spacerMobile: css({
        height: '100%',
        width: '2px !important',
        minWidth: '2px !important',
        maxWidth: '2px !important',
        borderRadius: '8px',
        marginLeft: '8px',
        background: '#52555d',
        position: 'relative',
        zIndex: 5,
    }),
    spacers: css({
        display: 'flex',
    }),
    footer: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        color: text_1,
        background: '#1c1f26',

    }),
}


const colors: any = {
    0: '#6f38be',
    1: '#4c5ad0',
    2: '#63be28',
    3: '#a6be28',
    4: '#be8428',
    5: '#be3d28',
    6: '#6f38be',
    7: '#4c5ad0',
    8: '#63be28',
    9: '#be8428',
    10: '#be2828',
}

const Comment = (props: any) => {


    const navigate = useNavigate()

    const [showReply, setShowReply] = useState(false)
    const isMuted = useIsMuted(props?.community?.public_id)
    const params = useParams()

    let triggerTime: any;

    const { vote, tags, community_roles, global_roles, visibility, author, content, created_at, depth, karma, last, path, public_id, sort_path, updated_at, active, id, hasChildren, }: any = useRecoilValue(commentSync(props.public_id))

    const [showFooter, setShowFooter] = useState(false)
    const auth = useRecoilValue(authFlow)

    // const [paths, setPaths] = useRecoilState(pathSelector);
    const doesPathExist = useRecoilValue(pathExistsSelector);
    // const status = doesPathExist(path);

    const onReply = () => setShowReply(!showReply)

    const filter = useRecoilValue(filterFlow)

    const longPress = () => {
        console.log('long press')
    }
    const tap = () => {
        setShowFooter(!showFooter)
    }


    // // NO RENDERS
    if (status === 'invisible' || !public_id || !visibility) return null


    // SPACERS
    const spacers = []
    for (var i = 0; i < depth - 2; i++) {
        spacers.push(<div css={C.spacerMobile} key={i} style={{ background: colors[i] }} />)
    }


    const onPerson = () => navigate(`/p/${author.public_id}`)

    return (<>
        {depth === 2 && <Divider />}

        <div
            css={C.container}
            style={{ background: showFooter ? bg_active : bg_2, }}

            onClick={(e) => {
                if (triggerTime > 1000) return longPress();
                else tap();
            }}
            onMouseDown={() => {
                triggerTime = new Date().getTime();
            }}
            onMouseUp={() => {
                let thisMoment = new Date().getTime();
                triggerTime = thisMoment - triggerTime;
            }}
        >
            <div css={C.spacers}>{spacers}</div>


            <div css={C.content}>
                <div css={C.header}>
                    <Avatar public_id={author.public_id} size={'tiny'} />

                    <div>
                        {author?.nickname}

                        <span css={time}> • {karma} score</span>

                        <span css={time}> <TimeAgo date={created_at} formatter={formatTime} /></span>

                    </div>





                    <div css={{ marginLeft: 'auto' }} />
                    {tags && <LiveTags value={tags} />}

                </div>

                {!(tags && tags.some((obj: any) => filter.includes(obj.public_id))) && <ReactMarkdown className='text' children={content} rehypePlugins={[rehypeRaw]} />}

            </div>




        </div>
        <AnimatePresence>
            {showFooter && <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '40px' }}
                exit={{ opacity: 0, height: 0 }}
                css={C.footer}>
                <div />


                {/* <LiveVotes size='small' vote={vote} karma={karma} public_id={public_id} type='comment' /> */}


                <ArrowUpwardRoundedIcon />
                <ArrowDownwardRoundedIcon />

                <PersonRoundedIcon onClick={onPerson} />
                <ReplyAllRoundedIcon onClick={onReply} />

                {(auth !== 'guest' &&
                    props?.community?.public_id &&
                    author?.public_id
                ) && <CommentMenu
                        community_id={props.community.public_id}
                        person_id={author.public_id}
                        tags={tags}
                        comment_id={public_id}
                        global_roles={global_roles}
                        community_roles={community_roles} />}

                <div />
            </motion.div >}


            {showReply &&
                <div css={{ padding: '12px 0px', background: bg_3, zIndex: 100, position: 'relative' }}>
                    <AddComment isMuted={isMuted} parent_id={public_id} post_id={params.post_id} onClose={onReply} />
                </div>}


        </AnimatePresence>

    </>
    )
}

export default Comment



const Divider = () => <div css={{
    width: '100%',
    margin: '0 auto',
    height: '8px',
    borderRadius: '6px',
    background: bg_1,
}} />
