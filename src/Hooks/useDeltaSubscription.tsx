import { useEffect, useState } from "react"
import { socket } from "Service/Socket";


const useDeltaSubscription = (public_id: any, inital: number) => {

    // state
    const [data, setData]: any = useState(inital)

    useEffect(() => {
        if (!public_id) return


        function deltaEvent(value: any) {
            if (!value.delta) return
            setData(data + parseInt(value.delta))
        }

        socket.on(public_id, deltaEvent);

        return () => {
            socket.off(public_id, deltaEvent);
        };
    }, []);

    return [data, setData]
}

export default useDeltaSubscription