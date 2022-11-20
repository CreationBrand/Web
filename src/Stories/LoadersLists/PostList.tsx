import { useEffect, useState } from "react";
import { socketRequest } from "Service/Socket";
import DynamicVirtual from "Stories/DynamicVirtual/DynamicVirtual";
import Post from "Stories/Post/Post";

const PostList = ({ header, community_id }: any) => {

    // state
    let [page, setPage] = useState(0);
    const [list, setList]: any = useState([]);

    // effects
    useEffect(() => {
        (async () => {
            let req: any = await socketRequest('post-list', {
                community_id: community_id,
                filter: 'new',
                page: page,
            })
            if (req.status === 'ok') {
                let posts = []
                for (var i in req.posts) {
                    posts.push(<Post data={req.posts[i]} />)
                }

                if (page === 0) setList(posts)
                else await setList([...list, posts])
            }
        })()
    }, [community_id])




    return (
        <div id='Post-List'>
            <DynamicVirtual rows={[header, ...list]} />
        </div>
    )
}



export default PostList