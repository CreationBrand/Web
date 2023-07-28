
import { notificationStateFamily } from "@/state/data";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { socketRequest } from "./util/useSocket";



const useClearNotif = (notif: any) => {

    const set = useSetRecoilState(notificationStateFamily(notif))

    useEffect(() => {
        set(0)
        socketRequest('notif-clear', { notif_id: notif })
    }, []);


};




export default useClearNotif;