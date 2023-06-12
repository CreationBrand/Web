
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { faEnvelope, faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { set } from "date-fns";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { personFilter, postFilter } from "State/filterAtoms";
import { socketFlow } from "State/Flow";
import LiveVotes from 'Stories/Alive/LiveVotes';
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader';
import MainPost from "Stories/Chunk/Post/Post";

let end = false

const usePullPosts = (person_id: any) => {

    const [socket, setSocket] = useRecoilState(socketFlow)
    const [components, setComponents]: any = useRecoilState(postListData)
    const filter = useRecoilValue(personFilter)


    useEffect(() => {
        end = false
        setComponents([])
    }, [person_id, filter])

    const fetch = async ({ pageParam = false }) => {
        let req: any = await socketRequest('person-list', { person_id, filter, cursor: pageParam })
        // setListItems(req.posts)
        return req.posts
    }

    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            if (!listItems) return
            for (let i = 0; i < listItems.length; i++) {
                set(virtualListStateFamily(`subscribe:${listItems[i].public_id}`), listItems[i]);
            }
        },
        []
    );

    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        enabled: socket === 'connected' && !end,
        queryKey: ['person-list', person_id, filter],
        queryFn: fetch,
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage || lastPage.length === 0) return undefined
            else return lastPage[lastPage.length - 1].created_at
        },

        onSuccess: (data) => {
            if (end) return
            if (!data || data === undefined || data.pages.length === 0) return
            if (!data || data === undefined || data.pages.length === 0) return


            if (filter === 'POST') {
                const temp = []
                for (let i in data.pages) {
                    for (let j in data.pages[i]) {
                        temp.push(<MainPost public_id={data.pages[i][j].public_id} />)
                    }
                }
                setComponents(temp)
            }

            else if (filter === 'COMMENT') {
                const temp = []
                for (let i in data.pages) {
                    for (let j in data.pages[i]) {
                        temp.push(<CommentWithPost {...data.pages[i][j]} />)
                    }
                }
                setComponents(temp)
            }



        },
    })


    return [isLoading, isError, components.concat(<ChunkError variant={hasNextPage ? 'loading' : 'end'} onLoad={fetchNextPage} />)]
}


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
        // display: 'flex',
        paddingBottom: '8px',
    }),
    post: css({
        width: '100%',
        // height: '40px',
        // border: '1px solid red',
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

export default usePullPosts