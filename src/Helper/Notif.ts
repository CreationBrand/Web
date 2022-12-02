import { socketRequest } from "Service/Socket"
import { getRecoil, setRecoil } from 'recoil-nexus'
import { notificationStateFamily } from "State/Data"


const test = () => {

    let req = socketRequest('test', {})

}

export const handleNotification = async (data: any) => {

    // await setRecoil(notificationStateFamily('b6832803-129d-4edf-9a72-52a1c78983b4'), 1)
    console.log('test', data)

    for (let i = 0; i < data.length; i++) {
        setRecoil(notificationStateFamily(data[i].id), data[i])
    }


}