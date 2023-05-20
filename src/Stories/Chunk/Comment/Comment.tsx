
//@ts-nocheck

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, } from '@mui/material'

import { sMuted } from 'Stories/Bits/Text/Text'
import { formatDistance, formatDistanceStrict, formatDistanceToNowStrict, parseISO } from 'date-fns'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'
import { useRecoilState, } from 'recoil'
import { commentTreeData } from 'State/Data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import AddComment from '../AddComment/AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import Author from 'Stories/Bits/Titles/Author'
import { textBold, textLight } from 'Global/Mixins'

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
        display: 'flex',
    }),
    comment: css({
        background: '#272732',
        display: 'flex',
        width: '100%',
        padding: '8px',
        position: 'relative',
    }),
    spacer: css({
        height: 'calc(100% + 20px)',
        width: '2px',
        borderRadius: '8px',
        marginRight: '15px',
        marginLeft: '15px',
        background: '#52555d',
        alignSelf: 'stretch',
        position: 'relative',
        top: '-20px',
    }),
    defaultSpacer: css({
        flexGrow: 1,
        marginLeft: '15px',
        borderRadius: '8px',
        width: '2px',
        background: '#52555d',
    }),
    float: css({
        marginTop: '8px',
        background: '#3b3b4b',
        borderRadius: '8px',
        width: 'min-content',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
    }),
    header: css({
        marginBottom: '8px',
        display: 'flex',
        lineHeight: '20px',
        gap: '4px',
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
        boxShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0px 2px',
        paddingTop: '8px',
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
        borderRadius: '8px',
        height: '100%',
        background: '#272732',
    }),
}



const Comment = ({ hidden, public_id, author, content, vote, depth, karma, path, created_at, updated_at, }: any) => {

    const params = useParams()
    const [showReply, setShowReply] = useState(false)
    const [commentTree, setCommentTreeData] = useRecoilState(commentTreeData)
    const [relation, setRelation] = useState<any>(null)

    //relations for tree stuff
    useEffect(() => { setRelation(goDeep(commentTree, path)) }, [commentTree])

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

    const spacers = []
    for (var i = 0; i < depth - 2; i++) { spacers.push(<div css={C.spacer} key={i} />) }
    if (!relation?.visibility) return null

    return (
        <div css={C.container}>
            <div css={C.inner}>

                <div css={[C.comment, depth == 2 && C.headComment, relation.last && C.tailComment]}>

                    <div css={C.spacers}>{spacers}</div>

                    <div css={C.left}>
                        <Avatar public_id={author.public_id} size={'small'} />
                        <div css={C.defaultSpacer} />
                    </div>

                    <div css={{ flexGrow: 1 }}>
                        <div css={C.header}>
                            <Author username={author.nickname} />
                            <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                                addSuffix: true
                            })}
                            </div>
                        </div>
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

                            {/* <Vote size='small' vote={vote} karma={karma} public_id={public_id} type='comment' /> */}
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
                        {showReply && <AddComment parent_id={public_id} post_id={params.post_id} />}

                    </div>
                </div>

            </div>
        </div >
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
