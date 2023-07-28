
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

// @ts-ignore
import TimeAgo from 'react-timeago'
import { formatTime } from '@/utils/formatTime';

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import ChunkError from '@/components/bits/ChunkError';
import ContentLoader from '@/components/chunks/ContentLoader/ContentLoader';
import Post from '@/components/chunks/Post/Post';
import { personList } from '@/state/filters';
import { postSync } from '@/state/sync';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/bits/Avatar';
import { socketRequest } from '../util/useSocket';
import { bg_1, bg_2, bg_3 } from '@/global/var';
import { time } from '@/global/mixins';
import { socketFlow } from '@/state/flow';


const usePersons= (person_id: any, filter: any) => {

    const [components, setComponents]: any = useRecoilState(personList)
    const [cursor, setCursor]: any = useState(false)
    const socket = useRecoilValue(socketFlow)

    useEffect(() => {
        setCursor(false)
        setComponents([])
    }, [filter])

    useEffect(() => {
        if (cursor === null || socket !== 'connected') return
        (async () => {
            if (filter === 'POST') {
                let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                if (req?.posts?.length < 10) setCursor(null)
                setList(req.posts)
            }
            else if (filter === 'COMMENT') {
                let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                if (req?.comments?.length < 25) setCursor(null)
                setComments(req.comments)
            }

        })()
    }, [cursor, filter, socket])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                set(personList, (oldList: any) => [...oldList, <Post view='list' key={i} {...listItems[i]} />])
            }
        },
        []
    );

    const setComments = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                set(personList, (oldList: any) => [...oldList, <CommentWithPost {...listItems[i]} />])
            }
        }, []
    );

    const fetchNext = async () => {
        if (components?.length === 0 || cursor === null) return
        if (filter === 'POST') return setCursor(components[components.length - 1].props.created_at)
        else if (filter === 'COMMENT') return setCursor(components[components.length - 1].props.created_at)

    }


    return [false, false, components.concat(<ChunkError variant={cursor !== null ? 'loading' : 'end'} onLoad={fetchNext} />)]
}


export default usePersons


const C = {
    container: css({
        cursor: 'pointer',
        marginTop: '8px',
        background: bg_3,
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
    }),

    post: css({
        display: 'flex',
        gap: '8px',
        fontSize: '12px',
        color: '#f2f3f5',
        alignItems: 'center',
        // width: '100%',
        padding: '6px 8px',
        borderRadius: '8px',
        background: bg_1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }),
}


const CommentWithPost = (props: any) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/c/${props.community_id}/p/${props.post_id}/c/${props.public_id}`)
    }

    return (
        <div css={C.container} onClick={handleClick}>

            <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div css={C.post}>
                    <Avatar public_id={props?.community_id} size='tiny' />
                    {props.post_title}
                </div>
                <div css={[time, {
                    whiteSpace: 'nowrap',
                }]}><TimeAgo date={props.created_at} formatter={formatTime} /></div>
            </div>


            <ContentLoader type='text' content={props.content} />


            {/* <LiveVotes vote={props.vote} karma={props.karma} public_id={props.public_id} type='comment' /> */}

        </div>
    )
}