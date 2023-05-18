import { useEffect, useState } from "react"
import { socket } from "Service/Socket";


const useSubscription = (room: any) => {

    // state
    const [data, setData]: any = useState(false)

    useEffect(() => {
        if (!room) return

        function deltaEvent(value: any) {
            console.log('bab', value)
            if (!value) return
            setData(data)
        }
        socket.emit(room)
        socket.on(room, deltaEvent);
       
        return () => {
            socket.off(room, deltaEvent);
        };
    }, []);

    return [data, setData]
}

export default useSubscription