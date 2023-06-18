/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import rehypeRaw from 'rehype-raw';
import { socketRequest } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";
import { authFlow, socketFlow } from "State/Flow";
import Avatar from 'Stories/Bits/Avatar/Avatar';
import MainPost from "Stories/Chunk/Post/Post";




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
        fontFamily: 'noto sans',
        color: '#fff',
        cursor: 'pointer',
    }),
}


const useSearch = (type: string, query: string) => {

    const [components, setComponents]: any = useRecoilState(postListData)
    const [socket, setSocket] = useRecoilState(socketFlow)
    const authData = useRecoilValue(authFlow)
    const navigate = useNavigate()

    const setPosts = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp = []
            for (let i = 0; i < listItems.length; i++) {
                set(virtualListStateFamily(`subscribe:${listItems[i].public_id}`), listItems[i]);
                temp.push(<MainPost public_id={listItems[i].public_id} />)
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

            // console.groupCollapsed('%c [DATA - post list] ', 'background: #000; color: #5555da');
            // console.log(treeify.asTree(req.posts, true));
            // console.groupEnd();


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

                            {/* <Button
                                disabled={authData === "guest"}
                                data-value={req.persons[i].public_id}
                                onClick={(e) => {
                                    //@ts-ignore
                                    openDM(e.target.dataset.value)
                                }}
                                sx={{
                                    marginLeft: 'auto',
                                    background: '#5555da',
                                    borderRadius: '8px',
                                    color: '#dadce0',
                                    gap: '8px',
                                }}

                                variant="contained">
                                <FontAwesomeIcon icon={faPaperPlane} />
                                Open DM</Button> */}


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

                                {/* <div css={{ fontSize: '12px', color: '#d7dadc', fontWeight: '300' }}>{req.communitys[i].description}</div> */}
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