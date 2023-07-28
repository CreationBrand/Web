import { communitySync } from "@/state/sync";
import { useEffect } from "react"
import { useSetRecoilState } from "recoil";

import { SOCKET } from "../util/useSocket";



const useLinkCommunity = (community_id: string, active: boolean) => {

    const setCommunity = useSetRecoilState(communitySync(community_id))

    function deltaEvent(value: any) {

        if (!value || value === undefined || Object.keys(value).length < 1) return null

        if(value.type === 'online'){
            setCommunity((old: any) => ({ ...old, online: value.value }))
        }

    }




    useEffect(() => {
        if (!community_id || !active) return

        SOCKET.emit('link-community', { community_id, active: true })
        SOCKET.on('link-community', deltaEvent);
        return () => {
            SOCKET.emit('link-community', { community_id, active: false })
            SOCKET.off('link-community', deltaEvent);
        };
    }, [active]);


}

export default useLinkCommunity