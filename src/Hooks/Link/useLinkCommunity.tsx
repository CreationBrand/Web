import { useEffect } from "react"
import { useSetRecoilState } from "recoil";
import { socket } from "Service/Socket";
import { communitySync } from "State/Sync";



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

        socket.emit('link-community', { community_id, active: true })
        socket.on('link-community', deltaEvent);
        return () => {
            socket.emit('link-community', { community_id, active: false })
            socket.off('link-community', deltaEvent);
        };
    }, [active]);


}

export default useLinkCommunity