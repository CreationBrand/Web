import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentTreeData } from "State/Data";
import Comment from "Stories/Chunk/Comment/Comment";
var treeify = require('treeify');

const useCommentTree = (post_id: any, filter: string) => {

    const [tree, setCommentTree]: any = useRecoilState(commentTreeData)
    const [page, setPage]: any = useState(0)


    useEffect(() => {
        (async () => {
            if (page === false || !post_id || !filter) return

            let req: any = await socketRequest('comments', {
                post_id: post_id,
                filter: filter,
                page: page,
            })

            if (!req || req.comments.length === 0) setCommentTree(false)
            if (req.comments.length < 25) setPage(false)

            console.groupCollapsed('%c [DATA - comments] ', 'background: #000; color: #5555da');
            console.log(treeify.asTree(req.comments, true));
            console.groupEnd();

            let temp = []
            for (var i in req.comments) {
                temp.push(<Comment varient={'post'} {...req.comments[i]} />)
            }
            setCommentTree([...temp])
        })()
    }, [post_id, filter])

    return tree
}

export default useCommentTree





