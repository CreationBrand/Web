
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { time } from 'Global/Mixins';
import { formatTime } from 'Util/formatTime';
// @ts-ignore
import TimeAgo from 'react-timeago'


import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { postSync } from "State/postAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Post from "Stories/Chunk/Post/Post";
import { useNavigate } from 'react-router-dom';
import { personList } from "State/filterAtoms";
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader';



import TTLCache from '@isaacs/ttlcache';
import Avatar from 'Stories/Bits/Avatar/Avatar';

const cache = new TTLCache({ max: 10000, ttl: 60000 })
let end: boolean = false

const usePersonList = (person_id: any, filter: any) => {

    const [components, setComponents]: any = useRecoilState(personList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
    }, [person_id, filter])

    useEffect(() => {
        (async () => {
            try {
                if (end || isError) return

                if (filter === 'POST') {
                    if (cache.has(`posts:${person_id}:${filter}:${cursor}`)) {
                        return setList(cache.get(`posts:${person_id}:${filter}:${cursor}`))
                    }
                    let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                    console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);
                    if (req?.posts?.length < 10) end = true
                    setList(req.posts)
                    cache.set(`posts:${person_id}:${filter}:${cursor}`, req.posts)
                }
                else if (filter === 'COMMENT') {
                    if (cache.has(`comments:${person_id}:${filter}:${cursor}`)) {
                        return setComments(cache.get(`comments:${person_id}:${filter}:${cursor}`))
                    }
                    let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                    console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments Cursor:${cursor}`);
                    if (req?.comments?.length < 25) end = true
                    setComments(req.comments)
                    cache.set(`comments:${person_id}:${filter}:${cursor}`, req.comments)
                }

            } catch (e) {
                setIsError(true)
            }
        })()
    }, [person_id, cursor, isError, filter])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {

            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                batch.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            set(personList, (oldList: any) => [...oldList, batch])

        },
        []
    );


    const setComments = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                batch.push(<CommentWithPost key={i} {...listItems[i]} />)
            }
            set(personList, (oldList: any) => [...oldList, batch])
        },
        []
    );



    const fetchNext = async () => {
        if (end || isError) return
        if (components?.length === 0) return
        let last: any = components[components.length - 1]
        if (!last[last.length - 1]) return
        if (last.length === 0) return

        if (filter === 'POST') return setCursor(last[last.length - 1].props.created_at)
        if (filter === 'COMMENT') return setCursor(last[last.length - 1].props.created_at)
    }


    return [isLoading, isError, components.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} />)]
}



export default usePersonList


const C = {
    container: css({
        cursor: 'pointer',
        marginTop: '8px',
        background: '#272732',
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
        width: 'min-content',
        padding: '6px 8px',
        borderRadius: '8px',
        background: '#181820',
        whiteSpace: 'nowrap',
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
                <div css={time}><TimeAgo date={props.created_at} formatter={formatTime} /></div>
            </div>


            <ContentLoader type='text' content={props.content} />


            {/* <LiveVotes vote={props.vote} karma={props.karma} public_id={props.public_id} type='comment' /> */}

        </div>
    )
}