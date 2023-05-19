import { useEffect, useState } from "react"
import { socket } from "Service/Socket";


const useSubscription = (room: any) => {

    // state
    const [data, setData]: any = useState(false)

    useEffect(() => {
        if (!room) return

        function deltaEvent(value: any) {
                if (!value) return
            setData(value)
        }
        socket.emit(room)
        socket.on(room, deltaEvent);
       
        return () => {
            socket.off(room, deltaEvent);
        };
    }, []);

    return data
}

export default useSubscription