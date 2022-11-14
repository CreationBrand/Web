import { CircularProgress } from "@mui/material"
import useSocketRequest from "Hooks/useSocketRequest";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { contentFlow } from "State/Flow";
import Post from "Stories/Post/Post";


const ListLoader = () => {

    const [isEnd, setIsEnd] = useState(false)
    let [contentState, setFlow] = useRecoilState(contentFlow);

    const [error, loading, data] = useSocketRequest('post-list', {
        public_id: contentState.public_id,
        filter: 'new',
        page: contentState.page,
        offset: contentState.list.length,
    }, isEnd)

    console.log('skip', isEnd, data, contentState.title, contentState.page)
    // console.log(contentState.list, error , loading, data , contentState.public_id , contentState.page)

    useEffect(() => {

        if (data.status === 'ok') {
            //set end of list
            if (data.posts.length < 25) {
                setIsEnd(true)
            }

            let posts = []

            for (var i in data.posts) {
                posts.push(<Post data={data.posts[i]} />)
            }
            setFlow({
                ...contentState,
                list: [...contentState.list, ...posts],
                page: contentState.page + 1,
            })
        }

    }, [data])



    useEffect(() => {

        setIsEnd(false)

    }, [contentState.public_id])






    return <div>

        <CircularProgress />

    </div>
}


export default ListLoader
