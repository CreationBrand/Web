import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { postListData, virtualListStateFamily } from "State/Data";


const useLiveData = (active: boolean, public_id: any) => {

    const [data, setData] = useRecoilState(virtualListStateFamily(public_id))


    useEffect(() => {
        if (!public_id || !active) return

        socket.emit(`subscribe:${public_id}`, true)

        function subscribe(value: any) {

            if (!value || value === undefined) return null

            const clone = { ...data };

            if (value.view > 0) {
                clone.views = Number(clone.views) + Number(value.view)
                setData(clone)
            }
            else if (value.vote) {
                clone.vote = Number(clone.vote) + Number(value.vote)
                setData(clone)
            }
            else if (value.comment) {
                clone.comment = Number(clone.comment) + Number(value.comment)
                setData(clone)
            }
            else if (value.tags !== undefined) {
                clone.tags = value.tags
                setData(clone)
            }
        }
        socket.on(`subscribe:${public_id}`, subscribe);
        return () => {
            socket.emit(`subscribe:${public_id}`, false)
            socket.off(`subscribe:${public_id}`, subscribe);
        };
    }, [active]);

    return data
}

export default useLiveData