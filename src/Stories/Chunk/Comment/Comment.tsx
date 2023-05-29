

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, } from '@mui/material'
import LiveRoles from 'Stories/Alive/LiveRoles'
import { formatDistance, formatDistanceStrict, formatDistanceToNowStrict, parseISO } from 'date-fns'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'
import { useRecoilState, useRecoilValue, } from 'recoil'
import { commentTreeData, layoutSizeData } from 'State/Data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import AddComment from '../../Forum/AddComment/AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import Author from 'Stories/Bits/Titles/Author'
import { textBold, textLight } from 'Global/Mixins'

import LiveTags from '../../Alive/LiveTags'
import Nickname from 'Stories/Bits/Titles/Nickname'
import LiveVotes from 'Stories/Alive/LiveVotes'
import Right from 'Stories/Layout/Right'
import RightMenu from 'Stories/Bits/RightMenu/RightMenu'
import { authFlow, filterFlow } from 'State/Flow'
import useLiveData from 'Hooks/useLiveData'
import VisibilitySensor from 'react-visibility-sensor';

const C = {
    container: css({
        width: '100%',
        display: 'flex',
        height: 'auto',
        alignItems: 'stretch',
        position: 'relative',
    }),
    inner: css({
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#272732',
        padding: '4px 8px',

        display: 'flex',

    }),

    header: css({
        // marginTop: '8px',

        display: 'flex',
        gap: '8px',
        height: '34px',
    }),


    comment: css({
        width: '100%',

    }),
    spacer: css({
        height: 'calc(100% + 20px)',

        width: '4px !important',
        minWidth: '4px !important',
        maxWidth: '4px !important',

        borderRadius: '8px',
        marginRight: '14px',
        marginLeft: '15px',
        background: '#52555d',
        alignSelf: 'stretch',
        position: 'relative',
        top: '-20px',
    }),
    spacerMobile: css({
        height: 'calc(100%)',
        width: '4px !important',
        minWidth: '4px !important',
        maxWidth: '4px !important',
        borderRadius: '8px',
        marginRight: '6px',
        marginLeft: '0px',
        background: '#52555d',
        position: 'relative',

    }),
    defaultSpacer: css({
        zIndex: 1,
        marginLeft: '15px',
        marginRight: '22px',
        borderRadius: '8px',
        width: '4px !important',
        minWidth: '4px !important',
        maxWidth: '4px !important',
        background: '#52555d',
        // marginTop: '8px',
    }),
    float: css({
        marginTop: '8px',
        // marginBottom: '8px',
        background: '#353544',
        borderRadius: '8px',
        width: 'min-content',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
    }),

    left: css({
        display: 'flex',
        flexDirection: 'column',
        width: '32px',
        marginRight: '8px',
    }),
    headComment: css({
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        marginTop: '8px',
        paddingTop: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0px 2px',

    }),
    tailComment: css({
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        paddingBottom: '8px',


    }),
    spacers: css({
        display: 'flex',
    }),
    action: css({
        width: '32px',
        borderRadius: '8px',
        minWidth: '20px',
        height: '32px',
    }),
    divider: css({
        width: '1.5px',
        minWidth: '1.5px',
        borderRadius: '8px',
        height: '100%',
        background: '#272732',
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



const Comment = ({ public_id }: any) => {



    const data = useLiveData(false, `subscribe:${public_id}`)

    const { last, author, content, created_at, global_roles, community_roles, vote, karma, tags, path, depth } = data

    const params = useParams()
    const [showReply, setShowReply] = useState(false)
    const [relation, setRelation] = useState<any>(null)

    const filter = useRecoilValue(filterFlow)

    const layoutState = useRecoilValue(layoutSizeData)
    const authState = useRecoilValue(authFlow)

    const handleReply = () => setShowReply(!showReply)

    const handleChildren = () => {
        // let deepClone = JSON.parse(JSON.stringify(commentTree));
        // traverseTree(deepClone, (node: any) => {
        //     if (!node.path) return
        //     if (node.path === path) return node.active = !node.active;
        //     if (node.path.indexOf(path) === 0) node.visibility = !node.visibility;
        // });
        // setCommentTreeData(deepClone)
    }

    const spacers = []
    for (var i = 0; i < depth - 2; i++) {
        if (layoutState === 'desktop') spacers.push(<div css={C.spacer} key={i} style={{ background: colors[i] }} />)
        else spacers.push(<div css={C.spacerMobile} key={i} style={{ background: colors[i] }} />)
    }

    // if (!data || !data?.visibility) return null
    if (tags && tags.some((obj: any) => filter.includes(obj.public_id))) return null

    return (

        <div css={C.container}>

            <div css={[C.inner, depth == 2 && C.headComment, last && C.tailComment]}>
                <div css={C.spacers}>{spacers}</div>

                <div css={C.comment}>

                    <div style={{ marginBottom: layoutState === 'mobile' ? '8px' : '0px' }} css={C.header}>

                        <div css={{
                            // padding: '2px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // background: colors[depth - 2],
                            borderRadius: '8px',

                        }}>
                            <Avatar public_id={author.public_id} size={'small'} />
                        </div>

                        <div css={{
                            height: '34px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '12px', lineHeight: '10px', marginBottom: '4px' }}>
                                <Nickname
                                    title={author?.nickname}
                                    public_id={author?.public_id}
                                    // community_id={community?.public_id}
                                    global_roles={global_roles}
                                />
                                {created_at && <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), { addSuffix: true })}</div>}
                            </div>
                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '20px' }}>
                                {community_roles && <LiveRoles value={community_roles} />}
                                {tags && <LiveTags value={tags} />}
                            </div>
                        </div>
                        {authState !== 'guest' && <RightMenu tags={tags} type={'comment'} public_id={public_id} global_roles={global_roles} community_roles={community_roles} />}

                    </div>

                    <div css={{ display: 'flex', marginTop: '8px' }}>
                        {layoutState === 'desktop' && <div css={C.defaultSpacer} style={{ background: colors[depth - 2] }} />}
                        <div>
                            <ContentLoader type='text' content={content} />
                            <div css={C.float}>

                                {relation?.hasChildren &&
                                    <>
                                        <Button
                                            sx={{

                                            }}
                                            onClick={handleChildren}
                                            css={C.action}
                                            variant="text"
                                            color="secondary"
                                            size="large"
                                        >

                                            {relation?.active ? <IndeterminateCheckBoxOutlinedIcon
                                                sx={{ fontSize: '22px' }}
                                            /> : <AddBoxOutlinedIcon fontSize="inherit" />}

                                        </Button>
                                        <div css={C.divider} />
                                    </>
                                }

                                <LiveVotes size='small' vote={vote} karma={karma} public_id={public_id} type='comment' />
                                <div css={C.divider} />
                                <Button
                                    onClick={handleReply}
                                    variant="text"
                                    size="small"
                                    color="secondary"
                                    sx={{ gap: '8px', fontSize: '16px' }}
                                >
                                    <ReplyAllRoundedIcon fontSize="inherit" />
                                    <div css={[textBold('t'), {
                                        color: '#b9bbbe',
                                    }]}>Reply</div>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {showReply && <AddComment parent_id={public_id} post_id={params.post_id} />}

                </div>
            </div>
        </div>


    )
}

