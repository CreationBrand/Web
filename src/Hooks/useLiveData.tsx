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
            console.log('LIVE', value)

            if (value.view > 0) {
                clone.views += value.view
                setData(clone)
            }
            else if (value.vote) {
                clone.vote += value.vote
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