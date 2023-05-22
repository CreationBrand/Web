import { useQuery } from "@tanstack/react-query";
import Comment from "Stories/Chunk/Comment/Comment";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentTreeData, virtualListStateFamily, } from "State/Data";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";

const usePullComments = (comment_id: any, filter: string) => {

    const [page, setPage] = useState(0)
    const [commentTree, setCommentTree]: any = useRecoilState(commentTreeData)

    useEffect(() => {
        setPage(0)
    }, [comment_id, filter])


    const setListItems = useRecoilTransaction_UNSTABLE(
        ({ set }) => (req: any) => {
            let result: any = {};
            let level = { result };

            req.comments.forEach((c: any, ci: any) => {
                c.path.split('.').reduce((r: any, name: any, i: any, a: any) => {
                    if (!r[name]) {
                        r[name] = { result: {} };
                        let data: any = {
                            content: c,
                            path: c.path,
                            active: true,
                            hasChildren: false,
                            depthChange: false,
                            last: false,
                            public_id: c.public_id, id: name, children: r[name].result, depth: c.depth, visibility: true
                        }
                        try {
                            if (req.comments[ci].depth < req.comments[ci + 1].depth) data.hasChildren = true
                        } catch { }
                        try {
                            if (req.comments[ci].depth !== req.comments[ci - 1].depth) data.depthChange = true
                        } catch { }
                        try {
                            if (2 === req.comments[ci + 1].depth) data.last = true
                        } catch {
                            data.last = true
                        }
                        r.result[name] = (data)
                    }
                    return r[name];
                }, level)
            })
            function addChildrenCount(node: any) {
                let count = 0;
                for (const key in node.children) {
                    if (Object.hasOwnProperty.call(node.children, key)) {
                        const child = node.children[key];
                        addChildrenCount(child);
                        count += 1 + child.childrenCount;
                    }
                }
                node.childrenCount = count;
                node.content.last = node.last
                node.content.depthChange = node.depthChange
                node.content.hasChildren = node.hasChildren
                node.content.childrenCount = node.childrenCount
                node.content.depth = node.depth
                node.content.visibility = node.visibility
                node.content.path = node.path

                set(virtualListStateFamily(`subscribe:${node.public_id}`), node.content);
            }

            //@ts-ignore
            addChildrenCount(result[Object.keys(result)]);
            //@ts-ignore
            // setCommentTree(result[Object.keys(result)].children)

            let comments: any = []
            for (var i in req.comments) { comments.push(<Comment public_id={req.comments[i].public_id} />) }
            
            if (page === 0) set(commentTreeData, comments);

            //@ts-ignore
            else set(commentTreeData, [...commentTree, comments])

            if (req.comments.length < 24) setPage(-1)

        },
        []
    );



    const { isLoading, isError, data, error } = useQuery({
        enabled: true,
        queryKey: ['comment-list', comment_id, filter, page],
        queryFn: async () => {

            if (page === -1) return false
            let req: any = await socketRequest('comments', { post_id: comment_id, filter: filter, page })
            if (req.comments.length === 0) return false

            return req
        },
        onSuccess: (data) => {
            if (!data || data === undefined) return
            setListItems(data)
        },

    })

    if (page === -1) return [isLoading, isError, commentTree.concat(<ChunkError variant='end' />)]
    return [isLoading, isError, commentTree.concat(<ChunkError variant='loading' />)]
}

export default usePullComments