


import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { commentTreeData, postListData } from "State/Data";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";
import Comment from "Stories/Chunk/Comment/Comment";
var treeify = require('treeify');

const usePullComments = (comment_id: any, filter: string, varient: string) => {

    // state
    const [list, setList]: any = useRecoilState(postListData)
    const [commentTree, setCommentTree]: any = useRecoilState(commentTreeData)

    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // reset list on props change
    useEffect(() => {
        setList([])
        setPage({ data: 0 })
        setEnd(false)
        setError(false)
    }, [comment_id, filter])


    // fetch posts
    useEffect(() => {
        if (!comment_id || !filter) return

        const fetchMore = async () => {

            let req: any = await socketRequest('comments', {
                post_id: comment_id,
                filter: filter,
                page: page.data,
            })



            let result: any = {};


            let level = { result };

            console.log(req)

            // ts-ignore
            req.comments.forEach((c: any, ci: any) => {

                // ts-ignore
                c.path.split('.').reduce((r: any, name: any, i: any, a: any) => {

                    if (!r[name]) {
                        r[name] = { result: {} };

                        let data: any = {
                            path: c.path,
                            active: true,
                            hasChildren: false,
                            last: false, first: false, public_id: c.public_id, id: name, children: r[name].result, depth: c.depth, visibility: true
                        }

                        try {
                            if (req.comments[ci].depth !== req.comments[ci - 1].depth) data.depthChange = true
                            if (req.comments[ci].depth < req.comments[ci + 1].depth) data.hasChildren = true
                            if (2 === req.comments[ci + 1].depth) data.last = true
                        } catch { }

                        r.result[name] = (data)
                    }

                    return r[name];
                }, level)
            })

            //@ts-ignore
            setCommentTree(result[Object.keys(result)].children)


            console.groupCollapsed('%c [DATA - comment list] ', 'background: #000; color: #5555da');
            console.log(treeify.asTree(req.comments, true));
            console.groupEnd();


            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {


                if (req.comments.length < 25) setEnd(true)
                let comments: any = []


                for (var i in req.comments) {
                    comments.push(<Comment varient={'post'} {...req.comments[i]} />)
                }


                if (page.data === 0) setList(comments)
                else await setList([...list, comments])
            }
        }
        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])


    if (end === false) return [error, list.concat(<LoaderPane />)]






    return [error, list]
}

export default usePullComments





