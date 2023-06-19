import { getRecoil, setRecoil } from 'recoil-nexus'
import { io, Socket } from 'socket.io-client'
import { communityData, notificationStateFamily } from 'State/Data'
import { errorFlow, socketFlow } from 'State/Flow'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { parseCookies } from 'Util'
import { handleNotification } from 'Helper/Notif'
import { json } from 'stream/consumers'

export let socket: Socket<DefaultEventsMap, DefaultEventsMap>

export const connectSocket = async () => {

    // // SOCKET.IO CONNECTION

    // var cookies = parseCookies()

    // socket = io('ws://localhost:8000', {
    //     reconnectionDelayMax: 10000,
    //     auth: {
    //         token: cookies.accessToken
    //     },
    //     query: {
    //         'my-key': 'my-value'
    //     }
    // })


    // // SOCKET UPDATES HANDLERS
    // socket.on('communitys', (data) => {
    //     console.log(data)
    //     let se = setRecoil(communityData, data)
    //     console.log('setstate', se)
    // })



    // socket.on("error", (error: any) => {
    //     console.log('error', error)
    //     setRecoil(errorFlow, { type: error.type, message: error.message })
    // });

    // socket.io.on("error", (error: any) => {
    //     colorLog('[SOCKET] Connection Failed', 'error')
    //     // setRecoil(errorFlow, {error: error.type, type: 'socket'})

    // });


    // socket.on("connect", () => {
    //     colorLog('[SOCKET] Connection Established', 'success')
    //     setRecoil(socketFlow, socket)
    // });

    // socket.on('notification', handleNotification)

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

var cookies = parseCookies()


// SOCKET.IO CONNECTION
console.log('%c [Socket] ', 'font-weight:bold; color: #da55cd', 'Initializing Socket');
//@ts-ignore
socket = io(process.env.REACT_APP_SOCKET, {
    reconnectionDelayMax: 5000,

    auth: {
        token: cookies?.accessToken
    },
})


// SOCKET CONNECTION ERROR
socket.io.on("error", (error: any) => {
    console.log('%c [Socket]', 'background: #290000; color: #da55cd', 'Socket Connection Failed');
    setRecoil(errorFlow, { type: 'socket', message: 'Failed to connect to server' })
    setRecoil(socketFlow, 'error')

});

// SOCKET SERVER ERROR
socket.on("error", (error: any) => {
    console.log('%c [Socket] ', 'background: #290000; color: #da55cd', error);
    // setRecoil(errorFlow, { type: error.type, message: error.message })
    setRecoil(socketFlow, 'error')

});

// SOCKET connection established
socket.on("connect", () => {
    console.log('%c [Socket] ', 'font-weight:bold; color: #da55cd', 'Connectied to Socket');
    setRecoil(socketFlow, 'connected')
    socketRequest('notifs', {}).then((data: any) => {
        for (const property in data.notifs) {
            setRecoil(notificationStateFamily(property), data.notifs[property])

        }

    })


});

// SOCKET connection broken
socket.on("disconnect", () => {
    console.log('%c [Socket] ', 'background: #290000; color: #da55cd', 'disconnected');
    setRecoil(socketFlow, 'disconnected')
});

// SOCKET event
socket.onAny((eventName, ...args) => {
    // console.log('%c [Socket] ', 'background: #000; color: #da55cd', eventName, args);
});



socket.on("notif", (message: any) => {

    try {
        if (message.type === 'message') {
            setRecoil(notificationStateFamily(`${message.messenger_id}`), message.count)
        }
        if (message.type === 'noti') {
            setRecoil(notificationStateFamily('noti'), message.count)
        }

    } catch (e) { }

});

