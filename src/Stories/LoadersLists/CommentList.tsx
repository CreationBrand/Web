import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentListData } from "State/Data";
import DynamicVirtual from "Stories/DynamicVirtual/DynamicVirtual";
import Comment from "Stories/Comment/Comment";
import { css } from "@emotion/react";

const CommentList = ({ header, post_id }: any) => {

    // state
    const [page,setPage] = useState(0);
    const [commentList, setCommentList]: any = useRecoilState(commentListData);

    // effects
    useEffect(() => {
        (async () => {
            let req: any = await socketRequest('comment-list', {
                post_id: post_id,
                filter: 'new',
                page: 0,
            })
            if (req.status === 'ok') {
                let comments = []
                for (var i in req.comments) {
                    comments.push(<Comment data={req.comments[i]} />)
                }
                if(page === 0) await setCommentList(comments)
                else await setCommentList([...commentList, comments])
            }
        })()
    }, [post_id])

    console.log('render',commentList)

    return (
        <div id='Comment-List' css={css({marginTop:'12px'})}>
            <DynamicVirtual rows={[header, ...commentList]} />
        </div>
    )
}



export default CommentList