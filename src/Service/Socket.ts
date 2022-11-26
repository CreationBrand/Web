import { getRecoil, setRecoil } from 'recoil-nexus'
import { io, Socket } from 'socket.io-client'
import { communityData } from 'State/Data'
import colorLog from 'Util/colorLog'
import { errorFlow, socketFlow } from 'State/Flow'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { parseCookies } from 'Util'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>

export const connectSocket = async () => {

    // SOCKET.IO CONNECTION

    var cookies = parseCookies()

    socket = io('ws://localhost:8000', {
        reconnectionDelayMax: 10000,
        auth: {
            token: cookies.accessToken
        },
        query: {
            'my-key': 'my-value'
        }
    })


    // SOCKET UPDATES HANDLERS
    socket.on('communitys', (data) => {
        console.log(data)
        let se = setRecoil(communityData, data)
        console.log('setstate', se)
    })



    socket.on("error", (error: any) => {
        setRecoil(errorFlow, { type: error.type, message: error.message })
    });

    socket.io.on("error", (error: any) => {
        colorLog('[SOCKET] Connection Failed', 'error')
        // setRecoil(errorFlow, {error: error.type, type: 'socket'})

    });


    socket.on("connect", () => {
        colorLog('[SOCKET] Connection Established', 'success')
        setRecoil(socketFlow, socket)
    });




}

export const socketRequest = async (event: string, message: any) => {

    if (socket !== null && socket !== undefined && !socket.connected) return false

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