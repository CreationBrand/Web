import { useEffect, useState } from "react"
import { set } from "react-hook-form";
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, useSetRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { commentList, commentSync } from "State/commentAtoms";
import { postSync } from "State/postAtoms";
import Comment from "Stories/Chunk/Comment/Comment";





const useLinkPost = (post_id: string, active: boolean) => {

    const setList = useSetRecoilState(commentList)
    const setPost = useSetRecoilState(postSync(post_id))

    const sync = useRecoilTransaction_UNSTABLE(
        ({ set }) => (item: any) => {
            set(commentSync(item?.public_id), item);
        }, []
    );


    function deltaEvent(value: any) {

        if (!value || value === undefined || Object.keys(value).length < 1) return null

        if (value?.type === 'view') {
            setPost((old: any) => {
                return { ...old, views: Number(old.views) + Number(value.delta) }
            })
        }



        if (value?.type === 'new-comment') {

            setPost((old: any) => { return { ...old, comments: old.comments + 1 } })

            sync(value.comment)
            if (value?.comment?.depth === 2) {
                let parts = value.comment.path.split('.')
                value.comment.id = parts[value.comment.depth - 1]
                value.comment.visibility = true
                value.comment.active = false
                setList((oldArray: any) => [<Comment {...value.comment} />, ...oldArray])
            } else {
                setList((list: any) => {
                    const insertIndex = list.findIndex((obj: any) => {
                        return obj?.props?.public_id === value?.comment?.parent_id
                    });
                    if (insertIndex === -1) return list
                    let parts = value.comment.path.split('.')
                    value.comment.id = parts[value.comment.depth - 1]
                    value.comment.visibility = true
                    value.comment.active = false
                    return [...list.slice(0, insertIndex + 1), <Comment {...value.comment} />, ...list.slice(insertIndex + 1)]
                })
            }
        }




    }




    useEffect(() => {

        if (!post_id || !active) return

        socket.emit('link-post', { post_id, active: true })



        socket.on('link-post', deltaEvent);
        return () => {

            socket.emit('link-post', { post_id, active: false })
            socket.off('link-post', deltaEvent);
        };
    }, [active]);


}

export default useLinkPost