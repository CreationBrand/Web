import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { commentSync } from "State/commentAtoms";
import { postListData, virtualListStateFamily } from "State/Data";


const useCommentLive = (active: boolean, props: any) => {

    const [data, setData] = useRecoilState(commentSync(props.public_id))


    console.log('useCommentLive', props.public_id, data)

    // useEffect(() => {
    //     if (!props.public_id || !active) return

    //     socket.emit(`subscribe:${props.public_id}`, true)

    //     function subscribe(value: any) {


    //         if (!value || value === undefined) return null

    //         const clone = { ...data };

    //         if (value.view > 0) {

    //             setData((prevState: any) => ({
    //                 ...prevState,
    //                 views: Number(data.views) + Number(value.view),
    //             }));

    //         }
    //         else if (value.vote) {
    //             clone.vote = Number(clone.vote) + Number(value.vote)
    //             setData(clone)

    //             // setData((prevState: any) => ({
    //             //     ...prevState,
    //             //     vote: Number(clone.vote) + Number(value.vote),
    //             // }));


    //         }
    //         else if (value.comment) {
    //             clone.comment = Number(clone.comment) + Number(value.comment)
    //             setData(clone)
    //         }
    //         else if (value.tags !== undefined) {
    //             clone.tags = value.tags
    //             setData(clone)
    //         }
    //         else if (value.community_roles !== undefined) {
    //             // console.log('community roles', value.community_roles, clone.community_roles)
    //             // clone.community_roles = value.community_roles
    //             // setData(clone)

    //             setData((prevState: any) => ({
    //                 ...prevState,
    //                 community_roles: value.community_roles,
    //             }));


    //         }
    //     }
    //     socket.on(`subscribe:${props.public_id}`, subscribe);
    //     return () => {
    //         socket.emit(`subscribe:${props.public_id}`, false)
    //         socket.off(`subscribe:${props.public_id}`, subscribe);
    //     };
    // }, [active]);

    return [data.vote,
    data.tags,
    data.community_roles,
    data.global_roles,
    data.visibility,
    data.author,
    data.content,
    data.created_at,
    data.depth,
    data.karma,
    data.last,
    data.path,
    data.public_id,
    data.sort_path,
    data.updated_at,
    data.active,
    data.id,
    data.hasChildren,
    ]
}

export default useCommentLive