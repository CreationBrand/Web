
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'




import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postList, postSync} from "State/postAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Post from "Stories/Chunk/Post/Post";
import { useNavigate } from 'react-router-dom';
import { personFilter } from "State/filterAtoms";
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader';

// ICONS
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import TTLCache from '@isaacs/ttlcache';
import { set } from 'react-hook-form';
const cache = new TTLCache({ max: 10000, ttl: 60000 })

let end: boolean = false

const usePersonList = (person_id: any, filter:any) => {

    const [components, setComponents]: any = useRecoilState(postList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        console.log('%c [RESET] ', 'font-weight: bold; color: #F00', 'PersonList', filter);
    }, [person_id, filter])

    useEffect(() => {
        (async () => {
            try {
                console.log(filter)

                if (end || isError) return

                if (filter === 'POST') {
                    if (cache.has(`posts:${person_id}:${filter}:${cursor}`)) {
                        console.log('%c [CACHE] ', 'font-weight: bold; color: #FF0', `Posts Cursor:${cursor}`);
                        return setList(cache.get(`posts:${person_id}:${filter}:${cursor}`))
                    }
                    let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                    console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);
                    if (req?.posts?.length < 10) end = true
                    setList(req.posts)
                    cache.set(`posts:${person_id}:${filter}:${cursor}`, req.posts)
                }


                else if (filter === 'COMMENT'){
                    if (cache.has(`comments:${person_id}:${filter}:${cursor}`)) {
                        console.log('%c [CACHE] ', 'font-weight: bold; color: #FF0', `Comments Cursor:${cursor}`);
                        return setComments(cache.get(`comments:${person_id}:${filter}:${cursor}`))
                    }
                    let req: any = await socketRequest('person-list', { person_id, filter, cursor: cursor })
                    console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments Cursor:${cursor}`);
                    if (req?.comments?.length < 25) end = true
                    setComments(req.comments)
                    cache.set(`comments:${person_id}:${filter}:${cursor}`, req.comments)
                }
                else {
                    setIsError(true)
                }



            } catch (e) {
                setIsError(true)
            }
        })()
    }, [person_id, cursor, filter])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {

            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                batch.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            set(postList, (oldList: any) => [...oldList, batch])

        },
        []
    );


    const setComments = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                batch.push(<CommentWithPost key={i} {...listItems[i]} />)
            }
            set(postList, (oldList: any) => [...oldList, batch])
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
        width: '100%',
        display: 'flex',
        height: 'auto',
        alignItems: 'stretch',
        position: 'relative',
        marginTop: '8px',

    }),
    inner: css({
        cursor: 'pointer',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#272732',
        borderRadius: '8px',
        padding: '0px 8px',
        paddingBottom: '8px',
    }),
    post: css({
        width: '100%',

        display: 'flex',
        gap: '8px',
        padding: '8px 0px',
        fontSize: '14px',
        color: '#d7dadc',
        fontWeight: 'bold',
        borderBottom: '2px solid #181820',
    }),
}


const CommentWithPost = (props: any) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/c/${props.community_id}/p/${props.post_id}/c/${props.public_id}`)
    }

    return (
        <div css={C.container} onClick={handleClick}>
            <div css={C.inner}>
                <div css={C.post}>
                    <FontAwesomeIcon css={{ fontSize: '20px', color: '#d7dadc' }} icon={faEnvelope} />
                    {props.post_title}
                </div>
                <ContentLoader type='text' content={props.content} />
                <div>

                    {/* <LiveVotes size='small' vote={props.vote} karma={props.karma} public_id={props.public_id} type='comment' /> */}

                </div>
            </div>
        </div>
    )
}