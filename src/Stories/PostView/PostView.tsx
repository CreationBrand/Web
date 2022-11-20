/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Post from "Stories/Post/Post";
import useSocketRequest from "Hooks/useSocketRequest";
import { useParams } from "react-router-dom";
import VirtualTree from "Stories/VirtualTree/VirtualTree";
import { commentListData } from "State/Data";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import DynamicVirtual from "Stories/DynamicVirtual/DynamicVirtual";
import { socketRequest } from "Service/Socket";

import Comment from 'Stories/Comment/Comment';
import CommentList from "Stories/LoadersLists/CommentList";
// import CommentList from "Stories/Views/CommentList/CommentList";


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

    const [error, loading, data]: any = useSocketRequest('read-post', { post_id: params.post_id, community_id: params.community_id })


    if (loading) return <div>loading</div>
    if (error) return <div>error</div>


    return (
        <div id="PostView" css={C.container}>
            <CommentList
                post_id={params.post_id}
                header={<Post data={data.post} />} />

        </div>
    )
}


export default PostView