export default Comment



function goDeep(obj: any, path: any) {
    var parts = path.split('.'),
        rv,
        index;

    for (rv = obj, index = 1; rv && index < parts.length; ++index) {

        if (index === 1) { rv = rv[parts[index]] }
        else {
            rv = rv.children[parts[index]];

        }

    }
    return rv;
}

function traverseTree(tree: any, callback: any) {
    callback(tree);

    for (const key in tree) {
        if (typeof tree[key] === 'object') {
            traverseTree(tree[key], callback);
        }
    }


}




// \                <div css={[C.comment, depth == 2 && C.headComment, relation.last && C.tailComment]}>

// <div css={C.spacers}>{spacers}</div>

// <div css={C.left}>
//     <Avatar public_id={author.public_id} size={'small'} />
//     <div css={C.defaultSpacer} />
// </div>

// <div css={{ flexGrow: 1 }}>
//     <div css={C.header}>

//         <div css={{ display: 'flex', alignItems: 'center', gap: '4px', lineHeight: '12px !important' }}>
//             <Author
//                 title={author?.nickname}
//                 public_id={author?.public_id}
//                 // community_id={community?.public_id}
//                 global_roles={global_roles}
//             />

//             {community_roles && <LiveRoles value={community_roles} />}


//             <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
//                 addSuffix: true
//             })}
//             </div>
//         </div>
//         <div css={{ display: 'flex' }}>
//             {tags && <LiveTags value={tags} />}
//         </div>
//     </div>
//     <ContentLoader type='text' content={content} />



//     {showReply && <AddComment parent_id={public_id} post_id={params.post_id} />}

// </div>
// </div>