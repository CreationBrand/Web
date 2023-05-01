import { useEffect, useState } from "react"
import { socket, socketRequest } from "Service/Socket";
import CommunityPane from "Stories/Chunk/CommunityPane/CommunityPane";
import Post from "Stories/Objects/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";
import { colorLog } from "Util";


const useDeltaSubscription = (public_id: any, inital: number) => {

    // state
    const [data, setData]: any = useState(inital)


    useEffect(() => {
        function deltaEvent(value: any) {
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