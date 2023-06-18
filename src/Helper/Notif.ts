import { socketRequest } from "Service/Socket"
import { setRecoil } from 'recoil-nexus'
import { notificationStateFamily } from "State/Data"


export const handleNotification = async (data: any) => {
    for (let i = 0; i < data.length; i++) {
        setRecoil(notificationStateFamily(data[i].id), data[i])
    }
}