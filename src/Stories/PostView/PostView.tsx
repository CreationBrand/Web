/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Post from "Stories/Post/Post";
import useSocketRequest from "Hooks/useSocketRequest";
import { useParams } from "react-router-dom";
import VirtualTree from "Stories/VirtualTree/VirtualTree";

const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
        overflow: 'hidden',
    }),
}






const PostView = () => {

    // navigation
    let params = useParams();

    // const [error, loading, data]: any = useSocketRequest('read-post', { post_id: params.post_id, community_id: params.community_id })


    // console.log(data, error, loading)

    // if (loading) return <div>loading</div>
    // if (error) return <div>error</div>








    return (
        <div id="PostView" css={C.container}>

            <VirtualTree  />

            Postbiewasd
        </div>
    )
}


export default PostView