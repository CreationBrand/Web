import { socketFlow } from "@/state/flow"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { io } from "socket.io-client"
import TTLCache from '@isaacs/ttlcache';
import parseCookies from "@/utils/parseCookies";
import { notificationStateFamily } from "@/state/data";
import { setRecoil } from "recoil-nexus";

const cache = new TTLCache({ max: 10000, ttl: 60000 })


export let SOCKET: any = null



const useSocket = () => {
    const [val, set]: any = useRecoilState(socketFlow)
    var cookies = parseCookies()

    useEffect(() => {
        if (val === 'connected') return
        // @ts-ignore
        const newSocket = io(process.env.REACT_APP_SOCKET, {
            reconnectionDelayMax: 5000,
            auth: {
                token: cookies?.accessToken
            },
        })
        newSocket.on("connect", () => {
            console.log('%c [Socket] ', 'font-weight:bold; color: #da55cd', 'Connectied to Socket');
            set('connected')
            SOCKET = newSocket
        })

        newSocket.on("notif", (message: any) => {
            console.log('%c [NOTIF] ', 'background: #000; color: #da55cd', message);

            try {
                if (message.type === 'message') {
                    setRecoil(notificationStateFamily(`${message.messenger_id}`), message.count)
                }
                if (message.type === 'noti') {
                    setRecoil(notificationStateFamily('noti'), message.count)
                }

            } catch (e) { }

        });


        return () => {
            set('disconnected')
            newSocket.close()
        }
    }, []);

    return val
}


export const socketRequest = async (event: string, message: any, skipCache?: any) => {
    const socket = SOCKET
    if (socket !== null && socket !== undefined && !socket.connected) return false
    if (!socket) return false

    if (cache.has(`{${event}${JSON.stringify(message)}`)) return cache.get(`{${event}${JSON.stringify(message)}`)

    return new Promise((resolve, reject) => {

        socket.emit(event, message, (data: any) => {
            if (data.error) {
                reject(data.error)
            } else {
                resolve(data)
                cache.set(`{${event}${JSON.stringify(message)}`, data)
            }
        })
    });
}

export const socketRequestNoCache = async (event: string, message: any, skipCache?: any) => {
    const socket = SOCKET
    if (socket !== null && socket !== undefined && !socket.connected) return false
    if (!socket) return false
    return new Promise((resolve, reject) => {
        socket.emit(event, message, (data: any) => {
            if (data.error) {
                reject(data.error)
            } else {
                resolve(data)
            }
        })
    });
}


export default useSocket 