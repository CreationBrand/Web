import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { commentSync } from "State/commentAtoms";
import { postListData, virtualListStateFamily } from "State/Data";


const useCommentLive = (active: boolean, props: any) => {

    // let [data, setData] = useState(props)


    const [data, setData] = useRecoilState(commentSync(props.public_id))


    // useEffect(() => {
    //     if (JSON.stringify(live) === JSON.stringify(props)) return
    //     setData(live)
    // }, [live])

    // useEffect(() => {
    //     if (!element || !active) return

    //     socket.emit(element, true)

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
    //     socket.on(element, subscribe);
    //     return () => {
    //         socket.emit(element, false)
    //         socket.off(element, subscribe);
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