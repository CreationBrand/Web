// import { useEffect, useState } from "react"
// import { useRecoilState } from "recoil";
// import { socketRequest } from "Service/Socket";
// import { commentTreeData, postListData } from "State/Data";
// import LoaderPane from "Stories/Pane/loaderPane";
// import Comment from "Stories/Chunk/Comment/Comment";

// const usePullComments = (comment_id: any, filter: string) => {

//     // state
//     const [list, setList]: any = useRecoilState(postListData)
//     const [commentTree, setCommentTree]: any = useRecoilState(commentTreeData)

//     const [page, setPage] = useState({ data: 0 })
//     const [end, setEnd] = useState(false)
//     const [error, setError] = useState(false)

//     useEffect(() => {
//         setList([])
//         setPage({ data: 0 })
//         setEnd(false)
//         setError(false)
//     }, [comment_id, filter])


//     // fetch posts
//     useEffect(() => {

//         if (!comment_id || !filter) return

//         const fetchMore = async () => {

//             let req: any = await socketRequest('comments', {
//                 post_id: comment_id,
//                 filter: filter,
//                 page: page.data,
//             })


// if (req.comments.length === 0) return setEnd(true)

// let result: any = {};
// let level = { result };

// // ts-ignore
// req.comments.forEach((c: any, ci: any) => {

//     // ts-ignore
//     c.path.split('.').reduce((r: any, name: any, i: any, a: any) => {

//         if (!r[name]) {
//             r[name] = { result: {} };

//             let data: any = {
//                 path: c.path,
//                 active: true,
//                 hasChildren: false,
//                 depthChange: false,
//                 last: false,
//                 public_id: c.public_id, id: name, children: r[name].result, depth: c.depth, visibility: true
//             }

//             // THERE NEEDS TO BE A BETTER WAY OF DOING THIS FFS

//             try {
//                 if (req.comments[ci].depth < req.comments[ci + 1].depth) data.hasChildren = true
//             } catch { }

//             try {
//                 if (req.comments[ci].depth !== req.comments[ci - 1].depth) data.depthChange = true
//             } catch { }

//             try {
//                 if (2 === req.comments[ci + 1].depth) data.last = true
//             } catch {
//                 data.last = true
//             }

//             r.result[name] = (data)
//         }

//         return r[name];
//     }, level)
// })

// function addChildrenCount(node: any) {
//     let count = 0;
//     for (const key in node.children) {
//         if (Object.hasOwnProperty.call(node.children, key)) {
//             const child = node.children[key];
//             addChildrenCount(child);
//             count += 1 + child.childrenCount;
//         }
//     }
//     node.childrenCount = count;
// }


//             //@ts-ignore
//             addChildrenCount(result[Object.keys(result)]);
//             //@ts-ignore
//             setCommentTree(result[Object.keys(result)].children)

//             console.groupCollapsed('%c [DATA - comment list] ', 'background: #000; color: #5555da');
//             console.log(treeify.asTree(req.comments, true));
//             console.groupEnd();

//             if (req === false || req.status === 'error') setError(true)

//             if (req.status === 'ok') {


//                 if (req.comments.length < 25) setEnd(true)
//                 let comments: any = []


//                 for (var i in req.comments) { comments.push(<Comment varient={'post'} {...req.comments[i]} />) }

//                 if (page.data === 0) setList(comments)
//                 else await setList([...list, comments])
//             }
//         }

//         if (end === false) fetchMore().catch((err) => console.log(err))

//     }, [page])

//     if (end === false) return [error, list.concat(<ChunkError variant='loading' />)]
//     if (end === true) return [error, list.concat(<ChunkError variant='end' />)]
//     return [error, list]

// }

// export default usePullComments





import { useQuery } from "@tanstack/react-query";
import Comment from "Stories/Chunk/Comment/Comment";

import { useEffect, useLayoutEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentTreeData, postListData } from "State/Data";
import { socketFlow } from "State/Flow";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import MainPost from "Stories/Chunk/Post/MainPost";
var treeify = require('treeify');


const usePullComments = (comment_id: any, filter: string) => {

    const [page, setPage] = useState(0)
    const [end, setEnd] = useState(false)
    const [components, setComponents]: any = useState([])
    const [commentTree, setCommentTree]: any = useRecoilState(commentTreeData)

    const { isLoading, isError, data, error } = useQuery({
        enabled: true,
        queryKey: ['comment-list', comment_id, filter, page],
        queryFn: async () => {
            let req: any = await socketRequest('comments', { post_id: comment_id, filter: filter, page })

            if (req.comments.length > 25) setEnd(true)
            if (req.comments.length === 0) return setEnd(true)

            let result: any = {};
            let level = { result };

            req.comments.forEach((c: any, ci: any) => {
                c.path.split('.').reduce((r: any, name: any, i: any, a: any) => {
                    if (!r[name]) {
                        r[name] = { result: {} };
                        let data: any = {
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
            }

            //@ts-ignore
            addChildrenCount(result[Object.keys(result)]);
            //@ts-ignore
            setCommentTree(result[Object.keys(result)].children)

            console.groupCollapsed('%c [DATA - comment list] ', 'background: #000; color: #5555da');
            console.log(treeify.asTree(req.comments, true));
            console.groupEnd();

            let comments: any = []
            for (var i in req.comments) { comments.push(<Comment {...req.comments[i]} />) }

            if (page === 0) setComponents(comments)
            else await setComponents([...comments, comments])

            return req
        }

    })

    if (end === true) return [isLoading, isError, components.concat(<ChunkError variant='end' />)]
    return [isLoading, isError, components.concat(<ChunkError variant='loading' />)]
}

export default usePullComments