// @ts-nocheck

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, } from '@mui/material'

import {

    sBold,
    sMuted,
    xsMuted
} from 'Stories/Bits/Text/Text'
import { formatDistance, formatDistanceStrict, formatDistanceToNowStrict, parseISO } from 'date-fns'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { commentListData, commentTreeData } from 'State/Data'
import { useEffect, useState } from 'react'
import { socketRequest } from 'Service/Socket'
import { useParams } from 'react-router-dom'
import CommentReply from 'Stories/MOC/CommentReply'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import Vote from 'Stories/Bits/Vote/Vote'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import AddComment from '../AddComment/AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

var treeify = require('treeify');


const C = {
    container: css({
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
    }),
    inner: css({
        borderRadius: '8px',
        padding: '8px 0px 0px 0px',
        height: 'auto',
        display: 'flex',
    }),
    left: css({
        position: 'relative',
        marginRight: '8px',
        display: 'flex',
        flexDirection: 'column',
    }),
    right: css({
        width: '100%'
    }),
    footer: css({
        display: 'flex',

        // justifyContent: 'flex-end',
        marginTop: '4px',
        width: '100%'
    }),

    icon: css({
        height: '40px',
        width: '40px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden'
    }),

    title: css({
        padding: '6px 0px 8px 0',
        // fontWeight: '400'
    }),
    row: css({
        display: 'flex',
        gap: '4px',
    }),

    action: css({
        width: '32px',
        borderRadius: '8px',
        minWidth: '20px',
        height: '32px',


    }),
    vote: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }),
    thread: css({
        position: 'relative',
        minWidth: '1px',
        width: '1px',
        maxWidth: '1px',
        margin: '0px 14px 0px 15px',
        background: '#bcbdbe',
        height: 'calc(100% + 20px)',
        top: '-20px',

    }),
    threads: css({

        display: 'flex',

    }),
    bar: css({
        background: '#272732',
        borderRadius: '8px',
        height: '32px',
        display: 'flex',
    }),

    threadSlot: css({
        width: '32px',
        position: 'relative',
    }),

    defaultThread: css({
        width: '1px',
        marginLeft: '15px',
        background: '#bcbdbe',
        height: 'calc(100% - 63px)',
    }),
    curveThread: css({
        width: '16px',
        height: '16px',
        borderBottomLeftRadius: '50%',
        borderLeft: '1px solid #bcbdbe',
        borderBottom: '1px solid #bcbdbe',
        marginLeft: '15px',
    }),

    avatarThread: css({
        width: '16px',
        height: '24px',
        borderBottomLeftRadius: '50%',
        borderLeft: '1px solid #bcbdbe',
        borderBottom: '1px solid #bcbdbe',
        marginLeft: '15px',
    }),

    mergeThread: css({
        position: 'absolute',
        width: '1px',
        marginLeft: '15px',
        background: '#bcbdbe',
        height: '8px',
        top: '-8px',
    }),

    continueThread: css({
        position: 'absolute',
        width: '1px',
        marginLeft: '15px',
        background: '#bcbdbe',
        height: '38px',
        top: '-38px',
    }),


    actionBar: css({
        position: 'relative',
        right: '8px',
        marginTop: '8px',
        background: '#343442',
        borderRadius: '8px',
        width: 'min-content',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
    }),
    divider: css({
        width: '1.5px',
        borderRadius: '8px',
        height: '100%',
        background: '#272732',

    }),
}

const Comment = ({
    varient,
    hidden,
    public_id,
    author,
    content,
    vote,
    depth,
    karma,
    path,
    created_at,
    updated_at,
}: any) => {

    const params = useParams()
    const [showReply, setShowReply] = useState(false)
    const [commentTree,setCommentTreeData] = useRecoilState(commentTreeData)

    const [relation, setRelation] = useState<any>(null)



    //relations for threads / nesting
    useEffect(() => {
        setRelation(goDeep(commentTree, path))
    }, [commentTree])

    const handleReply = () => setShowReply(!showReply)



    const handleChildren = () => {

        let deepClone = JSON.parse(JSON.stringify(commentTree));

        traverseTree(deepClone, (node) => {
            if (!node.path) return
            if (node.path === path) return node.active = !node.active;
            if (node.path.indexOf(path) === 0) node.visibility = !node.visibility;
        });

        setCommentTreeData(deepClone)

    }

    const threads = []
    for (var i = 0; i < depth - 2; i++) {
        if (i === 0 && relation?.last) threads.push(<div css={C.threadSlot}><div css={C.avatarThread} /></div>)
        else threads.push(<div css={C.threadSlot}><div css={C.thread} /></div>)
    }

    if(!relation?.visibility) return null

    return (
        <div id="comment" css={C.container} key={public_id}>

            {depth > 2 && <div id="threads" css={C.threads}>
                {threads}
            </div>}

            <div css={C.inner}>

                <div css={C.left}>


                    {(relation?.depthChange && depth > 2) && <div css={C.mergeThread} /> || depth > 2 && <div css={C.continueThread} />}


                    <Avatar public_id={author.public_id} size={'small'} />

                    <div css={C.defaultThread} />
                    <div css={C.curveThread} />
                </div>

                <div css={C.right}>

                    <div css={C.row}>
                        <div css={[sBold, C.title]}>{author.nickname}</div>
                        <div css={[xsMuted, C.title]}>
                            ·  {' '}
                            {formatDistanceStrict(parseISO(created_at), new Date(), {
                                addSuffix: true
                            })}</div>
                    </div>


                    <ContentLoader type='text' content={content} />


                    <div css={C.actionBar}>


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



                        <Vote size='small' vote={vote} karma={karma} public_id={public_id} />


                        <div css={C.divider} />


                        <Button
                            onClick={handleReply}
                            variant="text"
                            size="small"
                            color="secondary"
                            sx={{ gap: '8px' }}
                        >
                            <ReplyAllRoundedIcon fontSize="inherit" />
                            <div css={sMuted}>Reply</div>
                        </Button>


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








function traverseTree(tree, callback) {
    callback(tree);

    for (const key in tree) {
        if (typeof tree[key] === 'object') {
            traverseTree(tree[key], callback);
        }
    }
}

// const tree = {
//     "1": {
//         id: 1,
//         "active": false,
//         "children": {
//             "2": {
//                 "active": false,
//                 "children": {
//                     "3": {
//                         "active": false
//                     }
//                 }
//             },
//             "4": {
//                 "active": false,
//                 "children": {
//                     "5": {
//                         "active": false,
//                         "children": {
//                             "6": {
//                                 "active": false
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//     }
// };

// traverseTree(tree, (node) => {
//     node.active= true;

//     console.log(node)
// });


// console.log(treeify.asTree(tree, true));
