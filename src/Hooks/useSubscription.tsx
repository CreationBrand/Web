import { useEffect, useState } from "react"
import { socket } from "Service/Socket";


const useSubscription = (room: any, inital: any, active: any) => {

    // state
    const [data, setData]: any = useState(inital)


    useEffect(() => {
        if (!room || !active) return
        socket.emit(room, true)

        function deltaEvent(value: any) {
            if (!value || value === undefined) return null
            setData(value)
        }
        socket.on(room, deltaEvent);
        return () => {
            socket.emit(room, false)
            socket.off(room, deltaEvent);
        };
    }, [active]);

    return data
}

export default useSubscription