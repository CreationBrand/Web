/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import rehypeRaw from 'rehype-raw';
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { authFlow, socketFlow } from "State/Flow";
import { postSync } from 'State/postAtoms';
import Avatar from 'Stories/Bits/Avatar/Avatar';
import Post from 'Stories/Chunk/Post/Post';


const C = {
    container: css({
        width: '100%',
        padding: '16px 2px 0px 0px',


    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        // height: '56px',
        height: 'auto',
        background: '#272732',
        borderRadius: '8px',
        padding: '8px',
        gap: '8px',
        maxWidth: '800px',
        alignItems: 'center',
        display: 'flex',
        color: '#fff',
        cursor: 'pointer',
    }),
}


const useSearch = (type: string, query: string) => {

    const [components, setComponents]: any = useRecoilState(postListData)
    const [socket, setSocket] = useRecoilState(socketFlow)
    const navigate = useNavigate()

    useEffect(() => {
        setComponents([])
        console.log('%c [RESET] ', 'font-weight: bold; color: #F00', 'PostList');

    }, [type, query])


    const setPosts = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp = []
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                temp.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            // setComponents([temp])
            set(postListData, temp);
        },
        []
    );



    const { isLoading, isError, data } = useQuery({
        enabled: socket === 'connected',
        queryKey: ['search', type, query],
        queryFn: async () => {
            let req: any = await socketRequest('search', { type, query })
            if (type === 'person') {
                let temp = []
                for (let i in req.persons) {
                    temp.push(<div css={C.container}>
                        <div
                            onClick={() => { navigate(`/p/${req.persons[i].public_id}`) }}
                            data-value={req.persons[i].public_id}
                            css={C.inner}>

                            <Avatar public_id={req.persons[i].public_id} size={'medium'} />

                            <div>
                                <div css={{ fontSize: '16px', fontWeight: '600' }}>{req.persons[i].nickname}</div>
                                <div css={{ fontSize: '12px', color: '#d7dadc', fontWeight: '300' }}>@{req.persons[i].username}</div>
                            </div>
                        </div>
                    </div>)
                }
                setComponents(temp)
            }


            if (type === 'community') {


                let temp = []
                for (let i in req.communitys) {
                    temp.push(<div css={C.container}>
                        <div css={C.inner} onClick={() => { navigate(`/c/${req.communitys[i].public_id}`) }}>
                            <Avatar public_id={req.communitys[i].public_id} size={'medium'} />
                            <div>
                                <div css={{ fontSize: '16px', fontWeight: '600' }}>{req.communitys[i].title}</div>
                                <ReactMarkdown children={req.communitys[i].description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                            </div>
                        </div>
                    </div>)
                }
                setComponents(temp)
            }

            if (type === 'post') {
                setPosts(req.posts)
            }

            return req
        },

    })


    return [isLoading, isError, components]
}

export default useSearch