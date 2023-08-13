/** @jsxImportSource @emotion/react */
import Post from '@/components/chunks/Post/Post';
import { socketFlow } from '@/state/flow';
import { postSync } from '@/state/sync';
import { css } from '@emotion/react'


import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import rehypeRaw from 'rehype-raw';
import { socketRequest } from '../util/useSocket';
import Avatar from '@/components/bits/Avatar';
import { bg_3, bg_active } from '@/global/var';
import { searchList } from '@/state/filters';



const C = {
    container: css({
        width: '100%',
        height: 'auto',
        background: bg_3,
        borderRadius: '8px',
        padding: '12px 8px',
        gap: '8px',
        display: 'flex',
        color: '#fff',
        cursor: 'pointer',
    }),
}


const useSearch = (type: string, query: string) => {

    const socket = useRecoilValue(socketFlow)
    const [components, setComponents]: any = useRecoilState(searchList)
    const navigate = useNavigate()

    useEffect(() => {
        setComponents([])
    }, [type, query])


    const setPosts = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp = []
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                temp.push(<Post key={i} view='global' {...listItems[i]} />)
            }
            // setComponents([temp])
            set(searchList, temp);
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
                    temp.push(
                        <div onClick={() => { navigate(`/p/${req.persons[i].public_id}`) }} data-value={req.persons[i].public_id} css={C.container}>
                            <Avatar public_id={req.persons[i].public_id} size={'medium'} />
                            <div>
                                <div css={{ fontSize: '16px', fontWeight: '600' }}>{req.persons[i].nickname}</div>
                                <div css={{ fontSize: '12px', color: '#d7dadc', fontWeight: '300' }}>@{req.persons[i].username}</div>
                            </div>
                        </div>
                    )
                }
                setComponents(temp)
            }


            if (type === 'community') {


                let temp = []
                for (let i in req.communitys) {
                    temp.push(
                        <>

                            <div css={C.container} onClick={() => { navigate(`/c/${req.communitys[i].public_id}`) }}>
                                <Avatar public_id={req.communitys[i].public_id} size={'medium'} />
                                <div>
                                    <div css={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '20px' }}>{req.communitys[i].title}</div>
                                    <ReactMarkdown className='text' children={req.communitys[i].description} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                                </div>
                            </div>

                            <div css={{
                                width: 'calc(100% - 16px)',
                                margin: '0 auto',
                                height: '2px',
                                backgroundColor: bg_active,
                                borderRadius: '4px',
                            }} />

                        </>)
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