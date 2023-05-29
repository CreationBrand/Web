import { socketRequest } from "Service/Socket";
import { notificationStateFamily } from "State/Data";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";



const useClearNotif = (notif: any) => {

    const set = useSetRecoilState(notificationStateFamily(notif))

    useEffect(() => {
        set(0)
        socketRequest('notif-clear', { notif_id: notif })
    }, []);


};




export default useClearNotif;