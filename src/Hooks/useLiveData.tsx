import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";


const useLiveData = (active: boolean, element: any) => {

    const [data, setData] = useRecoilState(virtualListStateFamily(element))


    useEffect(() => {
        if (!element || !active) return

        socket.emit(element, true)

        function subscribe(value: any) {


            if (!value || value === undefined) return null

            const clone = { ...data };

            if (value.view > 0) {

                setData((prevState: any) => ({
                    ...prevState,
                    views: Number(data.views) + Number(value.view),
                }));

            }
            else if (value.vote) {
                clone.vote = Number(clone.vote) + Number(value.vote)
                setData(clone)

                // setData((prevState: any) => ({
                //     ...prevState,
                //     vote: Number(clone.vote) + Number(value.vote),
                // }));


            }
            else if (value.comment) {
                clone.comment = Number(clone.comment) + Number(value.comment)
                setData(clone)
            }
            else if (value.tags !== undefined) {
                clone.tags = value.tags
                setData(clone)
            }
            else if (value.community_roles !== undefined) {
                // console.log('community roles', value.community_roles, clone.community_roles)
                // clone.community_roles = value.community_roles
                // setData(clone)

                setData((prevState: any) => ({
                    ...prevState,
                    community_roles: value.community_roles,
                }));


            }
        }
        socket.on(element, subscribe);
        return () => {
            socket.emit(element, false)
            socket.off(element, subscribe);
        };
    }, [active]);

    return data
}

export default useLiveData